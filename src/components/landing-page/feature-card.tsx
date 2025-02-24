import { type ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h4 className="text-xl font-semibold text-left">{title}</h4>
      </div>
      <p className="text-zinc-600 text-left">{description}</p>
    </div>
  );
}
