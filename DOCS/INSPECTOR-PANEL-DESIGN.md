# Inspector Panel Design

## Problem
Dropdown settings panels are getting cut off by viewport boundaries, especially:
- Column Settings
- Widget Settings  
- Row Settings

Current issues:
- ❌ Dropdowns overflow viewport
- ❌ Content gets cut off
- ❌ Poor UX on smaller screens
- ❌ Hard to scroll long settings

## Solution: Right Side Inspector Panel

Inspired by **Elementor, Figma, Webflow** - professional page builders use side panels.

### Design:
```
┌─────────────────────┬──────────┐
│                     │          │
│   Canvas/Editor     │ Inspector│
│   (Main Content)    │  Panel   │
│                     │ (Settings)│
│                     │          │
└─────────────────────┴──────────┘
```

### Benefits:
- ✅ **Always in viewport** - Fixed right side
- ✅ **More space** - Full height panel (320px wide)
- ✅ **Scrollable** - Can fit unlimited settings
- ✅ **Professional** - Industry standard
- ✅ **Better organization** - Grouped settings
- ✅ **Backdrop** - Click outside to close
- ✅ **Smooth animation** - Slide in/out

## Features:

### 1. Widget Settings
- Heading Level (H1-H6)
- Text Color (FastColorPicker)
- Background Color (Buttons)
- Icon Size (Slider)
- Icon Color
- HR Style & Color
- Alignment
- Padding & Margin
- Delete Widget

### 2. Column Settings
- Width controls (per device)
- Padding
- Margin
- Delete Column

### 3. Row Settings (Future)
- Row padding
- Row gap
- Background
- Delete Row

## Implementation:

### Component: `InspectorPanel`
```typescript
<InspectorPanel
  isOpen={inspectorOpen}
  onClose={() => setInspectorOpen(false)}
  type="widget" | "column" | "row"
  data={selectedItem}
  onUpdate={handleUpdate}
  onDelete={handleDelete}
/>
```

### Usage Flow:
1. User clicks widget/column settings icon
2. Inspector panel slides in from right
3. Shows relevant settings for selected item
4. User makes changes
5. Click outside or X to close
6. Panel slides out

## Visual Design:

### Header:
- Title: "Inspector"
- Close button (X)
- Background: Gray-50

### Content:
- Section title with description
- Grouped controls
- Labels above inputs
- Consistent spacing
- Scrollable if needed

### Controls:
- Dropdowns: Full width, rounded
- Color pickers: FastColorPicker
- Sliders: Full width with value display
- Buttons: Full width, colored

## Migration Plan:

### Phase 1: ✅ Create Inspector Panel
- [x] Build InspectorPanel component
- [x] Add FastColorPicker integration
- [x] Style with Tailwind

### Phase 2: 📋 Integrate with Block Editor
- [ ] Add inspector state to BlockEditor
- [ ] Connect widget settings to inspector
- [ ] Connect column settings to inspector
- [ ] Remove old dropdown components

### Phase 3: 📋 Polish
- [ ] Add animations (slide in/out)
- [ ] Add keyboard shortcuts (Esc to close)
- [ ] Add responsive behavior (hide on mobile?)
- [ ] Add settings history/undo

## Comparison:

### Before (Dropdown):
- Fixed positioning
- Viewport overflow issues
- Limited space
- Hard to organize
- Feels cramped

### After (Inspector Panel):
- Side panel
- Always visible
- Unlimited space
- Well organized
- Professional feel

## Next Steps:

1. Integrate InspectorPanel into BlockEditor
2. Replace WidgetSettingsDropdown with Inspector
3. Replace ColumnSettingsDropdown with Inspector
4. Test on different screen sizes
5. Add animations and polish

This approach matches industry standards and provides much better UX!
