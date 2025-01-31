import React from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../components/ui/navigation-menu";
import { Button } from "../components/ui/button";
import { FileUp } from "lucide-react";
import { sendChat } from '../api/ChatCompletion';
import { NavLink } from "react-router";

const LandingPage = () => {

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [file, setFile] = React.useState<File | null>(null);
    const [pdfUrl, setPdfUrl] = React.useState("");
    const [chatCompletion, setChatCompletion] = React.useState("");

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleMessage = async () => {
        try {
            const response = await sendChat("Hello, Jenni!");
            setChatCompletion(response.chatCompletion.choices[0].message.content);
            console.log(response);
        } catch (err) {
            console.error("Error sending chat:", err);
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
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
            <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="h-16 flex items-center justify-between">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                            Jenni Manuscript
                        </div>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink className="px-4 py-2 hover:text-blue-600 transition-colors">
                                        Features
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink className="px-4 py-2 hover:text-blue-600 transition-colors">
                                        Pricing
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="py-24 text-center relative">
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-70"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e5e7eb,transparent)]"></div>
                        </div>
                        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">
                            Transform Your Manuscript<br />with AI-Powered Feedback
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Get comprehensive feedback on your academic papers, research articles, and manuscripts.
                            Our AI analyzes structure, clarity, and academic style in minutes.
                        </p>
                        <div className="flex flex-col items-center space-y-4">
                            <NavLink to="/feedback" end>
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg h-12 px-8 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105">
                                    Analyze Your Manuscript
                                </Button>
                            </NavLink>
                            <p className="text-sm text-gray-500">Free analysis for manuscripts up to 5000 words</p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 py-20">
                        <div className="group hover:scale-105 transition-all duration-200 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100">
                            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Academic Analysis</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Advanced AI algorithms evaluate academic writing style, citations, and research methodology.
                            </p>
                        </div>

                        <div className="group hover:scale-105 transition-all duration-200 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100">
                            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Instant Insights</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Receive detailed feedback within minutes, including suggestions for improvement and structural analysis.
                            </p>
                        </div>

                        <div className="group hover:scale-105 transition-all duration-200 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100">
                            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Secure & Confidential</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Your research is protected with enterprise-grade encryption and strict privacy controls.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-50 py-12 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-semibold mb-4">PDF Insight</h4>
                            <p className="text-sm text-gray-600">
                                Making document feedback smarter and faster.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>Features</li>
                                <li>Pricing</li>
                                <li>Enterprise</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>About</li>
                                <li>Blog</li>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>Privacy</li>
                                <li>Terms</li>
                                <li>Security</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;