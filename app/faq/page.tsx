"use client";

import { useState } from "react";
import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Loukii?",
      answer: "Loukii is a platform that connects users with trusted advisors and agents across various industries. We provide a transparent review system where users can discover, evaluate, and connect with professionals based on authentic feedback from real clients."
    },
    {
      question: "How does Loukii work?",
      answer: "Users can browse through our directory of advisors, read reviews and ratings from other clients, view detailed profiles, and connect directly with advisors that match their needs. Advisors can create profiles, showcase their expertise, and build their reputation through client reviews."
    },
    {
      question: "Is Loukii free to use?",
      answer: "Yes! Browsing advisor profiles, reading reviews, and connecting with advisors is completely free for users. Advisors may have different subscription tiers for enhanced profile features and visibility."
    },
    {
      question: "How do I find the right advisor?",
      answer: "You can search and filter advisors by industry, location, ratings, and specialization. Read through their profiles, check their credentials, and review feedback from other clients to make an informed decision."
    },
    {
      question: "Can I trust the reviews on Loukii?",
      answer: "We implement verification measures to ensure reviews come from genuine clients. However, reviews represent individual opinions and experiences. We encourage users to read multiple reviews and conduct their own due diligence before engaging with any advisor."
    },
    {
      question: "How do I leave a review?",
      answer: "After engaging with an advisor, you can leave a review by visiting their profile and clicking the 'Write a Review' button. Share your honest experience to help other users make informed decisions."
    },
    {
      question: "Can advisors respond to reviews?",
      answer: "Yes, advisors can respond to reviews on their profiles. This allows them to address concerns, provide context, or thank clients for positive feedback, fostering transparent communication."
    },
    {
      question: "What if I have a dispute with an advisor?",
      answer: "Loukii is a platform that facilitates connections between users and independent advisors. We are not responsible for services provided by advisors. Any disputes should be resolved directly with the advisor. If you believe a review violates our guidelines, you can report it for review."
    },
    {
      question: "How do I become an advisor on Loukii?",
      answer: "Click on 'Join Loukii' and select the Advisor/Agent option during registration. Complete your profile with your credentials, experience, and services offered. Once your profile is set up, you can start building your reputation through client reviews."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we take data security seriously. We implement industry-standard security measures to protect your personal information. Please review our Privacy Policy for detailed information on how we collect, use, and protect your data."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
      <TopHeader />
      <div className="h-[65px]"></div>

      <div className="flex w-full h-[calc(100vh-65px)]">
        {/* Left Navigation */}
        <div className="hidden lg:block lg:w-[20%] flex-shrink-0 overflow-hidden">
          <LeftNavigation />
        </div>

        {/* Main Content */}
        <main className="w-full lg:w-[80%] flex-shrink-0 min-w-0 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Header */}
            <div className="mb-8">
              <p className="text-[#16A34A] font-semibold text-sm uppercase tracking-wider mb-2">
                HELP CENTER
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Find answers to common questions about Loukii
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4 mb-12">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-2xl border-2 transition-all ${
                    openIndex === index
                      ? "border-[#16A34A] shadow-lg"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-[#16A34A] to-[#15803d] rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
              <p className="text-white/90 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#16A34A] font-bold rounded-lg hover:bg-gray-100 transition-all hover:shadow-lg active:scale-95"
              >
                Contact Support
              </a>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
