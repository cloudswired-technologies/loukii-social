"use client";

import { useState } from "react";
import { X, Search, MapPin, Tag, Building2, Star, Globe, ChevronDown } from "lucide-react";

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pageType?: "advisors" | "insights";
}

export function SearchSidebar({ isOpen, onClose, pageType = "advisors" }: SearchSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFilters, toggleFilters] = useState<string[]>([]);
  const [filterSearches, setFilterSearches] = useState({
    country: "",
    state: "",
    category: "",
    brand: "",
    rating: "",
    tags: "",
  });

  const toggleFilter = (filterName: string) => {
    toggleFilters(prev => 
      prev.includes(filterName) 
        ? prev.filter(f => f !== filterName)
        : [...prev, filterName]
    );
  };

  // Advisors filters
  const countries = ["Malaysia", "Singapore", "Indonesia", "Thailand", "Philippines"];
  const states = ["Kuala Lumpur", "Selangor", "Penang", "Johor", "Sabah"];
  const advisorCategories = ["Insurance", "Takaful", "Investment", "Property", "Retirement", "Health"];
  const brands = ["Prudential BSN", "AIA Malaysia", "Great Eastern", "Etiqa Takaful"];
  const ratings = ["5 Stars", "4+ Stars", "3+ Stars", "All Ratings"];
  
  // Insights filters
  const insightCategories = ["Insurance", "Takaful", "Investment", "Property", "Retirement", "Health", "Business"];
  const tags = ["Financial Planning", "First-Time Buyers", "Retirement", "Medical Insurance", "Investment Tips", "Property Guide"];

  return (
    <>
      {/* Backdrop - Mobile & Tablet Only */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Mobile & Tablet Only */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[80%] sm:w-96 bg-white dark:bg-gray-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Search & Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-73px)] p-4">
          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search advisors, articles, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {pageType === "advisors" ? (
              // Advisors Filters
              <>
                {/* Country Filter */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFilter("country")}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Country</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.includes("country") ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFilters.includes("country") && (
                    <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={filterSearches.country}
                        onChange={(e) => setFilterSearches({...filterSearches, country: e.target.value})}
                        className="w-full h-9 px-3 mb-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      />
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {countries
                          .filter(c => c.toLowerCase().includes(filterSearches.country.toLowerCase()))
                          .map((country) => (
                            <label key={country} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 text-[#16A34A] rounded focus:ring-[#16A34A]" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{country}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* State Filter */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFilter("state")}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">State</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.includes("state") ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFilters.includes("state") && (
                    <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                      <input
                        type="text"
                        placeholder="Search states..."
                        value={filterSearches.state}
                        onChange={(e) => setFilterSearches({...filterSearches, state: e.target.value})}
                        className="w-full h-9 px-3 mb-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      />
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {states
                          .filter(s => s.toLowerCase().includes(filterSearches.state.toLowerCase()))
                          .map((state) => (
                            <label key={state} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 text-[#16A34A] rounded focus:ring-[#16A34A]" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{state}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Filter */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFilter("category")}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.includes("category") ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFilters.includes("category") && (
                    <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                      <input
                        type="text"
                        placeholder="Search categories..."
                        value={filterSearches.category}
                        onChange={(e) => setFilterSearches({...filterSearches, category: e.target.value})}
                        className="w-full h-9 px-3 mb-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      />
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {advisorCategories
                          .filter(c => c.toLowerCase().includes(filterSearches.category.toLowerCase()))
                          .map((category) => (
                            <label key={category} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 text-[#16A34A] rounded focus:ring-[#16A34A]" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Brand Filter */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFilter("brand")}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Brand</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.includes("brand") ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFilters.includes("brand") && (
                    <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                      <input
                        type="text"
                        placeholder="Search brands..."
                        value={filterSearches.brand}
                        onChange={(e) => setFilterSearches({...filterSearches, brand: e.target.value})}
                        className="w-full h-9 px-3 mb-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      />
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {brands
                          .filter(b => b.toLowerCase().includes(filterSearches.brand.toLowerCase()))
                          .map((brand) => (
                            <label key={brand} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 text-[#16A34A] rounded focus:ring-[#16A34A]" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rating Filter */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFilter("rating")}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rating</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.includes("rating") ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFilters.includes("rating") && (
                    <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 space-y-1">
                      {ratings.map((rating) => (
                        <label key={rating} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-[#16A34A] rounded focus:ring-[#16A34A]" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{rating}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Insights Filters
              <>
                {/* Category Filter */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFilter("insightCategory")}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.includes("insightCategory") ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFilters.includes("insightCategory") && (
                    <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                      <input
                        type="text"
                        placeholder="Search categories..."
                        value={filterSearches.category}
                        onChange={(e) => setFilterSearches({...filterSearches, category: e.target.value})}
                        className="w-full h-9 px-3 mb-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      />
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {insightCategories
                          .filter(c => c.toLowerCase().includes(filterSearches.category.toLowerCase()))
                          .map((category) => (
                            <label key={category} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 text-[#16A34A] rounded focus:ring-[#16A34A]" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags Filter */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFilter("tags")}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.includes("tags") ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFilters.includes("tags") && (
                    <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                      <input
                        type="text"
                        placeholder="Search tags..."
                        value={filterSearches.tags}
                        onChange={(e) => setFilterSearches({...filterSearches, tags: e.target.value})}
                        className="w-full h-9 px-3 mb-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      />
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {tags
                          .filter(t => t.toLowerCase().includes(filterSearches.tags.toLowerCase()))
                          .map((tag) => (
                            <label key={tag} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 text-[#16A34A] rounded focus:ring-[#16A34A]" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{tag}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button className="w-full h-11 bg-[#16A34A] hover:bg-[#15803d] text-white font-medium rounded-lg transition-colors">
              Apply Filters
            </button>
            <button className="w-full h-11 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
