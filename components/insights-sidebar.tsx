"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Award, Star, CheckCircle, MapPin, Building2 } from "lucide-react";

export function InsightsSidebar() {
  const trendingAdvisors = [
    {
      name: "Dr. Amirul Hassan",
      avatar: "/docs/profile-1.jpg",
      role: "Investment Advisor",
      brand: "Prudential BSN",
      location: "Kuala Lumpur",
      rating: 4.9,
      reviews: 156,
      verified: true,
      intro: "Experienced investment advisor specializing in wealth management and retirement planning for high-net-worth individuals.",
    },
    {
      name: "Sarah Ahmad",
      avatar: "/docs/profile-3.jpg",
      role: "Insurance Specialist",
      brand: "AIA Malaysia",
      location: "Selangor",
      rating: 4.8,
      reviews: 142,
      verified: true,
      intro: "Dedicated insurance specialist helping families secure their future with comprehensive coverage and personalized financial solutions.",
    },
    {
      name: "Ahmad Razak",
      avatar: "/docs/profile-2.jpg",
      role: "Financial Planner",
      brand: "Great Eastern",
      location: "Penang",
      rating: 4.9,
      reviews: 128,
      verified: true,
      intro: "Certified financial planner with 10+ years experience in creating tailored financial strategies for young professionals.",
    },
  ];

  const trendingTags = [
    "Financial Planning",
    "First-Time Buyers",
    "Retirement Planning",
    "Medical Insurance",
    "Investment Tips",
    "Property Guide",
    "Tax Planning",
    "Estate Planning",
    "Business Insurance",
    "Life Insurance",
  ];

  return (
    <aside className="h-full bg-white dark:bg-gray-950 overflow-y-auto">
      <div className="px-4 py-3 md:px-6 md:py-4">
        {/* Trending Advisors */}
        <section className="mb-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#16A34A]/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-[#16A34A]" />
              </div>
              <h2 className="font-semibold text-sm text-gray-900 dark:text-white">
                Trending Advisors
              </h2>
            </div>
            <Link href="/" className="text-xs text-[#16A34A] hover:text-[#15803d] font-medium transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-2.5">
            {trendingAdvisors.map((advisor, index) => (
              <div
                key={index}
                className="group cursor-pointer border-b border-gray-200 dark:border-gray-800 pb-2.5 last:border-0 last:pb-0 hover:bg-gray-50 dark:hover:bg-gray-900 p-2 -mx-2 rounded-lg transition-all"
              >
                {/* Header: Profile, Name, Rating */}
                <div className="flex items-start gap-2 mb-1">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                      src={advisor.avatar}
                      alt={advisor.name}
                      fill
                      className="rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
                    />
                    {advisor.verified && (
                      <CheckCircle className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 text-[#16A34A] fill-[#16A34A] bg-white dark:bg-gray-950 rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#16A34A] transition-colors line-clamp-1">
                        {advisor.name}
                      </h3>
                      <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
                        <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">{advisor.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {advisor.role}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span className="line-clamp-1">{advisor.brand}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{advisor.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio/Intro */}
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
                  {advisor.intro}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Top 10 Trending Tags */}
        <section className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1.5 bg-[#16A34A]/10 rounded-lg">
              <Award className="w-4 h-4 text-[#16A34A]" />
            </div>
            <h2 className="font-semibold text-sm text-gray-900 dark:text-white">
              Top 10 Trending Tags
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <button
                key={index}
                className="ripple px-3 py-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Promotional Banner - Sticky at bottom */}
      <div className="p-4 md:p-6 pt-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
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
