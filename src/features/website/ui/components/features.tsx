import { FC } from "react";
import { Calendar, Users, Shield, Zap } from "lucide-react";
import { FeatureCard } from "./features-card";

interface Feature {
  icon: typeof Calendar;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Calendar,
    title: "Smart Booking System",
    description:
      "Intuitive calendar-based booking with real-time availability updates and conflict prevention.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description:
      "Separate dashboards for users and providers with tailored features for each role.",
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description:
      "Enterprise-grade security with Supabase Auth supporting multiple login methods.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description:
      "Live availability updates and instant booking confirmations across all devices.",
  },
];

export const Features: FC = () => (
  <section id="features" className="py-20 px-6 bg-white">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Everything You Need to Scale
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Built for modern businesses that demand flexibility, security, and
          performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </div>
  </section>
);
