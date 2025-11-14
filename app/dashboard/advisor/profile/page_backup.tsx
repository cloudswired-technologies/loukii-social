"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdvisorProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "", 
    middleName: "",
    lastName: "",
    email: "", 
    whatsappNumber: "", 
    callNumber: "", 
    country: "Malaysia", 
    state: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
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
        
        {/* Top White Box - Back Button + Page Header - FULL WIDTH */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
          {/* Back Button */}
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Data</h1>
            <p className="text-sm text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </p>
          </div>
        </div>
        
        <div className="px-8">

        {/* Layout: Step Menu Left + Content Box Right */}
        <div className="flex gap-6">
          
          {/* Step Menu (NO background, with BLUE line) */}
          <div className="w-56 flex-shrink-0">
            <div className="relative">
              {/* Vertical BLUE line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600"></div>
              
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index + 1)}
                    className="relative w-full text-left pl-4 group"
                  >
                    <span className={`text-sm ${
                      currentStep === index + 1
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600"
                    }`}>
                      {step}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Box (WHITE Background) */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-10">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                {/* Section Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Personal Information</h2>
                  <p className="text-sm text-gray-500">
                    Your profile photo and contact details
                  </p>
                </div>

                {/* Profile Photo - TWO COLUMN LAYOUT */}
                <div className="mb-6 flex gap-6">
                  {/* LEFT COLUMN - Heading */}
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Profile Photo</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Upload a professional photo to build trust with clients
                    </p>
                  </div>
                  
                  {/* RIGHT COLUMN - Photo Upload */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded hover:bg-gray-50">
                        Choose Photo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Full Name & Email - TWO COLUMN LAYOUT */}
                <div className="mb-6 flex gap-6">
                  {/* LEFT COLUMN - Heading */}
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Full Name</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Your full legal name
                    </p>
                  </div>
                  
                  {/* RIGHT COLUMN - Fields */}
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                          placeholder="Shukry Radzi"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={personalInfo.email}
                          disabled
                          placeholder="shukryradzi@gmail.com"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed (linked to Gmail account)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Numbers - TWO COLUMN LAYOUT */}
                <div className="mb-6 flex gap-6">
                  {/* LEFT COLUMN - Heading */}
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">WhatsApp Number</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Primary contact number
                    </p>
                  </div>
                  
                  {/* RIGHT COLUMN - Fields */}
                  <div className="flex-1">
                  
                    {/* First, Middle, Last name - 3 columns */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          First name
                        </label>
                        <input
                          type="text"
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                          placeholder="Input first name"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Middle name
                        </label>
                        <input
                          type="text"
                          value={personalInfo.middleName}
                          onChange={(e) => setPersonalInfo({...personalInfo, middleName: e.target.value})}
                          placeholder="Input middle name"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={personalInfo.lastName}
                          onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                          placeholder="Input last name"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    {/* Date of birth */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">
                        Date of birth
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Select date"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder:text-gray-400"
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">
                        Gender
                      </label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-600 appearance-none">
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Country of birth & Country of nationality - 2 columns */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Country of birth
                        </label>
                        <div className="relative">
                          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-600 appearance-none">
                            <option value="">Type or select here</option>
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Country of nationality
                        </label>
                        <div className="relative">
                          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-600 appearance-none">
                            <option value="">type or select here</option>
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Martial status */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">
                        Martial status
                      </label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-600 appearance-none">
                          <option value="">Select martial status</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Citizenship country */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">
                        Citizenship country
                      </label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-600 appearance-none">
                          <option value="">Type or select here</option>
                          {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact - TWO COLUMN LAYOUT */}
                <div className="mb-6 flex gap-6">
                  {/* LEFT COLUMN - Heading */}
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Contact</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                  
                  {/* RIGHT COLUMN - Fields */}
                  <div className="flex-1">
                    {/* Fax & Mobile - 2 columns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Fax number (optional)
                        </label>
                        <input
                          type="tel"
                          value={personalInfo.whatsappNumber}
                          onChange={(e) => setPersonalInfo({...personalInfo, whatsappNumber: e.target.value})}
                          placeholder="Input fax number"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Mobile phone number
                        </label>
                        <div className="flex gap-2">
                          <div className="relative">
                            <select className="w-24 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 appearance-none pr-8">
                              <option>+62</option>
                              <option>+60</option>
                              <option>+65</option>
                            </select>
                            <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <input
                            type="tel"
                            value={personalInfo.callNumber}
                            onChange={(e) => setPersonalInfo({...personalInfo, callNumber: e.target.value})}
                            placeholder="Input phone number"
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Professional Details</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
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
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Personal Bio</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
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
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Review & Save</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
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
