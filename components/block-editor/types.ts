// Widget types for block editor
export type WidgetType = 
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'youtube'
  | 'column'
  | 'table'
  | 'horizontal-line'
  | 'button'
  | 'icon'
  | 'list';

export interface BaseWidget {
  id: string;
  type: WidgetType;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  padding?: string; // e.g., "16px"
  margin?: string; // e.g., "8px"
  color?: string; // Text color e.g., "#000000"
}

export interface HeadingWidget extends BaseWidget {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  alignment: 'left' | 'center' | 'right';
}

export interface ParagraphWidget extends BaseWidget {
  type: 'paragraph';
  text: string;
  alignment: 'left' | 'center' | 'right' | 'justify';
  fontSize?: string; // e.g., "16px", "1rem"
}

export interface ImageWidget extends BaseWidget {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
  width: string;
  alignment: 'left' | 'center' | 'right';
}

export interface YouTubeWidget extends BaseWidget {
  type: 'youtube';
  videoId: string;
  width: string;
  height: string;
}

export interface ColumnWidget extends BaseWidget {
  type: 'column';
  columns: Widget[][];
  columnCount: 1 | 2 | 3 | 4;
  gap: string;
  columnWidths?: number[]; // Width percentage for each column (deprecated, use columnSettings)
  columnSettings?: ColumnSettings[]; // Settings for each nested column
}

export interface TableWidget extends BaseWidget {
  type: 'table';
  rows: string[][];
  headers: string[];
}

export interface HorizontalLineWidget extends BaseWidget {
  type: 'horizontal-line';
  style: 'solid' | 'dashed' | 'dotted';
  color: string;
}

export interface ButtonWidget extends BaseWidget {
  type: 'button';
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  alignment: 'left' | 'center' | 'right';
  backgroundColor?: string; // Button background color
}

export interface IconWidget extends BaseWidget {
  type: 'icon';
  iconName: string;
  size: number;
  color: string;
  alignment: 'left' | 'center' | 'right';
}

export interface ListWidget extends BaseWidget {
  type: 'list';
  items: string[];
  ordered: boolean;
}

export type Widget =
  | HeadingWidget
  | ParagraphWidget
  | ImageWidget
  | YouTubeWidget
  | ColumnWidget
  | TableWidget
  | HorizontalLineWidget
  | ButtonWidget
  | IconWidget
  | ListWidget;

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface ColumnSettings {
  width?: number; // percentage (deprecated - use widthDesktop)
  widthDesktop?: number; // Desktop width percentage (0-100)
  widthTablet?: number; // Tablet width percentage (0-100), optional
  widthMobile?: number; // Mobile width percentage (0-100), optional
  padding?: string; // e.g., "16px"
  margin?: string; // e.g., "8px"
}

export interface ResponsiveColumnSettings {
  desktop?: ColumnSettings[];
  tablet?: ColumnSettings[];
  mobile?: ColumnSettings[];
}

export interface ResponsiveLayout {
  desktop?: 1 | 2 | 3 | 4; // Column count for desktop
  tablet?: 1 | 2 | 3 | 4; // Column count for tablet
  mobile?: 1 | 2 | 3 | 4; // Column count for mobile (default: stack all = columnCount)
}

export interface Row {
  id: string;
  columns: Widget[][];
  columnCount: 1 | 2 | 3 | 4;
  padding?: string; // Row spacing (default 8px)
  gap?: string; // Gap between columns (default 8px)
  columnSettings?: ColumnSettings[]; // Desktop settings (backward compatible)
  responsiveLayout?: ResponsiveLayout; // Responsive column counts
  responsiveColumnSettings?: ResponsiveColumnSettings; // Settings per device
}

export interface BlockEditorData {
  rows: Row[];
}
