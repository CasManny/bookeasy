/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
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

interface Category {
  id: string;
  label: string;
}

interface CategorySelectProps {
  control: Control<any>; // RHF control
  name: string; // form field name
  label?: string; // label for the field
  categories: Category[];
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  control,
  name,
  label = "Category",
  categories,
}) => {
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
              {categories.map((cat) => (
                <SelectItem className="p-3 text-lg" key={cat.id} value={cat.id}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
