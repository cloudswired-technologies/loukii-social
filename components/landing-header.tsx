"use client";

import Link from "next/link";
import Image from "next/image";

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/docs/loukii-logo.svg"
              alt="Loukii"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#16A34A] transition-colors">
              Advisors
            </Link>
            <Link href="/insights" className="text-sm font-medium text-gray-700 hover:text-[#16A34A] transition-colors">
              Insights
            </Link>
            <Link href="/account" className="text-sm font-medium text-gray-700 hover:text-[#16A34A] transition-colors">
              Account
            </Link>
            <Link href="/what-is-loukii" className="text-sm font-medium text-gray-700 hover:text-[#16A34A] transition-colors">
              What is Loukii
            </Link>
            <Link href="/learn" className="text-sm font-medium text-gray-700 hover:text-[#16A34A] transition-colors">
              Learn more
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-[#16A34A] transition-colors">
              FAQ
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/signup"
            className="px-6 py-2.5 bg-[#16A34A] hover:bg-[#15803d] text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            Create An Account
          </Link>
        </div>
      </div>
    </header>
  );
}
