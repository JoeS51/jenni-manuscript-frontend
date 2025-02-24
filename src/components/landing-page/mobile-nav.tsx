import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { NavLink } from "react-router";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";
export function MobileNav() {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <Button
          variant="outline"
          className="md:hidden"
          size="icon"
          aria-label="Open mobile menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 h-full w-full max-w-xs border-l bg-background p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm">
          <div className="flex items-center justify-between">
            <DocumentCheckIcon className="h-8 w-8 text-blue-600" />
            <DialogPrimitive.Close asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </Button>
            </DialogPrimitive.Close>
          </div>
          <nav className="mt-8 flex flex-col space-y-6">
            <a
              href="#features"
              className="text-lg font-medium text-zinc-600 hover:text-zinc-800 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-lg font-medium text-zinc-600 hover:text-zinc-800 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Pricing
            </a>
            <div className="flex flex-col space-y-4 pt-4">
              <NavLink to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full justify-center"
                >
                  Log in
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                >
                  Sign up
                </Button>
              </NavLink>
            </div>
          </nav>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
