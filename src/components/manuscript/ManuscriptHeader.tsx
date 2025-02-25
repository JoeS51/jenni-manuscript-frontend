import React from "react";

interface ManuscriptHeaderProps {
  title?: string;
  subtitle?: string;
}

export const ManuscriptHeader: React.FC<ManuscriptHeaderProps> = ({
  title = "Manuscript Check",
  subtitle = "Upload your manuscript and we'll process it for you",
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tighter">{title}</h1>
      <p className="text-zinc-500 mt-2">{subtitle}</p>
    </div>
  );
};
