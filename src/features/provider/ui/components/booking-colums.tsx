"use client";

import { formatBookingDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type BookingColumnsProps = {
  id: string;
  serviceName: string;
  status: "pending" | "confirmed" | "cancelled" | null;
  description: string;
  createdAt: Date;
  slotTime: string | null;
};

export const Bookingcolumns: ColumnDef<BookingColumnsProps>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "serviceName",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.original.description;
      return (
        <div className="max-w-[200px] truncate text-ellipsis" title={desc}>
          {desc}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const d = row.original.createdAt;
      return formatBookingDate(d);
    },
  },
  {
    accessorKey: "slotTime",
    header: "Time",
  },
];
