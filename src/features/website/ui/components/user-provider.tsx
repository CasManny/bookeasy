import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, TrendingUp, CheckCircle } from "lucide-react";

interface FeatureListProps {
  features: string[];
}

const UserCard: FC<FeatureListProps> = ({ features }) => (
  <Card
    data-animate
    className="opacity-0 transform translate-y-8  duration-700 p-8 border-0 shadow-xl hover:shadow-2xl transition-shadow"
  >
    <CardHeader className="pb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            For Customers
          </CardTitle>
          <p className="text-gray-600 font-medium">
            Get the service you need, instantly
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700 font-medium">{feature}</span>
        </div>
      ))}
    </CardContent>
  </Card>
);

const ProviderCard: FC<FeatureListProps> = ({ features }) => (
  <Card
    data-animate
    className="opacity-0 transform translate-y-8  duration-700 p-8 border-0 shadow-xl hover:shadow-2xl transition-shadow"
  >
    <CardHeader className="pb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            For Service Providers
          </CardTitle>
          <p className="text-gray-600 font-medium">
            Grow your business with ease
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700 font-medium">{feature}</span>
        </div>
      ))}
    </CardContent>
  </Card>
);

export const UserProviderFeatures: FC = () => {
  const userFeatures: string[] = [
    "Find trusted professionals in seconds",
    "See real-time availability and pricing",
    "Book with just a few clicks",
    "Get instant confirmation & reminders",
    "Manage all your bookings in one place",
    "Rate and review services",
  ];

  const providerFeatures: string[] = [
    "Showcase your services to thousands",
    "Set your own rates and availability",
    "Automated booking & scheduling",
    "Track earnings and performance metrics",
    "Direct messaging with customers",
    "Never miss a booking opportunity",
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you&apos;re looking for a service or offering one, BookHub has
            everything you need to succeed
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <UserCard features={userFeatures} />
          <ProviderCard features={providerFeatures} />
        </div>
      </div>
    </section>
  );
};
