"use client";

import { useState } from "react";
import { Send, Paperclip, AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function AdvisorSupportPage() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Mock existing tickets
  const tickets = [
    {
      id: "TKT-001",
      subject: "Profile verification issue",
      category: "Account",
      status: "open",
      priority: "high",
      created: "2 days ago",
      lastUpdate: "1 day ago",
    },
    {
      id: "TKT-002",
      subject: "Question about premium features",
      category: "Billing",
      status: "in_progress",
      priority: "normal",
      created: "1 week ago",
      lastUpdate: "3 days ago",
    },
    {
      id: "TKT-003",
      subject: "Unable to reply to reviews",
      category: "Technical",
      status: "resolved",
      priority: "normal",
      created: "2 weeks ago",
      lastUpdate: "1 week ago",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      setSubject("");
      setCategory("");
      setMessage("");
      setPriority("normal");

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "normal":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white dark:bg-gray-950 px-8 pt-6 pb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Support</h1>
        </div>
        <div className="px-8 pb-8 space-y-6">

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 dark:text-green-400">
            Your ticket has been submitted successfully! We'll get back to you soon.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Ticket Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Submit a New Ticket
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select category</option>
                    <option value="account">Account</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="reviews">Reviews</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="Describe your issue in detail..."
                  className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Attachment */}
              <div>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                  Attach file (optional)
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold rounded-lg transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {submitting ? "Submitting..." : "Submit Ticket"}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Tickets */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Your Tickets
            </h2>

            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono text-gray-500">
                      {ticket.id}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace("_", " ")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                    {ticket.subject}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </span>
                    <span>•</span>
                    <span>{ticket.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Updated {ticket.lastUpdate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Help */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
                  Need immediate help?
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                  Check our FAQ page for quick answers to common questions.
                </p>
                <a
                  href="/faq"
                  className="text-sm text-blue-600 hover:underline font-semibold"
                >
                  Visit FAQ →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
