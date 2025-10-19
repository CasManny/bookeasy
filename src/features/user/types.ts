import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type ServicesType = inferRouterOutputs<AppRouter>['user']['getServices']['items'][number]
export type ServiceDetailType = inferRouterOutputs<AppRouter>['user']['getServiceById']
export type MyBookingsType = inferRouterOutputs<AppRouter>['user']['getMybookings'][number]