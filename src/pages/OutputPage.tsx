import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FileUp, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { sendFile } from "../api/ChatCompletion";
import { ThreeDots } from "react-loader-spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function OutputPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [email, setEmail] = React.useState("");
  const [processErrorMessage, setProcessErrorMessage] = React.useState<string | null>(null);
  const [processingInitiatedSuccesfully, setProcessingInitiatedSuccesfully] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedConference, setSelectedConference] = React.useState<string>("");
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [customRequirements, setCustomRequirements] = React.useState<string>("");
  const [websiteUrl, setWebsiteUrl] = React.useState<string>("");
  const conferences = ["IEEE", "Lancert", "Nature", "Other"];

  //for process manuscript button
  const processBtnClick = async () => {
    const formData = new FormData();
    if (file == null) return;
    setLoading(true);
    formData.append("file", file);
    formData.append("email", email);
    formData.append("journalType", selectedConference);
    if (selectedConference === "Other") {
      formData.append("requirements", customRequirements);
      if (websiteUrl) {
        formData.append("websiteUrl", websiteUrl);
      }
    }
    console.log(formData);

    try {
      const resp = await sendFile(formData);
      console.log(resp);
      console.log(`resp status is ${resp.status}`);
      if (resp.status == 200) {
        setProcessingInitiatedSuccesfully(true);
      } else {
        setProcessErrorMessage(resp.data.message);
      }
    } catch (err: any) {
      // Handle errors, including network issues
      console.error("Error processing file upload:", err);
      console.log(err.response.data);
      // Display appropriate error message
      if (err.response) {
        // Server responded with an error status code
        setProcessErrorMessage(
          `Error: ${err.response.status} - ${
            err.response.data?.message || "Unknown error"
          }`
        );
      } else if (err.request) {
        // No response was received
        setProcessErrorMessage(
          "No response received from the server. Please try again."
        );
      } else {
        // Something else went wrong
        setProcessErrorMessage(`An error occurred: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  //for fake file upload button
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //for
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("in handleFileUpload");
    console.log("e.target.files", e.target.files?.[0]);
    const uploadedFile = e.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  const UploadStep = () => {
    return (
      <div className="space-y-4">
        <input
          type="file"
          className="hidden"
          accept=".pdf, .zip, .tex, .tec"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-black transition-colors"
          onClick={handleButtonClick}
        >
          <FileUp className="mx-auto h-12 w-12 text-zinc-400" />
          <div className="mt-4">
            <p className="text-sm font-medium">
              {file ? (
                <span className="text-black">{file.name}</span>
              ) : (
                <>
                  <span className="text-black">Click to upload</span> your manuscript
                </>
              )}
            </p>
            <p className="text-xs text-zinc-500 mt-1">PDF, ZIP, TEX, TEC</p>
          </div>
        </div>
      </div>
    );
  };

  const JournalStep = () => {
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

  const EmailStep = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Jenni Manuscript</CardTitle>
          <CardDescription>
            Upload your manuscript and we'll process it for you
          </CardDescription>
          <div className="flex justify-center items-center space-x-2 mt-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentStep >= step ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
                {step < 3 && (
                  <div className={`w-12 h-0.5 ${
                    currentStep > step ? "bg-blue-600" : "bg-gray-200"
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && <UploadStep />}
          {currentStep === 2 && <JournalStep />}
          {currentStep === 3 && <EmailStep />}
        </CardContent>

        <CardFooter className="flex justify-between">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Previous
            </Button>
          )}
          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={
                (currentStep === 1 && !file) ||
                (currentStep === 2 && (!selectedConference || (selectedConference === "Other" && !customRequirements)))
              }
            >
              Next
            </Button>
          ) : (
            <Button
              className="w-full bg-black hover:bg-zinc-800"
              disabled={!file || !email || !selectedConference || (selectedConference === "Other" && !customRequirements) || loading}
              onClick={processBtnClick}
            >
              {loading ? (
                <ThreeDots height="40" width="40" color="white" radius="10" />
              ) : (
                "Process Manuscript"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Render the Processing Card at the bottom */}
      {processingInitiatedSuccesfully && (
        <Card className="w-full max-w-3xl mt-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Processing...</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-zinc-600">
              We are now evaluating your manuscript. Your feedback will be sent
              to {email} in approximately 1 hour.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Render Error Message Card */}
      {processErrorMessage && (
        <Card className="w-full max-w-3xl mt-4 border-red-200">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-red-600">
              Error
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-zinc-600">{processErrorMessage}</p>
            <p className="text-sm text-zinc-500 mt-2">
              Please try again or contact support if the issue persists.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}