import {
  CloudArrowUpIcon,
  ShieldCheckIcon,
  QueueListIcon,
} from "@heroicons/react/20/solid";
import { FeatureCard } from "./feature-card";

export function HowItWorks() {
  return (
    <div className="py-20">
      {/* Intro to How it Works */}
      <div className="text-center mb-16">
        <h2 className="text-blue-600 font-semibold mb-4">How it Works</h2>
        <h3 className="text-4xl font-bold mb-4">
          Manuscript Review in 3 Steps
        </h3>
        <p className="text-zinc-600 text-xl max-w-md mx-auto">
          Upload your manuscript, get feedback, and improve your chances of
          publication.
        </p>
      </div>

      {/* How It Works Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={<CloudArrowUpIcon className="w-6 h-6 text-blue-600" />}
          title="Upload"
          description="Upload your manuscript in either .docx, .pdf, or .bibtex format"
        />

        <FeatureCard
          icon={<ShieldCheckIcon className="w-6 h-6 text-blue-600" />}
          title="Analyze"
          description="Our academic AI analyzes your paper against specific journal publication standards"
        />

        <FeatureCard
          icon={<QueueListIcon className="w-6 h-6 text-blue-600" />}
          title="Results"
          description="Get organized feedback in a clear, structured format. Our analysis is presented in easy-to-follow sections for efficient review."
        />
      </div>
    </div>
  );
}
