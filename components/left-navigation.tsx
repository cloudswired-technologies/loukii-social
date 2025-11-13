"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Users, Compass, User, BookOpen, HelpCircle, Lightbulb, FileText, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function LeftNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const userType = user.user_metadata?.user_type;
    const email = user.email;
    
    if (email === "admin@loukii.com") {
      router.push("/dashboard/admin");
    } else if (userType === "advisor") {
      router.push("/dashboard/advisor");
    } else {
      router.push("/dashboard/reviewer");
    }
  };

  const mainNavItems = [
    { id: "advisors", label: "Advisors", icon: Users, href: "/" },
    { id: "insights", label: "Insights", icon: Compass, href: "/insights" },
    { id: "account", label: "Account", icon: User, href: "/account", onClick: handleAccountClick },
  ];

  const secondaryNavItems = [
    { id: "about", label: "What is Loukii", icon: BookOpen, href: "/what-is-loukii" },
    { id: "learn", label: "Learn More", icon: Lightbulb, href: "/learn" },
    { id: "faq", label: "FAQ", icon: HelpCircle, href: "/faq" },
    { id: "legal", label: "Legal", icon: FileText, href: "/legal" },
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
          
          if (item.onClick) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                  active
                    ? "text-[#16A34A] font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#16A34A]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          }
          
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
