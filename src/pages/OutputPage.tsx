import { useEffect, useState } from "react";
import { getConferences, addConference } from '../api/conferenceApi';
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
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [processErrorMessage, setProcessErrorMessage] = useState<string | null>(null);
  const [processingInitiatedSuccesfully, setProcessingInitiatedSuccesfully] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedConference, setSelectedConference] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [customRequirements, setCustomRequirements] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [conferences, setConferences] = useState<string[]>([]);
  const [customJournalName, setCustomJournalName] = useState<string>("");
  const [isSavingJournal, setIsSavingJournal] = useState(false);
  const totalSteps = 3;

  useEffect(() => {
    const loadConferences = async () => {
      try {
        const fetchedConferences = await getConferences();
        const conferenceNames = fetchedConferences.map(conf => conf.name);
        setConferences([...conferenceNames, "Other"]);
      } catch (error) {
        console.error('Error loading conferences:', error);
      }
    };

    loadConferences();
  }, []);

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

  const saveNewJournal = async () => {
    if (!customJournalName || !customRequirements) return;
    
    setIsSavingJournal(true);
    try {
      await addConference({
        name: customJournalName,
        website_url: websiteUrl || undefined,
        requirements: customRequirements
      });
      
      const fetchedConferences = await getConferences();
      const conferenceNames = fetchedConferences.map(conf => conf.name);
      setConferences([...conferenceNames, "Other"]);
      
      setSelectedConference(customJournalName);
      setCustomJournalName("");
      
      alert('Successfully saved new journal template!');
    } catch (error) {
      console.error('Error saving new journal:', error);
      alert('Failed to save journal template. Please try again.');
    } finally {
      setIsSavingJournal(false);
    }
  };

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
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="space-y-6 mb-8">
          {currentStep === 1 && (
            <UploadStep 
              file={file} 
              setFile={setFile}
            />
          )}
          {currentStep === 2 && (
            <JournalStep
              selectedConference={selectedConference}
              setSelectedConference={setSelectedConference}
              customRequirements={customRequirements}
              setCustomRequirements={setCustomRequirements}
              websiteUrl={websiteUrl}
              setWebsiteUrl={setWebsiteUrl}
              conferences={conferences}
              customJournalName={customJournalName}
              setCustomJournalName={setCustomJournalName}
              onSaveJournal={saveNewJournal}
              isSavingJournal={isSavingJournal}
            />
          )}
          {currentStep === 3 && <EmailStep email={email} setEmail={setEmail} />}
        </div>

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

      {processingInitiatedSuccesfully && (
        <ProcessingNotification email={email} />
      )}

      {processErrorMessage && (
        <ErrorNotification errorMessage={processErrorMessage} />
      )}
    </div>
  );
}