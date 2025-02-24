import { Button } from "../../components/ui/button";
import { NavLink } from "react-router";

export function Footer() {
  return (
    <footer className="py-12 border-t border-zinc-200">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h4 className="font-semibold">Manuscript Check</h4>
            <p className="text-sm text-zinc-600">
              Making document feedback smarter and faster.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <NavLink to="/feedback">
              <Button variant="outline">Made by JenniAI</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
