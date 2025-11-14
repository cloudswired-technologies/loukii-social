"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  User, Phone, Mail, Globe, Upload, ChevronRight,
  Facebook, Instagram, Linkedin, Twitter, MapPin, Briefcase,
  FileText, Image as ImageIcon, Save, CheckCircle, Check
} from "lucide-react";

export default function AdvisorProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Step 1: Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    callNumber: "",
    country: "Malaysia",
    state: "",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    websiteUrl: "",
  });

  // Step 2: Professional Details
  const [professionalDetails, setProfessionalDetails] = useState({
    shortSummary: "",
    serviceCategory: "",
    selectedBrands: [] as string[],
    customBrand: "",
    yearsOfExperience: "",
    licenseNumber: "",
  });

  // Step 3: Personal Bio (will add builder later)
  const [personalBio, setPersonalBio] = useState({
    bioContent: "",
  });

  // Step 4: Terms acceptance
  const [termsAccepted, setTermsAccepted] = useState(false);

  const steps = [
    { id: 1, name: "Personal Information", desc: "Profile photo & contact details" },
    { id: 2, name: "Professional Details", desc: "Credentials & experience" },
    { id: 3, name: "Personal Bio", desc: "Build your profile content" },
    { id: 4, name: "Review & Save", desc: "Confirm & publish profile" },
  ];

  // Mock data
  const countries = ["Malaysia", "Singapore", "Indonesia"];
  const states = ["Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Melaka", "Penang", "Selangor"];
  const categories = [
    "Property & Real Estate",
    "Insurance & Takaful",
    "Financial Planning",
    "Investment Advisory"
  ];
  const brands = [
    "IQI Realty", "Hartamas", "GS Realty", "PropNex", "Chester",
    "Prudential", "Great Eastern", "AIA", "Manulife"
  ];

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setPersonalInfo(prev => ({ ...prev, email: user.email || "" }));
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // Save logic here
    setTimeout(() => setSaving(false), 1000);
  };

  const wordCount = professionalDetails.shortSummary.trim().split(/\s+/).filter(Boolean).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A34A]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {/* Page Header */}
        <div className="bg-white dark:bg-gray-950 px-8 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h1>
        </div>

        {/* Step Indicator */}
        <div className="bg-white dark:bg-gray-950 px-8 py-4">
          <div className="flex items-center max-w-2xl">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center gap-2 ${step < 2 ? 'flex-1' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step 
                      ? 'bg-[#16A34A] text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {step}
                  </div>
                  <span className={`text-sm font-medium ${
                    currentStep >= step 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Personal Info' : 'Professional Details'}
                  </span>
                </div>
                {step < 2 && (
                  <div className={`h-0.5 flex-1 mx-4 ${
                    currentStep > step ? 'bg-[#16A34A]' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="px-8 pb-8 pt-6">
          <div className="max-w-3xl">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Profile Photo</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-[#16A34A] rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {personalInfo.fullName.charAt(0) || "A"}
                      </span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </button>
                    <p className="text-xs text-gray-500">JPG, PNG. Max 2MB</p>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={personalInfo.fullName}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={personalInfo.email}
                            disabled
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          WhatsApp Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            value={personalInfo.whatsappNumber}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, whatsappNumber: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="+60 12-345 6789"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Call Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            value={personalInfo.callNumber}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, callNumber: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="+60 12-345 6789"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Country *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <select
                            value={personalInfo.country}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value, state: "" })}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="">Select country</option>
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          State/Region *
                        </label>
                        <select
                          value={personalInfo.state}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, state: e.target.value })}
                          disabled={!personalInfo.country}
                          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Select state</option>
                          {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Social Media Links</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Facebook
                      </label>
                      <div className="relative">
                        <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={personalInfo.facebookUrl}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, facebookUrl: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="https://facebook.com/yourprofile"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Instagram
                      </label>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={personalInfo.instagramUrl}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, instagramUrl: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="https://instagram.com/yourprofile"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        LinkedIn
                      </label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={personalInfo.linkedinUrl}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, linkedinUrl: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Twitter / X
                      </label>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={personalInfo.twitterUrl}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, twitterUrl: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="https://twitter.com/yourprofile"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Personal Website
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={personalInfo.websiteUrl}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, websiteUrl: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#16A34A] hover:bg-[#15803d] text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Next: Professional Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Short Summary */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Short Summary</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Brief summary about yourself (max 20 words)
                    </label>
                    <textarea
                      value={professionalDetails.shortSummary}
                      onChange={(e) => setProfessionalDetails({ ...professionalDetails, shortSummary: e.target.value })}
                      rows={2}
                      maxLength={150}
                      className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                      placeholder="e.g., Experienced property consultant specializing in residential and commercial real estate"
                    />
                    <p className={`text-xs mt-1 ${wordCount > 20 ? 'text-red-600' : 'text-gray-500'}`}>
                      {wordCount}/20 words
                    </p>
                  </div>
                </div>

                {/* Service Category */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Service Category</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Primary Service Category *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={professionalDetails.serviceCategory}
                        onChange={(e) => setProfessionalDetails({ ...professionalDetails, serviceCategory: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Select category</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Brands/Companies You Represent</h2>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={professionalDetails.selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProfessionalDetails({
                                ...professionalDetails,
                                selectedBrands: [...professionalDetails.selectedBrands, brand]
                              });
                            } else {
                              setProfessionalDetails({
                                ...professionalDetails,
                                selectedBrands: professionalDetails.selectedBrands.filter(b => b !== brand)
                              });
                            }
                          }}
                          className="w-4 h-4 text-[#16A34A] border-gray-300 rounded focus:ring-[#16A34A]"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Add Custom Brand (pending admin approval)
                    </label>
                    <input
                      type="text"
                      value={professionalDetails.customBrand}
                      onChange={(e) => setProfessionalDetails({ ...professionalDetails, customBrand: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>

                {/* Experience & License */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Professional Credentials</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Years of Experience
                      </label>
                      <input
                        type="text"
                        value={professionalDetails.yearsOfExperience}
                        onChange={(e) => setProfessionalDetails({ ...professionalDetails, yearsOfExperience: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="e.g., 5 years, 10+ years"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        License Number
                      </label>
                      <input
                        type="text"
                        value={professionalDetails.licenseNumber}
                        onChange={(e) => setProfessionalDetails({ ...professionalDetails, licenseNumber: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="e.g., REN12345, E1234"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Back
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#16A34A] hover:bg-[#15803d] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
