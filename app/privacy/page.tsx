"use client";

import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Welcome to Loukii, operated by <strong>Cloudswired Technologies</strong> (Company Registration No. 202003293747 (003180326-U)), a company registered in Malaysia. We are committed to protecting your privacy and ensuring the security of your personal information.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. By using Loukii, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Information Collection */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Personal Information</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials (username and password)</li>
                  <li>Profile information (bio, professional details, profile picture)</li>
                  <li>Reviews and ratings you submit</li>
                  <li>Messages and communications with advisors or our support team</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Automatically Collected Information</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  When you use Loukii, we automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, features used)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Location data (with your permission)</li>
                </ul>
              </section>

              {/* Information Use */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To create and manage your account</li>
                  <li>To facilitate connections between users and advisors</li>
                  <li>To process and display reviews and ratings</li>
                  <li>To send you updates, notifications, and marketing communications</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To detect, prevent, and address fraud, security issues, and technical problems</li>
                  <li>To comply with legal obligations and enforce our terms</li>
                  <li>To analyze usage patterns and improve user experience</li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Information Sharing and Disclosure</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">With Other Users</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Your profile information, reviews, and ratings are publicly visible to other users of the platform.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">With Service Providers</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may share information with third-party service providers who perform services on our behalf, such as hosting, analytics, payment processing, and customer support.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">For Legal Reasons</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may disclose information if required by law, court order, or government request, or to protect the rights, property, or safety of Loukii, our users, or others.
                </p>
              </section>

              {/* Data Security */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
                </p>
              </section>

              {/* Your Rights */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Rights and Choices</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li><strong>Access:</strong> You can request access to the personal information we hold about you</li>
                  <li><strong>Correction:</strong> You can update or correct your information through your account settings</li>
                  <li><strong>Deletion:</strong> You can request deletion of your account and personal information</li>
                  <li><strong>Opt-out:</strong> You can opt out of marketing communications at any time</li>
                  <li><strong>Data Portability:</strong> You can request a copy of your data in a portable format</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To exercise these rights, please contact us at <a href="mailto:privacy@loukii.com" className="text-[#16A34A] hover:underline font-semibold">privacy@loukii.com</a>.
                </p>
              </section>

              {/* Changes */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the "Last updated" date at the top of this policy</li>
                  <li>Sending you an email notification (for significant changes)</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your continued use of Loukii after any changes indicates your acceptance of the updated Privacy Policy.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="text-gray-600 dark:text-gray-400 space-y-2">
                  <p><strong>Cloudswired Technologies</strong></p>
                  <p>Company Registration No. 202003293747 (003180326-U)</p>
                  <p>Email: <a href="mailto:privacy@loukii.com" className="text-[#16A34A] hover:underline font-semibold">privacy@loukii.com</a></p>
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
