"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Mail, User } from "lucide-react";

// Schema validation using Zod
const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email"),
  date: z.date({ error: "Date is required" }),
  time: z.string().min(1, "Time slot is required"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

// Example time slots
const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];

interface BookingFormProps {
  onClose: () => void;
  reschedule?: boolean;
}

export const DateSelector: React.FC<BookingFormProps> = ({
  onClose,
  reschedule,
}) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      date: undefined,
      time: "",
    },
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking submitted:", data.date);
  };

  return (
    <div className="lg:basis-2/3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Date Picker */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>
                  <div className="flex items-center gap-1">
                    <CalendarIcon />
                    <span className="text-brand-black">Select Date</span>
                  </div>
                </FormLabel>
                <Controller
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <Calendar
                      className="w-[70%]"
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        field.onChange(date!);
                        setSelectedDate(date!);
                      }}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time Slots: only show if date selected */}
          {selectedDate && (
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Available Time for {format(selectedDate, "MMMM do, yyyy")}
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {timeSlots.map((slot) => {
                        const isSelected = field.value === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => field.onChange(slot)}
                            className={cn(
                              "border rounded-lg  py-3 text-sm sm:text-base font-medium transition-all",
                              "hover:bg-brand-blue/60 cursor-pointer",
                              isSelected
                                ? "bg-brand-accent text-white hover:bg-brand-accent"
                                : "bg-white text-gray-700 border-gray-300"
                            )}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Full Name */}

          {!reschedule && (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute top-1/2 -translate-y-1/2 left-3" />
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="pl-13"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute top-1/2 -translate-y-1/2 left-3" />
                        <Input
                          placeholder="john@example.com"
                          {...field}
                          className="pl-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <div className="flex gap-5 mt-2">
            <Button
              variant={"outline"}
              onClick={onClose}
              type="button"
              className=""
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-blue hover:bg-brand-blue">
              Confirm Booking
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
