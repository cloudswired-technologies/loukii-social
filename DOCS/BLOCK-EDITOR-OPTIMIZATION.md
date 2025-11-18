# Block Editor Optimization Plan

## Current Issues

### 1. File Size Issues
- ❌ **block-editor.tsx**: 36KB (too large, should be <20KB)
- ❌ **widget-settings-dropdown.tsx**: 9.6KB
- ❌ **column-settings-dropdown-new.tsx**: 8.8KB
- ❌ **column-settings-dropdown.tsx**: 7.7KB (OLD - UNUSED)

### 2. Unused Files
- ❌ `column-settings-dropdown.tsx` - Old version, replaced by `-new.tsx`
- ❌ `responsive-column-settings.tsx` - Imported but never used

### 3. Code Duplication
- Drag and drop logic repeated in multiple places
- Widget rendering logic could be extracted
- Column width calculations duplicated

### 4. Heavy Dependencies
- Importing all Lucide icons in icon-widget (should be tree-shakeable)
- Multiple state management for similar features

---

## Optimization Strategy

### Phase 1: Remove Dead Code ✅
1. Delete `column-settings-dropdown.tsx` (old version)
2. Delete `responsive-column-settings.tsx` (unused)
3. Remove unused imports from block-editor.tsx

### Phase 2: Extract Utilities 🔄
1. Create `drag-drop-utils.ts` for shared D&D logic
2. Create `widget-factory.ts` for widget creation
3. Consolidate column width calculations

### Phase 3: Split Large Files 🔄
1. Split `block-editor.tsx` into:
   - `block-editor.tsx` (main component)
   - `block-editor-handlers.ts` (event handlers)
   - `block-editor-state.ts` (state management)
   - `row-renderer.tsx` (row rendering logic)

2. Optimize `widget-settings-dropdown.tsx`:
   - Extract common input components
   - Lazy load heavy components

### Phase 4: Performance Optimizations 🔄
1. Memoize expensive calculations
2. Use React.memo for widget renderers
3. Lazy load icon picker in icon-widget
4. Debounce text inputs

### Phase 5: Code Simplification 🔄
1. Reduce nested ternaries
2. Extract complex conditions to named functions
3. Simplify state updates with useReducer where appropriate
4. Remove unnecessary wrapper divs

---

## Expected Results

### Before:
- Total size: ~90KB
- block-editor.tsx: 36KB
- 15+ files

### After:
- Total size: ~60KB (-33%)
- block-editor.tsx: <20KB (-45%)
- 12 files (removed 3 unused)
- Better code organization
- Faster load times
- Easier maintenance

---

## Implementation Order

1. ✅ Delete unused files (safe, no risk)
2. ✅ Remove unused imports (safe, no risk)
3. 🔄 Extract utilities (medium risk, test thoroughly)
4. 🔄 Split block-editor.tsx (high risk, careful refactoring)
5. 🔄 Add performance optimizations (low risk, incremental)
6. ✅ Test all features work

---

## Testing Checklist

After each optimization phase:
- [ ] Drag widget to column works
- [ ] Drag column to reorder works
- [ ] Drag row to reorder works
- [ ] Nested columns work
- [ ] Device switching works (Desktop/Tablet/Mobile)
- [ ] Column width editing works per device
- [ ] All widgets render correctly
- [ ] Widget settings work
- [ ] Column settings work
- [ ] Row settings work
- [ ] Delete operations work
- [ ] Responsive layout works correctly
