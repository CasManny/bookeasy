"use client";

import { ColumnDef } from "@tanstack/react-table";

export type BookingColumnsProps = {
  id: string;
  title: string;
  status: "pending" | "processing" | "success" | "failed";
  description: string;
  date: string;
  time: string;
};

export const Bookingcolumns: ColumnDef<BookingColumnsProps>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
];
