"use client";

import { X, ThumbsUp, Flag } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Comment {
  author: string;
  avatar?: string;
  title: string;
  text: string;
  timestamp: string;
  helpful?: number;
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  totalComments: number;
}

export function CommentsModal({ isOpen, onClose, comments, totalComments }: CommentsModalProps) {
  const [helpfulClicks, setHelpfulClicks] = useState<{ [key: number]: boolean }>({});

  if (!isOpen) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleHelpful = (index: number) => {
    setHelpfulClicks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-2 md:p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-950 rounded-xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-950 z-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Reviews ({totalComments})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-800 pb-5 last:border-0">
              {/* User Info */}
              <div className="flex items-start gap-3 mb-3">
                {comment.avatar ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={comment.avatar}
                      alt={comment.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-xs">
                      {getInitials(comment.author)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.timestamp}
                    </span>
                  </div>
                  {/* Review Title */}
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1.5">
                    {comment.title}
                  </h3>
                  {/* Review Text */}
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 ml-13">
                <button
                  onClick={() => toggleHelpful(index)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    helpfulClicks[index]
                      ? "text-[#16A34A]"
                      : "text-gray-600 dark:text-gray-400 hover:text-[#16A34A]"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${helpfulClicks[index] ? "fill-current" : ""}`} />
                  <span>
                    Helpful {comment.helpful && `(${comment.helpful + (helpfulClicks[index] ? 1 : 0)})`}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                  <Flag className="w-4 h-4" />
                  <span>Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={onClose}
            className="ripple w-full py-2.5 bg-[#16A34A] text-white text-sm font-medium rounded-xl hover:bg-[#15803d] transition-all hover:shadow-lg active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
