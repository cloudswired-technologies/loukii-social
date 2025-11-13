"use client";

import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { LegalSidebar } from "@/components/legal-sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsForAdvisorsPage() {
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
                FOR ADVISORS
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Use for Advisors
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
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Welcome to <strong>Loukii — The Social Review Network</strong>.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  These Terms of Use ("Terms") apply to all individuals and registered Advisors who use Loukii to manage profiles, respond to reviews, or otherwise engage with the platform in a professional capacity.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By creating an Advisor account, claiming or verifying a profile, or replying to reviews, you agree to these Terms and to our{" "}
                  <Link href="/privacy" className="text-[#16A34A] hover:underline font-semibold">
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              {/* About Loukii */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">2. About Loukii</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii is operated by <strong>Cloudswired Technologies</strong>, registered in Malaysia and located at 0213A, Sunway Citrine Hub, Sunway Iskandar, 79250 Johor Bahru, Johor.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii provides a public platform where Advisors can be discovered, reviewed, and engaged by users based on real experiences.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Loukii's role is limited to hosting and displaying content — we do not verify, endorse, or guarantee any user reviews or Advisor claims.
                </p>
              </section>

              {/* Advisor Accounts */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">3. Advisor Accounts and Profiles</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  To use Loukii as an Advisor, you must create or claim a verified profile.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Provide accurate and truthful information about yourself and your services.</li>
                  <li>Maintain and update your profile details as necessary.</li>
                  <li>Ensure that all information you post or respond to complies with these Terms and applicable laws.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Loukii reserves the right to suspend or remove profiles that contain misleading, false, or inappropriate information.
                </p>
              </section>

              {/* Managing Reviews */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">4. Managing Reviews</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Advisors can respond publicly to reviews written about them.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  When doing so, you agree:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>To reply respectfully and factually.</li>
                  <li>Not to disclose private or identifying customer data.</li>
                  <li>Not to pressure, threaten, or incentivize reviewers.</li>
                  <li>Not to create, manipulate, or encourage fake reviews.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Loukii may moderate or remove responses that breach these rules or violate our Community Guidelines.
                </p>
              </section>

              {/* Data and Privacy */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">5. Data and Privacy</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii processes Advisor information to operate and display public profiles, manage user interactions, and maintain platform integrity.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  This includes your name, professional details, public responses, and activity data.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We handle all data in accordance with our{" "}
                  <Link href="/privacy" className="text-[#16A34A] hover:underline font-semibold">
                    Privacy Policy
                  </Link>.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By using Loukii, you consent to our collection and use of your data as described in that policy.
                </p>
              </section>

              {/* Use of Content */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">6. Use of Content</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  By posting information, replies, or media on Loukii, you grant us a non-exclusive, royalty-free, global license to use, display, and distribute that content as part of the platform.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You retain ownership of your content but understand that reviews and responses may remain visible even if your account is deactivated, unless removal is requested under legal or privacy grounds.
                </p>
              </section>

              {/* Platform Integrity */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">7. Platform Integrity and Compliance</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii may remove or restrict content or accounts that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Violate these Terms or applicable laws.</li>
                  <li>Mislead users or manipulate the review system.</li>
                  <li>Involve harassment, threats, or unethical behavior.</li>
                  <li>Use Loukii to promote unrelated or illegal activities.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Advisors must comply with relevant consumer protection, advertising, and data privacy laws in their jurisdictions.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">8. Intellectual Property</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  All Loukii trademarks, visuals, software, and related intellectual property belong to Cloudswired Technologies.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You may not use Loukii's name, logo, or assets without written permission.
                </p>
              </section>

              {/* Fees and Subscriptions */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">9. Fees and Subscriptions</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii's core profile services are free, but certain premium features may require payment.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  All paid plans, if applicable, will be subject to separate pricing and billing terms, which will be clearly displayed before purchase.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Payments are non-refundable unless otherwise required by law.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii provides its platform <strong>"as is."</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We do not guarantee that the platform will always be available or error-free.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii is not responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Losses arising from inaccurate or misleading reviews.</li>
                  <li>Business loss, revenue impact, or reputation issues.</li>
                  <li>Any dispute between Advisors and users.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your use of Loukii is entirely at your own risk.
                </p>
              </section>

              {/* Termination */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">11. Termination</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii may suspend or terminate your Advisor account at any time if you breach these Terms or engage in conduct harmful to the platform or community.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You may close your account by written request to{" "}
                  <a href="mailto:support@loukii.com" className="text-[#16A34A] hover:underline font-semibold">
                    support@loukii.com
                  </a>.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">12. Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may update these Terms periodically to reflect operational, legal, or regulatory changes.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  All updates will be posted on this page with an updated effective date.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Continued use of Loukii after such updates constitutes your acceptance of the revised Terms.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">13. Contact</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  If you have any questions or concerns, please contact us at:
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
