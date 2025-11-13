"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Building2, Tag, Award, Star } from "lucide-react";
import { UserMenu } from "./user-menu";
import { FilterDropdown } from "./filter-dropdown";
import { SearchSidebar } from "./search-sidebar";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function TopHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Latest");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const isInsightsPage = pathname === "/insights";
  const isAdvisorsPage = pathname === "/";
  
  // Hide filters on legal, contact, faq, what-is-loukii, learn pages
  const showFilters = isInsightsPage || isAdvisorsPage;

  // Filters for Advisors page
  const countries = ["Malaysia", "Singapore", "Indonesia", "Thailand"];
  const states = ["Kuala Lumpur", "Selangor", "Penang", "Johor", "Sabah"];
  const brands = ["Prudential BSN", "AIA Malaysia", "Great Eastern", "Etiqa Takaful"];
  const ratings = ["5 Stars", "4+ Stars", "3+ Stars", "All Ratings"];
  
  // Filters for Insights page
  const categories = ["Insurance", "Takaful", "Investment", "Property", "Retirement", "Health", "Business"];
  const tags = ["Financial Planning", "First-Time Buyers", "Retirement", "Medical Insurance", "Investment Tips", "Property Guide"];

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

          {/* Search Button - Mobile & Tablet Only */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Search Bar - Desktop Only (functional search, no popup) */}
          <div className="hidden lg:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search advisors, articles, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[38px] pl-10 pr-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filters - Hidden on mobile/tablet, visible on desktop, and only on Advisors/Insights pages */}
          <div className="hidden lg:flex items-center gap-2">
            {showFilters && (
              <>
                {isInsightsPage ? (
              // Insights Page Filters
              <>
                <div className="flex items-center gap-2 mr-2">
                  {["Latest", "Trending", "Following"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`ripple flex items-center px-3 h-[38px] bg-gray-50 dark:bg-gray-900 rounded-lg text-xs font-medium transition-all ${
                        activeTab === tab
                          ? "border-2 border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/5"
                          : "border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#16A34A] hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <FilterDropdown
                  icon={<Tag className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />}
                  label="Category"
                  options={categories}
                />
                <FilterDropdown
                  icon={<Award className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />}
                  label="Tags"
                  options={tags}
                />
              </>
            ) : (
              // Advisors Page Filters
              <>
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
                </>
                )}
              </>
            )}
          </div>

          {/* User Menu - Push to far right */}
          <div className="ml-auto flex-shrink-0">
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Search Sidebar */}
      <SearchSidebar 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        pageType={isInsightsPage ? "insights" : "advisors"}
      />
    </header>
  );
}
