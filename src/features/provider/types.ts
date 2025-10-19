import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";


export type stats = inferRouterOutputs<AppRouter>['provider']['getStats']
export type recentBookingsType = inferRouterOutputs<AppRouter>['provider']['getRecentBookings']
export type topServicesType = inferRouterOutputs<AppRouter>["provider"]["getTopServices"];
export type GetAllServicesOutput = inferRouterOutputs<AppRouter>["provider"]["getAllServices"];
export type ServiceCardType = GetAllServicesOutput["items"][number];
export type AvailabilitySlotsType = inferRouterOutputs<AppRouter>['provider']['getAvailabilitiesSlots']
export type BookingDetailsType = inferRouterOutputs<AppRouter>['provider']['getBookingById']

export enum WeekDay {
  MON = "mon",
  TUE = "tue",
  WED = "wed",
  THURS = "thurs",
  FRI = "fri",
  SAT = "sat",
  SUN = "sun",
}

export const dayFullNameMap: Record<WeekDay, string> = {
  [WeekDay.MON]: "Monday",
  [WeekDay.TUE]: "Tuesday",
  [WeekDay.WED]: "Wednesday",
  [WeekDay.THURS]: "Thursday",
  [WeekDay.FRI]: "Friday",
  [WeekDay.SAT]: "Saturday",
  [WeekDay.SUN]: "Sunday",
};



type Slot = { slotId: string; time: string };
export type AvailabilityWithSlots = {
  availabilityId: string;
  day: string;
  isAvailable: boolean;
  slots: Slot[];
};