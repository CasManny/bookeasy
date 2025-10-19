"use client";

import React from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

const categorySchema = z.object({
  name: z.string().min(3, "Category name is required and at least 3 characters"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export const AddCategoryForm = ({ onClose }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createCategegory = useMutation(
    trpc.provider.createCategory.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.provider.getAllCategories.queryOptions()
        );
        onClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  const nameValue = form.watch("name");
  const isPending = createCategegory.isPending;
  const isDisabled = isPending || nameValue.trim().length === 0;

  const onSubmit = (values: CategoryFormValues) => {
    createCategegory.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            disabled={isPending}
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={isDisabled} type="submit" className="bg-brand-blue">
            Add Category
          </Button>
        </div>
      </form>
    </Form>
  );
};
