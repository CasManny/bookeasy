// ServiceCard.tsx
"use client";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Clock, XIcon } from "lucide-react";
import React, { useState } from "react";
import { BookingForm } from "./booking-form";
import { cn } from "@/lib/utils";

interface Props {
  tag: string;
  price: number;
  service: string;
  description: string;
  showButton?: boolean;
  duration: string;
}

export const ServiceCard = ({
  tag,
  price,
  service,
  description,
  duration,
  showButton = true,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className={cn(
        "bg-white w-full p-10 ",
        showButton &&
          "shadow-2xl rounded-2xl hover:shadow-xl transition-shadow duration-300"
      )}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-white bg-brand-accent px-3 py-1 rounded-full">
          {tag}
        </span>
        <span className="text-brand-blue font-bold">${price}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-brand-black">{service}</h3>
      <p className="mt-2 text-brand-black text-sm sm:text-lg">{description}</p>

      <div className="mt-4 flex gap-1">
        <Clock />
        <span className="text-gray-700 font-medium">{duration}</span>
      </div>

      {showButton && (
        <Button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full bg-brand-blue text-white font-semibold py-2 rounded-xl hover:bg-brand-blue/80 transition-colors"
        >
          Book Now
        </Button>
      )}

      <ResponsiveDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        requireConfirmation
        title={`Book: ${service}`}
        description={`Select a date and time for ${service}`}
      >
        <div className="">
          <h1 className="text-brand-blue text-xl sm:text-3xl font-bold">
            Book {service}
          </h1>
          <p className="text-sm sm:text-lg">
            Complete your booking details below
          </p>
        </div>
        <BookingForm
          service={service}
          tag={tag}
          price={price}
          description={description}
          time={duration}
          closeModal={closeModal}
        />
        <Button
          variant={"outline"}
          onClick={closeModal}
          size={"icon"}
          className="absolute top-5 right-10"
        >
          <XIcon />
        </Button>
      </ResponsiveDialog>
    </div>
  );
};
