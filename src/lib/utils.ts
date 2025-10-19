import { dayFullNameMap, WeekDay } from "@/features/provider/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFullDayName(day: WeekDay): string {
  return dayFullNameMap[day];
}

export const generateTimeSlots = (
  timeGap: number = 30,
  format: "12h" | "24h" = "12h"
) => {
  const slots = [];
  const totalMinutes = 24 * 60;

  for (let minutes = 0; minutes < totalMinutes; minutes += timeGap) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const time =
      format === "12h"
        ? `${String(hours % 12 || 12).padStart(2, "0")}:${String(mins).padStart(
            2,
            "0"
          )} ${hours < 12 ? "AM" : "PM"}`
        : `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

    slots.push(time);
  }

  return slots;
};


export function formatBookingDate(date: Date): string {
  return format(date, "EEEE, MMMM do yyyy");
}



