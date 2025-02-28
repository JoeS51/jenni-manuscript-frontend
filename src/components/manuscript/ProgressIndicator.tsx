import React from "react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[]; // Optional array of step labels
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels = ["Upload", "Journal", "Email"], // Default labels based on the steps in OutputPage
}) => {
  return (
    <div className="w-full py-8 px-4">
      {/* Progress indicator with connecting bars */}
      <div className="w-full flex justify-between relative">
        {/* Horizontal connecting bars */}
        <div className="absolute top-4 left-0 right-0 flex justify-between items-center z-0">
          {Array.from({ length: totalSteps - 1 }, (_, i) => i + 1).map(
            (step) => (
              <div
                key={`bar-${step}`}
                className={`h-1 flex-grow mx-4 rounded-full ${
                  currentStep > step ? "bg-blue-600" : "bg-zinc-300"
                }`}
              />
            )
          )}
        </div>

        {/* Step circles */}
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center w-1/3 z-10">
            {/* Circle with number */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mb-3 
                ${
                  currentStep === step
                    ? "bg-blue-600 border-blue-600 text-white"
                    : currentStep > step
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-zinc-300 text-zinc-400"
                }`}
            >
              <span className="text-sm font-medium">{step}</span>
            </div>

            {/* Label */}
            <span
              className={`text-sm font-medium ${
                currentStep >= step ? "text-blue-600" : "text-zinc-500"
              }`}
            >
              {stepLabels && stepLabels[step - 1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};