"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategorySelect } from "./category-selector";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DEFAULT_LIMIT } from "@/constants";
import { ServiceCardType } from "../../types";

interface Props {
  onClose: () => void;
  initialValue?: ServiceCardType;
}

// Validation schema
const addServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be >= 0"),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Tag is required"),
});

type AddServiceFormValues = z.infer<typeof addServiceSchema>;

export const AddServiceForm = ({ onClose, initialValue }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createService = useMutation(
    trpc.provider.createService.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.provider.getAllServices.infiniteQueryOptions({
            limit: DEFAULT_LIMIT,
          })
        );
        await queryClient.invalidateQueries(trpc.provider.getStats.queryOptions())
        onClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateService = useMutation(
    trpc.provider.editService.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.provider.getAllServices.infiniteQueryOptions({
            limit: DEFAULT_LIMIT,
          })
        );
        onClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<AddServiceFormValues>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      title: initialValue?.title || "",
      description: initialValue?.description || "",
      price: initialValue?.price || 0,
      duration: initialValue?.duration || "",
      category: initialValue?.category?.value || "",
    },
  });

  const isPending = createService.isPending || updateService.isPending
  const isFormInvalid = !form.formState.isValid;
  const isDisabled = isPending || isFormInvalid;

  const onSubmit = (values: AddServiceFormValues) => {
    if (initialValue) {
      updateService.mutate({
        id: initialValue.id,
        categoryId: values.category,
        description: values.description,
        duration: values.duration,
        price: values.price,
        title: values.title,
      });
    } else {
      createService.mutate({
        categoryId: values.category,
        description: values.description,
        duration: values.duration,
        price: values.price,
        title: values.title,
        userId: "",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="font-bold text-2xl">Add New Service to offer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Service Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1h 30m" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category (Select) */}
          <CategorySelect
            control={form.control}
            name="category"
            label="Select a Category"
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Service Description"
                    className="resize-none h-40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            disabled={isPending}
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
          <Button disabled={isDisabled} type="submit" className="bg-brand-blue">
            {isPending
              ? initialValue
                ? "Updating..."
                : "Adding..."
              : initialValue
              ? "Update Service"
              : "Add Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
