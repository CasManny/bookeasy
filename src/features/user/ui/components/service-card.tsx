// ServiceCard.tsx
"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { ServicesType } from "../../types";

interface Props {
  data: ServicesType;
  showButton?: boolean;
}

export const ServiceCard = ({ data, showButton = true }: Props) => {
  const { category, description, duration, id, price, title, provider } = data;
  const router = useRouter();

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
          {category}
        </span>
        <span className="text-brand-blue font-bold">${price}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-brand-black">{title}</h3>
      <p className="mt-2 text-brand-black text-sm sm:text-lg">{description}</p>

      {!showButton && (
        <div className="flex flex-col space-x-2 mt-5">
          <p className="text-sm font-bold">Service Provider</p>
          <p className="font-semibold text-sm">{provider}</p>
        </div>
      )}

      <div className="mt-4 flex gap-1">
        <Clock />
        <span className="text-gray-700 font-medium">{duration}</span>
      </div>

      {showButton && (
        <Button
          onClick={() => router.push(`/services/${id}`)}
          className="mt-4 w-full bg-brand-blue text-white font-semibold py-2 rounded-xl hover:bg-brand-blue/80 transition-colors"
        >
          Book Now
        </Button>
      )}

      {/* <ResponsiveDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        requireConfirmation
        title={`Book: ${title}`}
        description={`Select a date and time for ${title}`}
      >
        <div className="">
          <h1 className="text-brand-blue text-xl sm:text-3xl font-bold">
            Book {title}
          </h1>
          <p className="text-sm sm:text-lg">
            Complete your booking details below
          </p>
        </div>
        <BookingForm data={data} closeModal={closeModal} />
        <Button
          variant={"outline"}
          onClick={closeModal}
          size={"icon"}
          className="absolute top-5 right-10"
        >
          <XIcon />
        </Button>
      </ResponsiveDialog> */}
    </div>
  );
};
