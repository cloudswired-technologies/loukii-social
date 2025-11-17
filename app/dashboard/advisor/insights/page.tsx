"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react";
import Link from "next/link";

interface Insight {
  id: string;
  title: string;
  excerpt: string;
  status: 'draft' | 'published';
  createdAt: string;
  views: number;
}

export default function ManageInsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      title: 'Understanding Takaful Insurance',
      excerpt: 'A comprehensive guide to Islamic insurance principles and how they benefit you...',
      status: 'published',
      createdAt: '2024-01-15',
      views: 245
    },
    {
      id: '2',
      title: 'Retirement Planning in Malaysia',
      excerpt: 'Essential strategies for securing your financial future in retirement...',
      status: 'draft',
      createdAt: '2024-01-10',
      views: 0
    },
  ]);

  const deleteInsight = (id: string) => {
    if (confirm('Are you sure you want to delete this insight?')) {
      setInsights(insights.filter(i => i.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Top Header */}
        <div className="bg-white px-4 md:px-8 py-6 mb-6 md:mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Manage Insights</h1>
            <p className="text-sm text-gray-600">
              Share your knowledge and expertise through blog posts
            </p>
          </div>
          <Link
            href="/dashboard/advisor/insights/new"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" />
            New Insight
          </Link>
        </div>
        
        <div className="px-4 md:px-8 pb-8">
          {/* Insights List */}
          {insights.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No insights yet</h3>
              <p className="text-sm text-gray-600 mb-6">
                Start sharing your knowledge by creating your first insight
              </p>
              <Link
                href="/dashboard/advisor/insights/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Create First Insight
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {insight.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          insight.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {insight.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {insight.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Created: {new Date(insight.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {insight.views} views
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/dashboard/advisor/insights/edit/${insight.id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5 text-gray-600" />
                      </Link>
                      <button
                        onClick={() => deleteInsight(insight.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
