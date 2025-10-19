import { DEFAULT_PAGE } from "@/constants";
import { useQueryStates, parseAsInteger, parseAsStringEnum } from "nuqs";

export const useBookingsFilters = () => {
  return useQueryStates({
    status: parseAsStringEnum([
      "pending",
      "confirmed",
      "cancelled",
    ]).withOptions({ clearOnDefault: true }),

    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};
