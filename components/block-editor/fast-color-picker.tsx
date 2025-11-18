"use client";

import { useState, useRef, useEffect } from "react";
import { Type } from "lucide-react";

interface FastColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

// Preset colors for quick access
const PRESET_COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#C0C0C0', '#FFD700'
];

export function FastColorPicker({ value, onChange, className = "" }: FastColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Click outside to close
  useEffect(() => {
    if (!showPicker) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        pickerRef.current && !pickerRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [showPicker]);

  const handleColorSelect = (color: string) => {
    setLocalValue(color);
    onChange(color);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Color Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
        title="Change Color"
      >
        <Type className="w-4 h-4 text-gray-600" />
        <div 
          className="w-6 h-6 rounded border border-gray-300"
          style={{ backgroundColor: localValue }}
        />
      </button>

      {/* Color Picker Dropdown */}
      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 w-48"
        >
          {/* Preset Colors */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                className={`w-8 h-8 rounded border-2 hover:scale-110 transition-transform ${
                  localValue === color ? 'border-green-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Custom Color Input */}
          <div className="border-t pt-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Custom Color
            </label>
            <input
              type="text"
              value={localValue}
              onChange={(e) => {
                setLocalValue(e.target.value);
                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                  onChange(e.target.value);
                }
              }}
              placeholder="#000000"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            />
          </div>

          {/* Native color picker as fallback */}
          <div className="border-t pt-3 mt-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Pick from palette
            </label>
            <input
              type="color"
              value={localValue}
              onChange={(e) => handleColorSelect(e.target.value)}
              className="w-full h-8 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
