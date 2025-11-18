"use client";

import { useState, useRef, useEffect } from "react";
import { ParagraphWidget } from "../types";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type } from "lucide-react";

interface ParagraphWidgetRendererProps {
  widget: ParagraphWidget;
  onUpdate: (widget: ParagraphWidget) => void;
  onDelete: () => void;
}

export function ParagraphWidgetRenderer({ widget, onUpdate, onDelete }: ParagraphWidgetRendererProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onUpdate({ ...widget, text: editorRef.current.innerHTML });
    }
  };

  const handleColorChange = (color: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    if (range.collapsed) return; // No text selected
    
    // Create span with color
    const span = document.createElement('span');
    span.style.color = color;
    
    // Wrap selected content
    try {
      range.surroundContents(span);
    } catch (e) {
      // If surroundContents fails (complex selection), use execCommand fallback
      document.execCommand('foreColor', false, color);
    }
    
    // Save changes immediately (no debounce for better UX)
    if (editorRef.current) {
      onUpdate({ ...widget, text: editorRef.current.innerHTML });
    }
  };

  const updateAlignment = (align: 'left' | 'center' | 'right') => {
    onUpdate({ ...widget, alignment: align });
  };

  useEffect(() => {
    if (editorRef.current && widget.text !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = widget.text || '';
    }
  }, []);

  return (
    <div className="group relative">
      {/* WYSIWYG Toolbar - Always visible like Elementor */}
      <div className="mb-2 bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex items-center gap-1">
          {/* Text Formatting */}
          <button
            onClick={() => applyFormat('bold')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('italic')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('underline')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Alignment */}
          <button
            onClick={() => updateAlignment('left')}
            className={`p-2 hover:bg-gray-100 rounded ${widget.alignment === 'left' ? 'bg-gray-100' : ''}`}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => updateAlignment('center')}
            className={`p-2 hover:bg-gray-100 rounded ${widget.alignment === 'center' ? 'bg-gray-100' : ''}`}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => updateAlignment('right')}
            className={`p-2 hover:bg-gray-100 rounded ${widget.alignment === 'right' ? 'bg-gray-100' : ''}`}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Text Color */}
          <div className="flex items-center gap-1">
            <Type className="w-4 h-4 text-gray-600" />
            <input
              type="color"
              defaultValue="#000000"
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-8 h-6 cursor-pointer"
              title="Text Color (applies to selected text)"
            />
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Font Size */}
          <select
            value={widget.fontSize || '16px'}
            onChange={(e) => onUpdate({ ...widget, fontSize: e.target.value })}
            className="px-2 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="28px">28px</option>
            <option value="32px">32px</option>
          </select>
      </div>

      {/* Editable Content */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="w-full min-h-[100px] outline-none px-2 py-2 rounded border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all"
        style={{
          textAlign: widget.alignment || 'left',
          fontSize: widget.fontSize || '16px'
        }}
        data-placeholder="Enter paragraph text..."
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
