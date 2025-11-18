"use client";

import { Monitor, Tablet, Smartphone } from "lucide-react";
import { DeviceMode } from "./types";

interface DeviceSwitcherProps {
  currentDevice: DeviceMode;
  onDeviceChange: (device: DeviceMode) => void;
}

export function DeviceSwitcher({ currentDevice, onDeviceChange }: DeviceSwitcherProps) {
  const devices: { mode: DeviceMode; icon: typeof Monitor; label: string }[] = [
    { mode: 'desktop', icon: Monitor, label: 'Desktop' },
    { mode: 'tablet', icon: Tablet, label: 'Tablet' },
    { mode: 'mobile', icon: Smartphone, label: 'Mobile' },
  ];

  return (
    <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg p-0.5">
      {devices.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => onDeviceChange(mode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            currentDevice === mode
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-white hover:text-gray-900'
          }`}
          title={label}
        >
          <Icon className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
