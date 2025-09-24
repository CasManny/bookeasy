"use client"
import React from "react";
import { SlotCard } from "../components/slot-card";
import { slotsData } from "../../data";

export const AvailabilityView = () => {
  return (
    <div className="p-6">
      <SlotCard data={slotsData} />
    </div>
  );
};
