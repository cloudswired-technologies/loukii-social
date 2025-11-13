"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Shield, TrendingUp, Search, Star, MessageCircle, CheckCircle, Sparkles, ChevronDown, BookOpen, MessageSquare, Lightbulb, UserCircle } from "lucide-react";
import { LandingHeader } from "@/components/landing-header";
import { useState } from "react";

// How to Use Loukii Section Component
function HowToUseSection() {
  const [userType, setUserType] = useState<'user' | 'advisor'>('user');

  const userSteps = [
    {
      number: "1",
      title: "Browse Advisors",
      description: "Explore our directory of service advisors with detailed profiles showcasing their experience, skills, and services.",
      icon: Search,
      mockup: "search"
    },
    {
      number: "2",
      title: "Read Reviews",
      description: "Check authentic reviews and background information to make informed decisions based on real client experiences.",
      icon: Star,
      mockup: "reviews"
    },
    {
      number: "3",
      title: "Connect and Engage",
      description: "Reach out to advisors, ask questions, and start conversations with people who understand your needs and can help.",
      icon: MessageCircle,
      mockup: "connect"
    }
  ];

  const advisorSteps = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Set up your profile showcasing your experience and skills to build a strong presence that attracts clients.",
      icon: UserCircle,
      mockup: "profile"
    },
    {
      number: "2",
      title: "Collect Reviews",
      description: "Gather testimonials and reviews from your existing clients to build trust and credibility through their feedback.",
      icon: Star,
      mockup: "collect-reviews"
    },
    {
      number: "3",
      title: "Share Knowledge",
      description: "Publish helpful content and insights to showcase what you know and help your audience make better decisions.",
      icon: Lightbulb,
      mockup: "content"
    }
  ];

  const steps = userType === 'user' ? userSteps : advisorSteps;

  return (
    <section className="py-24 bg-gradient-to-b from-green-50 via-green-50/70 to-green-50/30 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#16A34A]/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/12 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#16A34A] font-semibold text-sm uppercase tracking-wider mb-4">HOW IT WORKS</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How Loukii Help You
          </h2>

          {/* Toggle Buttons */}
          <div className="inline-flex bg-white rounded-full p-1.5 gap-1 mb-4 shadow-md border border-gray-100">
            <button
              onClick={() => setUserType('user')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                userType === 'user'
                  ? 'bg-[#16A34A] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Users
            </button>
            <button
              onClick={() => setUserType('advisor')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                userType === 'advisor'
                  ? 'bg-[#16A34A] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Advisors
            </button>
          </div>
        </div>

        {/* 3 Cards Horizontal Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100/50">
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {step.description}
                </p>

                {/* Mockup/Illustration */}
                <div className="bg-white rounded-2xl p-6 min-h-[280px] flex flex-col items-center justify-center border border-gray-100">
                  {/* Different mockup based on type */}
                  {step.mockup === 'search' && (
                    <div className="w-full space-y-4">
                      {/* Search bar mockup */}
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                      </div>
                      {/* Profile cards */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-xl">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-1.5 bg-gray-100 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-transparent rounded-xl">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-1.5 bg-gray-100 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                      {/* Connect button */}
                      <button className="w-full bg-[#16A34A] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                        Connect
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {step.mockup === 'reviews' && (
                    <div className="w-full space-y-3">
                      {/* Reviews/Ratings Display */}
                      <div className="text-sm text-gray-500 mb-3">Client Reviews</div>
                      
                      {/* Review Cards */}
                      <div className="space-y-3">
                        <div className="p-3 bg-gradient-to-r from-yellow-50 to-transparent rounded-xl border border-yellow-100">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                            <div className="flex-1">
                              <div className="h-2 bg-gray-200 rounded w-1/3 mb-1"></div>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Icon key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded mb-1"></div>
                          <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
                        </div>
                        
                        <div className="p-3 bg-gradient-to-r from-green-50 to-transparent rounded-xl border border-green-100">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
                            <div className="flex-1">
                              <div className="h-2 bg-gray-200 rounded w-1/3 mb-1"></div>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Icon key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded mb-1"></div>
                          <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                      
                      {/* Rating Summary */}
                      <div className="bg-white rounded-xl p-3 border border-gray-200 mt-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-gray-900">4.8</div>
                            <div className="flex gap-0.5 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Icon key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1">Based on 250+ reviews</div>
                          </div>
                          <div className="text-right">
                            <CheckCircle className="w-8 h-8 text-[#16A34A] mb-1" />
                            <div className="text-[10px] text-gray-600 font-medium">Verified</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step.mockup === 'connect' && (
                    <div className="w-full space-y-3">
                      <div className="text-sm text-gray-500 mb-3">Messages</div>
                      {/* Chat/Message mockup */}
                      <div className="space-y-3">
                        {/* Incoming message */}
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3">
                              <div className="h-1.5 bg-gray-300 rounded mb-1.5"></div>
                              <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-1 ml-2">10:30 AM</div>
                          </div>
                        </div>
                        
                        {/* Outgoing message */}
                        <div className="flex items-start gap-2 flex-row-reverse">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#16A34A] to-[#15803d] rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="bg-[#16A34A] rounded-2xl rounded-tr-sm p-3 ml-auto" style={{width: 'fit-content', maxWidth: '80%', float: 'right'}}>
                              <div className="h-1.5 bg-white/60 rounded mb-1.5"></div>
                              <div className="h-1.5 bg-white/60 rounded w-2/3"></div>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-1 mr-2 text-right clear-both">10:32 AM</div>
                          </div>
                        </div>
                        
                        {/* Incoming message */}
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3">
                              <div className="h-1.5 bg-gray-300 rounded mb-1.5"></div>
                              <div className="h-1.5 bg-gray-300 rounded w-4/5"></div>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-1 ml-2">10:35 AM</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Message input */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2 mt-4">
                        <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                        <div className="w-6 h-6 bg-[#16A34A] rounded-lg flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ADVISOR MOCKUPS */}
                  {step.mockup === 'profile' && (
                    <div className="w-full space-y-4">
                      {/* Profile form mockup */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#16A34A] to-[#15803d] rounded-full flex items-center justify-center">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                          </div>
                        </div>
                        
                        {/* Form fields */}
                        <div className="space-y-2">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Name</div>
                            <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Expertise</div>
                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Bio</div>
                            <div className="space-y-1">
                              <div className="h-2 bg-gray-200 rounded"></div>
                              <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Save button */}
                      <button className="w-full bg-[#16A34A] text-white py-3 rounded-xl font-semibold">
                        Save Profile
                      </button>
                    </div>
                  )}

                  {step.mockup === 'presence' && (
                    <div className="w-full space-y-4">
                      <div className="text-sm text-gray-500 mb-3">Profile Visibility</div>
                      
                      {/* Profile preview card */}
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#16A34A] to-[#15803d] rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-2 bg-gray-300 rounded w-2/3 mb-1.5"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="space-y-1.5 mb-3">
                          <div className="h-1.5 bg-gray-200 rounded"></div>
                          <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="px-2 py-1 bg-blue-100 rounded-full">
                            <div className="h-1 bg-blue-400 rounded w-8"></div>
                          </div>
                          <div className="px-2 py-1 bg-green-100 rounded-full">
                            <div className="h-1 bg-green-400 rounded w-10"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Growth metrics */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="w-4 h-4 text-[#16A34A]" />
                            <div className="text-lg font-bold text-gray-900">+45%</div>
                          </div>
                          <div className="text-[10px] text-gray-500">Profile Views</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="w-4 h-4 text-blue-600" />
                            <div className="text-lg font-bold text-gray-900">128</div>
                          </div>
                          <div className="text-[10px] text-gray-500">Connections</div>
                        </div>
                      </div>
                      
                      {/* Reach indicator */}
                      <div className="bg-gradient-to-r from-[#16A34A]/10 to-blue-500/10 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-700">Your Reach</span>
                          <span className="text-xs text-[#16A34A] font-bold">Growing</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#16A34A] to-blue-500 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step.mockup === 'collect-reviews' && (
                    <div className="w-full space-y-4">
                      <div className="text-sm text-gray-500 mb-3">Client Testimonials</div>
                      
                      {/* Testimonial Quote Card */}
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100 relative">
                        {/* Quote icon */}
                        <div className="absolute top-3 right-3 opacity-20">
                          <MessageSquare className="w-8 h-8 text-blue-600" />
                        </div>
                        
                        {/* Testimonial text */}
                        <div className="space-y-2 mb-3 relative z-10">
                          <div className="h-2 bg-blue-200/50 rounded w-full"></div>
                          <div className="h-2 bg-blue-200/50 rounded w-5/6"></div>
                          <div className="h-2 bg-blue-200/50 rounded w-4/5"></div>
                        </div>
                        
                        {/* Client info */}
                        <div className="flex items-center gap-2 mt-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-2 bg-blue-300/50 rounded w-1/3 mb-1.5"></div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Icon key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Trust Indicators */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">24</div>
                          <div className="text-[9px] text-gray-500">Reviews</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <Icon className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">4.9</div>
                          <div className="text-[9px] text-gray-500">Rating</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <TrendingUp className="w-5 h-5 text-[#16A34A] mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">98%</div>
                          <div className="text-[9px] text-gray-500">Positive</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step.mockup === 'content' && (
                    <div className="w-full space-y-3">
                      <div className="text-sm text-gray-500 mb-3">Content Creation</div>
                      
                      {/* Article/Content Card */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 bg-gray-300 rounded w-3/4 mb-1.5"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="space-y-1.5 mb-3">
                          <div className="h-1.5 bg-gray-200 rounded"></div>
                          <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="px-2 py-1 bg-purple-100 rounded-full">
                            <div className="h-1 bg-purple-400 rounded w-8"></div>
                          </div>
                          <div className="px-2 py-1 bg-pink-100 rounded-full">
                            <div className="h-1 bg-pink-400 rounded w-10"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Engagement metrics */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                          <div className="text-lg font-bold text-blue-600">1.2K</div>
                          <div className="text-[9px] text-gray-500">Views</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                          <div className="text-lg font-bold text-[#16A34A]">89</div>
                          <div className="text-[9px] text-gray-500">Likes</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                          <div className="text-lg font-bold text-purple-600">23</div>
                          <div className="text-[9px] text-gray-500">Shares</div>
                        </div>
                      </div>
                      
                      {/* Publish button */}
                      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Publish Content
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Core Elements Section Component
function CoreElementsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const coreElements = [
    {
      id: 1,
      number: "01",
      title: "Comprehensive Directory",
      description: "Loukii is your go-to platform for discovering service advisors across multiple industries — all in one place.",
      fullDescription: "Our comprehensive directory makes it simple for users to explore, compare, and connect with professionals through detailed profiles that highlight key information such as services offered, experience, and credentials.",
      tagline: "A smarter way to find the right people, faster.",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      number: "02",
      title: "Community-Driven Transparency",
      description: "Trust comes from the community.",
      fullDescription: "Loukii allows real users to share their experiences and honest feedback, helping others make informed decisions while giving advisors the opportunity to build genuine credibility through transparency and accountability.",
      tagline: "Empowering trust through real voices.",
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      number: "03",
      title: "Industry Expert Knowledge",
      description: "Loukii connects users not just with people, but with insights.",
      fullDescription: "Through expert-written articles and educational content, users can learn directly from professionals, while advisors strengthen their authority and thought leadership in their respective fields.",
      tagline: "Knowledge shared is trust earned.",
      icon: Lightbulb,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const activeElement = coreElements[activeTab];
  const Icon = activeElement.icon;

  return (
    <section className="pt-12 pb-20 lg:pt-16 lg:pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#16A34A] font-semibold text-sm uppercase tracking-wider mb-4">MAIN FEATURES</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            The Three Core Elements<br />of Loukii
          </h2>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Side - Content */}
          <div className="lg:col-span-3">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl lg:text-7xl font-bold text-gray-200">{activeElement.number}</span>
                <span className="text-sm text-gray-500">/{coreElements.length.toString().padStart(2, '0')}</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {activeElement.title}
              </h3>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                {activeElement.description}
              </p>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                {activeElement.fullDescription}
              </p>
              <p className="text-lg font-semibold text-[#16A34A] italic">
                "{activeElement.tagline}"
              </p>
            </div>
          </div>

          {/* Right Side - Visual Mockup */}
          <div className="lg:col-span-2 flex items-center justify-center">
            {/* Different mockup based on active tab */}
            {activeTab === 0 && (
              <div className="w-[500px] h-[500px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl flex flex-col justify-center">
                {/* Directory/Search Interface Mockup */}
                <div className="space-y-3">
                  {/* Search Bar */}
                  <div className="bg-white rounded-lg p-2.5 shadow-md">
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-gray-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  {/* Profile Cards */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-2.5 shadow-md">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-2"></div>
                      <div className="h-1.5 bg-gray-200 rounded mb-1"></div>
                      <div className="h-1.5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 shadow-md">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-2"></div>
                      <div className="h-1.5 bg-gray-200 rounded mb-1"></div>
                      <div className="h-1.5 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 shadow-md">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2"></div>
                      <div className="h-1.5 bg-gray-200 rounded mb-1"></div>
                      <div className="h-1.5 bg-gray-200 rounded w-4/5 mb-2"></div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 shadow-md">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-2"></div>
                      <div className="h-1.5 bg-gray-200 rounded mb-1"></div>
                      <div className="h-1.5 bg-gray-200 rounded w-3/5 mb-2"></div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Category Tags */}
                  <div className="flex gap-1.5 flex-wrap">
                    <div className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-medium">Finance</div>
                    <div className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-[10px] font-medium">Insurance</div>
                    <div className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-[10px] font-medium">Property</div>
                    <div className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-[10px] font-medium">Real Estate</div>
                  </div>
                  {/* Stats Bar */}
                  <div className="bg-white rounded-lg p-2.5 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">1,200+</div>
                        <div className="text-gray-500 text-[9px]">Advisors</div>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">50+</div>
                        <div className="text-gray-500 text-[9px]">Categories</div>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">4.8</div>
                        <div className="text-gray-500 text-[9px]">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="w-[500px] h-[500px] bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-xl flex flex-col justify-center">
                {/* Reviews/Community Mockup */}
                <div className="space-y-4">
                  {/* Review Cards */}
                  <div className="bg-white rounded-xl p-3 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-1.5 bg-gray-200 rounded mb-1.5 w-1/3"></div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded mb-1.5"></div>
                    <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-1.5 bg-gray-200 rounded mb-1.5 w-1/3"></div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded mb-1.5"></div>
                    <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  
                  {/* Rating Summary - Big Card */}
                  <div className="bg-white rounded-xl p-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-gray-900">4.8</div>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1">2,500+ reviews</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-1.5 bg-green-500 rounded w-12"></div>
                          <span className="text-[10px] text-gray-600">5★</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-1.5 bg-green-400 rounded w-10"></div>
                          <span className="text-[10px] text-gray-600">4★</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 bg-green-300 rounded w-8"></div>
                          <span className="text-[10px] text-gray-600">3★</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-lg p-2 shadow-sm text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                      <div className="text-[10px] text-gray-600 font-medium">Verified</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm text-center">
                      <Shield className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                      <div className="text-[10px] text-gray-600 font-medium">Trusted</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm text-center">
                      <Users className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                      <div className="text-[10px] text-gray-600 font-medium">Community</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="w-[500px] h-[500px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl flex flex-col justify-center">
                {/* Articles/Knowledge Mockup - Magazine Style */}
                <div className="space-y-3">
                  {/* Main Article - Magazine Cover Style */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg relative">
                    <div className="relative h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-3 flex flex-col justify-between">
                      {/* Floating icons */}
                      <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute bottom-3 left-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-white" />
                      </div>
                      
                      {/* Title area */}
                      <div className="mt-auto">
                        <div className="h-3 bg-white/80 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-white/60 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="p-3 bg-gradient-to-b from-white to-purple-50/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full border-2 border-white shadow"></div>
                          <div>
                            <div className="h-1.5 bg-gray-300 rounded w-20 mb-1"></div>
                            <div className="h-1 bg-gray-200 rounded w-12"></div>
                          </div>
                        </div>
                        <div className="flex gap-3 text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-[10px] font-medium">4.9</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span className="text-[10px]">128</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Article Grid - Different Layout */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 bg-white rounded-xl p-3 shadow-md">
                      <div className="flex gap-2 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-1.5 bg-gray-200 rounded mb-1.5"></div>
                          <div className="h-1.5 bg-gray-200 rounded w-4/5 mb-1.5"></div>
                          <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-medium">Finance</div>
                        <div className="px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded text-[9px] font-medium">5 min read</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-400 to-red-400 rounded-xl p-3 shadow-md flex flex-col items-center justify-center text-white">
                      <Sparkles className="w-8 h-8 mb-1" />
                      <div className="text-xl font-bold">50+</div>
                      <div className="text-[9px] opacity-90">Experts</div>
                    </div>
                  </div>

                  {/* Knowledge Hub Stats - Creative Layout */}
                  <div className="bg-white rounded-xl p-3 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900">Knowledge Hub</div>
                          <div className="text-[9px] text-gray-500">Expert Articles</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">500+</div>
                        <div className="text-[9px] text-gray-500">Published</div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {coreElements.map((element, index) => {
            const TabIcon = element.icon;
            return (
              <button
                key={element.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                  activeTab === index
                    ? 'bg-white shadow-lg border-2 border-[#16A34A]'
                    : 'bg-white/50 hover:bg-white hover:shadow-md border-2 border-transparent'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${element.color} flex items-center justify-center flex-shrink-0`}>
                  <TabIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">{element.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function WhatIsLoukii() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <LandingHeader />
      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="relative overflow-visible bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 pt-16 pb-32 lg:pt-24 lg:pb-40">
        {/* Simple Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Thumbs Up - Top Left */}
          <div className="absolute left-[5%] top-[15%] animate-float opacity-20">
            <svg className="w-12 h-12 text-[#16A34A]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
          </div>

          {/* Star - Top Right */}
          <div className="absolute right-[8%] top-[20%] animate-float-delayed opacity-20">
            <Star className="w-10 h-10 fill-yellow-400 text-yellow-400" />
          </div>

          {/* Checkmark Circle - Left Middle */}
          <div className="absolute left-[10%] top-[45%] animate-float opacity-15">
            <CheckCircle className="w-14 h-14 text-[#16A34A]" />
          </div>

          {/* Star - Right Bottom */}
          <div className="absolute right-[12%] bottom-[25%] animate-float opacity-20">
            <Star className="w-8 h-8 fill-blue-400 text-blue-400" />
          </div>

          {/* Thumbs Up - Right Middle */}
          <div className="absolute right-[5%] top-[50%] animate-float-delayed opacity-15">
            <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
          </div>

          {/* Small Stars Scattered */}
          <div className="absolute left-[15%] top-[30%] animate-float opacity-25">
            <Star className="w-6 h-6 fill-purple-400 text-purple-400" />
          </div>
          <div className="absolute right-[20%] top-[35%] animate-float-delayed opacity-20">
            <Star className="w-5 h-5 fill-green-400 text-green-400" />
          </div>
        </div>

        {/* Floating Elements - Outside container for better positioning */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Floating Review Card - Top Left (smaller and more to left) */}
          <div className="absolute -left-16 -top-8 lg:-left-20 lg:-top-4 animate-float z-20">
            <div className="bg-white rounded-xl shadow-2xl p-3 max-w-[200px]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div>
                  <p className="font-semibold text-xs text-gray-900">Sarah Ahmad</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                "Very professional and knowledgeable agent. Highly recommend!"
              </p>
            </div>
          </div>

          {/* Floating Rating Badge - Top Right */}
          <div className="absolute -right-8 top-0 lg:-right-16 lg:top-4 animate-float-delayed z-20">
            <div className="bg-gradient-to-br from-[#16A34A] to-[#15803d] rounded-2xl shadow-2xl p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                <span className="text-3xl font-bold">4.8</span>
              </div>
              <p className="text-xs opacity-90">2,500+ Reviews</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 pt-12">
            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find People You Can <span className="relative inline-block">
                <span className="text-gray-900">Trust</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>,<br />
              <span className="text-[#16A34A]">Reviewed by Those Who Know</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Discover advisors and agents through authentic reviews from real clients. Make confident choices backed by community trust.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#16A34A] hover:bg-[#15803d] text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Join Loukii
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-200 transition-all"
              >
                Explore Advisors
              </Link>
            </div>
          </div>
        </div>

        {/* Mockup Image - Full Width, Outside Container */}
        <div className="relative w-full max-w-[1600px] mx-auto px-4 lg:px-12">
          <div className="relative">
            {/* Floating Review Card - Left Side of Mockup */}
            <div className="absolute -left-4 top-1/4 lg:-left-8 lg:top-1/3 animate-float z-20">
              <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Ahmad Razak</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  "Helped me find the best insurance plan. Very patient and helpful!"
                </p>
              </div>
            </div>

            {/* Floating Stats Badge - Right Side of Mockup */}
            <div className="absolute -right-4 top-1/2 lg:-right-8 lg:top-1/2 animate-float-delayed z-20">
              <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-[#16A34A]">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#16A34A] mb-1">1,200+</p>
                  <p className="text-xs text-gray-600 font-medium">Verified Advisors</p>
                </div>
              </div>
            </div>

            {/* Main Mockup Image - Extra Large */}
            <Image
              src="/docs/homepage-mockup-transparent.png"
              alt="Loukii Platform Interface"
              width={1600}
              height={1000}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Add floating animation keyframes */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 3s ease-in-out infinite 1.5s;
          }
        `}</style>
      </section>

      {/* Three Core Elements Section */}
      <CoreElementsSection />

      {/* How to Use Loukii Section */}
      <HowToUseSection />

      {/* What Makes Us Different Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-[#16A34A] font-semibold text-sm uppercase tracking-wider mb-4">WHAT MAKES US DIFFERENT?</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Makes Loukii Different
            </h2>
          </div>

          <div className="grid lg:grid-cols-[30%_40%_30%] gap-12 items-center">
            {/* Left Side - 2 Points */}
            <div className="space-y-12">
              {/* Point 1 */}
              <div>
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Built Around People, Not Companies
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Loukii focuses on individuals — the real agents and advisors you deal with, not just the brands they represent.
                </p>
              </div>

              {/* Point 2 */}
              <div>
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Real Experiences, Not Ratings
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every review comes from real interactions, sharing stories that reflect genuine experiences, not just empty stars or numbers.
                </p>
              </div>
            </div>

            {/* Center - Phone Mockup */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-[630px]">
                <Image
                  src="/docs/mobile-mockup.png"
                  alt="Loukii Mobile App"
                  width={630}
                  height={1260}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Right Side - 2 Points */}
            <div className="space-y-12">
              {/* Point 3 */}
              <div>
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Lightbulb className="w-5 h-5 text-[#16A34A]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Knowledge That Helps You Decide
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Advisors share insights, and users gain knowledge that helps them make every choice clearer.
                </p>
              </div>

              {/* Point 4 */}
              <div>
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  A Fair Platform for Everyone
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Loukii is built to benefit both sides. Users find confidence, advisors earn trust, and the platform grows through balance and honesty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#16A34A] font-semibold text-sm uppercase tracking-wider mb-4">FAQ</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Welcome to Loukii! We've compiled a list of frequently asked questions to help you navigate our platform and make the most of your experience.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden open:border-l-[6px] open:border-l-[#16A34A]">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900">
                  What is Loukii?
                </h3>
                <ChevronDown className="w-5 h-5 text-[#16A34A] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                <p className="leading-relaxed">
                  Loukii is a social trust network that connects service advisors with clients. We provide a platform for advisors to showcase their skills and for clients to find trusted people across various industries — from insurance agents to property consultants, car salesmen to student recruiters.
                </p>
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden open:border-l-[6px] open:border-l-[#16A34A]">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900">
                  How is Loukii different from other review platforms?
                </h3>
                <ChevronDown className="w-5 h-5 text-[#16A34A] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                <p className="leading-relaxed">
                  Loukii focuses on individuals, not companies. We believe the person behind the service matters more than the brand. Every review comes from real interactions, and advisors can share helpful content to educate users before they make decisions.
                </p>
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden open:border-l-[6px] open:border-l-[#16A34A]">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900">
                  Is Loukii free to use?
                </h3>
                <ChevronDown className="w-5 h-5 text-[#16A34A] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                <p className="leading-relaxed">
                  Yes! Loukii is completely free for users to browse advisors, read reviews, and access content. Advisors can create profiles and start building their presence at no cost.
                </p>
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden open:border-l-[6px] open:border-l-[#16A34A]">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900">
                  Who can become an advisor on Loukii?
                </h3>
                <ChevronDown className="w-5 h-5 text-[#16A34A] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                <p className="leading-relaxed">
                  Anyone providing services can join Loukii — from insurance agents and property consultants to car salesmen, student recruiters, and more. We welcome all service advisors who want to build their reputation and connect with clients.
                </p>
              </div>
            </details>

            {/* FAQ 5 */}
            <details className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden open:border-l-[6px] open:border-l-[#16A34A]">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900">
                  How do reviews work on Loukii?
                </h3>
                <ChevronDown className="w-5 h-5 text-[#16A34A] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                <p className="leading-relaxed">
                  Reviews on Loukii come from real client interactions. Users can leave honest feedback about their experience working with an advisor. These reviews help others make informed decisions and help advisors build credibility.
                </p>
              </div>
            </details>

            {/* FAQ 6 */}
            <details className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden open:border-l-[6px] open:border-l-[#16A34A]">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900">
                  Can advisors share content on Loukii?
                </h3>
                <ChevronDown className="w-5 h-5 text-[#16A34A] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                <p className="leading-relaxed">
                  Yes! Advisors can publish helpful content and insights to educate their audience. This helps users understand their options better and helps advisors demonstrate their knowledge and build trust with potential clients.
                </p>
              </div>
            </details>

            {/* FAQ 7 */}
            <details className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden open:border-l-[6px] open:border-l-[#16A34A]">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900">
                  How can I contact an advisor on Loukii?
                </h3>
                <ChevronDown className="w-5 h-5 text-[#16A34A] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                <p className="leading-relaxed">
                  You can connect with advisors directly through Loukii's messaging system. Simply visit their profile and start a conversation. No middlemen, no complicated forms — just straightforward communication.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#16A34A] to-[#15803d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Whether you're looking for trusted advisors or want to build your presence — Loukii is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-[#16A34A] font-bold text-lg rounded-lg transition-all hover:shadow-2xl active:scale-95"
            >
              Join Loukii
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold text-lg rounded-lg transition-all active:scale-95"
            >
              Browse Advisors
              <Search className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dark Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Column 1 - Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/docs/loukii-logo-white.svg"
                  alt="Loukii Logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The Social Review Network connecting service advisors with clients across all industries.
              </p>
            </div>

            {/* Column 2 - Platform */}
            <div>
              <h4 className="font-bold text-lg mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-[#16A34A] transition-colors">Browse Advisors</Link></li>
                <li><Link href="/insights" className="hover:text-[#16A34A] transition-colors">Insights</Link></li>
                <li><Link href="/what-is-loukii" className="hover:text-[#16A34A] transition-colors">What is Loukii</Link></li>
                <li><Link href="/" className="hover:text-[#16A34A] transition-colors">Become an Advisor</Link></li>
              </ul>
            </div>

            {/* Column 3 - Support */}
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="/faq" className="hover:text-[#16A34A] transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-[#16A34A] transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-[#16A34A] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#16A34A] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Column 4 - Connect */}
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#16A34A] transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-[#16A34A] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#16A34A] transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#16A34A] transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 Loukii. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Built with ❤️ by <a href="https://cloudswired.com" target="_blank" rel="noopener noreferrer" className="text-[#16A34A] hover:underline">Cloudswired Technologies</a> • Made in Malaysia 🇲🇾
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
