import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  title: string;
  description: string;
}

export const Header = ({ className, title, description }: Props) => {
  return (
    <div className={cn("max-w-xl mx-auto w-full py-10 text-center", className)}>
      <h1 className="text-2xl sm:text-5xl font-bold  text-brand-blue">{title}</h1>
      <p className="text-pretty text-sm  sm:text-lg">{description}</p>
    </div>
  );
};
