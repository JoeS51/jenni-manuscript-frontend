import {
  CursorArrowRaysIcon,
  StarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import { FeatureCard } from "./feature-card";

export function Features() {
  return (
    <div id="features" className="py-16">
      {/* Intro to Features */}
      <div className="text-center mb-16">
        <h2 className="text-blue-600 font-semibold mb-4">Features</h2>
        <h3 className="text-4xl font-bold mb-4 tracking-tight">
          Comprehensive Analysis Tools
        </h3>
        <p className="text-zinc-600 text-xl max-w-md mx-auto">
          Advanced features to ensure your manuscript meets publication
          standards
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={<CursorArrowRaysIcon className="w-6 h-6 text-blue-600" />}
          title="Journal-Specific Feedback"
          description="We provide targetted feedback with your intended publication or custom rubric in mind."
        />

        <FeatureCard
          icon={<StarIcon className="w-6 h-6 text-blue-600" />}
          title="Section Scoring"
          description="Get feedback metrics on each section of your document from abstract to methods."
        />

        <FeatureCard
          icon={<ArrowTrendingUpIcon className="w-6 h-6 text-blue-600" />}
          title="Smart Suggestions"
          description="Clearly written, actionable steps to increase your chances of publication success."
        />
      </div>
    </div>
  );
}
