"use client";

import Image from "next/image";
import { TrendingUp, Award } from "lucide-react";
import { UserMenu } from "./user-menu";

export function RightSidebar() {
  const trendingArticles = [
    {
      title: "How to Choose the Right Insurance Plan",
      excerpt: "Learn the key factors to consider when selecting insurance coverage for your family.",
      reads: "1.2k reads",
      duration: "5 min read",
      image: "/docs/featured-image-1.jpg",
    },
    {
      title: "Investment Tips for Beginners",
      excerpt: "Start your investment journey with these essential tips and strategies.",
      reads: "890 reads",
      duration: "4 min read",
      image: "/docs/featured-image-2.jpg",
    },
    {
      title: "Understanding Takaful vs Insurance",
      excerpt: "Discover the differences between conventional insurance and Islamic Takaful.",
      reads: "756 reads",
      duration: "3 min read",
      image: "/docs/featured-image-3.jpg",
    },
  ];

  const trendingBrands = [
    "Prudential BSN",
    "AIA Malaysia",
    "Great Eastern",
    "Etiqa Takaful",
    "Zurich Takaful",
    "Allianz",
    "Manulife",
    "Sun Life",
  ];

  return (
    <aside className="h-full bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 flex-1">
        {/* Trending Articles */}
        <section className="mb-8">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-1.5 bg-[#16A34A]/10 rounded-lg">
            <TrendingUp className="w-4 h-4 text-[#16A34A]" />
          </div>
          <h2 className="font-semibold text-sm text-gray-900 dark:text-white">
            Trending Articles
          </h2>
        </div>
        <div className="space-y-3">
          {trendingArticles.map((article, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="flex gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                {/* Image - 30% */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Content - 70% */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs text-gray-900 dark:text-white mb-1.5 line-clamp-2 leading-tight group-hover:text-[#16A34A] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-500">
                    <span>{article.reads}</span>
                    <span>•</span>
                    <span>{article.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Brands */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-1.5 bg-[#16A34A]/10 rounded-lg">
            <Award className="w-4 h-4 text-[#16A34A]" />
          </div>
          <h2 className="font-semibold text-sm text-gray-900 dark:text-white">
            Trending Brands
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingBrands.map((brand, index) => (
            <button
              key={index}
              className="px-3 py-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all hover:scale-105 active:scale-95 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      </div>

      {/* Promotional Banner - Sticky at bottom */}
      <div className="p-6 pt-4 bg-white dark:bg-gray-950">
        <div className="bg-gradient-to-br from-[#16A34A] to-[#15803d] p-6 rounded-2xl text-white shadow-lg">
          <h3 className="font-bold text-lg mb-2">Become an Advisor</h3>
          <p className="text-sm text-white/90 mb-4">
            Build your credibility and grow your business with Loukii
          </p>
          <button className="w-full bg-white text-[#16A34A] py-2.5 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-md">
            Get Started
          </button>
        </div>
      </div>
    </aside>
  );
}
