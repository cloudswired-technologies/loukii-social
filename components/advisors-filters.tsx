"use client";

import { Search, MapPin, Building2, Tag, Award, Star } from "lucide-react";
import { useState } from "react";

export function AdvisorsFilters() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80">
      <div className="max-w-3xl mx-auto py-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search in community like post, tag, feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs cursor-pointer hover:border-[#16A34A] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95">
            <MapPin className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Country</span>
            <span className="text-gray-400 text-[10px]">▼</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs cursor-pointer hover:border-[#16A34A] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95">
            <Building2 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">State</span>
            <span className="text-gray-400 text-[10px]">▼</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs cursor-pointer hover:border-[#16A34A] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95">
            <Tag className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Category</span>
            <span className="text-gray-400 text-[10px]">▼</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs cursor-pointer hover:border-[#16A34A] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95">
            <Award className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Brand</span>
            <span className="text-gray-400 text-[10px]">▼</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs cursor-pointer hover:border-[#16A34A] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Rating</span>
            <span className="text-gray-400 text-[10px]">▼</span>
          </div>
        </div>
      </div>
    </div>
  );
}
