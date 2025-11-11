"use client";

import Image from "next/image";
import { MessageCircle, Eye, Star, Share2, User } from "lucide-react";
import { useState } from "react";
import { CommentsModal } from "./comments-modal";

interface LoopCardProps {
  author: {
    name: string;
    role: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  images?: string[];
  stats: {
    rating: number;
    views: number;
    comments: number;
  };
  timestamp: string;
  latestComment?: {
    author: string;
    text: string;
  };
}

export function LoopCard({ author, content, images, stats, timestamp, latestComment }: LoopCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  // Dummy comments data
  const allComments = [
    { 
      author: "Sarah Ahmad", 
      avatar: "/docs/profile-3.jpg",
      title: "Excellent Service and Professional Advice",
      text: "Very professional and helped me find the perfect takaful plan for my family. The consultation was thorough and all my questions were answered clearly.", 
      timestamp: "2 weeks ago",
      helpful: 12
    },
    { 
      author: "Ahmad Razak",
      title: "Highly Knowledgeable and Patient",
      text: "Took the time to explain all the options and helped me understand the differences. Very patient with all my questions and concerns.", 
      timestamp: "1 week ago",
      helpful: 8
    },
    { 
      author: "Nurul Huda",
      avatar: "/docs/profile-2.jpg",
      title: "Great Experience Overall",
      text: "Thank you for the helpful advice! This really clarifies things. Would definitely recommend to friends and family.", 
      timestamp: "5 days ago",
      helpful: 5
    },
    { 
      author: "Farid Hassan",
      title: "Professional and Trustworthy",
      text: "Great insights! Very informative and easy to understand. Made the whole process smooth and stress-free.", 
      timestamp: "3 days ago",
      helpful: 3
    },
    { 
      author: "Siti Aminah",
      avatar: "/docs/profile-1.jpg",
      title: "Best Advisor I've Worked With",
      text: "Highly recommended! Professional and trustworthy advisor. Helped me secure the best plan for my needs and budget.", 
      timestamp: "2 days ago",
      helpful: 7
    },
  ];

  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/60123456789`, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <article className="bg-white dark:bg-gray-950 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-5 mb-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800 shadow-sm"
          />
        </div>
        <div className="flex-1 min-w-0 pt-2">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                {author.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{author.role}</p>
            </div>
            <div className="flex flex-col items-end ml-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stats.rating.toFixed(1)}
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(stats.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="ripple flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 hover:shadow-md">
              <User className="w-4 h-4" />
              View Profile
            </button>
            <button 
              onClick={handleWhatsApp}
              className="ripple flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:bg-[#20BA5A] transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-[15px]">{content}</p>
      </div>

      {/* Image Slider */}
      {images && images.length > 0 && (
        <div 
          className="relative mb-6 group rounded-2xl overflow-hidden shadow-sm"
          onMouseDown={(e) => {
            if (images.length <= 1) return;
            const startX = e.clientX;
            const handleMouseMove = (e: MouseEvent) => {
              const diff = startX - e.clientX;
              if (Math.abs(diff) > 50) {
                if (diff > 0 && currentImageIndex < images.length - 1) {
                  nextImage();
                } else if (diff < 0 && currentImageIndex > 0) {
                  prevImage();
                }
                document.removeEventListener('mousemove', handleMouseMove);
              }
            };
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
          onTouchStart={(e) => {
            if (images.length <= 1) return;
            const touch = e.touches[0];
            const startX = touch.clientX;
            const handleTouchMove = (e: TouchEvent) => {
              const touch = e.touches[0];
              const diff = startX - touch.clientX;
              if (Math.abs(diff) > 50) {
                if (diff > 0 && currentImageIndex < images.length - 1) {
                  nextImage();
                } else if (diff < 0 && currentImageIndex > 0) {
                  prevImage();
                }
                document.removeEventListener('touchmove', handleTouchMove);
              }
            };
            const handleTouchEnd = () => {
              document.removeEventListener('touchmove', handleTouchMove);
              document.removeEventListener('touchend', handleTouchEnd);
            };
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          <div className="relative w-full h-[500px]">
            <Image
              src={images[currentImageIndex]}
              alt="Post content"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Slider Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 hover:scale-110 active:scale-95 shadow-lg"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                disabled={currentImageIndex === images.length - 1}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 hover:scale-110 active:scale-95 shadow-lg"
              >
                →
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Stats & Actions */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{stats.views}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>{stats.comments}</span>
          </div>
        </div>
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#16A34A] transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Latest Comment */}
      {latestComment && (
        <div className="bg-gray-50 dark:bg-gray-900 p-4 mb-3 rounded-xl">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Latest Review</h4>
          <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
            <span className="font-medium">{latestComment.author}</span>
            <span className="mx-2 text-gray-400">·</span>
            <span className="text-gray-500 dark:text-gray-400">2 weeks ago</span>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            "{latestComment.text}"
          </p>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-[#16A34A] transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>Helpful</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              <span>Report</span>
            </button>
          </div>
        </div>
      )}

      {/* View All Comments */}
      <button 
        onClick={() => setShowCommentsModal(true)}
        className="text-sm text-[#16A34A] hover:text-[#15803d] font-medium transition-colors"
      >
        View all comments ({stats.comments}) →
      </button>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        comments={allComments}
        totalComments={stats.comments}
      />
    </article>
  );
}
