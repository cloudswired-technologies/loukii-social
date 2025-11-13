"use client";

import { useState } from "react";
import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1000);
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Header */}
            <div className="mb-8">
              <p className="text-[#16A34A] font-semibold text-sm uppercase tracking-wider mb-2">
                GET IN TOUCH
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Have a question or need help? We're here for you
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Send us a message
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Fill out the form below and we'll get back to you as soon as possible
              </p>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-[#16A34A] focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-[#16A34A] focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-[#16A34A] focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-[#16A34A] focus:outline-none transition-colors resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold rounded-lg transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
                <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#16A34A]" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Send us an email anytime
                </p>
                <a
                  href="mailto:support@loukii.com"
                  className="text-[#16A34A] hover:underline font-semibold"
                >
                  support@loukii.com
                </a>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
                <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#16A34A]" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Visit Us</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Cloudswired Technologies<br />
                  202003293747 (003180326-U)<br />
                  0213A, Sunway Citrine Hub, Sunway Iskandar,<br />
                  Iskandar Puteri, 79250, Johor, Malaysia
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
