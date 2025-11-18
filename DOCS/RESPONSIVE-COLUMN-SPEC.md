# Loukii Responsive Column System Specification

## Overview
Custom responsive column layout system for Loukii Profile Bio Builder, similar to Elementor but with simplified, custom rules.

---

## 🏗️ Basic Structure

- Layout consists of **rows**
- Each row supports up to **4 columns**
- Only first N columns are "active" where N ∈ {1, 2, 3, 4}
- Each column stores width per breakpoint

### Data Structure

```typescript
type Device = 'desktop' | 'tablet' | 'mobile';

interface Column {
  id: string;
  isActive: boolean;        // only first N are active
  widthDesktop: number;     // percentage 0–100
  widthTablet?: number;     // optional percentage, override
  widthMobile?: number;     // optional percentage, override
}
```

### Width Inheritance Rules

When rendering on a given device:
1. **Mobile**: Use `widthMobile` if exists, else `widthTablet` if exists, else `widthDesktop`
2. **Tablet**: Use `widthTablet` if exists, else `widthDesktop`
3. **Desktop**: Always use `widthDesktop`

---

## 💻 Desktop Layout (Max 4 Columns)

Desktop uses simple flex layout with default widths:

| Columns | Default Widths |
|---------|----------------|
| 1       | `[100]`        |
| 2       | `[50, 50]`     |
| 3       | `[33.33, 33.33, 33.34]` |
| 4       | `[25, 25, 25, 25]` |

**CSS Implementation:**
```css
.row {
  display: flex;
  flex-wrap: wrap;
}
.column {
  flex: 0 0 {width}%;
}
```

**Rules:**
- No special stacking on desktop
- Columns use percentages left-to-right
- No automatic wrapping unless widths exceed 100%

---

## 📱 Mobile Layout Rules (CRITICAL)

### General Principles

1. **Default behavior**: Everything stacks top-to-bottom (one column per row)
2. **Side-by-side**: Only when user manually sets widths to 50% or custom patterns
3. **Flex-wrap**: If sum of widths ≤ 100%, columns stay in same row; if > 100%, wrap to next line

### Case-by-Case Behavior

#### Case A: 1 Active Column
- **Desktop**: `[100]`
- **Mobile Default**: `[100]` (same as desktop)
- **Result**: Full-width block on phone

#### Case B: 2 Active Columns
- **Desktop Default**: `[50, 50]`
- **Mobile Default**: `[100, 100]` (stack top-bottom)
  - Column 1 = full width, row 1
  - Column 2 = full width, row 2
- **Side-by-side on mobile** (user must set):
  - Column 1 → `widthMobile = 50`
  - Column 2 → `widthMobile = 50`
  - Result: Both columns 50/50 on same row

#### Case C: 3 Active Columns
- **Desktop Default**: `[33.33, 33.33, 33.34]`
- **Mobile Default**: `[100, 100, 100]` (3 rows, 1 column each)
- **Custom Pattern Example** (100:50:50):
  - Column 1 → `widthMobile = 100`
  - Column 2 → `widthMobile = 50`
  - Column 3 → `widthMobile = 50`
  - **Result**:
    - Row 1: Column 1 (full width)
    - Row 2: Column 2 (50%) + Column 3 (50%)

#### Case D: 4 Active Columns
- **Desktop Default**: `[25, 25, 25, 25]`
- **Mobile Default**: `[100, 100, 100, 100]` (stack all vertically)
- **2x2 Grid on mobile** (user must set):
  - All columns → `widthMobile = 50`
  - **Result**:
    - Row 1: Col 1 (50%) + Col 2 (50%)
    - Row 2: Col 3 (50%) + Col 4 (50%)
  - Visually: 4 boxes – 2 on top, 2 below

### Mobile Width Patterns

User can create any combination:
- `100` = full width, one column per row
- `50 + 50` = two columns side-by-side
- `100 + 50 + 50` = first full, then two half
- `50 + 50 + 50 + 50` = 2x2 grid
- Order always follows original column sequence (1 → 2 → 3 → 4)

---

## 📲 Tablet Layout Rules

Tablet is "between desktop and mobile" with sensible defaults.

### Default Tablet Widths (when `widthTablet` not set)

| Columns | Default Tablet Widths | Visual Result |
|---------|----------------------|---------------|
| 1       | `[100]`              | Full width |
| 2       | `[50, 50]`           | Side-by-side |
| 3       | `[50, 50, 100]`      | First 2 side-by-side, 3rd below |
| 4       | `[50, 50, 50, 50]`   | 2x2 grid (2 per row) |

### Tablet Editing

- When user edits width in **Tablet mode**, store in `widthTablet`
- Tablet uses `widthTablet` if set, else `widthDesktop`
- Mobile uses `widthMobile` if set, else `widthTablet` if set, else `widthDesktop`

---

## 🎛️ Device Editing & Inheritance

### UI Modes
- Three mode buttons: **Desktop / Tablet / Mobile**
- Canvas renders using active device's widths
- Width changes update the corresponding breakpoint:
  - Desktop mode → update `widthDesktop`
  - Tablet mode → set/update `widthTablet`
  - Mobile mode → set/update `widthMobile`

### Reset Functionality
- Provide "Reset width for this device" option
- Clears `widthTablet` or `widthMobile` back to `undefined`
- Falls back to parent breakpoint

---

## 🔄 Rendering Algorithm

For each row and active column:

1. Determine `currentDevice` (desktop, tablet, mobile)
2. Compute `columnWidth = getWidthForDevice(column, currentDevice)`:
   ```typescript
   function getWidthForDevice(column: Column, device: Device): number {
     if (device === 'mobile') {
       return column.widthMobile ?? column.widthTablet ?? column.widthDesktop;
     }
     if (device === 'tablet') {
       return column.widthTablet ?? column.widthDesktop;
     }
     return column.widthDesktop;
   }
   ```
3. Render columns in DOM order using:
   ```css
   .row {
     display: flex;
     flex-wrap: wrap;
   }
   .column {
     flex: 0 0 {columnWidth}%;
   }
   ```

### Automatic Behavior
- **Mobile**: Stacks all as full-width by default (`[100,100,...]`)
- **Mobile custom**: Arranges 2-per-row when widths are `50:50`, etc.
- **Tablet**: Uses sensible defaults (2-per-row for 3-4 columns)

---

## ✅ Summary

| Aspect | Behavior |
|--------|----------|
| **Desktop** | Use existing system, don't modify |
| **Mobile (default)** | All columns 100% width, stack top-to-bottom |
| **Mobile (custom)** | User sets 50:50, 100:50:50, 50:50:50:50, etc. → arrange by sum ≤ 100% |
| **Tablet** | Closer to desktop, but arrange 3 & 4 columns as 2-per-row |
| **Column order** | Always follows original sequence (1 → 2 → 3 → 4) |
| **Max columns** | 4 per row |
| **Inheritance** | Mobile → Tablet → Desktop (fallback chain) |

---

## 🎯 Key Differences from Elementor

1. **Max 4 columns** (Elementor supports more)
2. **Mobile always stacks by default** (must manually set 50% for side-by-side)
3. **Simpler tablet defaults** (2-per-row for 3-4 columns)
4. **Custom width patterns** (100:50:50, etc.) fully supported via flex-wrap

This creates an Elementor-like feel with custom, simplified responsive rules tailored for Loukii's use case.
