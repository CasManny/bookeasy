import React, { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[1550px] mx-auto w-full p-5">{children}</div>;
};
