"use client";

import { YouTubeWidget } from "../types";
import { Trash2, GripVertical } from "lucide-react";

interface YouTubeWidgetRendererProps {
  widget: YouTubeWidget;
  onUpdate: (widget: YouTubeWidget) => void;
  onDelete: () => void;
}

export function YouTubeWidgetRenderer({ widget, onUpdate, onDelete }: YouTubeWidgetRendererProps) {
  // Extract video ID from URL
  const extractVideoId = (url: string): string => {
    if (!url) return '';
    
    // If already just an ID
    if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
      return url;
    }
    
    // Extract from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return url;
  };

  const handleUrlChange = (url: string) => {
    const videoId = extractVideoId(url);
    onUpdate({ ...widget, videoId });
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:border-green-500 transition-colors bg-white">
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button className="p-1 hover:bg-gray-100 rounded cursor-grab">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
        <button onClick={onDelete} className="p-1 hover:bg-red-100 rounded">
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>

      <input
        type="text"
        value={widget.videoId}
        onChange={(e) => handleUrlChange(e.target.value)}
        onPaste={(e) => {
          e.preventDefault();
          const pastedText = e.clipboardData.getData('text');
          handleUrlChange(pastedText);
        }}
        placeholder="Paste YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
        className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
      />

      {widget.videoId && (
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${extractVideoId(widget.videoId)}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded"
          />
        </div>
      )}
    </div>
  );
}
