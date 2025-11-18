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
    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
      {devices.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => onDeviceChange(mode)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            currentDevice === mode
              ? 'bg-green-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={label}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
