/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, Controller } from "react-hook-form";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CategorySelectProps {
  control: Control<any>;
  name: string;
  label?: string;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  control,
  name,
  label = "Category",
}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // 🧠 State for toggling "create category" mode
  const [creating, setCreating] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // 🚀 Fetch categories
  const { data: categories } = useSuspenseQuery(
    trpc.provider.getAllCategories.queryOptions()
  );

  // 🧩 Mutation to create a new category
  const createCategory = useMutation(
    trpc.provider.createCategory.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        setCreating(false);
        setNewCategory("");
        await queryClient.invalidateQueries(
          trpc.provider.getAllCategories.queryOptions()
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  // 🧩 Handle category creation
  const handleCreate = () => {
    if (!newCategory.trim()) return;
    createCategory.mutate({ name: newCategory });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="w-full text-lg h-9 py-6">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {/* ✅ Show categories if they exist */}
              {categories.length > 0 &&
                categories.map((cat) => (
                  <SelectItem
                    className="p-3 text-lg"
                    key={cat.value}
                    value={cat.value}
                  >
                    {cat.label}
                  </SelectItem>
                ))}

              {/* Divider */}
              <div className="border-t my-2" />

              {/* ✅ Either show create form or button */}
              <div className="p-3">
                {!creating ? (
                  <Button
                    variant="outline"
                    className="w-full text-sm"
                    onClick={() => setCreating(true)}
                  >
                    + Create Category
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter category name"
                      className="w-full"
                    />
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleCreate}
                        disabled={
                          createCategory.isPending || !newCategory.trim()
                        }
                        className="flex-1"
                      >
                        {createCategory.isPending ? "Creating..." : "Create"}
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex-1"
                        onClick={() => {
                          setCreating(false);
                          setNewCategory("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
