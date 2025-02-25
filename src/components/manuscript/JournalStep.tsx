import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface JournalStepProps {
  selectedConference: string;
  setSelectedConference: (conference: string) => void;
  customRequirements: string;
  setCustomRequirements: (requirements: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (url: string) => void;
}

export const JournalStep: React.FC<JournalStepProps> = ({
  selectedConference,
  setSelectedConference,
  customRequirements,
  setCustomRequirements,
  websiteUrl,
  setWebsiteUrl,
}) => {
  const conferences = ["IEEE", "Lancet", "Nature", "Other"];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedConference || "Select Conference"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {conferences.map((conference) => (
              <DropdownMenuItem
                key={conference}
                onClick={() => {
                  setSelectedConference(conference);
                  if (conference !== "Other") {
                    setCustomRequirements("");
                    setWebsiteUrl("");
                  }
                }}
              >
                {conference}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedConference === "Other" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="website" className="text-sm text-zinc-600">
              Website URL (optional)
            </label>
            <Input
              id="website"
              type="url"
              placeholder="e.g., https://ieeeaccess.ieee.org/guide-for-authors/submission-guidelines/"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="requirements" className="text-sm text-zinc-600">
              Requirements
            </label>
            <textarea
              id="requirements"
              className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Please enter the specific requirements for your paper..."
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
