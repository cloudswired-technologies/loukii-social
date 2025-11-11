"use client";

import { MapPin, Building2, Tag, Award, Star } from "lucide-react";

export function FiltersBar() {
  return (
    <div className="sticky top-[73px] z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3">
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
