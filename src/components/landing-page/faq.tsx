import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export function FAQ() {
  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-blue-600 font-semibold mb-4">FAQ</h2>
        <h3 className="text-4xl font-bold mb-2 tracking-tight">
          Frequently Asked Questions
        </h3>
        <p className="text-zinc-600 text-xl max-w-md mx-auto">
          Everything you need to know about our manuscript review service
        </p>
      </div>

      <div className="max-w-3xl mx-auto border border-zinc-200 rounded-lg overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How long does the analysis take?
            </AccordionTrigger>
            <AccordionContent>
              Our AI-powered analysis typically takes just a few minutes to
              complete. You'll receive comprehensive feedback on your
              manuscript, including suggestions for improvements and potential
              issues to address.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              What file formats do you support?
            </AccordionTrigger>
            <AccordionContent>
              We currently support .docx, .pdf, and .bibtex files. This covers
              most common academic manuscript formats. All files are processed
              securely and confidentially.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              How accurate is the AI analysis?
            </AccordionTrigger>
            <AccordionContent>
              Our AI model has been trained on thousands of academic papers and
              journal requirements. While it provides highly accurate insights,
              we recommend using it as a complementary tool alongside
              traditional peer review and editing processes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              Is my manuscript data kept confidential?
            </AccordionTrigger>
            <AccordionContent>
              Yes, absolutely. We take data privacy very seriously. Your
              manuscripts are processed securely, never stored permanently, and
              not used for any other purpose. Our service adheres to strict
              academic confidentiality standards.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              Can I specify which journal I'm targeting?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can select your target journal during the upload process.
              Our analysis will then take into account the specific requirements
              and preferences of that journal, providing more targeted feedback.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
