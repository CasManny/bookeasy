"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface Props {
  onClose: () => void;
}

interface Availability {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export const UpdateAvailabilityForm = ({ onClose }: Props) => {
  // Dummy data for initial availability
  const dummyData: Availability = {
    monday: true,
    tuesday: false,
    wednesday: true,
    thursday: false,
    friday: true,
    saturday: false,
    sunday: false,
  };

  const [availability, setAvailability] = useState<Availability>(dummyData);

  const toggleDay = (day: keyof Availability) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleSave = () => {
    console.log("Saved availability:", availability);
    onClose(); // Close modal after saving
    // Here you would call API to save to DB
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Set Weekly Availability</h3>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(availability).map(([day, isAvailable]) => (
          <div
            key={day}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            <span className="capitalize text-lg">{day}</span>
            <Switch
              checked={isAvailable}
              onCheckedChange={() => toggleDay(day as keyof Availability)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-brand-blue" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
