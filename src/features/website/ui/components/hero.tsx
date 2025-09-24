import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero: FC = () => (
  <section className="pt-32 pb-20 px-6">
    <div className="container mx-auto text-center">
      <div
        data-hero
        className="opacity-0 transform translate-y-8 transition-all duration-1000"
      >
        <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
          Now with Real-Time Booking
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          The Future of{" "}
          <span className="text-transparent bg-clip-text bg-brand-blue">
            Booking
          </span>
          <br />
          is Here
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Empower your business with our role-based booking platform. Seamless
          scheduling, real-time availability, and powerful management tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-brand-blue text-white px-8 py-6 text-lg"
          >
            Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
            Watch Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
