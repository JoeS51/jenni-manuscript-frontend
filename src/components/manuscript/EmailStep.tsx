import React from "react";
import { Input } from "../ui/input";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({ email, setEmail }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
