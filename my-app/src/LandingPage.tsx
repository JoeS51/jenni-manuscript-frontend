import React from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "./components/ui/navigation-menu";
import { Button } from "./components/ui/button";
import { FileUp } from "lucide-react";

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col width-full">
            <header className="border-b">
                <div className="container mx-auto px-4">
                    <div className="h-16 flex items-center justify-between">
                        <div className="text-xl font-bold">Jenni Manuscript</div>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink className="px-4 py-2 hover:text-blue-500">
                                        Features
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink className="px-4 py-2 hover:text-blue-500">
                                        Pricing
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button variant="default">Sign In</Button>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <div className="container mx-auto px-4">
                    <div className="py-20 text-center">
                        <h1 className="text-5xl font-bold mb-6">
                            Get Expert Feedback on Your PDFs
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Upload your PDF documents and receive instant, intelligent feedback to improve your content quality and effectiveness.
                        </p>
                        <Button size="lg" className="gap-2">
                            <FileUp className="w-5 h-5" />
                            Try It Now
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 py-16">
                        <div className="text-center p-6 rounded-lg border">
                            <h3 className="text-xl font-semibold mb-4">Smart Analysis</h3>
                            <p className="text-gray-600">
                                Advanced AI algorithms analyze your PDFs for clarity, structure, and readability.
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-lg border">
                            <h3 className="text-xl font-semibold mb-4">Instant Results</h3>
                            <p className="text-gray-600">
                                Get detailed feedback and suggestions within seconds of uploading.
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-lg border">
                            <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
                            <p className="text-gray-600">
                                Your documents are encrypted and processed with enterprise-grade security.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t py-8">
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