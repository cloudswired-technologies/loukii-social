"use client";

import { useState } from "react";
import { Star, MessageSquare, ThumbsUp, Flag, Search } from "lucide-react";

export default function AdvisorReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Sarah Ahmad",
      avatar: "SA",
      rating: 5,
      date: "2 days ago",
      title: "Excellent Service and Professional Advice",
      comment: "Very professional and helped me find the perfect takaful plan for my family. The consultation was thorough and all my questions were answered clearly. Highly recommended!",
      helpful: 12,
      replied: true,
      myReply: "Thank you so much for your kind words! It was a pleasure helping you and your family.",
    },
    {
      id: 2,
      author: "Ahmad Razak",
      avatar: "AR",
      rating: 4,
      date: "5 days ago",
      title: "Very Knowledgeable and Patient",
      comment: "Explained everything clearly and helped me make the right decision. Took the time to understand my needs and provided excellent recommendations.",
      helpful: 8,
      replied: false,
    },
    {
      id: 3,
      author: "Nurul Huda",
      avatar: "NH",
      rating: 5,
      date: "1 week ago",
      title: "Amazing Advisor!",
      comment: "Helped me make the right decision for my retirement planning. Very knowledgeable and patient with all my questions.",
      helpful: 15,
      replied: true,
      myReply: "I'm glad I could help! Wishing you all the best for your retirement journey.",
    },
    {
      id: 4,
      author: "Farah Iman",
      avatar: "FI",
      rating: 3,
      date: "2 weeks ago",
      title: "Good but could be better",
      comment: "Service was okay but response time could be improved. Overall satisfied with the outcome.",
      helpful: 3,
      replied: false,
    },
  ];

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (reviewId: number) => {
    // Handle reply submission
    console.log(`Reply to review ${reviewId}:`, replyText);
    setReplyingTo(null);
    setReplyText("");
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Reviews Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and respond to client reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Reviews</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">127</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Rating</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Replies</p>
          <p className="text-2xl font-bold text-yellow-600">2</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Month</p>
          <p className="text-2xl font-bold text-green-600">+8</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#16A34A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{review.avatar}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{review.author}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Review Content */}
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {review.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {review.comment}
            </p>

            {/* Review Actions */}
            <div className="flex items-center gap-4 mb-4">
              <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#16A34A]">
                <ThumbsUp className="w-4 h-4" />
                {review.helpful} helpful
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600">
                <Flag className="w-4 h-4" />
                Report
              </button>
            </div>

            {/* My Reply */}
            {review.replied && review.myReply && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-[#16A34A]" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Your Reply
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {review.myReply}
                </p>
              </div>
            )}

            {/* Reply Form */}
            {!review.replied && (
              <>
                {replyingTo === review.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReply(review.id)}
                        className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803d] text-white font-semibold rounded-lg transition-colors"
                      >
                        Post Reply
                      </button>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingTo(review.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#16A34A] hover:bg-[#15803d] text-white font-semibold rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Reply to Review
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
