"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdvisorProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "", 
    email: "", 
    whatsappNumber: "", 
    callNumber: "", 
    country: "Malaysia", 
    state: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    website: "",
  });
  
  const [professionalDetails, setProfessionalDetails] = useState({
    shortSummary: "", serviceCategory: "", selectedBrands: [] as string[],
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const steps = [
    "Personal Information",
    "Professional Details", 
    "Personal Bio",
    "Review & Save"
  ];

  const countries = ["Malaysia", "Singapore", "Indonesia"];
  const states = ["Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Melaka", "Penang", "Selangor"];

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) setPersonalInfo(prev => ({ ...prev, email: user.email || "" }));
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Top Header */}
        <div className="bg-white px-8 py-6 mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Update Profile</h1>
          <p className="text-sm text-gray-600">
            Complete your professional advisor profile to start connecting with clients
          </p>
        </div>
        
        <div className="px-8">

        {/* Layout: Step Menu Left + Content Box Right */}
        <div className="flex gap-8 items-start">
          
          {/* Step Menu - With Active Indicator */}
          <div className="w-56 flex-shrink-0">
            <div className="relative">
              {/* Continuous vertical line - gray background */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              {/* Active step indicator - green line */}
              <div 
                className="absolute left-0 w-0.5 bg-green-600 transition-all duration-300"
                style={{
                  top: `${(currentStep - 1) * 48}px`,
                  height: '48px'
                }}
              ></div>
              
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index + 1)}
                    className="relative w-full text-left pl-4 py-3 group"
                  >
                    <span className={`text-sm ${
                      currentStep === index + 1
                        ? "text-green-600 font-bold"
                        : "text-gray-500"
                    }`}>
                      {step}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Box (Apple Style) */}
          <div className="flex-1 bg-white rounded-t-2xl shadow-sm border border-gray-100 px-16 pt-12 pb-8 hover:shadow-md transition-shadow duration-300">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                {/* Section Header */}
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Personal Information</h2>
                  <p className="text-sm text-gray-500">
                    Your profile photo and contact details
                  </p>
                </div>

                {/* Profile Photo - TWO COLUMN LAYOUT */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Profile Photo</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Upload a professional photo to build trust with clients
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                        Upload Photo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Full Name & Email */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Full Name</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Your full legal name
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                          placeholder="Shukry Radzi"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={personalInfo.email}
                          disabled
                          placeholder="shukryradzi@gmail.com"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed (linked to Gmail account)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp & Call Number */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">WhatsApp Number</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Primary contact number
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">WhatsApp Number</label>
                        <input
                          type="tel"
                          value={personalInfo.whatsappNumber}
                          onChange={(e) => setPersonalInfo({...personalInfo, whatsappNumber: e.target.value})}
                          placeholder="+60163650045"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Call Number</label>
                        <input
                          type="tel"
                          value={personalInfo.callNumber}
                          onChange={(e) => setPersonalInfo({...personalInfo, callNumber: e.target.value})}
                          placeholder="+60163650045"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Country & State */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Country</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Select your country and state
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Country</label>
                        <div className="relative">
                          <select 
                            value={personalInfo.country}
                            onChange={(e) => setPersonalInfo({...personalInfo, country: e.target.value})}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-600 appearance-none transition-all duration-200 hover:border-gray-300">
                            <option value="">Select country</option>
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">State/Region</label>
                        <div className="relative">
                          <select 
                            value={personalInfo.state}
                            onChange={(e) => setPersonalInfo({...personalInfo, state: e.target.value})}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-600 appearance-none transition-all duration-200 hover:border-gray-300">
                            <option value="">Select state</option>
                            {states.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Social Media Links</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Adding social media links helps build trust and allows clients to learn more about you
                    </p>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-32">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span className="text-sm text-gray-700">Facebook</span>
                      </div>
                      <input
                        type="url"
                        value={personalInfo.facebook}
                        onChange={(e) => setPersonalInfo({...personalInfo, facebook: e.target.value})}
                        placeholder="https://facebook.com/"
                        className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-32">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span className="text-sm text-gray-700">LinkedIn</span>
                      </div>
                      <input
                        type="url"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                        placeholder="https://linkedin.com/"
                        className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-32">
                        <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                        </svg>
                        <span className="text-sm text-gray-700">Instagram</span>
                      </div>
                      <input
                        type="url"
                        value={personalInfo.instagram}
                        onChange={(e) => setPersonalInfo({...personalInfo, instagram: e.target.value})}
                        placeholder="https://instagram.com/"
                        className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-32">
                        <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span className="text-sm text-gray-700">Twitter / X</span>
                      </div>
                      <input
                        type="url"
                        value={personalInfo.twitter}
                        onChange={(e) => setPersonalInfo({...personalInfo, twitter: e.target.value})}
                        placeholder="https://twitter.com/"
                        className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-32">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                        </svg>
                        <span className="text-sm text-gray-700">Personal Website</span>
                      </div>
                      <input
                        type="url"
                        value={personalInfo.website}
                        onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                        placeholder="https://yourwebsite.com/"
                        className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end pt-8 mt-8 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Next: Professional Details
                  </button>
                </div>

              </div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Professional Details</h2>
                  <p className="text-sm text-gray-600">
                    Fill in your information step by step to create your professional advisor profile
                  </p>
                </div>
                <div className="text-center py-12 text-gray-500">Step 2 content here...</div>
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Personal Bio */}
            {currentStep === 3 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Personal Bio</h2>
                  <p className="text-sm text-gray-600">
                    Fill in your information step by step to create your professional advisor profile
                  </p>
                </div>
                <div className="text-center py-12 text-gray-500">Step 3 content here...</div>
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Save */}
            {currentStep === 4 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Review & Save</h2>
                  <p className="text-sm text-gray-600">
                    Fill in your information step by step to create your professional advisor profile
                  </p>
                </div>
                <div className="text-center py-12 text-gray-500">Step 4 content here...</div>
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg"
                  >
                    Save All Changes
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
