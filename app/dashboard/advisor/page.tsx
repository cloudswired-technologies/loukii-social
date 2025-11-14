"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { 
  Eye, 
  Star, 
  MessageSquare, 
  TrendingUp,
  Users,
  Calendar,
  Activity,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  HelpCircle
} from "lucide-react";

export default function AdvisorOverviewPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("7days");
  
  // Period filters for charts
  const [ratingPeriod, setRatingPeriod] = useState("month");
  const [reviewsPeriod, setReviewsPeriod] = useState("month");
  const [viewsPeriod, setViewsPeriod] = useState("month");
  const [whatsappPeriod, setWhatsappPeriod] = useState("month");
  const [messagesPeriod, setMessagesPeriod] = useState("month");

  // Helper function to get chart data based on period
  const getChartData = (type: string, period: string) => {
    const dataPoints: Record<string, any> = {
      week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        rating: [
          { x: 0, y: 60, value: '4.6★', label: 'Mon' },
          { x: 50, y: 55, value: '4.7★', label: 'Tue' },
          { x: 100, y: 50, value: '4.7★', label: 'Wed' },
          { x: 150, y: 45, value: '4.8★', label: 'Thu' },
          { x: 200, y: 40, value: '4.8★', label: 'Fri' },
          { x: 250, y: 35, value: '4.8★', label: 'Sat' },
          { x: 300, y: 30, value: '4.8★', label: 'Sun' }
        ],
        views: [
          { x: 0, y: 65, value: '320', label: 'Mon' },
          { x: 50, y: 58, value: '340', label: 'Tue' },
          { x: 100, y: 52, value: '365', label: 'Wed' },
          { x: 150, y: 45, value: '380', label: 'Thu' },
          { x: 200, y: 38, value: '395', label: 'Fri' },
          { x: 250, y: 30, value: '410', label: 'Sat' },
          { x: 300, y: 22, value: '425', label: 'Sun' }
        ],
        whatsapp: [
          { x: 0, y: 70, value: '8', label: 'Mon' },
          { x: 50, y: 65, value: '9', label: 'Tue' },
          { x: 100, y: 58, value: '10', label: 'Wed' },
          { x: 150, y: 50, value: '11', label: 'Thu' },
          { x: 200, y: 42, value: '12', label: 'Fri' },
          { x: 250, y: 32, value: '14', label: 'Sat' },
          { x: 300, y: 25, value: '15', label: 'Sun' }
        ],
        messages: [
          { x: 0, y: 68, value: '3', label: 'Mon' },
          { x: 50, y: 62, value: '3', label: 'Tue' },
          { x: 100, y: 55, value: '4', label: 'Wed' },
          { x: 150, y: 48, value: '4', label: 'Thu' },
          { x: 200, y: 40, value: '5', label: 'Fri' },
          { x: 250, y: 32, value: '5', label: 'Sat' },
          { x: 300, y: 25, value: '6', label: 'Sun' }
        ]
      },
      month: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        rating: [
          { x: 0, y: 68, value: '4.1★', label: 'Jan' },
          { x: 27, y: 65, value: '4.2★', label: 'Feb' },
          { x: 54, y: 62, value: '4.2★', label: 'Mar' },
          { x: 81, y: 58, value: '4.3★', label: 'Apr' },
          { x: 108, y: 55, value: '4.4★', label: 'May' },
          { x: 135, y: 50, value: '4.5★', label: 'Jun' },
          { x: 162, y: 45, value: '4.5★', label: 'Jul' },
          { x: 189, y: 40, value: '4.6★', label: 'Aug' },
          { x: 216, y: 35, value: '4.7★', label: 'Sep' },
          { x: 243, y: 28, value: '4.7★', label: 'Oct' },
          { x: 270, y: 22, value: '4.8★', label: 'Nov' },
          { x: 297, y: 15, value: '4.8★', label: 'Dec' }
        ],
        views: [
          { x: 0, y: 70, value: '1,420', label: 'Jan' },
          { x: 27, y: 68, value: '1,480', label: 'Feb' },
          { x: 54, y: 65, value: '1,550', label: 'Mar' },
          { x: 81, y: 62, value: '1,620', label: 'Apr' },
          { x: 108, y: 58, value: '1,720', label: 'May' },
          { x: 135, y: 52, value: '1,850', label: 'Jun' },
          { x: 162, y: 48, value: '1,920', label: 'Jul' },
          { x: 189, y: 42, value: '2,100', label: 'Aug' },
          { x: 216, y: 35, value: '2,280', label: 'Sep' },
          { x: 243, y: 28, value: '2,410', label: 'Oct' },
          { x: 270, y: 20, value: '2,480', label: 'Nov' },
          { x: 297, y: 12, value: '2,543', label: 'Dec' }
        ],
        whatsapp: [
          { x: 0, y: 72, value: '28', label: 'Jan' },
          { x: 27, y: 70, value: '30', label: 'Feb' },
          { x: 54, y: 68, value: '32', label: 'Mar' },
          { x: 81, y: 65, value: '35', label: 'Apr' },
          { x: 108, y: 62, value: '38', label: 'May' },
          { x: 135, y: 58, value: '42', label: 'Jun' },
          { x: 162, y: 52, value: '45', label: 'Jul' },
          { x: 189, y: 45, value: '52', label: 'Aug' },
          { x: 216, y: 38, value: '58', label: 'Sep' },
          { x: 243, y: 30, value: '65', label: 'Oct' },
          { x: 270, y: 22, value: '72', label: 'Nov' },
          { x: 297, y: 15, value: '85', label: 'Dec' }
        ],
        messages: [
          { x: 0, y: 70, value: '8', label: 'Jan' },
          { x: 27, y: 68, value: '9', label: 'Feb' },
          { x: 54, y: 65, value: '10', label: 'Mar' },
          { x: 81, y: 62, value: '11', label: 'Apr' },
          { x: 108, y: 58, value: '12', label: 'May' },
          { x: 135, y: 52, value: '14', label: 'Jun' },
          { x: 162, y: 48, value: '15', label: 'Jul' },
          { x: 189, y: 42, value: '16', label: 'Aug' },
          { x: 216, y: 35, value: '18', label: 'Sep' },
          { x: 243, y: 28, value: '20', label: 'Oct' },
          { x: 270, y: 20, value: '21', label: 'Nov' },
          { x: 297, y: 12, value: '23', label: 'Dec' }
        ]
      },
      year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        rating: [
          { x: 0, y: 75, value: '3.8★', label: 'Jan', lastYear: 68 },
          { x: 27, y: 72, value: '3.9★', label: 'Feb', lastYear: 65 },
          { x: 54, y: 68, value: '3.9★', label: 'Mar', lastYear: 62 },
          { x: 81, y: 65, value: '4.0★', label: 'Apr', lastYear: 58 },
          { x: 108, y: 60, value: '4.1★', label: 'May', lastYear: 55 },
          { x: 135, y: 55, value: '4.2★', label: 'Jun', lastYear: 50 },
          { x: 162, y: 50, value: '4.2★', label: 'Jul', lastYear: 45 },
          { x: 189, y: 45, value: '4.3★', label: 'Aug', lastYear: 40 },
          { x: 216, y: 38, value: '4.4★', label: 'Sep', lastYear: 35 },
          { x: 243, y: 32, value: '4.5★', label: 'Oct', lastYear: 28 },
          { x: 270, y: 25, value: '4.5★', label: 'Nov', lastYear: 22 },
          { x: 297, y: 18, value: '4.6★', label: 'Dec', lastYear: 15 }
        ],
        views: [
          { x: 0, y: 78, value: '850', label: 'Jan', lastYear: 72 },
          { x: 27, y: 75, value: '920', label: 'Feb', lastYear: 70 },
          { x: 54, y: 72, value: '980', label: 'Mar', lastYear: 68 },
          { x: 81, y: 68, value: '1,050', label: 'Apr', lastYear: 65 },
          { x: 108, y: 62, value: '1,150', label: 'May', lastYear: 60 },
          { x: 135, y: 58, value: '1,280', label: 'Jun', lastYear: 55 },
          { x: 162, y: 52, value: '1,350', label: 'Jul', lastYear: 50 },
          { x: 189, y: 45, value: '1,480', label: 'Aug', lastYear: 42 },
          { x: 216, y: 38, value: '1,620', label: 'Sep', lastYear: 35 },
          { x: 243, y: 30, value: '1,750', label: 'Oct', lastYear: 28 },
          { x: 270, y: 22, value: '1,880', label: 'Nov', lastYear: 20 },
          { x: 297, y: 15, value: '2,010', label: 'Dec', lastYear: 12 }
        ],
        whatsapp: [
          { x: 0, y: 75, value: '15', label: 'Jan', lastYear: 70 },
          { x: 27, y: 72, value: '18', label: 'Feb', lastYear: 68 },
          { x: 54, y: 68, value: '20', label: 'Mar', lastYear: 65 },
          { x: 81, y: 65, value: '22', label: 'Apr', lastYear: 62 },
          { x: 108, y: 60, value: '25', label: 'May', lastYear: 58 },
          { x: 135, y: 55, value: '28', label: 'Jun', lastYear: 53 },
          { x: 162, y: 50, value: '30', label: 'Jul', lastYear: 48 },
          { x: 189, y: 42, value: '35', label: 'Aug', lastYear: 40 },
          { x: 216, y: 35, value: '38', label: 'Sep', lastYear: 33 },
          { x: 243, y: 28, value: '42', label: 'Oct', lastYear: 26 },
          { x: 270, y: 20, value: '45', label: 'Nov', lastYear: 18 },
          { x: 297, y: 12, value: '50', label: 'Dec', lastYear: 10 }
        ],
        messages: [
          { x: 0, y: 72, value: '5', label: 'Jan', lastYear: 68 },
          { x: 27, y: 70, value: '5', label: 'Feb', lastYear: 66 },
          { x: 54, y: 68, value: '6', label: 'Mar', lastYear: 64 },
          { x: 81, y: 65, value: '6', label: 'Apr', lastYear: 62 },
          { x: 108, y: 62, value: '7', label: 'May', lastYear: 60 },
          { x: 135, y: 58, value: '8', label: 'Jun', lastYear: 56 },
          { x: 162, y: 52, value: '9', label: 'Jul', lastYear: 50 },
          { x: 189, y: 45, value: '10', label: 'Aug', lastYear: 43 },
          { x: 216, y: 38, value: '11', label: 'Sep', lastYear: 36 },
          { x: 243, y: 30, value: '12', label: 'Oct', lastYear: 28 },
          { x: 270, y: 22, value: '13', label: 'Nov', lastYear: 20 },
          { x: 297, y: 15, value: '15', label: 'Dec', lastYear: 13 }
        ]
      }
    };

    return {
      data: dataPoints[period][type] || [],
      labels: dataPoints[period].labels || []
    };
  };

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  // Mock analytics data - replace with real data from Supabase
  const coreMetrics = [
    {
      id: "reviews",
      label: "Total Reviews",
      value: "127",
      subtext: "+8 this month",
      icon: MessageSquare,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      id: "rating",
      label: "Average Rating",
      value: "4.8",
      subtext: "★ Excellent",
      icon: Star,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
    },
    {
      id: "views",
      label: "Profile Views",
      value: "2,543",
      subtext: "Last 30 days",
      icon: Eye,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: "replies",
      label: "Total Replies",
      value: "89",
      subtext: "70% response rate",
      icon: MessageSquare,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      id: "whatsapp",
      label: "WhatsApp Clicks",
      value: "342",
      subtext: "Direct inquiries",
      icon: MessageSquare,
      gradient: "from-green-600 to-green-700",
      bgGradient: "from-green-50 to-green-100",
    },
  ];

  // Rating breakdown data
  const ratingBreakdown = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 10, percentage: 8 },
    { stars: 2, count: 2, percentage: 1.5 },
    { stars: 1, count: 1, percentage: 0.5 },
  ];

  // Review trend data (last 6 months)
  const reviewTrend = [
    { month: "Jul", count: 15 },
    { month: "Aug", count: 18 },
    { month: "Sep", count: 22 },
    { month: "Oct", count: 20 },
    { month: "Nov", count: 28 },
    { month: "Dec", count: 24 },
  ];

  const maxReviews = Math.max(...reviewTrend.map(d => d.count));

  const recentReviews = [
    {
      id: 1,
      author: "Sarah Ahmad",
      avatar: "/docs/profile-3.jpg",
      rating: 5,
      comment: "Excellent service! Very professional and helpful. The consultation was thorough and all my questions were answered clearly.",
      date: "5 hours ago",
      verified: true,
    },
    {
      id: 2,
      author: "Ahmad Razak",
      avatar: "/docs/profile-2.jpg",
      rating: 4,
      comment: "Good experience overall. Would recommend to anyone looking for insurance advice.",
      date: "2 days ago",
      verified: true,
    },
    {
      id: 3,
      author: "Nurul Huda",
      avatar: "/docs/profile-1.jpg",
      rating: 5,
      comment: "Amazing advisor! Helped me make the right decision for my family's future.",
      date: "5 days ago",
      verified: false,
    },
    {
      id: 4,
      author: "Tan Wei Ming",
      avatar: "/docs/profile-2.jpg",
      rating: 5,
      comment: "Very knowledgeable and patient. Took the time to explain everything in detail.",
      date: "1 week ago",
      verified: true,
    },
    {
      id: 5,
      author: "Siti Aminah",
      avatar: "/docs/profile-3.jpg",
      rating: 4,
      comment: "Professional service and quick response. Highly recommended for financial planning.",
      date: "2 weeks ago",
      verified: true,
    },
  ];

  const recentNotifications = [
    {
      id: 1,
      type: "review",
      message: "New review from Sarah Ahmad",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "message",
      message: "New message from potential client",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      type: "profile",
      message: "Your profile was viewed 45 times today",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 4,
      type: "support",
      message: "Support ticket resolved",
      time: "3 days ago",
      unread: false,
    },
    {
      id: 5,
      type: "account",
      message: "Profile update successful",
      time: "1 week ago",
      unread: false,
    },
  ];

  const ticketStats = [
    { status: "Pending", count: 3, color: "orange" },
    { status: "Resolved", count: 12, color: "green" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A34A]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#F7F8FA] dark:bg-gray-950 overflow-hidden">
      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Page Header - Same style as Profile */}
        <div className="bg-white px-8 py-6 mb-10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dashboard Overview</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track your performance and manage your advisor profile
          </p>
        </div>

        {/* Content Container */}
        <div className="px-8 pb-8 space-y-6">
          {/* Row 1 - Core Metrics (25% + 50% + 25%) */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Average Rating Card - 25% */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Average Rating
              </h3>
            </div>
            <select 
              value={ratingPeriod}
              onChange={(e) => setRatingPeriod(e.target.value)}
              className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">4.8</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mb-3">+0.2 from last {ratingPeriod === 'week' ? 'week' : ratingPeriod === 'month' ? 'month' : 'year'}</p>
          
          {/* Legend for year comparison */}
          {ratingPeriod === 'year' && (
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-blue-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">This Year</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-red-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Last Year</span>
              </div>
            </div>
          )}
          
          {/* Line Chart - Dynamic */}
          <div className="h-20 relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              
              {/* Last Year Line (only for year period) - RED */}
              {ratingPeriod === 'year' && (
                <>
                  <polyline
                    points={getChartData('rating', ratingPeriod).data.map((p: any) => `${p.x},${p.lastYear || p.y}`).join(' ')}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Last Year Data Points */}
                  {getChartData('rating', ratingPeriod).data.map((point: any, i: number) => (
                    <g key={`last-${i}`} className="group cursor-pointer">
                      <circle 
                        cx={point.x} 
                        cy={point.lastYear || point.y} 
                        r="4" 
                        fill="#EF4444"
                        className="group-hover:r-6 transition-all"
                      />
                      <circle 
                        cx={point.x} 
                        cy={point.lastYear || point.y} 
                        r="8" 
                        fill="#EF4444"
                        fillOpacity="0"
                        className="group-hover:fill-opacity-20 transition-all"
                      />
                      {/* Tooltip for Last Year */}
                      <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <rect
                          x={point.x - 25}
                          y={(point.lastYear || point.y) - 35}
                          width="50"
                          height="25"
                          rx="4"
                          fill="#1F2937"
                        />
                        <text
                          x={point.x}
                          y={(point.lastYear || point.y) - 23}
                          textAnchor="middle"
                          fill="white"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {point.value.replace('★', '')} (2023)
                        </text>
                        <text
                          x={point.x}
                          y={(point.lastYear || point.y) - 13}
                          textAnchor="middle"
                          fill="#9CA3AF"
                          fontSize="8"
                        >
                          {point.label}
                        </text>
                      </g>
                    </g>
                  ))}
                </>
              )}
              
              {/* This Year Line */}
              <polyline
                points={getChartData('rating', ratingPeriod).data.map((p: any) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points with hover */}
              {getChartData('rating', ratingPeriod).data.map((point: any, i: number) => (
                <g key={i} className="group cursor-pointer">
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="4" 
                    fill="#3B82F6"
                    className="group-hover:r-6 transition-all"
                  />
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="8" 
                    fill="#3B82F6"
                    fillOpacity="0"
                    className="group-hover:fill-opacity-20 transition-all"
                  />
                  {/* Tooltip */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <rect
                      x={point.x - 25}
                      y={point.y - 35}
                      width="50"
                      height="25"
                      rx="4"
                      fill="#1F2937"
                    />
                    <text
                      x={point.x}
                      y={point.y - 23}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {point.value}
                    </text>
                    <text
                      x={point.x}
                      y={point.y - 13}
                      textAnchor="middle"
                      fill="#9CA3AF"
                      fontSize="8"
                    >
                      {point.label}
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {getChartData('rating', ratingPeriod).labels.map((label: string, i: number) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>

        {/* Total Reviews Card - 50% (2 columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Total Reviews
              </h3>
            </div>
            <select 
              value={reviewsPeriod}
              onChange={(e) => setReviewsPeriod(e.target.value)}
              className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">127</p>
            </div>
            <div>
              <p className="text-xs text-green-600 dark:text-green-400 mb-1">This Month</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">+8</p>
            </div>
          </div>

          {/* Legend for year comparison */}
          {reviewsPeriod === 'year' && (
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">This Year</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-400 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Last Year</span>
              </div>
            </div>
          )}

          {/* Bar Chart - 12 months */}
          <div className="h-24 flex items-end justify-between gap-1.5">
            {reviewsPeriod === 'year' ? (
              // Year comparison - 2 bars per month
              <>
                {[
                  { thisYear: 24, lastYear: 18 },
                  { thisYear: 22, lastYear: 16 },
                  { thisYear: 19, lastYear: 14 },
                  { thisYear: 20, lastYear: 15 },
                  { thisYear: 18, lastYear: 13 },
                  { thisYear: 16, lastYear: 12 },
                  { thisYear: 15, lastYear: 11 },
                  { thisYear: 12, lastYear: 9 },
                  { thisYear: 11, lastYear: 8 },
                  { thisYear: 10, lastYear: 7 },
                  { thisYear: 8, lastYear: 6 },
                  { thisYear: 7, lastYear: 5 }
                ].map((data, i) => {
                  const maxHeight = 24;
                  const thisYearHeight = (data.thisYear / maxHeight) * 100;
                  const lastYearHeight = (data.lastYear / maxHeight) * 100;
                  return (
                    <div key={i} className="flex-1 flex gap-0.5 items-end">
                      {/* This Year Bar */}
                      <div className="flex-1 group relative">
                        <div 
                          className="w-full bg-blue-500 hover:bg-blue-600 rounded-t transition-all"
                          style={{ height: `${thisYearHeight}%`, minHeight: '16px' }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {data.thisYear}
                          </div>
                        </div>
                      </div>
                      {/* Last Year Bar */}
                      <div className="flex-1 group relative">
                        <div 
                          className="w-full bg-gray-400 hover:bg-gray-500 rounded-t transition-all"
                          style={{ height: `${lastYearHeight}%`, minHeight: '16px' }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {data.lastYear}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              // Single bar per month
              <>
                {[8, 10, 7, 12, 15, 11, 18, 20, 16, 22, 19, 24].map((count, i) => {
                  const height = (count / 24) * 100;
                  return (
                    <div key={i} className="flex-1 group relative">
                      <div 
                        className="w-full bg-blue-500 hover:bg-blue-600 rounded-t transition-all"
                        style={{ height: `${height}%`, minHeight: '20px' }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {count} reviews
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="grid grid-cols-12 mt-2 text-xs text-gray-500">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
              <span key={i} className="text-center">{month}</span>
            ))}
          </div>
        </div>

        {/* Profile Views Card - 25% */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-green-500" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Profile Views
              </h3>
            </div>
            <select 
              value={viewsPeriod}
              onChange={(e) => setViewsPeriod(e.target.value)}
              className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">2,543</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mb-3">+342 from last {viewsPeriod === 'week' ? 'week' : viewsPeriod === 'month' ? 'month' : 'year'}</p>
          
          {/* Legend for year comparison */}
          {viewsPeriod === 'year' && (
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-green-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">This Year</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-red-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Last Year</span>
              </div>
            </div>
          )}
          
          {/* Line Chart - Dynamic */}
          <div className="h-20 relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              
              {/* Last Year Line (only for year period) - RED */}
              {viewsPeriod === 'year' && (
                <>
                  <polyline
                    points={getChartData('views', viewsPeriod).data.map((p: any) => `${p.x},${p.lastYear || p.y}`).join(' ')}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Last Year Data Points */}
                  {getChartData('views', viewsPeriod).data.map((point: any, i: number) => (
                    <g key={`last-${i}`} className="group cursor-pointer">
                      <circle 
                        cx={point.x} 
                        cy={point.lastYear || point.y} 
                        r="4" 
                        fill="#EF4444"
                        className="group-hover:r-6 transition-all"
                      />
                      <circle 
                        cx={point.x} 
                        cy={point.lastYear || point.y} 
                        r="8" 
                        fill="#EF4444"
                        fillOpacity="0"
                        className="group-hover:fill-opacity-20 transition-all"
                      />
                    </g>
                  ))}
                </>
              )}
              
              {/* This Year Line */}
              <polyline
                points={getChartData('views', viewsPeriod).data.map((p: any) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points with hover */}
              {getChartData('views', viewsPeriod).data.map((point: any, i: number) => (
                <g key={i} className="group cursor-pointer">
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="4" 
                    fill="#10B981"
                    className="group-hover:r-6 transition-all"
                  />
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="8" 
                    fill="#10B981"
                    fillOpacity="0"
                    className="group-hover:fill-opacity-20 transition-all"
                  />
                  {/* Tooltip */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <rect
                      x={point.x - 28}
                      y={point.y - 35}
                      width="56"
                      height="25"
                      rx="4"
                      fill="#1F2937"
                    />
                    <text
                      x={point.x}
                      y={point.y - 23}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {point.value}
                    </text>
                    <text
                      x={point.x}
                      y={point.y - 13}
                      textAnchor="middle"
                      fill="#9CA3AF"
                      fontSize="8"
                    >
                      {point.label}
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {getChartData('views', viewsPeriod).labels.map((label: string, i: number) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
      </div>

          {/* Row 2 & 3 Combined - Latest Reviews (50%) + WhatsApp (25%) + Messages (25%) + Notifications + Tickets */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Latest Reviews - 50% (2 columns) - First 5 reviews only */}
        <div className="lg:col-span-2 lg:row-span-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-yellow-500" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Latest Reviews
            </h3>
          </div>
          
          <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2">
            {recentReviews.slice(0, 5).map((review, index) => (
              <div key={review.id}>
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name */}
                    <h4 className="font-semibold text-base text-gray-900 dark:text-white mb-1">
                      {review.author}
                    </h4>
                    
                    {/* Stars and Time */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
                
                {/* Separator - tidak show untuk review terakhir */}
                {index < recentReviews.slice(0, 5).length - 1 && (
                  <div className="mt-6 border-b border-gray-200 dark:border-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Clicks - 25% */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                WhatsApp Clicks
              </h3>
            </div>
            <select 
              value={whatsappPeriod}
              onChange={(e) => setWhatsappPeriod(e.target.value)}
              className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">342</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mb-3">+45 this month</p>
          
          {/* Legend for year comparison */}
          {whatsappPeriod === 'year' && (
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-green-600"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">This Year</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-red-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Last Year</span>
              </div>
            </div>
          )}
          
          {/* Line Chart - Dynamic */}
          <div className="h-20 relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              
              {/* Last Year Line (only for year period) - RED */}
              {whatsappPeriod === 'year' && (
                <>
                  <polyline
                    points={getChartData('whatsapp', whatsappPeriod).data.map((p: any) => `${p.x},${p.lastYear || p.y}`).join(' ')}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Last Year Data Points */}
                  {getChartData('whatsapp', whatsappPeriod).data.map((point: any, i: number) => (
                    <g key={`last-${i}`} className="group cursor-pointer">
                      <circle 
                        cx={point.x} 
                        cy={point.lastYear || point.y} 
                        r="4" 
                        fill="#EF4444"
                        className="group-hover:r-6 transition-all"
                      />
                      <circle 
                        cx={point.x} 
                        cy={point.lastYear || point.y} 
                        r="8" 
                        fill="#EF4444"
                        fillOpacity="0"
                        className="group-hover:fill-opacity-20 transition-all"
                      />
                    </g>
                  ))}
                </>
              )}
              
              {/* This Year Line */}
              <polyline
                points={getChartData('whatsapp', whatsappPeriod).data.map((p: any) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#16A34A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points with hover */}
              {getChartData('whatsapp', whatsappPeriod).data.map((point: any, i: number) => (
                <g key={i} className="group cursor-pointer">
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="4" 
                    fill="#16A34A"
                    className="group-hover:r-6 transition-all"
                  />
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="8" 
                    fill="#16A34A"
                    fillOpacity="0"
                    className="group-hover:fill-opacity-20 transition-all"
                  />
                  {/* Tooltip */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <rect
                      x={point.x - 25}
                      y={point.y - 35}
                      width="50"
                      height="25"
                      rx="4"
                      fill="#1F2937"
                    />
                    <text
                      x={point.x}
                      y={point.y - 23}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {point.value}
                    </text>
                    <text
                      x={point.x}
                      y={point.y - 13}
                      textAnchor="middle"
                      fill="#9CA3AF"
                      fontSize="8"
                    >
                      {point.label}
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {getChartData('whatsapp', whatsappPeriod).labels.map((label: string, i: number) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>

        {/* Messages Received - 25% */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Messages Received
              </h3>
            </div>
            <select 
              value={messagesPeriod}
              onChange={(e) => setMessagesPeriod(e.target.value)}
              className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">89</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mb-3">+12 this month</p>
          
          {/* Legend for year comparison */}
          {messagesPeriod === 'year' && (
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-purple-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">This Year</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-red-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Last Year</span>
              </div>
            </div>
          )}
          
          {/* Line Chart - Dynamic */}
          <div className="h-20 relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              
              {/* Last Year Line (only for year period) - RED */}
              {messagesPeriod === 'year' && (
                <>
                  <polyline
                    points={getChartData('messages', messagesPeriod).data.map((p: any) => `${p.x},${p.lastYear || p.y}`).join(' ')}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Last Year Data Points */}
                  {getChartData('messages', messagesPeriod).data.map((point: any, i: number) => (
                    <g key={`last-${i}`} className="group cursor-pointer">
                      <circle 
                        cx={point.x} 
                        cy={point.lastYear || point.y} 
                        r="4" 
                        fill="#EF4444"
                        className="group-hover:r-6 transition-all"
                      />
                      <circle 
                        cx={point.x} 
                        cy={point.lastYear || point.y} 
                        r="8" 
                        fill="#EF4444"
                        fillOpacity="0"
                        className="group-hover:fill-opacity-20 transition-all"
                      />
                    </g>
                  ))}
                </>
              )}
              
              {/* This Year Line */}
              <polyline
                points={getChartData('messages', messagesPeriod).data.map((p: any) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points with hover */}
              {getChartData('messages', messagesPeriod).data.map((point: any, i: number) => (
                <g key={i} className="group cursor-pointer">
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="4" 
                    fill="#8B5CF6"
                    className="group-hover:r-6 transition-all"
                  />
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="8" 
                    fill="#8B5CF6"
                    fillOpacity="0"
                    className="group-hover:fill-opacity-20 transition-all"
                  />
                  {/* Tooltip */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <rect
                      x={point.x - 25}
                      y={point.y - 35}
                      width="50"
                      height="25"
                      rx="4"
                      fill="#1F2937"
                    />
                    <text
                      x={point.x}
                      y={point.y - 23}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {point.value}
                    </text>
                    <text
                      x={point.x}
                      y={point.y - 13}
                      textAnchor="middle"
                      fill="#9CA3AF"
                      fontSize="8"
                    >
                      {point.label}
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {getChartData('messages', messagesPeriod).labels.map((label: string, i: number) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>

        {/* Latest Notifications - 25% */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Latest Notifications
            </h3>
          </div>
          
          <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2">
            {recentNotifications.slice(0, 5).map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded ${
                  notif.unread
                    ? "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {notif.message}
                </p>
                <p className="text-xs text-gray-500">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Tickets - 25% */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Support Tickets
            </h3>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">Profile Update Issue</span>
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded ml-2">
                Pending
              </span>
            </div>
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">Review Verification</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded ml-2">
                Resolved
              </span>
            </div>
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">Payment Query</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded ml-2">
                Resolved
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">Account Access</span>
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded ml-2">
                Pending
              </span>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
