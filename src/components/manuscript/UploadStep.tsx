import React, { useRef } from "react";
import { FileUp, X as XIcon } from "lucide-react";

interface UploadStepProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onError?: (error: string) => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ 
  file, 
  setFile,
  onError 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    // Check file size (10MB limit)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      onError?.("File size must be less than 10MB");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    try {
      // You could add additional file validation here
      setFile(uploadedFile);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Error uploading file");
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Function to truncate long filenames
  const truncateFileName = (
    fileName: string,
    maxLength: number = 30
  ): string => {
    if (fileName.length <= maxLength) return fileName;

    const extension = fileName.split(".").pop() || "";
    const nameWithoutExtension = fileName.substring(
      0,
      fileName.lastIndexOf(".")
    );

    // Calculate how much of the name we can keep
    const availableChars = maxLength - extension.length - 3; // 3 for "..." and "."

    if (availableChars <= 0) return `...${extension}`;

    const truncatedName = nameWithoutExtension.substring(0, availableChars);
    return `${truncatedName}...${extension ? `.${extension}` : ""}`;
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        className="hidden"
        accept=".pdf,.zip,.tex,.tec"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center relative ${
          file ? "cursor-default" : "cursor-pointer hover:border-blue-600"
        } transition-colors`}
        onClick={file ? undefined : handleButtonClick}
      >
        <FileUp className="w-8 h-8 mx-auto text-zinc-400" />
        <div className="mt-4">
          <p className="text-sm font-medium">
            {file ? (
              <span className="text-black" title={file.name}>
                {truncateFileName(file.name)}
              </span>
            ) : (
              <>
                <span className="text-black">Click to upload</span> your
                manuscript
              </>
            )}
          </p>
          <p className="text-xs text-zinc-500 mt-1">PDF, ZIP, TEX, TEC up to 10MB</p>
        </div>

        {file && (
          <button
            className="absolute top-2 right-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full p-1.5 transition-colors"
            onClick={handleRemoveFile}
            title="Remove file"
            aria-label="Remove file"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};