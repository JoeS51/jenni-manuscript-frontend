import React, { useRef } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FileUp, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { sendFile } from '../api/ChatCompletion';
import { ThreeDots } from 'react-loader-spinner'
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
    const [pdfUrl, setPdfUrl] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [processErrorMessage, setProcessErrorMessage] = React.useState<string | null>(null); // State to store error/success message on process manuscript
    const [processingInitiatedSuccesfully, setProcessingInitiatedSuccesfully] = React.useState<boolean>(false); // State to handle processing status
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedConference, setSelectedConference] = React.useState<string>("");
    const conferences = ["AAAI", "IJCAI", "ICLR", "ICML", "NeurIPS"];

    //for process manuscript button
    const processBtnClick = async () => {
        const formData = new FormData();
        if (file == null) return;
        setLoading(true);
        formData.append("file", file);
        formData.append("email", email);
        formData.append("conference", selectedConference);
        console.log(formData);

        try {
            const resp = await sendFile(formData);
            console.log(resp)
            console.log(`resp status is ${resp.status}`)
            if (resp.status == 200) {
                setProcessingInitiatedSuccesfully(true);
            } else {
                setProcessErrorMessage(resp.data.message)
            }
        } catch (err: any) {
            // Handle errors, including network issues
            console.error("Error processing file upload:", err);
            console.log(err.response.data)
            // Display appropriate error message
            if (err.response) {
                // Server responded with an error status code
                setProcessErrorMessage(`Error: ${err.response.status} - ${err.response.data?.message || "Unknown error"}`);
            } else if (err.request) {
                // No response was received
                setProcessErrorMessage("No response received from the server. Please try again.");
            } else {
                // Something else went wrong
                setProcessErrorMessage(`An error occurred: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    //for fake file upload button
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    //for 
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("in handleFileUpload")
        console.log("e.target.files", e.target.files?.[0]);
        const uploadedFile = e.target.files?.[0] || null;
        setFile(uploadedFile);
        if (uploadedFile) {
            const url = URL.createObjectURL(uploadedFile);
            setPdfUrl(url);
        }
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center">
            <Card className="w-full max-w-3xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Jenni Manuscript</CardTitle>
                    <CardDescription>
                        Upload your manuscript and we'll process it for you
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <input
                            type="file"
                            className="hidden"
                            accept=".pdf, .doc, .docx"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />
                        <div
                            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-black transition-colors"
                            onClick={handleButtonClick}
                        >
                            <FileUp className="mx-auto h-12 w-12 text-gray-400" />
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
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, DOC, or DOCX files supported
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* {pdfUrl && (
                        <div className="w-full h-[50vh] border border-gray-200 rounded-lg overflow-hidden bg-white">
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full"
                                title="PDF Viewer"
                            />
                        </div>
                    )} */}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between"
                                    >
                                        {selectedConference || "Select Conference"}
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    {conferences.map((conference) => (
                                        <DropdownMenuItem
                                            key={conference}
                                            onClick={() => setSelectedConference(conference)}
                                        >
                                            {conference}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        size="lg"
                        className="w-full bg-black hover:bg-gray-800"
                        disabled={!file || !email || !selectedConference || loading}
                        onClick={processBtnClick}
                    >
                        {loading ? <ThreeDots
                            height="40"
                            width="40"
                            color='white'
                            radius="10"
                        /> : "Process Manuscript"}
                    </Button>
                </CardFooter>
            </Card>

            {/* Render the Processing Card at the bottom */}
            {processingInitiatedSuccesfully && (
                <Card className="w-full max-w-3xl mt-4">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Processing...</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-lg text-gray-600">We are now evaluating your manuscript. Your feedback will be sent to {email} in approximately 1 hour.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}