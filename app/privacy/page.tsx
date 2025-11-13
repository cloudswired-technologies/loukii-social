"use client";

import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { LegalSidebar } from "@/components/legal-sidebar";

export default function PrivacyPolicyPage() {
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
            {/* Page Header */}
            <div className="mb-8">
              <p className="text-[#16A34A] font-semibold text-sm uppercase tracking-wider mb-2">
                LEGAL
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                How we collect, use, and protect your personal information
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Last updated: January 2025
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Version Info */}
              <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                  <strong>Version 1.0 – Effective 1 November 2025</strong>
                </p>
              </div>

              {/* Introduction */}
              <section className="mb-12">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  We value your privacy. With this policy, we set out your privacy rights and how we collect, use, disclose, transfer, and store your personal data.
                </p>
              </section>

              {/* Terms We Use */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Terms We Use in This Policy</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  When we say <strong>"Loukii," "we," "our," or "us,"</strong> we mean <strong>Cloudswired Technologies</strong>, a company registered in Malaysia and operating Loukii.com from:
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  <strong>0213A, Sunway Citrine Hub, Sunway Iskandar, 79250 Johor Bahru, Johor, Malaysia.</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  When we say <strong>"website," "platform," or "service,"</strong> we mean all of Loukii's websites, applications, and other services.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  When we say <strong>"public personal data,"</strong> we mean personal data published on our website that anyone on the internet can access.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  When we say <strong>"private personal data,"</strong> we mean personal data we do not publish publicly.
                </p>
              </section>

              {/* Third-Party Websites */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Websites</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Our platform may contain links to other websites, but this does not mean we endorse those websites.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We encourage you to review the privacy policies of any third-party websites you visit, as their data collection and handling practices may differ from ours.
                </p>
              </section>

              {/* Open Platform */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">An Open and Community-Based Platform</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  When you write a review or create an advisor profile, that content and your Loukii profile may be visible to anyone visiting the platform.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Visitors can see your public information such as your name, profile photo, country, and reviews you have written. Similarly, if you are a registered advisor replying to a review, that reply will also be visible publicly.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You may choose how much personal information to share when creating your profile. Please do not include any sensitive or confidential personal details.
                </p>
              </section>

              {/* Personal Data We Collect */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Personal Data We Collect</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  "Personal data" means any information that identifies you as an individual. When you create a Loukii user account, write a review, register as an advisor, or use our services, we may collect both <strong>public</strong> and <strong>private</strong> personal data.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Public Personal Data</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Username, photo, and country of residence.</li>
                  <li>Reviews or feedback you submit.</li>
                  <li>Dates of reviews, profile creation, or replies.</li>
                  <li>Content of reviews and ratings (no confidential data should be included).</li>
                  <li>Information shared in public profile fields such as services offered or company name.</li>
                  <li>Your interactions (e.g., likes, replies, or "helpful" clicks).</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Private Personal Data</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Full name, email address, password, and preferred language.</li>
                  <li>Contact information provided via forms, messages, or profile updates.</li>
                  <li>IP address, browser type, and location.</li>
                  <li>Usage data such as session duration, interactions, analytics logs, and device information.</li>
                  <li>Any document or verification information you voluntarily submit.</li>
                  <li>Communications with Loukii (emails, support requests, etc.).</li>
                  <li>Account preferences, such as notification or cookie settings.</li>
                </ul>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We ask that you <strong>do not upload or share any sensitive data</strong> such as personal ID numbers, health information, or religious beliefs.
                </p>
              </section>

              {/* How We Collect */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How We Collect Personal Data</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We collect personal data directly from you when you:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Create an account or advisor profile.</li>
                  <li>Submit reviews or comments.</li>
                  <li>Communicate with us by email or forms.</li>
                  <li>Subscribe to newsletters or updates.</li>
                </ul>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may also collect information automatically through:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Your interaction with our website and analytics tools.</li>
                  <li>Cookies and tracking technologies (see "Cookies" below).</li>
                  <li>Log files generated during access to Loukii.com.</li>
                </ul>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may receive limited data indirectly from third-party integrations such as:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Authentication services (e.g., Google or Facebook sign-in).</li>
                  <li>Hosting and analytics providers such as <strong>Vercel</strong> and <strong>Supabase</strong>.</li>
                </ul>
              </section>

              {/* Data Controller */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who Is the Data Controller</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  For all data collected through Loukii.com, the data controller is:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong>Cloudswired Technologies</strong><br />
                    0213A, Sunway Citrine Hub, Sunway Iskandar,<br />
                    79250 Johor Bahru, Johor, Malaysia<br />
                    Email: <a href="mailto:support@loukii.com" className="text-[#16A34A] hover:underline font-semibold">support@loukii.com</a>
                  </p>
                </div>
              </section>

              {/* Why We Use */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why and How We Use Personal Data</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We use personal data for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>To operate and maintain our platform.</li>
                  <li>To display your reviews or advisor profiles publicly.</li>
                  <li>To create and manage your account.</li>
                  <li>To respond to inquiries or support requests.</li>
                  <li>To send essential notifications, updates, or marketing messages (if opted-in).</li>
                  <li>To improve our platform, user experience, and product features.</li>
                  <li>To prevent fraud, spam, or abuse of our services.</li>
                  <li>To comply with legal obligations.</li>
                  <li>To exercise or defend legal rights when required.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may also use automated systems (e.g., AI or machine learning) for content moderation, fraud detection, and analytics to improve our services.
                </p>
              </section>

              {/* Who May Access */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who May Access Your Personal Data</h2>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Your public data may be accessible to:</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Visitors browsing Loukii.com.</li>
                  <li>Advisors or businesses reviewed by users.</li>
                  <li>Search engines and third-party websites where Loukii content is shared.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Your private data may be accessed internally by:</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Authorized Cloudswired Technologies staff for operational purposes.</li>
                  <li>Technical partners (e.g., hosting, analytics, payment, or email service providers) acting as <strong>data processors</strong> under confidentiality agreements.</li>
                </ul>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
                  We do not sell your personal data.
                </p>
              </section>

              {/* Data Processors */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Data Processors and Third-Party Services</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We work with carefully selected data processors who help us operate Loukii securely, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li><strong>Vercel</strong> – hosting and deployment.</li>
                  <li><strong>Supabase</strong> – secure database and authentication.</li>
                  <li><strong>Cloudflare</strong> – DNS and security infrastructure.</li>
                  <li><strong>Email and analytics providers</strong> – communication and performance monitoring.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  All processors act under data protection agreements to ensure compliance with applicable laws (GDPR, PDPA).
                </p>
              </section>

              {/* Data Transfers */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Data Transfers and International Storage</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Your data may be processed in countries outside your own, including servers hosted by <strong>Vercel</strong> and <strong>Supabase</strong>.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We ensure all transfers comply with applicable data protection laws by implementing appropriate safeguards and contractual clauses.
                </p>
              </section>

              {/* Data Retention */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How Long We Store Your Personal Data</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We keep your personal data only as long as necessary to fulfill its purpose or meet legal obligations.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  When you delete your account, we remove or anonymize all related personal data except where retention is required for legal or security reasons.
                </p>
              </section>

              {/* Data Security */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How We Keep Your Data Secure</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We use industry-standard technical and organizational measures to protect personal data, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Encrypted data storage and communication.</li>
                  <li>Access control for authorized personnel only.</li>
                  <li>Regular system audits and vulnerability checks.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  However, no system is fully secure. You are responsible for maintaining the confidentiality of your account credentials.
                </p>
              </section>

              {/* Cookies */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii uses cookies, pixels, and tracking codes to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Remember login sessions and preferences.</li>
                  <li>Improve site performance.</li>
                  <li>Analyze traffic and user behavior.</li>
                  <li>Deliver personalized experiences.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You can manage cookie preferences via your browser settings. For details, see our separate <strong>Cookie Policy</strong>.
                </p>
              </section>

              {/* Your Rights */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Depending on your jurisdiction (e.g., under GDPR or PDPA), you have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Access the personal data we hold about you.</li>
                  <li>Correct or update inaccurate data.</li>
                  <li>Request deletion of your personal data.</li>
                  <li>Object to or restrict processing.</li>
                  <li>Withdraw consent for marketing communications.</li>
                  <li>Request a copy of your data in portable format.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You can exercise these rights by emailing <a href="mailto:support@loukii.com" className="text-[#16A34A] hover:underline font-semibold">support@loukii.com</a>.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Children's Privacy</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Loukii is <strong>not directed to children under 18 years old</strong>, and we do not knowingly collect data from minors.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  If you believe a child under 18 has provided us with personal data, please contact us to remove it.
                </p>
              </section>

              {/* Changes */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time. Any significant changes will be posted on this page with a revised "Effective Date."
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your continued use of Loukii after changes are published means you accept the updated policy.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  For any privacy-related questions, concerns, or requests, contact:
                </p>
                <div className="text-gray-600 dark:text-gray-400 space-y-2">
                  <p><strong>Cloudswired Technologies</strong></p>
                  <p>Attn: Data Protection Officer</p>
                  <p>0213A, Sunway Citrine Hub, Sunway Iskandar,</p>
                  <p>79250 Johor Bahru, Johor, Malaysia</p>
                  <p>📧 <a href="mailto:support@loukii.com" className="text-[#16A34A] hover:underline font-semibold">support@loukii.com</a></p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <strong>Loukii Privacy Policy — Version 1.0 (Effective 1 November 2025)</strong><br />
                    All rights reserved © Cloudswired Technologies.
                  </p>
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
