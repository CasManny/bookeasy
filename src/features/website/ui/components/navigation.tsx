import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { MobileNav } from "./mobile-nav";

export const Navigation = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  let navLinks;
  if (!session) {
    navLinks = (
      <>
        <Button asChild variant="outline" className="mr-2">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="default" className="bg-brand-blue">
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </>
    );
  } else if (session.user.role === "provider") {
    // Provider
    navLinks = (
      <Button asChild variant="default" className="bg-brand-blue">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    );
  } else {
    const link = { href: "/services", name: "Services", Icon: HomeIcon };
    navLinks = (
      <Link
        href={link.href}
        key={link.name}
        className={cn(
          "flex items-center space-x-2 p-2 text-gray-700",
          "bg-brand-blue duration-300 transition-colors rounded-lg text-white font-bold"
        )}
      >
        <link.Icon className="w-5 h-5" />
        <span>{link.name}</span>
      </Link>
    );
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center space-x-4">
            {navLinks}
          </div>
          <MobileNav links={navLinks} />
        </div>
      </div>
    </nav>
  );
};
