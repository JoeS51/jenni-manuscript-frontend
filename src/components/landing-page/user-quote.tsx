import React from "react";

interface UserQuoteProps {
  logo?: string;
  quote: string;
  personName: string;
  personRole: string;
}

const UserQuote: React.FC<UserQuoteProps> = ({
  logo,
  quote,
  personName,
  personRole,
}) => {
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto p-8">
      {/* Logo */}
      {logo && (
        <div className="mb-8">
          <img src={logo} alt="Company logo" className="h-12 w-auto" />
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-2xl md:text-3xl font-serif italic text-center mb-6">
        "{quote}"
      </blockquote>

      {/* Person details */}
      <div className="inline-flex items-baseline text-zinc-600">
        <img
          src="https://i.pravatar.cc/300"
          alt="Avatar"
          className="mx-1 size-5 self-center rounded-full"
        />
        <p className="text-sm">
          <span className="font-medium text-zinc-800">{personName}</span>,{" "}
          <span>{personRole}</span>
        </p>
      </div>
    </div>
  );
};

export default UserQuote;
