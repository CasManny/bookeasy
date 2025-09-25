import { Notification } from "./notification";
import { UserProfile } from "./user-profile";

export const DashboardNavbar = () => {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">
        Welcome, <span className="text-brand-primary">Admin</span>
      </h1>

      {/* Right Section: Icons */}
      <div className="flex items-center gap-2">
        <Notification />
        <UserProfile />
      </div>
    </nav>
  );
};
