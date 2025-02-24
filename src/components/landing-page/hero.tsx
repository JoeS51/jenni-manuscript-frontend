import { Button } from "../../components/ui/button";
import { NavLink } from "react-router";

export function Hero() {
  return (
    <div className="py-24 text-center relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e5e7eb,transparent)]"></div>
      </div>
      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-900 to-zinc-700 text-transparent bg-clip-text max-w-3xl mx-auto">
        Avoid Desk Rejection with AI-Powered Manuscript Review
      </h1>
      <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto">
        Increase your chances of publication and avoid desk rejection with
        expert AI review of your manuscript. Upload your paper and get
        actionable insights in minutes.
      </p>
      <div className="flex flex-col items-center space-y-4">
        <NavLink to="/feedback" end>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg h-12 px-8 transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            Analyze Your Manuscript
          </Button>
        </NavLink>
        <p className="text-sm text-zinc-500">
          Supports .docx, .pdf, and .bibtex files
        </p>
      </div>
    </div>
  );
}
