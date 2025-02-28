// import React from 'react';
import { Header } from "../components/landing-page/header";
import { Hero } from "../components/landing-page/hero";
import { HowItWorks } from "../components/landing-page/how-it-works";
import { Features } from "../components/landing-page/features";
import { Pricing } from "../components/landing-page/pricing";
import { FAQ } from "../components/landing-page/faq";
import { Footer } from "../components/landing-page/footer";
import UserQuote from "../components/landing-page/user-quote";
const LandingPage = () => {
  // const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen max-w-5xl flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-1">
          <Hero />
          <HowItWorks />
          <Pricing />
          <UserQuote
            quote="Using pre-submission manuscript reviews are a great way to reduce the frustrating process of desk rejection."
            personName="Anna Guo"
            personRole="Professor of Computer Science"
            highlightedPhrases={[
              "pre-submission manuscript reviews",
              "frustrating process of desk rejection.",
            ]}
          />
          <Features />
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;