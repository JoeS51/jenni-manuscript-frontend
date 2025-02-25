import React from "react";
import { sendFile } from "../api/ChatCompletion";
import { UploadStep } from "../components/manuscript/UploadStep";
import { JournalStep } from "../components/manuscript/JournalStep";
import { EmailStep } from "../components/manuscript/EmailStep";
import { ProgressIndicator } from "../components/manuscript/ProgressIndicator";
import { ProcessingNotification } from "../components/manuscript/ProcessingNotification";
import { ErrorNotification } from "../components/manuscript/ErrorNotification";
import { ManuscriptHeader } from "../components/manuscript/ManuscriptHeader";
import { NavigationButtons } from "../components/manuscript/NavigationButtons";

export default function OutputPage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [email, setEmail] = React.useState("");
  const [processErrorMessage, setProcessErrorMessage] = React.useState<
    string | null
  >(null);
  const [processingInitiatedSuccesfully, setProcessingInitiatedSuccesfully] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedConference, setSelectedConference] =
    React.useState<string>("");
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [customRequirements, setCustomRequirements] =
    React.useState<string>("");
  const [websiteUrl, setWebsiteUrl] = React.useState<string>("");
  const totalSteps = 3;

  // Process manuscript button handler
  const processBtnClick = async () => {
    if (file == null) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("journalType", selectedConference);

    if (selectedConference === "Other") {
      formData.append("requirements", customRequirements);
      if (websiteUrl) {
        formData.append("websiteUrl", websiteUrl);
      }
    }

    try {
      const resp = await sendFile(formData);
      if (resp.status === 200) {
        setProcessingInitiatedSuccesfully(true);
      } else {
        setProcessErrorMessage(resp.data.message);
      }
    } catch (err: any) {
      console.error("Error processing file upload:", err);

      if (err.response) {
        setProcessErrorMessage(
          `Error: ${err.response.status} - ${
            err.response.data?.message || "Unknown error"
          }`
        );
      } else if (err.request) {
        setProcessErrorMessage(
          "No response received from the server. Please try again."
        );
      } else {
        setProcessErrorMessage(`An error occurred: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Determine if the Next button should be disabled
  const isNextDisabled = () => {
    if (currentStep === 1) return !file;
    if (currentStep === 2) {
      return (
        !selectedConference ||
        (selectedConference === "Other" && !customRequirements)
      );
    }
    return false;
  };

  // Determine if the Submit button should be disabled
  const isSubmitDisabled = () => {
    return (
      !file ||
      !email ||
      !selectedConference ||
      (selectedConference === "Other" && !customRequirements)
    );
  };

  return (
    <div className="min-h-screen pt-6 flex flex-col items-center">
      <ManuscriptHeader />
      <div className="w-full max-w-3xl bg-white rounded-lg border border-zinc-200 p-6">
        {/* Header */}

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {/* Content */}
        <div className="space-y-6 mb-8">
          {currentStep === 1 && <UploadStep file={file} setFile={setFile} />}
          {currentStep === 2 && (
            <JournalStep
              selectedConference={selectedConference}
              setSelectedConference={setSelectedConference}
              customRequirements={customRequirements}
              setCustomRequirements={setCustomRequirements}
              websiteUrl={websiteUrl}
              setWebsiteUrl={setWebsiteUrl}
            />
          )}
          {currentStep === 3 && <EmailStep email={email} setEmail={setEmail} />}
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          setCurrentStep={setCurrentStep}
          isNextDisabled={isNextDisabled()}
          isSubmitDisabled={isSubmitDisabled()}
          loading={loading}
          onSubmit={processBtnClick}
        />
      </div>

      {/* Processing notification */}
      {processingInitiatedSuccesfully && (
        <ProcessingNotification email={email} />
      )}

      {/* Error message */}
      {processErrorMessage && (
        <ErrorNotification errorMessage={processErrorMessage} />
      )}
    </div>
  );
}
