"use client";

import Image from "next/image";
import { Eye, MessageCircle, Share2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { CommentsModal } from "./comments-modal";

interface ArticleCardProps {
  id: number;
  author: {
    name: string;
    avatar: string;
    role: string;
    verified: boolean;
  };
  title: string;
  description: string;
  category: string;
  image: string;
  publishedAt: string;
  readTime: string;
  stats: {
    views: number;
    comments: number;
    shares: number;
  };
}

export function ArticleCard({
  author,
  title,
  description,
  category,
  image,
  publishedAt,
  readTime,
  stats,
}: ArticleCardProps) {
  const [showComments, setShowComments] = useState(false);

  // Dummy comments data for modal
  const allComments = [
    {
      author: "Sarah Ahmad",
      avatar: "/docs/profile-3.jpg",
      title: "Very Informative Article",
      text: "This article really helped me understand the topic better. The examples were clear and practical. Thank you for sharing!",
      timestamp: "2 days ago",
      helpful: 15,
    },
    {
      author: "Ahmad Razak",
      avatar: "/docs/profile-2.jpg",
      title: "Great Insights",
      text: "Excellent breakdown of the key points. I especially appreciated the section on practical applications.",
      timestamp: "3 days ago",
      helpful: 12,
    },
    {
      author: "Dr. Amirul Hassan",
      avatar: "/docs/profile-1.jpg",
      title: "Well Written",
      text: "As a professional in this field, I can confirm this is accurate and well-researched information.",
      timestamp: "5 days ago",
      helpful: 20,
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <article className="bg-white dark:bg-gray-950 py-6 max-w-3xl mx-auto">
      {/* Author Info */}
      <div className="flex items-start gap-3 mb-4">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
              {author.name}
            </h3>
            {author.verified && (
              <CheckCircle className="w-4 h-4 text-[#16A34A] fill-[#16A34A]" />
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {author.role} · {publishedAt}
          </p>
          <span className="inline-block px-2 py-0.5 md:px-2.5 md:py-1 bg-[#16A34A]/10 text-[#16A34A] text-[10px] md:text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <div className="mb-4 cursor-pointer group">
        <div className="flex gap-3 md:gap-4">
          {/* Left: Text Content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#16A34A] transition-colors line-clamp-2">
              {title}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-2">
              {description}
            </p>
            <p className="text-[10px] md:text-xs text-[#16A34A] font-medium group-hover:underline">
              Read full article →
            </p>
          </div>

          {/* Right: Featured Image */}
          <div className="relative w-24 h-24 md:w-48 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Stats & Actions */}
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 dark:border-gray-800">
        {/* Left: Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>{formatNumber(stats.views)}</span>
          </div>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 hover:text-[#16A34A] transition-colors group/comment"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{formatNumber(stats.comments)}</span>
            <span className="hidden md:inline text-xs ml-1 text-gray-500 dark:text-gray-500 group-hover/comment:text-[#16A34A]">
              • Join the discussion
            </span>
          </button>
          <span className="text-xs">· {readTime}</span>
        </div>

        {/* Right: Actions */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#16A34A] hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-all">
          <Share2 className="w-4 h-4" />
          <span>{stats.shares}</span>
        </button>
      </div>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        comments={allComments}
        totalComments={stats.comments}
      />
    </article>
  );
}
