"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { TextAlign } from '@tiptap/extension-text-align';
import { ParagraphWidget } from "../types";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Strikethrough } from "lucide-react";
import { useState, useRef, useCallback } from 'react';
import { FastColorPicker } from "../fast-color-picker";

interface ParagraphWidgetRendererProps {
  widget: ParagraphWidget;
  onUpdate: (widget: ParagraphWidget) => void;
  onDelete: () => void;
}

export function ParagraphWidgetRenderer({ widget, onUpdate, onDelete }: ParagraphWidgetRendererProps) {
  const [currentColor, setCurrentColor] = useState('#000000');
  const colorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: widget.text || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onUpdate({ ...widget, text: editor.getHTML() });
    },
  });

  // Debounced color change handler
  const handleColorChange = useCallback((color: string) => {
    setCurrentColor(color);
    
    if (!editor) return;
    
    // Clear previous timeout
    if (colorTimeoutRef.current) {
      clearTimeout(colorTimeoutRef.current);
    }
    
    // Debounce the Tiptap command
    colorTimeoutRef.current = setTimeout(() => {
      editor.chain().focus().setColor(color).run();
    }, 50); // Very short delay for responsiveness
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="group relative">
      {/* Toolbar - Always visible, Elementor style */}
      <div className="mb-2 bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex items-center gap-1 flex-wrap">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 hover:bg-gray-100 rounded transition-colors ${
            editor.isActive('bold') ? 'bg-gray-200' : ''
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 hover:bg-gray-100 rounded transition-colors ${
            editor.isActive('italic') ? 'bg-gray-200' : ''
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 hover:bg-gray-100 rounded transition-colors ${
            editor.isActive('strike') ? 'bg-gray-200' : ''
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 hover:bg-gray-100 rounded transition-colors ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 hover:bg-gray-100 rounded transition-colors ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 hover:bg-gray-100 rounded transition-colors ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
          }`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Text Color */}
        <FastColorPicker
          value={currentColor}
          onChange={handleColorChange}
        />
      </div>

      {/* Tiptap Editor */}
      <EditorContent 
        editor={editor} 
        className="tiptap-editor w-full min-h-[100px] px-3 py-2"
      />

      <style jsx global>{`
        .tiptap-editor {
          border: none !important;
          outline: none !important;
        }
        
        .tiptap-editor .ProseMirror {
          outline: none !important;
          border: none !important;
          min-height: 100px;
        }
        
        .tiptap-editor .ProseMirror:focus {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: 'Type your text here...';
          color: #9ca3af;
          float: left;
          height: 0;
          pointer-events: none;
        }
        
        .tiptap-editor .ProseMirror p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
