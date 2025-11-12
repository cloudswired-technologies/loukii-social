"use client";

import { TopHeader } from "@/components/top-header";
import { LeftNavigation } from "@/components/left-navigation";
import { InsightsSidebar } from "@/components/insights-sidebar";
import { ArticleCard } from "@/components/article-card";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { useState } from "react";

export default function InsightsPage() {
  // Dummy articles data
  const articles = [
    {
      id: 1,
      author: {
        name: "Ahmad Razak",
        avatar: "/docs/profile-2.jpg",
        role: "Financial Advisor",
        verified: true,
      },
      title: "5 Essential Tips for First-Time Home Buyers in Malaysia",
      description: "Buying your first home is exciting but can be overwhelming. Here are the key things you need to know about financing, insurance, and making the right choice for your future.",
      category: "Property & Finance",
      image: "/docs/featured-img-1.jpg",
      publishedAt: "2 days ago",
      readTime: "5 min read",
      stats: {
        views: 1234,
        comments: 45,
        shares: 23,
      },
    },
    {
      id: 2,
      author: {
        name: "Sarah Ahmad",
        avatar: "/docs/profile-3.jpg",
        role: "Insurance Specialist",
        verified: true,
      },
      title: "Understanding Medical Card vs Health Insurance: Which One Do You Need?",
      description: "Many Malaysians are confused about the difference between medical cards and health insurance. Let me break down the key differences and help you make an informed decision.",
      category: "Health & Insurance",
      image: "/docs/featured-img-2.jpg",
      publishedAt: "3 days ago",
      readTime: "7 min read",
      stats: {
        views: 2156,
        comments: 67,
        shares: 34,
      },
    },
    {
      id: 3,
      author: {
        name: "Dr. Amirul Hassan",
        avatar: "/docs/profile-1.jpg",
        role: "Investment Advisor",
        verified: true,
      },
      title: "Retirement Planning in Your 30s: Why Starting Early Matters",
      description: "It's never too early to plan for retirement. Discover how compound interest and smart investment strategies can help you build a comfortable retirement fund.",
      category: "Investment & Retirement",
      image: "/docs/featured-img-3.jpg",
      publishedAt: "5 days ago",
      readTime: "6 min read",
      stats: {
        views: 3421,
        comments: 89,
        shares: 56,
      },
    },
    {
      id: 4,
      author: {
        name: "Farah Aziz",
        avatar: "/docs/profile-2.jpg",
        role: "Takaful Consultant",
        verified: true,
      },
      title: "Takaful vs Conventional Insurance: Making the Right Choice",
      description: "Understanding the key differences between takaful and conventional insurance to help you make an informed decision that aligns with your values and needs.",
      category: "Takaful & Islamic Finance",
      image: "/docs/featured-img-1.jpg",
      publishedAt: "1 week ago",
      readTime: "8 min read",
      stats: {
        views: 2890,
        comments: 72,
        shares: 45,
      },
    },
    {
      id: 5,
      author: {
        name: "Kevin Lim",
        avatar: "/docs/profile-3.jpg",
        role: "Health Insurance Specialist",
        verified: true,
      },
      title: "Critical Illness Coverage: What You Need to Know",
      description: "Learn about critical illness insurance, what conditions are covered, and why it's an essential part of your financial protection strategy.",
      category: "Health & Insurance",
      image: "/docs/featured-img-2.jpg",
      publishedAt: "1 week ago",
      readTime: "7 min read",
      stats: {
        views: 2654,
        comments: 58,
        shares: 38,
      },
    },
    {
      id: 6,
      author: {
        name: "Ahmad Razak",
        avatar: "/docs/profile-2.jpg",
        role: "Financial Advisor",
        verified: true,
      },
      title: "Building an Emergency Fund: A Step-by-Step Guide",
      description: "Financial emergencies can happen anytime. Here's how to build a solid emergency fund that gives you peace of mind and financial security.",
      category: "Financial Planning",
      image: "/docs/featured-img-3.jpg",
      publishedAt: "2 weeks ago",
      readTime: "5 min read",
      stats: {
        views: 3102,
        comments: 94,
        shares: 67,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <TopHeader />
      
      {/* Spacer for fixed header */}
      <div className="h-[65px]"></div>
      
      <div className="flex w-full h-[calc(100vh-65px)]">
        {/* Left Navigation - Hidden on mobile, 20% on desktop */}
        <div className="hidden lg:block lg:w-[20%] flex-shrink-0 overflow-hidden">
          <LeftNavigation />
        </div>

        {/* Main Feed - Full width on mobile, 55% on desktop */}
        <main className="w-full lg:w-[55%] flex-shrink-0 min-w-0 lg:border-r border-gray-200 dark:border-gray-800 overflow-y-auto pb-20 md:pb-0">
          {/* Articles Feed */}
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {articles.map((article) => (
              <div key={article.id} className="px-4 md:px-6">
                <ArticleCard {...article} />
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Hidden on mobile/tablet, 25% on desktop */}
        <div className="hidden lg:block lg:w-[25%] flex-shrink-0 overflow-hidden">
          <InsightsSidebar />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
