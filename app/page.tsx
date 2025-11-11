import { LeftNavigation } from "@/components/left-navigation";
import { RightSidebar } from "@/components/right-sidebar";
import { TopHeader } from "@/components/top-header";
import { LoopCard } from "@/components/loop-card";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

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
        title: "Excellent Service and Professional Advice",
        text: "Very professional and helped me find the perfect takaful plan for my family. The consultation was thorough and all my questions were answered clearly.",
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
        title: "Very Knowledgeable and Patient",
        text: "Explained everything clearly and helped me make the right decision. Took the time to understand my needs and provided excellent recommendations.",
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
        title: "Helpful and Clear Advice",
        text: "Thank you for the helpful advice! This really clarifies things. The information provided was easy to understand and very practical.",
      },
    },
    {
      author: {
        name: "Dr. Amirul Hassan",
        role: "Investment Advisor • Prudential BSN",
        avatar: "/docs/profile-1.jpg",
        verified: true,
      },
      content:
        "Investment advisor specializing in wealth management and retirement planning for high-net-worth individuals seeking long-term financial growth and security.",
      images: [
        "/docs/featured-image-1.jpg",
        "/docs/featured-image-3.jpg",
        "/docs/featured-image-2.jpg"
      ],
      stats: {
        rating: 4.9,
        views: 650,
        comments: 31,
      },
      timestamp: "4 days ago",
      latestComment: {
        author: "Melissa Wong",
        title: "Outstanding Investment Guidance",
        text: "Dr. Amirul created a comprehensive strategy that gives me peace of mind. His expertise in retirement planning is exceptional and highly recommended.",
      },
    },
    {
      author: {
        name: "Farah Aziz",
        role: "Takaful Consultant • Etiqa Takaful",
        avatar: "/docs/profile-2.jpg",
        verified: true,
      },
      content:
        "Passionate about helping young families protect their loved ones through affordable and comprehensive takaful solutions tailored to their unique needs.",
      images: [
        "/docs/featured-image-2.jpg",
        "/docs/featured-image-3.jpg",
        "/docs/featured-image-1.jpg"
      ],
      stats: {
        rating: 4.8,
        views: 490,
        comments: 22,
      },
      timestamp: "5 days ago",
      latestComment: {
        author: "Hafiz Rahman",
        title: "Caring and Professional Service",
        text: "Farah made the whole process easy and stress-free. She genuinely cares about her clients and their families. Highly recommended for takaful planning.",
      },
    },
    {
      author: {
        name: "Kevin Lim",
        role: "Health Insurance Specialist • Manulife",
        avatar: "/docs/profile-3.jpg",
        verified: true,
      },
      content:
        "Experienced in medical and health insurance, helping clients navigate complex healthcare coverage options with confidence, clarity, and personalized attention.",
      images: [
        "/docs/featured-image-3.jpg",
        "/docs/featured-image-1.jpg",
        "/docs/featured-image-2.jpg"
      ],
      stats: {
        rating: 4.9,
        views: 580,
        comments: 27,
      },
      timestamp: "1 week ago",
      latestComment: {
        author: "Siti Aminah",
        title: "Expert in Medical Insurance",
        text: "Kevin's knowledge of medical insurance is impressive. He helped me find perfect coverage for my family. Very patient in explaining all the options available.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
      {/* Top Header */}
      <TopHeader />

      {/* Spacer for fixed header */}
      <div className="h-[65px]"></div>

      <div className="flex w-full h-[calc(100vh-65px)] md:h-[calc(100vh-65px)]">
        {/* Left Navigation - Hidden on mobile, 20% on desktop */}
        <div className="hidden lg:block lg:w-[20%] flex-shrink-0 overflow-hidden">
          <LeftNavigation />
        </div>

        {/* Main Feed - Full width on mobile, 55% on desktop */}
        <main className="w-full lg:w-[55%] flex-shrink-0 min-w-0 lg:border-r border-gray-200 dark:border-gray-800 overflow-y-auto pb-20 md:pb-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {dummyLoops.map((loop, index) => (
              <div key={index} className="px-4 md:px-6">
                <LoopCard {...loop} />
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Hidden on mobile/tablet, 25% on desktop */}
        <div className="hidden lg:block lg:w-[25%] flex-shrink-0 overflow-hidden">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
