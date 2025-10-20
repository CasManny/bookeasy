import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { NotificationPanel } from "./notification-panel";

export const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer hidden">
        <div className="relative size-10 flex items-center justify-center  rounded-full">
          <Bell className="size-6 text-black" />
          <span className="absolute top-1 right-1.5 w-3 h-3 bg-red-500 rounded-full border-2"></span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-2xl border-none" align="end">
        <NotificationPanel />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
