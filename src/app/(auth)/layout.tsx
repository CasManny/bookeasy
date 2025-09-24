import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="bg-blue-100 min-h-screen flex-center">{children}</main>
  );
};

export default AuthLayout;
