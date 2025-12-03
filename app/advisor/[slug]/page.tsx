"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { createClient } from "@/lib/supabase/client";
import { 
  Home,
  LayoutDashboard,
  User,
  Star,
  MessageSquare,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  FileText,
  Instagram, 
  Twitter, 
  Youtube, 
  CheckCircle, 
  MapPin,
  Briefcase,
  Award,
  ThumbsUp,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  BookOpen,
  Lightbulb,
  Flag,
} from "lucide-react";

export default function AdvisorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const [advisor, setAdvisor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loops, setLoops] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const supabase = createClient();

  // Fetch advisor data and loops
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch advisor profile
        const { data: advisorData, error: advisorError } = await supabase
          .from('advisor_profiles')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();

        if (advisorData) {
          const transformedData = {
            id: advisorData.id,
            user_id: advisorData.user_id,
            slug: slug,
            full_name: advisorData.full_name,
            profile_photo_url: advisorData.profile_photo_url || '/docs/profile-2.jpg',
            short_summary: advisorData.short_summary || 'Professional advisor',
            whatsapp_number: advisorData.whatsapp_number || '',
            call_number: advisorData.call_number || '',
            email: advisorData.email || '',
            is_verified: true,
            country: advisorData.country || 'Malaysia',
            state: advisorData.state || '',
            service_category: advisorData.service_category || 'Financial Planning',
            brands: Array.isArray(advisorData.brands) ? advisorData.brands : [],
            years_of_experience: advisorData.years_of_experience || '0',
            instagram_url: advisorData.instagram_url,
            twitter_url: advisorData.twitter_url,
            facebook_url: advisorData.facebook_url,
            linkedin_url: advisorData.linkedin_url,
            website_url: advisorData.website_url,
            profile_posters: Array.isArray(advisorData.profile_posters) && advisorData.profile_posters.length > 0 
              ? advisorData.profile_posters 
              : ['/docs/featured-img-1.jpg', '/docs/featured-img-2.jpg'],
            rating: advisorData.rating || 4.8,
            total_reviews: advisorData.total_reviews || 124,
            total_posts: advisorData.total_insights || 10,
            profile_views: advisorData.profile_views || 50,
            followers: 12700,
            following: 221,
          };
          setAdvisor(transformedData);

          // Create loops from profile_posters (each image becomes a loop post)
          console.log('🔍 Profile posters:', transformedData.profile_posters);
          
          if (transformedData.profile_posters && transformedData.profile_posters.length > 0) {
            const loopsFromPosters = transformedData.profile_posters.map((imageUrl: string, index: number) => ({
              id: `loop-${index}`,
              user_id: advisorData.user_id,
              images: [imageUrl],
              content: transformedData.short_summary,
              caption: `Post ${index + 1}`,
              likes_count: Math.floor(Math.random() * 100) + 10,
              comments_count: Math.floor(Math.random() * 30) + 5,
              is_published: true,
            }));
            
            console.log('✅ Created loops from posters:', loopsFromPosters);
            setLoops(loopsFromPosters);
            
            // Initialize image index for each loop
            const initialIndexes: { [key: string]: number } = {};
            loopsFromPosters.forEach((loop: any) => {
              initialIndexes[loop.id] = 0;
            });
            setCurrentImageIndex(initialIndexes);
          } else {
            console.log('❌ No profile posters found');
          }
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const nextImage = (loopId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [loopId]: prev[loopId] === totalImages - 1 ? 0 : prev[loopId] + 1
    }));
  };

  const prevImage = (loopId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [loopId]: prev[loopId] === 0 ? totalImages - 1 : prev[loopId] - 1
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!advisor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "advisors", label: "Advisors", icon: User, href: "/advisors" },
    { id: "insights", label: "Insights", icon: FileText, href: "/insights" },
  ];

  const agentSections = [
    { id: "profile-poster", label: "Profile Poster", icon: ImageIcon, href: "#profile-poster" },
    { id: "personal-bio", label: "Personal Bio", icon: BookOpen, href: "#personal-bio" },
    { id: "submitted-insight", label: "Submitted Insight", icon: Lightbulb, href: "#submitted-insight" },
    { id: "reviews", label: "Reviews", icon: Star, href: "#reviews" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <DashboardHeader />
      <div className="h-[65px]"></div>
      
      {/* 3-Column Layout */}
      <div className="flex h-[calc(100vh-65px)]">
        
        {/* LEFT SIDEBAR - Navigation */}
        <aside className="w-[20%] bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 flex-shrink-0">
          <div className="p-4 md:p-6 flex-1">
            <nav className="space-y-6">
              {/* Main Navigation */}
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-[#16A34A] transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Agent Information Section */}
              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {advisor?.full_name || 'Advisor'} Information
                </h3>
                <div className="space-y-1">
                  {agentSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <a
                        key={section.id}
                        href={section.href}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-[#16A34A] hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{section.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
          <div className="p-6 pt-4 border-t border-gray-200 bg-white">
            <p className="text-xs text-gray-500 leading-relaxed">
              © Copyright 2025 Loukii<br />
              Powered by Cloudswired Technologies
            </p>
          </div>
        </aside>

        {/* CENTER CONTENT - Profile Content */}
        <main className="flex-1 max-w-3xl mx-auto p-6 overflow-y-auto">

          {/* Profile Posters Section */}
          <div id="profile-poster" className="bg-white mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Posters</h2>
            
            {advisor.profile_posters && advisor.profile_posters.length > 0 && (
              <div className="relative bg-gray-100 group">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={advisor.profile_posters[currentImageIndex['main'] || 0]}
                    alt="Profile poster"
                    fill
                    className="object-cover"
                  />

                  {/* Navigation Arrows */}
                  {advisor.profile_posters.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(prev => ({
                          ...prev,
                          main: prev['main'] === 0 ? advisor.profile_posters.length - 1 : (prev['main'] || 0) - 1
                        }))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(prev => ({
                          ...prev,
                          main: (prev['main'] || 0) === advisor.profile_posters.length - 1 ? 0 : (prev['main'] || 0) + 1
                        }))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-900" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
                    {(currentImageIndex['main'] || 0) + 1}/{advisor.profile_posters.length}
                  </div>
                </div>

                {/* Thumbnail Dots */}
                <div className="flex items-center justify-center gap-2 py-4 bg-white">
                  {advisor.profile_posters.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(prev => ({ ...prev, main: index }))}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === (currentImageIndex['main'] || 0)
                          ? 'bg-blue-600 w-6'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Personal Bio Section */}
          <div id="personal-bio" className="bg-white mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">About Me</h2>
            {advisor.bio_content ? (
              <div 
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: advisor.bio_content }}
              />
            ) : (
              <p className="text-gray-500 text-sm">No bio available.</p>
            )}
          </div>

          {/* Testimonials / Reviews Section */}
          <div id="reviews" className="bg-white mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Testimonials & Reviews</h2>
            
            {/* Submit Review Form */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Write a Review</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <button key={i} className="hover:scale-110 transition-transform">
                        <Star className="w-6 h-6 text-gray-300 hover:text-yellow-400" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Share your experience..."
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Submit Review
                </button>
              </div>
            </div>

            {/* Existing Reviews */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <Image
                    src="/docs/profile-2.jpg"
                    alt="Reviewer"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">John Doe</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">2 days ago</p>
                    <p className="text-sm text-gray-700 mb-3">
                      Excellent service! Very professional and knowledgeable. Highly recommended for anyone looking for financial advice.
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-green-600 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Helpful (12)</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-600 transition-colors">
                        <Flag className="w-3.5 h-3.5" />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-3">
                  <Image
                    src="/docs/profile-2.jpg"
                    alt="Reviewer"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">Sarah Lee</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">1 week ago</p>
                    <p className="text-sm text-gray-700 mb-3">
                      Great experience working with this advisor. Very patient and explains everything clearly.
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-green-600 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Helpful (8)</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-600 transition-colors">
                        <Flag className="w-3.5 h-3.5" />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div id="submitted-insight" className="bg-white">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Insights</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-700">
                  <Image
                    src="/docs/featured-img-1.jpg"
                    alt="Insight"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    Financial Planning Tips
                  </h4>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-32 bg-gradient-to-br from-green-500 to-green-700">
                  <Image
                    src="/docs/featured-img-2.jpg"
                    alt="Insight"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    Investment Strategies
                  </h4>
                  <p className="text-xs text-gray-500">5 days ago</p>
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* RIGHT SIDEBAR - Profile Summary */}
        <aside className="w-[25%] bg-white border-l border-gray-200 h-screen sticky top-0 p-6 overflow-y-auto flex-shrink-0">
          
          {/* Profile Summary Card */}
          <div className="mb-6">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="relative mb-3">
                <Image
                  src={advisor.profile_photo_url}
                  alt={advisor.full_name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                {advisor.is_verified && (
                  <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <h2 className="font-bold text-lg text-gray-900">{advisor.full_name}</h2>
              <p className="text-sm text-gray-600">
                {advisor.service_category}
                {advisor.brands && advisor.brands.length > 0 && ` | ${advisor.brands.join(', ')}`}
              </p>
              <p className="text-xs text-gray-500 mt-1">{advisor.state}, {advisor.country}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="font-bold text-lg text-gray-900">{advisor.rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900">{(advisor.total_reviews / 1000).toFixed(1)}K</div>
                <div className="text-xs text-gray-500">Reviews</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900">{advisor.total_posts || 10}</div>
                <div className="text-xs text-gray-500">Insights</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900">{advisor.profile_views || 50}</div>
                <div className="text-xs text-gray-500">Views</div>
              </div>
            </div>

            {/* About Me Preview */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">About Me</h3>
              <p className="text-xs text-gray-600 line-clamp-3">
                {advisor.short_summary}
              </p>
              <button className="text-xs text-blue-600 hover:underline mt-2">Read More</button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 mb-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
                Post
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition-colors text-sm">
                Message
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-sm text-gray-900 mb-4">Contact Information</h3>
            
            <div className="space-y-3">
              {/* Phone */}
              {advisor.whatsapp_number && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-0.5">Phone Number</div>
                    <div className="text-sm text-gray-900 font-medium">+{advisor.whatsapp_number}</div>
                  </div>
                </div>
              )}

              {/* Email */}
              {advisor.email && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-0.5">Email Address</div>
                    <div className="text-sm text-gray-900 font-medium truncate">{advisor.email}</div>
                  </div>
                </div>
              )}

              {/* Website */}
              {advisor.website_url && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-0.5">Website</div>
                    <a href={advisor.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate block">
                      {advisor.website_url.replace('https://', '')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-xs text-gray-500 mb-3">Social Media</h4>
              <div className="flex gap-2">
                {advisor.instagram_url && (
                  <a href={advisor.instagram_url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                    <Instagram className="w-4 h-4 text-gray-700" />
                  </a>
                )}
                {advisor.twitter_url && (
                  <a href={advisor.twitter_url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                    <Twitter className="w-4 h-4 text-gray-700" />
                  </a>
                )}
                {advisor.youtube_url && (
                  <a href={advisor.youtube_url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                    <Youtube className="w-4 h-4 text-gray-700" />
                  </a>
                )}
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
