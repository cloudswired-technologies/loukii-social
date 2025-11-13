"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  Star, 
  MessageSquare, 
  Bell, 
  HelpCircle, 
  Settings,
  LogOut
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AdvisorDashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
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
    <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
      {/* Navigation */}
      <nav className="flex-1 p-4 pt-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-[#16A34A] text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
