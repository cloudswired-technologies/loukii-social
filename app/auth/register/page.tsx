"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, Briefcase, Mail, Lock, Eye, EyeOff, CheckCircle, Shield, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const defaultType = searchParams.get("type") === "advisor" ? "advisor" : "user";
  const [userType, setUserType] = useState<"user" | "advisor">(defaultType);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Green Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#16A34A] to-[#15803d] p-8 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/docs/loukii-logo-white.svg"
              alt="Loukii Logo"
              width={100}
              height={28}
              className="h-7 w-auto"
            />
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-xs font-semibold mb-2 opacity-90">★ Join 5,000+ Advisors</p>
            <h1 className="text-4xl font-bold mb-3 leading-tight">
              Build Your Reputation
            </h1>
            <p className="text-lg opacity-90">
              Connect with clients and showcase your expertise on a trusted advisor platform
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5">Verified Reviews</h3>
                <p className="text-xs opacity-80">Real authentic feedback from real clients</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5">Trusted Platform</h3>
                <p className="text-xs opacity-80">Secure and transparent advisor discovery</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5">Quick & Easy</h3>
                <p className="text-xs opacity-80">Get started in minutes, no hassle</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs opacity-75">© 2025 Loukii. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-4">
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Your Account</h2>
            <p className="text-sm text-gray-600">
              {userType === "advisor" 
                ? "Join Loukii as an advisor and build your reputation"
                : "Join Loukii to discover trusted advisors"}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setUserType("user")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                userType === "user"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              User
            </button>
            <button
              type="button"
              onClick={() => setUserType("advisor")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                userType === "advisor"
                  ? "bg-[#16A34A] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Advisor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Gmail
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-500">OR SIGN UP WITH EMAIL</span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#16A34A] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#16A34A] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-9 pr-10 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#16A34A] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-10 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#16A34A] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-3.5 h-3.5 text-[#16A34A] border-gray-300 rounded focus:ring-[#16A34A]"
              />
              <label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
                I agree to Loukii's{" "}
                <Link href="/terms" target="_blank" className="text-[#16A34A] hover:underline font-semibold">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank" className="text-[#16A34A] hover:underline font-semibold">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#16A34A] hover:bg-[#15803d] text-white text-sm font-bold rounded-lg transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Sign In Link */}
            <p className="text-center text-xs text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#16A34A] hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
