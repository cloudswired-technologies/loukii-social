"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Users, Briefcase, Globe, Shield } from "lucide-react";

export function LegalSidebar() {
  const pathname = usePathname();

  const legalPages = [
    {
      id: "overview",
      label: "Legal Overview",
      href: "/legal",
      icon: FileText,
      description: "All policies"
    },
    {
      id: "reviewers",
      label: "For Reviewers",
      href: "/legal/terms-for-reviewers",
      icon: Users,
      description: "Review guidelines"
    },
    {
      id: "advisors",
      label: "For Advisors",
      href: "/legal/terms-for-advisors",
      icon: Briefcase,
      description: "Advisor terms"
    },
    {
      id: "everyone",
      label: "For Everyone",
      href: "/legal/terms-for-everyone",
      icon: Globe,
      description: "General terms"
    },
    {
      id: "privacy",
      label: "Privacy Policy",
      href: "/privacy",
      icon: Shield,
      description: "Data protection"
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="lg:sticky lg:top-24">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3 px-2">
            LEGAL DOCUMENTS
          </h3>
          <nav className="space-y-1">
            {legalPages.map((page) => {
              const Icon = page.icon;
              const active = isActive(page.href);
              return (
                <Link
                  key={page.id}
                  href={page.href}
                  className={`block px-3 py-3 rounded-lg transition-all ${
                    active
                      ? "bg-[#16A34A] text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      active ? "text-white" : "text-gray-400"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold mb-0.5 ${
                        active ? "text-white" : "text-gray-900 dark:text-white"
                      }`}>
                        {page.label}
                      </div>
                      <div className={`text-xs ${
                        active ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {page.description}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
