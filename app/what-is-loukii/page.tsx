import Link from "next/link";
import { ArrowRight, Users, Shield, TrendingUp, Search, Star, MessageCircle, CheckCircle, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is Loukii? | The Social Trust Network",
  description: "Loukii connects verified financial advisors and takaful consultants with clients across Malaysia through a trusted social platform.",
};

export default function WhatIsLoukii() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#16A34A]/5 via-white to-[#16A34A]/5 dark:from-[#16A34A]/10 dark:via-gray-950 dark:to-[#16A34A]/10">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#16A34A]" />
              <span className="text-sm font-medium text-[#16A34A]">The Social Trust Network</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              What is <span className="text-[#16A34A]">Loukii</span>?
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Loukii connects verified financial advisors and takaful consultants with clients across Malaysia through a trusted social platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#16A34A] hover:bg-[#15803d] text-white font-semibold rounded-lg transition-all hover:shadow-lg active:scale-95"
              >
                Explore Advisors
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/insights"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border-2 border-gray-200 dark:border-gray-800 transition-all"
              >
                Read Insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition - For Users */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              For <span className="text-[#16A34A]">Clients</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find trusted financial advisors and make informed decisions with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Verified Advisors */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Verified Advisors
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Browse profiles of verified financial advisors and takaful consultants across Malaysia
              </p>
            </div>

            {/* Authentic Reviews */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Authentic Reviews
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Read genuine client reviews and ratings to make informed decisions
              </p>
            </div>

            {/* Expert Insights */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Expert Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Access valuable articles and financial tips from industry experts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition - For Advisors */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              For <span className="text-[#16A34A]">Advisors</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Build your credibility and grow your business with Loukii
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Build Credibility */}
            <div className="p-6 bg-white dark:bg-gray-950 rounded-xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Build Credibility
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Showcase your expertise, certifications, and client success stories
              </p>
            </div>

            {/* Reach More Clients */}
            <div className="p-6 bg-white dark:bg-gray-950 rounded-xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Reach More Clients
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Connect with potential clients actively searching for financial advice
              </p>
            </div>

            {/* Share Knowledge */}
            <div className="p-6 bg-white dark:bg-gray-950 rounded-xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Share Knowledge
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Publish articles and insights to establish yourself as a thought leader
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It <span className="text-[#16A34A]">Works</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Simple steps to connect with the right advisor
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#16A34A]" />
              </div>
              <div className="w-8 h-8 bg-[#16A34A] text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Search & Filter
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find advisors by location, category, brand, or rating
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#16A34A]" />
              </div>
              <div className="w-8 h-8 bg-[#16A34A] text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Browse Profiles
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View advisor profiles, portfolios, and credentials
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#16A34A]" />
              </div>
              <div className="w-8 h-8 bg-[#16A34A] text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Read Reviews
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check authentic client reviews and ratings
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-[#16A34A]" />
              </div>
              <div className="w-8 h-8 bg-[#16A34A] text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                4
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Connect
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reach out to your chosen advisor with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#16A34A] to-[#15803d]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of Malaysians finding trusted financial advisors on Loukii
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-[#16A34A] font-bold rounded-lg transition-all hover:shadow-xl active:scale-95"
            >
              Find an Advisor
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border-2 border-white/30 transition-all"
            >
              Explore Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built with ❤️ by <a href="https://cloudswired.com" target="_blank" rel="noopener noreferrer" className="text-[#16A34A] hover:underline">Cloudswired Technologies</a>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Made in Malaysia 🇲🇾
          </p>
        </div>
      </footer>
    </div>
  );
}
