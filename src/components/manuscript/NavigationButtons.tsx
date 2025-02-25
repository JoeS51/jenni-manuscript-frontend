import React from "react";
import { Button } from "../ui/button";
import { ThreeDots } from "react-loader-spinner";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  isNextDisabled: boolean;
  isSubmitDisabled: boolean;
  loading: boolean;
  onSubmit: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
  isNextDisabled,
  isSubmitDisabled,
  loading,
  onSubmit,
}) => {
  return (
    <div className="flex justify-between mt-8">
      <div>
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </Button>
        )}
      </div>
      <div>
        {currentStep < totalSteps ? (
          <Button
            variant="primary"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={isNextDisabled}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={isSubmitDisabled || loading}
            onClick={onSubmit}
          >
            {loading ? (
              <ThreeDots height="40" width="40" color="white" radius="10" />
            ) : (
              "Process Manuscript"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
