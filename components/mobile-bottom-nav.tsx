"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Compass, User, Search } from "lucide-react";
import { useState } from "react";
import { SearchSidebar } from "./search-sidebar";

export function MobileBottomNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { id: "advisors", label: "Advisors", icon: Users, href: "/", isLink: true },
    { id: "insights", label: "Insights", icon: Compass, href: "/insights", isLink: true },
    { id: "search", label: "Search", icon: Search, href: "#", isLink: false },
    { id: "account", label: "Account", icon: User, href: "/account", isLink: true },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            // If it's search, render as button
            if (item.id === "search") {
              return (
                <button
                  key={item.id}
                  onClick={() => setIsSearchOpen(true)}
                  className="flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-lg transition-all text-gray-600 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-900"
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-medium">
                    {item.label}
                  </span>
                </button>
              );
            }
            
            // Otherwise render as link
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-lg transition-all ${
                  active
                    ? "text-[#16A34A]"
                    : "text-gray-600 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-900"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${active ? "stroke-[2.5]" : ""}`} />
                <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Search Sidebar */}
      <SearchSidebar 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        pageType={pathname === "/insights" ? "insights" : "advisors"}
      />
    </>
  );
}
