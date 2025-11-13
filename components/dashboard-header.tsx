"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { UserMenu } from "./user-menu";

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="w-full px-4 md:px-6 py-3">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/docs/loukii-logo.svg"
              alt="Loukii"
              width={100}
              height={28}
              className="h-7 md:h-8 w-auto"
            />
          </Link>

          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[38px] pl-10 pr-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Search Button - Mobile Only */}
          <button className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* User Menu - Push to far right */}
          <div className="ml-auto flex-shrink-0">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
