"use client";

import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { LegalSidebar } from "@/components/legal-sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsForEveryonePage() {
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
            {/* Back Link */}
            <Link
              href="/legal"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#16A34A] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Legal
            </Link>

            {/* Page Header */}
            <div className="mb-8">
              <p className="text-[#16A34A] font-semibold text-sm uppercase tracking-wider mb-2">
                FOR EVERYONE
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Use for Everyone
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                The Social Review Network
              </p>
              <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span><strong>Effective Date:</strong> 1 November 2025</span>
                <span>•</span>
                <span><strong>Version 1.0</strong></span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Overview */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">1. Overview</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  These Terms apply to all users of the Loukii platform — including visitors, reviewers, and advisors.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  They establish the general rules for using Loukii responsibly, fairly, and in accordance with the law.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By accessing or using Loukii in any capacity, you agree to comply with these Terms, our{" "}
                  <Link href="/privacy" className="text-[#16A34A] hover:underline font-semibold">
                    Privacy Policy
                  </Link>, and any additional policies referenced herein.
                </p>
              </section>

              {/* Purpose */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">2. Purpose of Loukii</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii is a community-driven platform operated by <strong>Cloudswired Technologies</strong> that allows people to share real experiences and discover advisors across multiple industries.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Our goal is to build a transparent environment where shared experiences help others make better choices.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Loukii facilitates open expression but does not moderate truth or verify every user or advisor. All content represents the views of individual users, not Loukii itself.
                </p>
              </section>

              {/* Acceptable Use */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">3. Acceptable Use</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You agree to use Loukii only for lawful and ethical purposes.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You must not:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Post or share false, defamatory, or misleading content.</li>
                  <li>Impersonate others or misrepresent your identity.</li>
                  <li>Harass, threaten, or discriminate against others.</li>
                  <li>Post spam, advertisements, or unrelated promotional content.</li>
                  <li>Interfere with platform functionality or security (e.g., hacking, scraping, or reverse-engineering).</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Violations may lead to suspension, permanent removal, or reporting to relevant authorities.
                </p>
              </section>

              {/* User Content Responsibility */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">4. User Content Responsibility</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Each user is solely responsible for the content they post.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii does not edit or pre-approve content but may remove material that breaches these Terms, applicable laws, or our community standards.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Loukii does not take sides in disputes between reviewers and advisors — we only provide the platform that hosts those interactions.
                </p>
              </section>

              {/* Community and Integrity */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">5. Community and Integrity</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii's strength lies in <strong>honesty and respect</strong>.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  All users — reviewers and advisors alike — must contribute constructively to preserve trust across the community.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  This means:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Being truthful about personal experiences.</li>
                  <li>Engaging respectfully, even during disagreements.</li>
                  <li>Avoiding manipulation of ratings or public perception.</li>
                  <li>Respecting privacy and sensitive personal data.</li>
                </ul>
              </section>

              {/* Data and Privacy */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">6. Data and Privacy</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We collect limited personal data to provide our services, including basic account and activity data.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Your privacy and data handling rights are explained in our{" "}
                  <Link href="/privacy" className="text-[#16A34A] hover:underline font-semibold">
                    Privacy Policy
                  </Link>.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By using Loukii, you consent to the collection and use of your data as described therein.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">7. Intellectual Property</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  All Loukii-related intellectual property — including name, logo, design, code, and database — belongs to Cloudswired Technologies.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You may not copy, distribute, or exploit Loukii content or materials without written permission.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your reviews and responses remain your property, but you grant Loukii a global, royalty-free license to display and distribute them as part of our service.
                </p>
              </section>

              {/* Platform Availability */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">8. Platform Availability and Liability</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii is provided <strong>"as is,"</strong> without guarantees of continuous operation or accuracy.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We are not responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Errors, downtime, or data loss.</li>
                  <li>Disputes or losses arising from user interactions.</li>
                  <li>Any indirect or consequential damages.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue parts of the platform when necessary for maintenance or improvement.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may update these Terms periodically to reflect changes in laws, technologies, or our platform operations.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The latest version will always be available on this page.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By continuing to use Loukii after updates, you accept the revised Terms.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Contact</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  For any questions, concerns, or legal inquiries, contact:
                </p>
                <div className="text-gray-600 dark:text-gray-400 space-y-2">
                  <p>📧 <a href="mailto:support@loukii.com" className="text-[#16A34A] hover:underline font-semibold">support@loukii.com</a></p>
                  <p>📍 <strong>Cloudswired Technologies</strong><br />
                  0213A Sunway Citrine Hub, Sunway Iskandar,<br />
                  79250 Johor Bahru, Johor, Malaysia</p>
                </div>
              </section>
            </div>
              </div>

              {/* Right Sidebar - Legal Navigation */}
              <div className="hidden lg:block">
                <LegalSidebar />
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
