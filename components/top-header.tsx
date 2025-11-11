"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Building2, Tag, Award, Star } from "lucide-react";
import { UserMenu } from "./user-menu";
import { FilterDropdown } from "./filter-dropdown";
import { useState } from "react";

export function TopHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  const countries = ["Malaysia", "Singapore", "Indonesia", "Thailand", "Philippines", "Vietnam", "Brunei"];
  const states = ["Kuala Lumpur", "Selangor", "Penang", "Johor", "Sabah", "Sarawak", "Melaka", "Perak"];
  const categories = ["Insurance", "Takaful", "Investment", "Financial Planning", "Retirement", "Education", "Health"];
  const brands = ["Prudential BSN", "AIA Malaysia", "Great Eastern", "Etiqa Takaful", "Zurich Takaful", "Allianz", "Manulife", "Sun Life"];
  const ratings = ["5 Stars", "4+ Stars", "3+ Stars", "All Ratings"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="w-full px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/docs/loukii-logo.svg"
              alt="Loukii"
              width={120}
              height={38}
              className="dark:hidden"
            />
            <Image
              src="/docs/loukii-logo-white.svg"
              alt="Loukii"
              width={120}
              height={38}
              className="hidden dark:block"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search advisors, articles, categories, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[38px] pl-10 pr-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <FilterDropdown
              icon={<MapPin className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />}
              label="Country"
              options={countries}
            />
            <FilterDropdown
              icon={<Building2 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />}
              label="State"
              options={states}
            />
            <FilterDropdown
              icon={<Tag className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />}
              label="Category"
              options={categories}
            />
            <FilterDropdown
              icon={<Award className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />}
              label="Brand"
              options={brands}
            />
            <FilterDropdown
              icon={<Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
              label="Rating"
              options={ratings}
            />
          </div>

          {/* User Menu - Push to far right */}
          <div className="ml-auto flex-shrink-0">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
