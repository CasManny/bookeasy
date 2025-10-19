import { headers } from "next/headers";
import { Notification } from "./notification";
import { UserProfile } from "./user-profile";
import { auth } from "@/lib/auth";

export const DashboardNavbar = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  const fullName = session?.user.name;

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">
        Welcome, <span className="text-brand-primary">{ fullName}</span>
      </h1>

      {/* Right Section: Icons */}
      <div className="flex items-center gap-2">
        <Notification />
        <UserProfile />
      </div>
    </nav>
  );
};
