import React from "react";
import { Bell } from "lucide-react";

export const DashboardNavbar = () => {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Left Section: Greeting */}
      <h1 className="text-xl font-semibold text-gray-800">
        Welcome, <span className="text-brand-primary">Admin</span>
      </h1>

      {/* Right Section: Icons */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
            3
          </span>
        </div>

        {/* Profile Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
          A
        </div>
      </div>
    </nav>
  );
};
