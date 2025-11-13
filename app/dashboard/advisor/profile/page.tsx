"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Briefcase, MapPin, Phone, Mail, Globe, Save, Upload } from "lucide-react";

export default function AdvisorProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    position: "",
    bio: "",
    phone: "",
    email: "",
    website: "",
    location: "",
    specialization: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      // Pre-fill form with existing data
      if (user) {
        setFormData({
          fullName: user.user_metadata?.full_name || "",
          company: user.user_metadata?.company || "",
          position: user.user_metadata?.position || "",
          bio: user.user_metadata?.bio || "",
          phone: user.user_metadata?.phone || "",
          email: user.email || "",
          website: user.user_metadata?.website || "",
          location: user.user_metadata?.location || "",
          specialization: user.user_metadata?.specialization || "",
        });
      }
      
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          company: formData.company,
          position: formData.position,
          bio: formData.bio,
          phone: formData.phone,
          website: formData.website,
          location: formData.location,
          specialization: formData.specialization,
        },
      });

      if (error) throw error;
      
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error instanceof Error ? error.message : "Failed to update profile" 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A34A]"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update your profile information and manage your public presence
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === "success" 
            ? "bg-green-50 border border-green-200 text-green-800" 
            : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Profile Picture
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-[#16A34A] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-4xl font-bold">
                  {formData.fullName.charAt(0) || "A"}
                </span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Upload className="w-4 h-4" />
                Upload Photo
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h2>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Company & Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Your position"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  placeholder="Tell us about yourself and your expertise..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="+60 12-345 6789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>
              </div>

              {/* Website & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Specialization
                </label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., Insurance, Takaful, Investment Planning"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold rounded-lg transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
