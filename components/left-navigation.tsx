"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Users, Compass, User, BookOpen, HelpCircle, Lightbulb, Shield, FileText, Mail } from "lucide-react";
import { useState } from "react";

export function LeftNavigation() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  // Update active tab based on current path if needed
  // This will be useful when navigating between pages

  const mainNavItems = [
    { id: "advisors", label: "Advisors", icon: Users, href: "/" },
    { id: "insights", label: "Insights", icon: Compass, href: "/insights" },
    { id: "account", label: "Account", icon: User, href: "/account" },
  ];

  const secondaryNavItems = [
    { id: "about", label: "What is Loukii", icon: BookOpen, href: "/what-is-loukii" },
    { id: "learn", label: "Learn more", icon: Lightbulb, href: "/learn" },
    { id: "faq", label: "FAQ", icon: HelpCircle, href: "/faq" },
    { id: "privacy", label: "Privacy Policy", icon: Shield, href: "/privacy" },
    { id: "terms", label: "Terms of Service", icon: FileText, href: "/terms" },
    { id: "contact", label: "Contact", icon: Mail, href: "/contact" },
  ];

  return (
    <aside className="h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-4 md:p-6 flex-1">
        {/* Main Navigation */}
        <nav className="space-y-1 mb-6">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                active
                  ? "text-[#16A34A] font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#16A34A]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Separator */}
      <div className="border-t border-gray-200 dark:border-gray-800 mb-6"></div>

      {/* Secondary Navigation */}
      <nav className="space-y-1">
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#16A34A] transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      </div>

      {/* Footer - Sticky at bottom */}
      <div className="p-6 pt-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          © Copyright 2025 Loukii<br />
          Powered by Cloudswired Technologies
        </p>
      </div>
    </aside>
  );
}
