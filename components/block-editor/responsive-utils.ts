import { ColumnSettings, DeviceMode } from "./types";

/**
 * Get column width for a specific device with proper inheritance
 * Mobile -> Tablet -> Desktop (fallback chain)
 */
export function getWidthForDevice(
  settings: ColumnSettings | undefined,
  device: DeviceMode,
  defaultWidth: number
): number {
  if (!settings) return defaultWidth;

  if (device === 'mobile') {
    // Mobile: use widthMobile, else widthTablet, else widthDesktop, else width (legacy), else default
    return settings.widthMobile ?? settings.widthTablet ?? settings.widthDesktop ?? settings.width ?? defaultWidth;
  }

  if (device === 'tablet') {
    // Tablet: use widthTablet, else widthDesktop, else width (legacy), else default
    return settings.widthTablet ?? settings.widthDesktop ?? settings.width ?? defaultWidth;
  }

  // Desktop: use widthDesktop, else width (legacy), else default
  return settings.widthDesktop ?? settings.width ?? defaultWidth;
}

/**
 * Get default widths for columns based on column count and device
 */
export function getDefaultWidths(columnCount: 1 | 2 | 3 | 4, device: DeviceMode): number[] {
  // Desktop defaults
  const desktopDefaults: Record<number, number[]> = {
    1: [100],
    2: [50, 50],
    3: [33.33, 33.33, 33.34],
    4: [25, 25, 25, 25]
  };

  // Tablet defaults
  const tabletDefaults: Record<number, number[]> = {
    1: [100],
    2: [50, 50],
    3: [50, 50, 100],      // First 2 side-by-side, 3rd below
    4: [50, 50, 50, 50]    // 2x2 grid
  };

  // Mobile defaults (all stack)
  const mobileDefaults: Record<number, number[]> = {
    1: [100],
    2: [100, 100],
    3: [100, 100, 100],
    4: [100, 100, 100, 100]
  };

  if (device === 'mobile') {
    return mobileDefaults[columnCount];
  }

  if (device === 'tablet') {
    return tabletDefaults[columnCount];
  }

  return desktopDefaults[columnCount];
}

/**
 * Initialize column settings with default widths for all devices
 */
export function initializeColumnSettings(columnCount: 1 | 2 | 3 | 4): ColumnSettings[] {
  const desktopWidths = getDefaultWidths(columnCount, 'desktop');
  const tabletWidths = getDefaultWidths(columnCount, 'tablet');
  const mobileWidths = getDefaultWidths(columnCount, 'mobile');
  
  return desktopWidths.map((width, index) => ({
    widthDesktop: width,
    widthTablet: tabletWidths[index],
    widthMobile: mobileWidths[index],
    padding: '8px',
    margin: '0px'
  }));
}
