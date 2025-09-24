import { Header } from "@/features/user/ui/components";
import { BookingsView } from "@/features/user/ui/views/bookings-view";

const MybookingsPage = () => {
  return (
    <div className="w-full">
      <Header title="Welcome Back" description="Manage your bookings and past appointments" />
      <BookingsView />
    </div>
  );
};

export default MybookingsPage;
