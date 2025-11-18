# Block Editor - Comprehensive Settings Audit

## Widget Settings (All Widgets)

### BaseWidget Properties (Inherited by ALL widgets):
- ✅ `padding` - Default: '12px', Applied: Widget wrapper div
- ✅ `margin` - Default: '0px', Applied: Widget wrapper div
- ✅ `color` - Default: '#000000', Applied: Widget-specific (heading, paragraph, button)
- ✅ `alignment` - Default: 'left', Applied: Widget-specific

### Widget-Specific Settings:

#### 1. HeadingWidget
- ✅ `level` (1-6) - Applied: Font size calculation
- ✅ `text` - Applied: Input value
- ✅ `alignment` - Applied: textAlign style
- ✅ `color` - Applied: color style
- ✅ `padding` - Applied: Wrapper div
- ✅ `margin` - Applied: Wrapper div

#### 2. ParagraphWidget
- ✅ `text` - Applied: Textarea value
- ✅ `alignment` - Applied: textAlign style
- ✅ `fontSize` - Default: '16px', Applied: fontSize style
- ✅ `color` - Applied: color style
- ✅ `padding` - Applied: Wrapper div
- ✅ `margin` - Applied: Wrapper div

#### 3. ImageWidget
- ✅ `url` - Applied: img src
- ✅ `alt` - Applied: img alt
- ✅ `caption` - Applied: Input value
- ✅ `width` - Applied: img style
- ✅ `alignment` - Applied: text-${alignment} class
- ✅ `padding` - Applied: Wrapper div
- ✅ `margin` - Applied: Wrapper div

#### 4. YouTubeWidget
- ✅ `videoId` - Applied: iframe src
- ✅ `width` - Applied: iframe style
- ✅ `height` - Applied: iframe style
- ✅ `padding` - Applied: Wrapper div
- ✅ `margin` - Applied: Wrapper div

#### 5. ButtonWidget
- ✅ `text` - Applied: Button text
- ✅ `url` - Applied: href
- ✅ `variant` - Applied: Button styling
- ✅ `size` - Applied: Button sizing
- ✅ `alignment` - Applied: Container alignment
- ✅ `color` - Applied: Text color
- ✅ `backgroundColor` - Applied: Background color
- ✅ `padding` - Applied: Wrapper div
- ✅ `margin` - Applied: Wrapper div

#### 6. ListWidget
- ✅ `items` - Applied: List items
- ✅ `ordered` - Applied: ol vs ul
- ✅ `padding` - Applied: Wrapper div
- ✅ `margin` - Applied: Wrapper div

#### 7. HRWidget
- ✅ `style` - Applied: border-style
- ✅ `color` - Applied: border-color
- ✅ `padding` - Applied: Wrapper div
- ✅ `margin` - Applied: Wrapper div

#### 8. ColumnWidget (SPECIAL)
- ✅ `columns` - Applied: Nested columns array
- ✅ `columnCount` - Applied: Number of nested columns
- ✅ `gap` - Applied: Flex gap between nested columns
- ✅ `columnSettings[]` - Applied: Individual nested column settings
- ❌ `padding` - NOT applied (Column widget has no wrapper)
- ❌ `margin` - NOT applied (Column widget has no wrapper)

## Row Settings

### Row Properties:
- ✅ `columnCount` - Applied: Grid template columns
- ✅ `columns` - Applied: Widget arrays
- ✅ `columnSettings[]` - Applied: Individual column settings
  - ✅ `width` - Applied: Column div width (only if custom)
  - ✅ `padding` - Default: '0px', Applied: Column div padding
  - ✅ `margin` - Default: '0px', Applied: Column div margin
  - ✅ `gap` - Applied: Grid gap
- ✅ `responsiveLayout` - Applied: Responsive column counts
- ✅ `responsiveColumnSettings` - Applied: Device-specific column settings

## Nested Column Settings (ColumnWidget.columnSettings[])

### Properties:
- ✅ `width` - Applied: Nested column width (only if custom, else flex-1)
- ✅ `padding` - Default: '12px', Applied: Nested column padding
- ✅ `margin` - Default: '0px', Applied: Nested column margin
- ❌ `gap` - NOT USED (Should be removed from ColumnSettings type)

## Issues Found & Fixed:

### Issue 1: ColumnWidget gap not applied ✅ FIXED
- **Problem**: Gap hardcoded to `gap-3`
- **Fix**: Use `style={{ gap: widget.gap || '12px' }}`

### Issue 2: Column Spacing setting updating wrong property ✅ FIXED
- **Problem**: Updated `columnSettings[].gap` instead of `widget.gap`
- **Fix**: Pass `columnWidget` and `onUpdateColumnWidget` to dropdown

### Issue 3: Widget padding/margin not initialized ✅ FIXED
- **Problem**: Properties undefined on creation
- **Fix**: Initialize in `baseWidget` with defaults

### Issue 4: Column padding default too high ✅ FIXED
- **Problem**: Row columns had 12px padding by default
- **Fix**: Changed default to '0px'

### Issue 5: Display values showing labels ✅ FIXED
- **Problem**: Showed "None", "Small (4px)" instead of values
- **Fix**: Show actual values: "0px", "4px", etc.

## Remaining Issues to Fix:

### Issue 6: ColumnSettings.gap is misleading ⚠️ NEEDS FIX
- **Problem**: `gap` in `ColumnSettings` is not used anywhere
- **Fix**: Remove from type definition

### Issue 7: ColumnWidget padding/margin not applied ⚠️ NEEDS FIX
- **Problem**: Column widget has no wrapper, so BaseWidget padding/margin ignored
- **Fix**: Either add wrapper or remove these settings from dropdown

### Issue 8: Inconsistent defaults ⚠️ NEEDS FIX
- **Problem**: 
  - Widget padding: '12px'
  - Row column padding: '0px'
  - Nested column padding: '12px'
- **Fix**: Standardize defaults

## Recommended Default Values:

### Widgets (Content):
- `padding`: '12px' (breathing room)
- `margin`: '0px' (no spacing between widgets)

### Row Columns (Containers):
- `padding`: '0px' (no extra padding)
- `margin`: '0px' (no spacing)
- `gap`: '12px' (spacing between columns)

### Nested Columns (Containers):
- `padding`: '0px' (no extra padding)
- `margin`: '0px' (no spacing)
- `gap`: '12px' (spacing between nested columns via widget.gap)

## Testing Checklist:

- [ ] Create heading widget → Check padding 12px applied
- [ ] Change heading padding to 0px → Check immediate update
- [ ] Create paragraph widget → Check font size 16px
- [ ] Change paragraph font size → Check immediate update
- [ ] Create 2 columns → Check 50%-50% auto-balance
- [ ] Change column spacing → Check gap between columns updates
- [ ] Change nested column padding → Check padding updates
- [ ] Create image widget → Check padding 12px applied
- [ ] Change widget alignment → Check alignment updates
- [ ] Change widget color → Check color updates
