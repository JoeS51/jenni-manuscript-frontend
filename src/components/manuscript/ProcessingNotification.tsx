import React from "react";

interface ProcessingNotificationProps {
  email: string;
}

export const ProcessingNotification: React.FC<ProcessingNotificationProps> = ({
  email,
}) => {
  return (
    <div className="w-full max-w-3xl mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">Processing...</h2>
      <p className="text-zinc-600">
        We are now evaluating your manuscript. Your feedback will be sent to{" "}
        {email} in approximately 1 hour.
      </p>
    </div>
  );
};
