import { Button } from "@/components/ui/button";
import React from "react";

type SlotData = {
  day: string;
  slots: string[];
};

type SlotCardProps = {
  data: SlotData[];
};

export const SlotCard: React.FC<SlotCardProps> = ({ data }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {data.map((item) => (
        <div
          key={item.day}
          className="border rounded-2xl shadow-sm p-5 bg-white"
        >
          {/* Day */}
          <h2 className="text-2xl font-semibold mb-3">{item.day}</h2>

          {/* Slots */}
          <div className="flex flex-col gap-4">
            {item.slots.length > 0 ? (
              item.slots.map((slot, i) => (
                <div
                  key={i}
                  className="relative text-brand-black border rounded-xl group flex justify-between items-center"
                >
                  {/* Slot Display */}
                  <span className="block p-5 text-xl font-bold">{slot}</span>

                  {/* Action Buttons (hidden until hover) */}

                  <Button
                    className="px-3 !h-8 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2"
                    onClick={() => console.log("Delete slot:", slot)}
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No slots</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
