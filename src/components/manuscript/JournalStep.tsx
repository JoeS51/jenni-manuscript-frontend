import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface JournalStepProps {
  selectedConference: string;
  setSelectedConference: (value: string) => void;
  customRequirements: string;
  setCustomRequirements: (value: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (value: string) => void;
  conferences: string[];
  customJournalName: string;
  setCustomJournalName: (value: string) => void;
  onSaveJournal: () => Promise<void>;
  isSavingJournal: boolean;
}

export const JournalStep: React.FC<JournalStepProps> = ({
  selectedConference,
  setSelectedConference,
  customRequirements,
  setCustomRequirements,
  websiteUrl,
  setWebsiteUrl,
  conferences,
  customJournalName,
  setCustomJournalName,
  onSaveJournal,
  isSavingJournal
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedConference || "Select Conference"}
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {conferences.map((conferenceName) => (
              <DropdownMenuItem
                key={conferenceName}
                onClick={() => {
                  setSelectedConference(conferenceName);
                  if (conferenceName !== "Other") {
                    setCustomRequirements("");
                    setWebsiteUrl("");
                  }
                }}
              >
                {conferenceName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedConference === "Other" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="journalName" className="text-sm text-zinc-600">
              Journal Name
            </label>
            <Input
              id="journalName"
              type="text"
              placeholder="Enter journal name..."
              value={customJournalName}
              onChange={(e) => setCustomJournalName(e.target.value)}
              className="font-mono text-sm"
            />
          </div>

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

          <Button 
            onClick={onSaveJournal}
            disabled={isSavingJournal || !customJournalName || !customRequirements}
            className="w-full"
          >
            {isSavingJournal ? "Saving..." : "Save Journal Template"}
          </Button>
        </div>
      )}
    </div>
  );
};