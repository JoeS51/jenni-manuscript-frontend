import React from "react";

interface ErrorNotificationProps {
  errorMessage: string;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
}) => {
  return (
    <div className="w-full max-w-3xl mt-6 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
      <p className="text-zinc-600">{errorMessage}</p>
      <p className="text-sm text-zinc-500 mt-2">
        Please try again or contact support if the issue persists.
      </p>
    </div>
  );
};
