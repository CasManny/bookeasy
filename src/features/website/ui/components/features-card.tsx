import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <Card
    data-feature
    className="opacity-0 transform translate-y-8 transition-all duration-700 hover:shadow-xl hover:-translate-y-2 border-0 shadow-lg"
    style={{
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
    }}
  >
    <CardHeader className="text-center pb-4">
      <div className="w-16 h-16 bg-brand-blue/70 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);
