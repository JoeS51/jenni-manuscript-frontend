import React, { useRef } from 'react'
import { Button } from "../components/ui/button";
import { FileUp } from "lucide-react";

const handleButtonClick = () => {
    console.log("Button clicked");
}

export default function OutputPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = React.useState<File | null>(null);
    const [pdfUrl, setPdfUrl] = React.useState("");

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        console.log(file)
        setFile(file);
        if (file) {
            const reader = new FileReader();

            // reader.onload = (event) => {
            //     const fileContent = event?.target?.result;
            //     console.log("File content:", fileContent);
            // };

            const url = URL.createObjectURL(file);
            setPdfUrl(url);
        }
    }

    return (
        <div>
            <input
                type="file"
                className='hidden'
                accept=".pdf, .doc, .docx"
                ref={fileInputRef}
                onChange={handleFileUpload}
            />
            <Button size="lg" className="gap-2" onClick={handleButtonClick}>
                <FileUp className="w-5 h-5" />
                Try It Now
            </Button>
            {pdfUrl && (
                <div className="w-full h-screen border border-gray-200 rounded-lg">
                    <iframe
                        src={pdfUrl}
                        className="w-full h-full rounded-lg"
                        title="PDF Viewer"
                    />
                </div>
            )}
        </div>
    )
}