import { Button } from "../../components/ui/button";
import {
  StarIcon,
  ShieldCheckIcon,
  QueueListIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";

export function Pricing() {
  return (
    <div id="pricing" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-blue-600 font-semibold mb-4">Pricing</h2>
        <h3 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h3>
        <p className="text-zinc-600 text-xl max-w-md mx-auto">
          One plan for all your manuscript needs
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col-reverse md:flex-row gap-8 px-4">
        {/* Benefits Stack */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-6">
          <div className="flex items-start space-x-4">
            <StarIcon className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="text-left max-w-sm">
              <h4 className="font-semibold mb-1">Advanced Analysis</h4>
              <p className="text-zinc-600 text-sm">
                Get comprehensive feedback on your manuscript with our advanced
                AI analysis tools.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <ShieldCheckIcon className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="text-left max-w-sm">
              <h4 className="font-semibold mb-1">Journal-Specific</h4>
              <p className="text-zinc-600 text-sm">
                Tailored feedback based on your target journal's specific
                requirements and standards.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <QueueListIcon className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="text-left max-w-sm">
              <h4 className="font-semibold mb-1">Unlimited Access</h4>
              <p className="text-zinc-600 text-sm">
                Review as many manuscripts as you need with no monthly limits or
                restrictions.
              </p>
            </div>
          </div>
        </div>

        {/* Price Card */}
        <div className="md:w-[400px] rounded-xl border bg-white shadow-sm">
          <div className="p-8">
            <div className="flex items-baseline mb-4">
              <span className="text-5xl font-bold">$9</span>
              <span className="text-zinc-600 ml-2">/manuscript</span>
            </div>
            <p className="text-zinc-600 text-left mb-6">
              Pay per manuscript, no subscription required
            </p>
            <ul className="space-y-3 text-sm text-zinc-600 mb-8">
              <li className="flex items-center">
                <CheckIcon className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                Complete manuscript analysis
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                Journal-specific recommendations
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                Actionable improvement suggestions
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                Email support
              </li>
            </ul>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
