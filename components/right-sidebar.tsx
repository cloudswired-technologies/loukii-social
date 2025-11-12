"use client";

import Image from "next/image";
import { TrendingUp, Award } from "lucide-react";
import { UserMenu } from "./user-menu";

export function RightSidebar() {
  const trendingArticles = [
    {
      author: {
        name: "Soheil",
        avatar: "/docs/profile-1.jpg",
      },
      title: "See what you'll be able to do with Tribe",
      date: "12 May",
      category: "Educational",
      image: "/docs/featured-image-1.jpg",
    },
    {
      author: {
        name: "Sarah Ahmad",
        avatar: "/docs/profile-3.jpg",
      },
      title: "How to Choose the Right Insurance Plan",
      date: "10 May",
      category: "Insurance",
      image: "/docs/featured-image-2.jpg",
    },
    {
      author: {
        name: "Ahmad Razak",
        avatar: "/docs/profile-2.jpg",
      },
      title: "Investment Tips for Beginners",
      date: "8 May",
      category: "Investment",
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
    "Tokio Marine",
    "MSIG",
  ];

  return (
    <aside className="h-full bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 flex flex-col overflow-y-auto">
      <div className="p-6 flex-1">
        {/* Trending Articles */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#16A34A]/10 rounded-lg">
              <TrendingUp className="w-4 h-4 text-[#16A34A]" />
            </div>
            <h2 className="font-semibold text-sm text-gray-900 dark:text-white">
              Trending Articles
            </h2>
          </div>
          <button className="text-xs text-[#16A34A] hover:text-[#15803d] font-medium transition-colors">
            View all
          </button>
        </div>
        <div className="space-y-2.5">
          {trendingArticles.map((article, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="flex gap-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 p-1.5 rounded-lg transition-all">
                {/* Left: Author & Content */}
                <div className="flex-1 min-w-0">
                  {/* Author */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                      {article.author.name}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#16A34A] transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Date & Category */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.category}</span>
                  </div>
                </div>

                {/* Right: Image - WIDER */}
                <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Brands */}
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-[#16A34A]/10 rounded-lg">
            <Award className="w-4 h-4 text-[#16A34A]" />
          </div>
          <h2 className="font-semibold text-sm text-gray-900 dark:text-white">
            Top 10 Trending Brands
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingBrands.map((brand, index) => (
            <button
              key={index}
              className="ripple px-3 py-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      </div>

      {/* Promotional Banner - Sticky at bottom */}
      <div className="p-6 pt-3 bg-white dark:bg-gray-950">
        <div className="bg-gradient-to-br from-[#16A34A] to-[#15803d] p-5 rounded-xl text-white shadow-lg">
          <h3 className="font-bold text-base mb-1.5">Become an Advisor</h3>
          <p className="text-xs text-white/90 mb-3">
            Build your credibility and grow your business with Loukii
          </p>
          <button className="ripple w-full bg-white text-[#16A34A] py-2 px-4 text-sm rounded-lg font-medium hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-xl">
            Get Started
          </button>
        </div>
      </div>
    </aside>
  );
}
