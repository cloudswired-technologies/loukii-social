"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  LayoutDashboard, 
  User, 
  Star, 
  MessageSquare, 
  Bell, 
  HelpCircle, 
  Settings,
  LogOut,
  FileText
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AdvisorDashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      id: "home",
      label: "Back to Home",
      icon: Home,
      href: "/",
    },
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard/advisor",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      href: "/dashboard/advisor/profile",
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
      href: "/dashboard/advisor/reviews",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/advisor/messages",
    },
    {
      id: "insights",
      label: "Manage Insights",
      icon: FileText,
      href: "/dashboard/advisor/insights",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      href: "/dashboard/advisor/notifications",
    },
    {
      id: "support",
      label: "Support",
      icon: HelpCircle,
      href: "/dashboard/advisor/support",
    },
    {
      id: "account",
      label: "Account",
      icon: Settings,
      href: "/dashboard/advisor/account",
    },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <aside className="w-[20%] bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full flex-shrink-0">
      <div className="p-4 md:p-6 flex-1">
        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "text-[#16A34A] font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#16A34A]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Footer - Copyright */}
      <div className="p-6 pt-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          © Copyright 2025 Loukii<br />
          Powered by Cloudswired Technologies
        </p>
      </div>
    </aside>
  );
}
