import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { Button } from "../../components/ui/button";
import { NavLink } from "react-router";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Left section - Logo */}
          <div className="flex items-center space-x-2">
            <DocumentCheckIcon className="h-8 w-8 text-blue-600" />
            <span className="font-semibold text-l tracking-tighter">
              Manuscript Check
            </span>
          </div>

          {/* Middle section - Navigation links */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu className="flex-1 flex justify-center">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="px-4 py-2 text-zinc-600 hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => {
                      document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="px-4 py-2 text-zinc-600 hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => {
                      document
                        .getElementById("pricing")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right section - Auth buttons */}
          <div className="flex items-center space-x-2 min-w-[200px] justify-end">
            <NavLink to="/login">
              <Button variant="outline">Log in</Button>
            </NavLink>
            <NavLink to="/signup">
              <Button variant="primary">Sign up</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
