import { Widget, WidgetType } from "./types";
import { initializeColumnSettings } from "./responsive-utils";

/**
 * Factory function to create widgets with proper defaults
 */
export function createWidget(type: WidgetType): Widget {
  const baseWidget = { 
    id: `widget-${Date.now()}`, 
    type,
    padding: '0px',
    margin: '0px'
  };
  
  switch (type) {
    case 'heading':
      return { ...baseWidget, type: 'heading', level: 2, text: '', alignment: 'left' };
    
    case 'paragraph':
      return { ...baseWidget, type: 'paragraph', text: '', alignment: 'left' };
    
    case 'image':
      return { ...baseWidget, type: 'image', url: '', alt: '', width: '100%', alignment: 'center' };
    
    case 'youtube':
      return { ...baseWidget, type: 'youtube', videoId: '', width: '100%', height: '400px' };
    
    case 'column':
      return { 
        ...baseWidget, 
        type: 'column', 
        columns: [[]], 
        columnCount: 1,
        gap: '8px',
        columnSettings: initializeColumnSettings(1)
      };
    
    case 'table':
      return { ...baseWidget, type: 'table', headers: ['Column 1', 'Column 2'], rows: [['', '']] };
    
    case 'horizontal-line':
      return { ...baseWidget, type: 'horizontal-line', style: 'solid', color: '#e5e7eb' };
    
    case 'button':
      return { ...baseWidget, type: 'button', text: 'Click me', url: '#', variant: 'primary', size: 'md', alignment: 'left' };
    
    case 'icon':
      return { ...baseWidget, type: 'icon', iconName: 'Star', size: 48, color: '#10b981', alignment: 'center' };
    
    case 'list':
      return { ...baseWidget, type: 'list', items: ['Item 1', 'Item 2'], ordered: false };
    
    default:
      return { ...baseWidget, type: 'paragraph', text: '', alignment: 'left' };
  }
}
