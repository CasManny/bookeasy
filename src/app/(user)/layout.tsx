import { Navbar } from "@/features/user/ui/components";
import React, { PropsWithChildren } from "react";

const UserLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default UserLayout;
