import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

export const Navigation: FC = () => (
  <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center space-x-8">
          <Button asChild variant="outline" className="mr-2">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant={"default"} className="bg-brand-blue">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  </nav>
);
