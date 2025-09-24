import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, CheckCircle } from "lucide-react";

interface FeatureListProps {
  features: string[];
}

const UserCard: FC<FeatureListProps> = ({ features }) => (
  <Card
    data-animate
    className="opacity-0 transform translate-y-8 transition-all duration-700 p-8 border-0 shadow-xl"
  >
    <CardHeader className="pb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl text-gray-900">For Users</CardTitle>
          <p className="text-gray-600">Effortless booking experience</p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className="text-gray-700">{feature}</span>
        </div>
      ))}
    </CardContent>
  </Card>
);

const ProviderCard: FC<FeatureListProps> = ({ features }) => (
  <Card
    data-animate
    className="opacity-0 transform translate-y-8 transition-all duration-700 p-8 border-0 shadow-xl"
  >
    <CardHeader className="pb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl text-gray-900">
            For Providers
          </CardTitle>
          <p className="text-gray-600">Complete business management</p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className="text-gray-700">{feature}</span>
        </div>
      ))}
    </CardContent>
  </Card>
);

export const UserProviderFeatures: FC = () => {
  const userFeatures: string[] = [
    "Browse and search services",
    "Calendar-based date selection",
    "Real-time availability checking",
    "Booking confirmation & management",
    "Service discovery with infinite scroll",
    "Detailed service information",
  ];

  const providerFeatures: string[] = [
    "Complete service management",
    "Flexible availability settings",
    "Booking oversight dashboard",
    "Revenue tracking & analytics",
    "Customer communication tools",
    "Cancellation & reschedule handling",
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <UserCard features={userFeatures} />
          <ProviderCard features={providerFeatures} />
        </div>
      </div>
    </section>
  );
};
