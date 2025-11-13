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
  ChevronDown
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
          { x: 0, y: 78, value: '850', label: 'Jan' },
          { x: 27, y: 75, value: '920', label: 'Feb' },
          { x: 54, y: 72, value: '980', label: 'Mar' },
          { x: 81, y: 68, value: '1,050', label: 'Apr' },
          { x: 108, y: 62, value: '1,150', label: 'May' },
          { x: 135, y: 58, value: '1,280', label: 'Jun' },
          { x: 162, y: 52, value: '1,350', label: 'Jul' },
          { x: 189, y: 45, value: '1,480', label: 'Aug' },
          { x: 216, y: 38, value: '1,620', label: 'Sep' },
          { x: 243, y: 30, value: '1,750', label: 'Oct' },
          { x: 270, y: 22, value: '1,880', label: 'Nov' },
          { x: 297, y: 15, value: '2,010', label: 'Dec' }
        ],
        whatsapp: [
          { x: 0, y: 75, value: '15', label: 'Jan' },
          { x: 27, y: 72, value: '18', label: 'Feb' },
          { x: 54, y: 68, value: '20', label: 'Mar' },
          { x: 81, y: 65, value: '22', label: 'Apr' },
          { x: 108, y: 60, value: '25', label: 'May' },
          { x: 135, y: 55, value: '28', label: 'Jun' },
          { x: 162, y: 50, value: '30', label: 'Jul' },
          { x: 189, y: 42, value: '35', label: 'Aug' },
          { x: 216, y: 35, value: '38', label: 'Sep' },
          { x: 243, y: 28, value: '42', label: 'Oct' },
          { x: 270, y: 20, value: '45', label: 'Nov' },
          { x: 297, y: 12, value: '50', label: 'Dec' }
        ],
        messages: [
          { x: 0, y: 72, value: '5', label: 'Jan' },
          { x: 27, y: 70, value: '5', label: 'Feb' },
          { x: 54, y: 68, value: '6', label: 'Mar' },
          { x: 81, y: 65, value: '6', label: 'Apr' },
          { x: 108, y: 62, value: '7', label: 'May' },
          { x: 135, y: 58, value: '8', label: 'Jun' },
          { x: 162, y: 52, value: '9', label: 'Jul' },
          { x: 189, y: 45, value: '10', label: 'Aug' },
          { x: 216, y: 38, value: '11', label: 'Sep' },
          { x: 243, y: 30, value: '12', label: 'Oct' },
          { x: 270, y: 22, value: '13', label: 'Nov' },
          { x: 297, y: 15, value: '15', label: 'Dec' }
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
      platform: "Yelp",
      verified: true,
    },
    {
      id: 2,
      author: "Ahmad Razak",
      avatar: "/docs/profile-2.jpg",
      rating: 4,
      comment: "Good experience overall. Would recommend to anyone looking for insurance advice.",
      date: "2 days ago",
      platform: "Google",
      verified: true,
    },
    {
      id: 3,
      author: "Nurul Huda",
      avatar: "/docs/profile-1.jpg",
      rating: 5,
      comment: "Amazing advisor! Helped me make the right decision for my family's future.",
      date: "5 days ago",
      platform: "Facebook",
      verified: false,
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
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Overview
        </h1>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Row 1 - Core Metrics (25% + 50% + 25%) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Average Rating Card - 25% */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Average Rating
            </h3>
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
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Total Reviews
            </h3>
            <select className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer">
              <option>Week</option>
              <option>Month</option>
              <option>Last Year</option>
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

          {/* Bar Chart - 12 months */}
          <div className="h-24 flex items-end justify-between gap-1.5">
            {[8, 10, 7, 12, 15, 11, 18, 20, 16, 22, 19, 24].map((count, i) => {
              const height = (count / 24) * 100;
              return (
                <div key={i} className="flex-1 group relative">
                  <div 
                    className={`w-full rounded-t transition-all ${i >= 6 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'}`}
                    style={{ height: `${height}%`, minHeight: '20px' }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {count} reviews
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-12 mt-2 text-xs text-gray-500">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
              <span key={i} className="text-center">{month}</span>
            ))}
          </div>
        </div>

        {/* Profile Views Card - 25% */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Profile Views
            </h3>
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
          
          {/* Line Chart - Dynamic */}
          <div className="h-20 relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              
              {/* Line path */}
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Latest Reviews - 50% (2 columns) - All reviews */}
        <div className="lg:col-span-2 lg:row-span-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 max-h-96 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Latest Reviews
            </h3>
          </div>
          
          <div className="space-y-4">
            {recentReviews.slice(0, 5).map((review) => (
              <div key={review.id} className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      {review.author}
                    </h4>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${
                            i < review.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{review.date}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Clicks - 25% */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#16A34A]" />
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
          
          {/* Line Chart - Dynamic */}
          <div className="h-20 relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              
              {/* Line path */}
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
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
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
          
          {/* Line Chart - Dynamic */}
          <div className="h-20 relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              
              {/* Line path */}
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
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-[#16A34A]" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Latest Notifications
            </h3>
          </div>
          
          <div className="space-y-2">
            {recentNotifications.map((notif) => (
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
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Support Tickets
            </h3>
          </div>
          
          <div className="space-y-3">
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
  );
}
