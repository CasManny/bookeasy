import { Edit, Trash } from "lucide-react";
import React from "react";

export const ManageCTA = () => {
  return (
    <div className="flex gap-1 items-center">
      <button className="cursor-pointer">
        <Edit className="" />
      </button>
      <button className="cursor-pointer">
        <Trash className="text-red-500" />
      </button>
    </div>
  );
};
