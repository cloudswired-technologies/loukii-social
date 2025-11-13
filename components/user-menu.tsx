"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, ChevronDown, User, LayoutDashboard, Settings, HelpCircle, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const handleDashboard = () => {
    const userType = user?.user_metadata?.user_type;
    const email = user?.email;
    
    if (email === "admin@loukii.com") {
      router.push("/dashboard/admin");
    } else if (userType === "advisor") {
      router.push("/dashboard/advisor");
    } else {
      router.push("/dashboard/reviewer");
    }
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/auth/login")}
          className="flex items-center gap-2 px-6 py-2 bg-[#16A34A] hover:bg-[#15803d] text-white text-sm font-bold rounded-lg transition-all hover:shadow-lg active:scale-95"
        >
          <User className="w-4 h-4" />
          Sign In
        </button>
      </div>
    );
  }

  const userName = user.user_metadata?.full_name || "User";
  const userEmail = user.email || "";
  const userType = user.user_metadata?.user_type || "user";
  const profilePhoto = user.user_metadata?.profile_photo;
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="relative flex items-center gap-3" ref={menuRef}>
      {/* Notification Icon */}
      <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors">
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
      >
        {profilePhoto ? (
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={profilePhoto}
              alt={userName}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 bg-[#16A34A] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">{userInitial}</span>
          </div>
        )}
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {userName}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-950 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
            <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
              {userName}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {userEmail}
            </p>
            <span className="inline-block px-2 py-1 bg-[#16A34A]/10 text-[#16A34A] text-xs font-medium rounded capitalize">
              {userType}
            </span>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button 
              onClick={handleDashboard}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button 
              onClick={() => {
                handleDashboard();
                router.push(userType === "advisor" ? "/dashboard/advisor/profile" : "/dashboard/reviewer/profile");
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Update Profile
            </button>
            <button 
              onClick={() => {
                const userType = user?.user_metadata?.user_type;
                const email = user?.email;
                
                if (email === "admin@loukii.com") {
                  router.push("/dashboard/admin/support");
                } else if (userType === "advisor") {
                  router.push("/dashboard/advisor/support");
                } else {
                  router.push("/dashboard/reviewer/support");
                }
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </button>
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
