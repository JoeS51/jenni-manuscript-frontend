import React, { useRef } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/20/solid";

interface UploadStepProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ file, setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    setFile(uploadedFile);
  };

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
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-600 transition-colors"
        onClick={handleButtonClick}
      >
        <DocumentArrowUpIcon className="w-8 h-8 mx-auto text-zinc-400" />
        <div className="mt-4">
          <p className="text-sm font-medium">
            {file ? (
              <span className="text-black">{file.name}</span>
            ) : (
              <>
                <span className="text-black">Click to upload</span> your
                manuscript
              </>
            )}
          </p>
          <p className="text-xs text-zinc-500 mt-1">PDF, ZIP, TEX, TEC</p>
        </div>
      </div>
    </div>
  );
};
