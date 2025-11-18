"use client";

import { IconWidget } from "../types";
import { useState, useRef, useEffect } from "react";
import { FastColorPicker } from "../fast-color-picker";
import { 
  Heart, Star, ThumbsUp, MessageCircle, Share2, Send,
  Mail, Phone, MapPin, Calendar, Clock, User,
  Users, Home, Settings, Search, Bell, ShoppingCart,
  Check, X, AlertCircle, Info, HelpCircle, Zap,
  Award, Target, TrendingUp, DollarSign, CreditCard, Gift,
  Camera, Image, Video, Music, Headphones, Mic,
  Globe, Wifi, Smartphone, Laptop, Monitor, Printer,
  Download, Upload, Link, ExternalLink, Bookmark, Flag,
  Eye, EyeOff, Lock, Unlock, Key, Shield,
  Smile, Frown, Meh, ThumbsDown, Coffee, Briefcase,
  AlignLeft, AlignCenter, AlignRight
} from "lucide-react";

interface IconWidgetRendererProps {
  widget: IconWidget;
  onUpdate: (widget: IconWidget) => void;
  onDelete: () => void;
}

// Icon map for direct access
const ICON_MAP: Record<string, any> = {
  Heart, Star, ThumbsUp, MessageCircle, Share2, Send,
  Mail, Phone, MapPin, Calendar, Clock, User,
  Users, Home, Settings, Search, Bell, ShoppingCart,
  Check, X, AlertCircle, Info, HelpCircle, Zap,
  Award, Target, TrendingUp, DollarSign, CreditCard, Gift,
  Camera, Image, Video, Music, Headphones, Mic,
  Globe, Wifi, Smartphone, Laptop, Monitor, Printer,
  Download, Upload, Link, ExternalLink, Bookmark, Flag,
  Eye, EyeOff, Lock, Unlock, Key, Shield,
  Smile, Frown, Meh, ThumbsDown, Coffee, Briefcase,
  AlignLeft, AlignCenter, AlignRight
};

// Popular icons list
const POPULAR_ICONS = Object.keys(ICON_MAP);

export function IconWidgetRenderer({ widget, onUpdate, onDelete }: IconWidgetRendererProps) {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get the icon component
  const IconComponent = ICON_MAP[widget.iconName] || HelpCircle;

  // Filter icons based on search
  const filteredIcons = POPULAR_ICONS.filter(icon =>
    icon.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Click outside handler
  useEffect(() => {
    if (!showIconPicker) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current && !dropdownRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setShowIconPicker(false);
      }
    };

    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [showIconPicker]);

  const handleIconClick = () => {
    if (!showIconPicker && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left
      });
    }
    setShowIconPicker(!showIconPicker);
  };

  return (
    <div className="group relative">
      {/* Icon Display */}
      <div
        className={`flex ${
          widget.alignment === 'center' ? 'justify-center' :
          widget.alignment === 'right' ? 'justify-end' :
          'justify-start'
        }`}
      >
        <div
          ref={buttonRef}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleIconClick}
        >
          <IconComponent
            size={widget.size}
            color={widget.color}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Icon Picker Dropdown - Fixed positioning */}
      {showIconPicker && (
        <div 
          ref={dropdownRef}
          className="fixed w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] p-4"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-sm">Icon Settings</h3>
            <button
              onClick={() => setShowIconPicker(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
              />
            </div>

            {/* Icon Grid */}
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2">
              <div className="grid grid-cols-6 gap-2">
                {filteredIcons.map((iconName) => {
                  const Icon = ICON_MAP[iconName];
                  if (!Icon) return null;
                  
                  return (
                    <button
                      key={iconName}
                      onClick={() => {
                        onUpdate({ ...widget, iconName });
                        setSearchQuery('');
                      }}
                      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                        widget.iconName === iconName ? 'bg-green-100 border-2 border-green-500' : 'border border-gray-200'
                      }`}
                      title={iconName}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Size (px)
              </label>
              <input
                type="range"
                min="16"
                max="128"
                value={widget.size}
                onChange={(e) => onUpdate({ ...widget, size: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center mt-1">{widget.size}px</div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Color
              </label>
              <FastColorPicker
                value={widget.color}
                onChange={(color) => onUpdate({ ...widget, color })}
                className="w-full"
              />
            </div>

            {/* Alignment */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Alignment
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate({ ...widget, alignment: 'left' })}
                  className={`flex-1 px-3 py-2 text-xs rounded ${
                    widget.alignment === 'left' ? 'bg-green-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  <AlignLeft className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => onUpdate({ ...widget, alignment: 'center' })}
                  className={`flex-1 px-3 py-2 text-xs rounded ${
                    widget.alignment === 'center' ? 'bg-green-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  <AlignCenter className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => onUpdate({ ...widget, alignment: 'right' })}
                  className={`flex-1 px-3 py-2 text-xs rounded ${
                    widget.alignment === 'right' ? 'bg-green-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  <AlignRight className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
