"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { TiptapEditorPro } from "@/components/tiptap-editor-pro";

export default function NewInsightPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // TODO: Save to database
    setTimeout(() => {
      setSaving(false);
      router.push('/dashboard/advisor/insights');
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Top Header */}
        <div className="bg-white px-4 md:px-8 py-4 mb-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/advisor/insights"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">New Insight</h1>
              <p className="text-sm text-gray-600">Create a new blog post</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="draft">Save as Draft</option>
              <option value="published">Publish</option>
            </select>
            <button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
        
        <div className="px-4 md:px-8 pb-8 max-w-5xl mx-auto">
          {/* Title Input */}
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter insight title..."
              className="w-full text-3xl font-bold border-none outline-none focus:ring-0 placeholder:text-gray-300"
            />
          </div>

          {/* Tiptap Editor */}
          <div className="bg-white rounded-xl border border-gray-200">
            <TiptapEditorPro
              content={content}
              onChange={setContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
