import { DEFAULT_PAGE } from "@/constants";
import { createLoader, parseAsInteger, parseAsStringEnum } from "nuqs/server";

export const bookingFilterSearchParams = {
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),

  status: parseAsStringEnum(["pending", "confirmed", "cancelled"])
    .withOptions({ clearOnDefault: true }),
};

export const loadBookingSearchParams = createLoader(bookingFilterSearchParams);
