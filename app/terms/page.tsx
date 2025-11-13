"use client";

import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export default function TermsOfServicePage() {
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
                LEGAL
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Please read these terms carefully before using Loukii
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Last updated: January 2025
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Acceptance */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  These Terms of Service ("Terms") govern your access to and use of Loukii, a platform operated by <strong>Cloudswired Technologies</strong> (Company Registration No. 202003293747 (003180326-U)), a company registered in Malaysia ("we," "us," or "our").
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  By accessing or using Loukii, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our platform.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-6">
                  <p className="text-sm text-yellow-800 dark:text-yellow-400">
                    <strong>Important:</strong> These Terms contain important provisions including disclaimers of warranties and limitations of liability that affect your legal rights.
                  </p>
                </div>
              </section>

              {/* Platform Purpose */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Platform Purpose and Nature</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii is a <strong>platform that connects users with advisors and agents</strong> across various industries. We provide:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>A directory of advisors and agents</li>
                  <li>A review and rating system for users to share their experiences</li>
                  <li>Tools for users to discover and contact advisors</li>
                  <li>Profile management features for advisors</li>
                </ul>
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 my-6">
                  <p className="text-sm text-red-800 dark:text-red-400 font-semibold mb-2">
                    IMPORTANT DISCLAIMER:
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-400">
                    Loukii is <strong>NOT</strong> a service provider. We are a platform that facilitates connections between users and independent advisors. We do not employ, endorse, or control the advisors listed on our platform. All services are provided directly by the advisors, not by Loukii.
                  </p>
                </div>
              </section>

              {/* Disclaimers */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Disclaimers and Limitations of Liability</h2>
                
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 rounded-lg p-6 my-6">
                  <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-4">CRITICAL DISCLAIMERS - PLEASE READ CAREFULLY</h3>
                  
                  <div className="space-y-4 text-sm text-red-800 dark:text-red-400">
                    <div>
                      <h4 className="font-bold mb-2">1. NO LIABILITY FOR ADVISOR SERVICES</h4>
                      <p className="leading-relaxed">
                        Loukii is <strong>NOT RESPONSIBLE OR LIABLE</strong> for any services provided by advisors listed on our platform. All services are provided directly by independent advisors. We do not guarantee the quality, accuracy, legality, or safety of any advisor's services.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">2. NO LIABILITY FOR FINANCIAL LOSS OR DAMAGES</h4>
                      <p className="leading-relaxed">
                        We are <strong>NOT LIABLE</strong> for any financial losses, damages, or harm resulting from:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Services provided by advisors</li>
                        <li>Advice or recommendations given by advisors</li>
                        <li>Fraud, scams, or misconduct by advisors</li>
                        <li>Errors, omissions, or negligence by advisors</li>
                        <li>Disputes between users and advisors</li>
                        <li>Any transactions or agreements between users and advisors</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">3. NO LIABILITY FOR REVIEWS AND RATINGS</h4>
                      <p className="leading-relaxed">
                        We are <strong>NOT RESPONSIBLE</strong> for the content, accuracy, or impact of reviews and ratings posted by users. Reviews represent the personal opinions of individual users and do not reflect the views of Loukii.
                      </p>
                      <p className="leading-relaxed mt-2">
                        <strong>Important:</strong> If an advisor's income or reputation is negatively affected by a review, we are <strong>NOT LIABLE</strong> for any resulting damages, provided the review complies with our content guidelines.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">4. PLATFORM PROVIDED "AS IS"</h4>
                      <p className="leading-relaxed">
                        The platform is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-8">User Acknowledgment</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By using Loukii, you acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>You use the platform at your own risk</li>
                  <li>You are solely responsible for evaluating advisors before engaging their services</li>
                  <li>You will not hold Loukii liable for any issues arising from your interactions with advisors</li>
                  <li>You understand that reviews and ratings are subjective opinions</li>
                  <li>You accept full responsibility for any decisions made based on information found on the platform</li>
                </ul>
              </section>

              {/* User Responsibilities */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">User Responsibilities</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  As a user of Loukii, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Provide accurate and truthful information when creating your account</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use the platform in compliance with all applicable laws and regulations</li>
                  <li>Conduct your own due diligence before engaging with any advisor</li>
                  <li>Verify the credentials, qualifications, and legitimacy of advisors independently</li>
                  <li>Write honest and fair reviews based on your actual experiences</li>
                  <li>Not post false, misleading, or defamatory content</li>
                </ul>
              </section>

              {/* Prohibited Conduct */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Prohibited Conduct</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Posting false, misleading, or fraudulent information</li>
                  <li>Impersonating another person or entity</li>
                  <li>Posting fake reviews or manipulating ratings</li>
                  <li>Harassing, threatening, or defaming other users or advisors</li>
                  <li>Violating any applicable laws or regulations</li>
                  <li>Attempting to gain unauthorized access to the platform</li>
                  <li>Using the platform for any illegal or unauthorized purpose</li>
                </ul>
              </section>

              {/* Termination */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We reserve the right to suspend or terminate your account and access to the platform at any time, with or without notice, for any reason, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Posting prohibited content</li>
                  <li>Abuse of the platform or other users</li>
                </ul>
              </section>

              {/* Governing Law */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of Malaysia. Any disputes arising from these Terms or your use of the platform shall be subject to the exclusive jurisdiction of the courts of Malaysia.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="text-gray-600 dark:text-gray-400 space-y-2">
                  <p><strong>Cloudswired Technologies</strong></p>
                  <p>Company Registration No. 202003293747 (003180326-U)</p>
                  <p>Email: <a href="mailto:legal@loukii.com" className="text-[#16A34A] hover:underline font-semibold">legal@loukii.com</a></p>
                  <p>Address: Kuala Lumpur, Malaysia</p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
