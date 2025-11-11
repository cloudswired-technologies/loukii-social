import { LeftNavigation } from "@/components/left-navigation";
import { RightSidebar } from "@/components/right-sidebar";
import { TopHeader } from "@/components/top-header";
import { LoopCard } from "@/components/loop-card";

export default function Home() {
  const dummyLoops = [
    {
      author: {
        name: "Shukry Razif",
        role: "Takaful Agent • Prudential BSN Takaful",
        avatar: "/docs/profile-1.jpg",
        verified: true,
      },
      content:
        "Experienced takaful advisor specializing in family protection and retirement planning. Helping families secure their financial future with Shariah-compliant solutions.",
      images: [
        "/docs/featured-image-1.jpg",
        "/docs/featured-image-2.jpg",
        "/docs/featured-image-3.jpg"
      ],
      stats: {
        rating: 5.0,
        views: 530,
        comments: 23,
      },
      timestamp: "2 weeks ago",
      latestComment: {
        author: "Sarah Ahmad",
        text: "Excellent service! Very professional and helped me find the perfect takaful plan for my family.",
      },
    },
    {
      author: {
        name: "Abo Ghanbari",
        role: "Insurance Consultant • AIA Malaysia",
        avatar: "/docs/profile-2.jpg",
        verified: true,
      },
      content:
        "Certified financial planner with 10+ years experience. Passionate about helping clients achieve financial security through comprehensive insurance and investment planning.",
      images: [
        "/docs/featured-image-2.jpg",
        "/docs/featured-image-1.jpg",
        "/docs/featured-image-3.jpg",
      ],
      stats: {
        rating: 4.9,
        views: 420,
        comments: 15,
      },
      timestamp: "3 days ago",
      latestComment: {
        author: "Ahmad Razak",
        text: "Very knowledgeable and patient. Explained everything clearly and helped me make the right decision.",
      },
    },
    {
      author: {
        name: "Sarah Ahmad",
        role: "Financial Advisor • Great Eastern",
        avatar: "/docs/profile-3.jpg",
        verified: true,
      },
      content:
        "Dedicated to empowering individuals with smart financial decisions. Specializing in wealth management, retirement planning, and education funding for growing families.",
      images: [
        "/docs/featured-image-3.jpg",
        "/docs/featured-image-2.jpg",
        "/docs/featured-image-1.jpg"
      ],
      stats: {
        rating: 4.8,
        views: 380,
        comments: 18,
      },
      timestamp: "1 week ago",
      latestComment: {
        author: "Nurul Huda",
        text: "Thank you for the helpful advice! This really clarifies things.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
      {/* Top Header */}
      <TopHeader />

      {/* Spacer for fixed header */}
      <div className="h-[65px]"></div>

      <div className="flex w-full h-[calc(100vh-65px)]">
        {/* Left Navigation - 20% - FIXED */}
        <div className="w-[20%] flex-shrink-0 overflow-hidden">
          <LeftNavigation />
        </div>

        {/* Main Feed - 55% - SCROLLABLE */}
        <main className="w-[55%] flex-shrink-0 min-w-0 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {dummyLoops.map((loop, index) => (
              <div key={index} className="px-6">
                <LoopCard {...loop} />
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar - 25% - FIXED */}
        <div className="w-[25%] flex-shrink-0 overflow-hidden">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
