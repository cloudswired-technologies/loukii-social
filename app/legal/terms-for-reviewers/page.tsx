"use client";

import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { LegalSidebar } from "@/components/legal-sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsForReviewersPage() {
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
                FOR REVIEWERS
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Use for Reviewers
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
                  These Terms of Use ("Terms") apply to all individuals who use Loukii to discover, read, or write reviews about advisors, agents, or service providers (collectively referred to as "Advisors").
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By creating an account, submitting a review, or otherwise using our platform, you agree to these Terms and to our{" "}
                  <Link href="/privacy" className="text-[#16A34A] hover:underline font-semibold">
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              {/* About Loukii */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">2. About Loukii</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii is a community platform operated by <strong>Cloudswired Technologies</strong>, registered in Malaysia and based at 0213A, Sunway Citrine Hub, Sunway Iskandar, 79250 Johor Bahru, Johor.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii allows users to share and read genuine experiences with Advisors in various industries such as insurance, property, automotive, and services.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-6">
                  <p className="text-sm text-yellow-800 dark:text-yellow-400 mb-2">
                    <strong>Important:</strong>
                  </p>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-1">
                    <li>• Loukii provides a space for opinions — not a verification or endorsement service.</li>
                    <li>• We do not guarantee the accuracy, completeness, or truthfulness of any content posted by users.</li>
                  </ul>
                </div>
              </section>

              {/* Your Account */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">3. Your Account</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  To write a review or engage on the platform, you must create a Loukii account using a valid email address.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Provide accurate information and not impersonate any person.</li>
                  <li>Maintain the security of your account.</li>
                  <li>Take responsibility for all activity that occurs under your account.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may suspend or terminate accounts that violate these Terms or our Community Guidelines.
                </p>
              </section>

              {/* Writing Reviews */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">4. Writing Reviews</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii is built on <strong>honesty, fairness, and respect</strong>.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  When you write a review, you agree that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Your review reflects your own genuine experience.</li>
                  <li>You will not post false, misleading, or defamatory statements.</li>
                  <li>You will not share private or sensitive personal information about others.</li>
                  <li>You will not offer or accept incentives in exchange for reviews.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Loukii may remove, edit, or flag reviews that violate these standards or local laws.
                </p>
              </section>

              {/* Use of Content */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">5. Use of Content</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  By submitting a review, comment, or image on Loukii, you grant us a worldwide, royalty-free, and non-exclusive license to use, display, distribute, and reproduce your content on Loukii and its affiliated channels (e.g., marketing materials or public listings).
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You retain ownership of your content. However, you agree that once published, reviews may remain visible even if you delete your account — unless you request full removal in writing.
                </p>
              </section>

              {/* Privacy and Data Use */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">6. Privacy and Data Use</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Your privacy matters to us.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii collects and processes limited personal data to operate the platform effectively — including your account details, public username, and any content you post.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  For full details on how we collect, use, and protect your data, please read our{" "}
                  <Link href="/privacy" className="text-[#16A34A] hover:underline font-semibold">
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">7. Intellectual Property</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  All Loukii trademarks, designs, software, and other intellectual property remain the property of Cloudswired Technologies.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You may not reproduce, modify, or distribute Loukii's content or branding without our written permission.
                </p>
              </section>

              {/* Prohibited Conduct */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">8. Prohibited Conduct</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You must not use Loukii to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Post illegal, defamatory, or discriminatory content.</li>
                  <li>Attempt to manipulate reviews or ratings.</li>
                  <li>Interfere with platform functionality or security.</li>
                  <li>Harvest data or spam users.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Violations may lead to suspension, permanent account removal, or legal action.
                </p>
              </section>

              {/* Disclaimer */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">9. Disclaimer and Limitation of Liability</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii provides its platform <strong>"as is"</strong> without any warranties.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We are not responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>The accuracy or reliability of reviews.</li>
                  <li>Any loss, damage, or dispute arising from interactions between users and advisors.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Loukii does not mediate or verify transactions between users and advisors.
                </p>
              </section>

              {/* Modifications */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">10. Modifications</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may update these Terms from time to time.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  When we do, the revised version will be posted on this page with an updated effective date.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Continued use of Loukii after updates constitutes acceptance of the revised Terms.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">11. Contact</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  If you have questions or concerns about these Terms or your data, contact us at:
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
