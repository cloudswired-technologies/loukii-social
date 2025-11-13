"use client";

import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
  const legalCategories = [
    {
      id: "reviewers",
      title: "For Reviewers",
      description: "Learn how reviews work on Loukii — including our Guidelines, Terms of Use, and Privacy Policy.",
      buttonText: "Read them here",
      link: "/legal/terms-for-reviewers",
      bgColor: "from-blue-500 to-blue-600",
      image: "👤"
    },
    {
      id: "advisors",
      title: "For Advisors",
      description: "Everything advisors need to know — from Terms of Use to our Data Policy and Community Guidelines.",
      buttonText: "Read them here",
      link: "/legal/terms-for-advisors",
      bgColor: "from-purple-500 to-purple-600",
      image: "💼"
    },
    {
      id: "everyone",
      title: "For Everyone",
      description: "Our Code of Ethics, Anti-Bribery Policy, and general Terms apply to everyone using Loukii.",
      buttonText: "Read them here",
      link: "/legal/terms-for-everyone",
      bgColor: "from-[#16A34A] to-[#15803d]",
      image: "🌍"
    }
  ];

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
        <main className="w-full lg:w-[80%] flex-shrink-0 min-w-0 overflow-y-auto pb-20 md:pb-0 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#16A34A]/10 rounded-full mb-6">
                <FileText className="w-8 h-8 text-[#16A34A]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                All of our important guidelines<br />and policies in one place
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We ask all users and advisors to respect and follow these guidelines and policies to help make Loukii a transparent, collaborative, and trustworthy community for everyone.
              </p>
            </div>

            {/* Legal Categories Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {legalCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card Image/Icon Header */}
                  <div className={`h-48 bg-gradient-to-br ${category.bgColor} flex items-center justify-center`}>
                    <span className="text-8xl">{category.image}</span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {category.description}
                    </p>
                    <Link
                      href={category.link}
                      className="inline-flex items-center gap-2 text-[#16A34A] hover:text-[#15803d] font-semibold transition-colors group"
                    >
                      {category.buttonText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Section */}
            <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Need Help?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                If you have questions about our legal policies or need clarification on any of our guidelines, our support team is here to help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold rounded-lg transition-all hover:shadow-lg active:scale-95"
              >
                Contact Support
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
