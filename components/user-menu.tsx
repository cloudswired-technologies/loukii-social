"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Bell, ChevronDown, User, LayoutDashboard, Settings, HelpCircle, LogOut } from "lucide-react";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3" ref={menuRef}>
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
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="/docs/profile-1.jpg"
            alt="User"
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          Shukry Radzi
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-0 w-64 bg-white dark:bg-gray-950 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
            <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
              Shukry Radzi
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              shukryradzi@gmail.com
            </p>
            <span className="inline-block px-2 py-1 bg-[#16A34A]/10 text-[#16A34A] text-xs font-medium rounded">
              Advisor
            </span>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Advisor Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <Settings className="w-4 h-4" />
              Update Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </button>
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-2">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
