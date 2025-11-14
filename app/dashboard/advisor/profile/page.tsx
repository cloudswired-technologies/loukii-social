"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { TiptapEditorPro } from "@/components/tiptap-editor-pro";

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
    shortSummary: "",
    profilePosters: [] as File[],
    serviceCategory: "",
    selectedBrands: [] as string[],
    customBrand: "",
    yearsOfExperience: "",
    licenseNumber: "",
  });

  const [posterPreviews, setPosterPreviews] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [brandSearchQuery, setBrandSearchQuery] = useState("");

  // Service categories and brands data
  const serviceCategories = [
    "Financial Planning",
    "Insurance",
    "Takaful",
    "Investment Advisory",
    "Retirement Planning",
    "Estate Planning"
  ];

  const brandsByCategory: { [key: string]: string[] } = {
    "Financial Planning": ["Prudential BSN", "AIA Malaysia", "Great Eastern", "Manulife"],
    "Insurance": ["Prudential BSN", "AIA Malaysia", "Great Eastern", "Allianz", "Zurich"],
    "Takaful": ["Prudential BSN Takaful", "Takaful Malaysia", "Etiqa Takaful", "Great Eastern Takaful"],
    "Investment Advisory": ["Public Mutual", "Kenanga", "CIMB Principal", "Manulife"],
    "Retirement Planning": ["EPF", "PRS Providers", "Private Pension"],
    "Estate Planning": ["Amanah Raya", "Rockwills", "Wasiyyah Shoppe"]
  };

  const [termsAccepted, setTermsAccepted] = useState(false);

  // Bio content
  const [bioContent, setBioContent] = useState<string>('');

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

  // Handle poster image upload
  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate image dimensions (1000px width x 500px height)
    files.forEach(file => {
      const img = new Image();
      img.onload = () => {
        // Accept exact size or allow any size (will be resized on backend)
        // For now, we'll be flexible and just warn if not optimal
        const isOptimalSize = img.width === 1000 && img.height === 500;
        
        setProfessionalDetails(prev => ({
          ...prev,
          profilePosters: [...prev.profilePosters, file]
        }));
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPosterPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
        
        if (!isOptimalSize) {
          console.warn(`Optimal size is 1000x500px. Your image is ${img.width}x${img.height}px and will be resized.`);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Remove poster
  const removePoster = (index: number) => {
    setProfessionalDetails(prev => ({
      ...prev,
      profilePosters: prev.profilePosters.filter((_, i) => i !== index)
    }));
    setPosterPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Handle short summary word count
  const handleSummaryChange = (text: string) => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length <= 20) {
      setProfessionalDetails(prev => ({ ...prev, shortSummary: text }));
      setWordCount(words.length);
    }
  };

  // Handle brand selection
  const toggleBrand = (brand: string) => {
    setProfessionalDetails(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter(b => b !== brand)
        : [...prev.selectedBrands, brand]
    }));
  };

  // Get available brands based on selected category
  const availableBrands = professionalDetails.serviceCategory 
    ? brandsByCategory[professionalDetails.serviceCategory] || []
    : [];

  // Filter brands based on search query
  const filteredBrands = availableBrands.filter(brand => 
    brand.toLowerCase().includes(brandSearchQuery.toLowerCase())
  );

  // Get custom brands (pending approval) from selected brands
  const customBrands = professionalDetails.selectedBrands.filter(brand => 
    brand.includes("(Pending Approval)")
  );

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
        
        <div className="px-8 pb-0">

        {/* Layout: Step Menu Left + Content Box Right */}
        <div className="flex gap-8 items-start pb-0">
          
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
          <div className="flex-1 bg-white rounded-t-2xl shadow-sm border border-gray-100 border-b-0 px-16 pt-12 pb-12 hover:shadow-md transition-shadow duration-300">
            
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
                    Your professional information and credentials
                  </p>
                </div>

                {/* Short Summary */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Short Summary (20 words max)</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Brief summary about yourself (max 20 words)
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <textarea
                      value={professionalDetails.shortSummary}
                      onChange={(e) => handleSummaryChange(e.target.value)}
                      placeholder="e.g., 5 years experience in financial planning, specializing in retirement and investment strategies"
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                    />
                    <div className="mt-1 text-xs text-blue-600">
                      {wordCount}/20 words
                    </div>
                  </div>
                </div>

                {/* Profile Posters / Slides */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Profile Posters / Slides</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Upload multiple poster images to showcase your services. These will be displayed as slides on your profile. Required size: 1000x500px
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-3">
                      <label className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Poster Images
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePosterUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="mt-2 text-xs text-gray-500">
                        <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Upload multiple poster images to showcase on your profile. These will be displayed as slides on your profile page. Required size: 1000px width × 500px height
                      </p>
                    </div>

                    {/* Poster Previews */}
                    {posterPreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {posterPreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={preview} 
                              alt={`Poster ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              onClick={() => removePoster(index)}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                              {index + 1} image(s) uploaded
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Category */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Service Category <span className="text-red-500">*</span></h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Required: Select your primary service category
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="relative">
                      <select 
                        value={professionalDetails.serviceCategory}
                        onChange={(e) => setProfessionalDetails({
                          ...professionalDetails, 
                          serviceCategory: e.target.value,
                          selectedBrands: [] // Reset brands when category changes
                        })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-600 appearance-none transition-all duration-200 hover:border-gray-300"
                      >
                        <option value="">Select category</option>
                        {serviceCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Required: Select your primary service category
                    </p>
                  </div>
                </div>

                {/* Brands/Companies You Represent */}
                {professionalDetails.serviceCategory && (
                  <div className="mb-5 flex gap-8">
                    <div className="w-48 flex-shrink-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Brands/Companies You Represent <span className="text-red-500">*</span></h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Required: Select at least one brand to continue
                      </p>
                    </div>
                    
                    <div className="flex-1">
                      {availableBrands.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">Select a service category first</p>
                      ) : (
                        <div className="space-y-4">
                          {/* Selected Brands Display */}
                          {professionalDetails.selectedBrands.length > 0 && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <p className="text-xs font-semibold text-green-800 mb-2">Selected Brands ({professionalDetails.selectedBrands.length})</p>
                              <div className="flex flex-wrap gap-2">
                                {professionalDetails.selectedBrands.map(brand => (
                                  <div 
                                    key={brand}
                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                                      brand.includes("(Pending Approval)")
                                        ? "bg-orange-100 text-orange-800 border border-orange-300"
                                        : "bg-white text-gray-800 border border-green-300"
                                    }`}
                                  >
                                    <span>{brand.replace(" (Pending Approval)", "")}</span>
                                    {brand.includes("(Pending Approval)") && (
                                      <span className="text-xs text-orange-600">(Pending)</span>
                                    )}
                                    <button
                                      onClick={() => toggleBrand(brand)}
                                      className="ml-1 hover:bg-red-100 rounded-full p-0.5 transition-colors"
                                      title="Remove"
                                    >
                                      <svg className="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Search Box */}
                          <div className="relative">
                            <input
                              type="text"
                              value={brandSearchQuery}
                              onChange={(e) => setBrandSearchQuery(e.target.value)}
                              placeholder="Search brands..."
                              className="w-full px-3 py-2 pl-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>

                          {/* Brands List */}
                          <div className="max-h-64 overflow-y-auto space-y-2">
                            {/* Approved Brands */}
                            {filteredBrands.length > 0 ? (
                              filteredBrands.map(brand => (
                                <button
                                  key={brand}
                                  onClick={() => toggleBrand(brand)}
                                  className={`w-full flex items-center gap-3 p-3 border rounded-lg transition-colors text-left ${
                                    professionalDetails.selectedBrands.includes(brand)
                                      ? "border-green-500 bg-green-50 hover:bg-green-100"
                                      : "border-gray-200 bg-white hover:bg-gray-50"
                                  }`}
                                >
                                  <div className={`flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0 ${
                                    professionalDetails.selectedBrands.includes(brand)
                                      ? "border-green-600 bg-green-600"
                                      : "border-gray-300"
                                  }`}>
                                    {professionalDetails.selectedBrands.includes(brand) && (
                                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-700 font-medium">{brand}</span>
                                </button>
                              ))
                            ) : null}

                            {/* Add Custom Brand Button (when search has no results) */}
                            {brandSearchQuery.trim() && 
                             filteredBrands.length === 0 && 
                             !customBrands.some(b => b.toLowerCase().includes(brandSearchQuery.toLowerCase())) && (
                              <button
                                onClick={() => {
                                  const customBrandName = `${brandSearchQuery.trim()} (Pending Approval)`;
                                  setProfessionalDetails(prev => ({
                                    ...prev,
                                    selectedBrands: [...prev.selectedBrands, customBrandName]
                                  }));
                                  setBrandSearchQuery("");
                                }}
                                className="w-full flex items-center gap-2 p-3 border-2 border-dashed border-green-300 bg-green-50 rounded-lg hover:bg-green-100 hover:border-green-400 transition-colors text-left"
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg flex-shrink-0">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">Add "{brandSearchQuery}"</p>
                                  <p className="text-xs text-gray-600 mt-0.5">
                                    Will show on your profile & loops. Available in filters after admin approval.
                                  </p>
                                </div>
                              </button>
                            )}

                            {/* No results message */}
                            {!brandSearchQuery.trim() && filteredBrands.length === 0 && customBrands.length === 0 && (
                              <p className="text-sm text-gray-500 italic py-2 text-center">Start typing to search brands...</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Years of Experience */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Years of Experience <span className="text-red-500">*</span></h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Required: Specify your years of experience
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <input
                      type="text"
                      value={professionalDetails.yearsOfExperience}
                      onChange={(e) => setProfessionalDetails({...professionalDetails, yearsOfExperience: e.target.value})}
                      placeholder="e.g., 5 years, 10+ years"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Required: Specify your years of experience
                    </p>
                  </div>
                </div>

                {/* License Number */}
                <div className="mb-5 flex gap-8">
                  <div className="w-48 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">License Number <span className="text-red-500">*</span></h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Required: Your professional license number
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <input
                      type="text"
                      value={professionalDetails.licenseNumber}
                      onChange={(e) => setProfessionalDetails({...professionalDetails, licenseNumber: e.target.value})}
                      placeholder="e.g., REN12345, BNM/A12345"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Required: Your professional license number
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-lg transition-all duration-200"
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
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Personal Bio</h2>
                  <p className="text-sm text-gray-600">
                    Write your professional bio using our Notion-style editor. Type "/" for commands.
                  </p>
                </div>

                {/* Professional Tiptap Editor */}
                <div className="mb-6">
                  <TiptapEditorPro
                    content={bioContent}
                    onChange={setBioContent}
                  />
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
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
                <div className="text-center py-12 text-gray-500">Review & Save content here...</div>
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
