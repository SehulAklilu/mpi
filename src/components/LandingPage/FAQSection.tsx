import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How Do I Get Started with Tennis Training at MPI?",
    answer:
      "To get started, simply visit our website, select a training program, and register online. Our team will guide you through the next steps!",
  },
  {
    question: "Are Your Coaches Qualified and Insured?",
    answer:
      "Yes! Our coaches are certified professionals with extensive experience in tennis training and safety measures.",
  },
  {
    question: "What Facilities and Tools Are Available for Training?",
    answer:
      "We provide state-of-the-art tennis courts, advanced training tools, and personalized coaching programs to enhance your skills.",
  },
  {
    question: "How Long Will My Training Course Last?",
    answer:
      "Course duration varies based on the program you choose. We offer short-term, intensive, and long-term training plans.",
  },
  {
    question: "Can You Help Me Choose the Right Training Materials?",
    answer:
      "Absolutely! Our experts will assist you in selecting the best rackets, shoes, and accessories to match your level.",
  },
  {
    question: "What Should I Do Before My First Training Session?",
    answer:
      "Come prepared with comfortable sportswear, a water bottle, and a positive attitude! Our team will handle the rest.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto my-4 sm:my-10 lg:my-20 p-2 sm:p-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Frequently <span className="text-orange-500">Asked Questions</span>
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-primary rounded-lg overflow-hidden  hover:scale-y-105 hover:shadow-primary shadow transition-all duration-300  ${
              openIndex === index ? "bg-gray-100" : "bg-white"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center px-4 py-3 text-sm sm:text-base md:text-lg font-semibold"
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp size={20} className="text-primary" />
              ) : (
                <ChevronDown size={20} className="text-primary" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
