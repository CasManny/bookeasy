import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";

export const Hero: FC = async () => {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <div
          data-hero
        >
          <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
            Now with Real-Time Booking
          </Badge>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            The Future of{" "}
            <span className="text-transparent bg-clip-text bg-brand-blue">
              Booking
            </span>
            <br />
            is Here
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Empower your business with our role-based booking platform. Seamless
            scheduling, real-time availability, and powerful management tools.
          </p>

          {/* Hide buttons if user is logged in */}
          {!session && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-brand-blue text-white">
                <Link href="/sign-up">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg"
              >
                <Link href="/login">Watch Demo</Link>
              </Button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
