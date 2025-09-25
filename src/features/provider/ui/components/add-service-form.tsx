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

interface Props {
  onClose: () => void;
  initialValue?: {
    title: string;
    description: string;
    price: number;
    duration: string;
    category: string;
  };
}

const dummyCategories = [
  { id: "spa", label: "Spa" },
  { id: "massage", label: "Massage" },
  { id: "therapy", label: "Therapy" },
  { id: "fitness", label: "Fitness" },
];

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
  const form = useForm<AddServiceFormValues>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      title: initialValue?.title || "",
      description: initialValue?.description || "",
      price: initialValue?.price || 0,
      duration: initialValue?.duration || "",
      category: initialValue?.category || "",
    },
  });

  const onSubmit = (values: AddServiceFormValues) => {
    console.log("Service data:", values);
    onClose(); // close modal after submit
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
            categories={dummyCategories}
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
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" className="bg-brand-blue">
            Add Service
          </Button>
        </div>
      </form>
    </Form>
  );
};
