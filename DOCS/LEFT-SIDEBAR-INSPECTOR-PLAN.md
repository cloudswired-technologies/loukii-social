# Left Sidebar Inspector Integration Plan

## Current Layout
```
┌─────────────────────────────────┐
│ Top Header                      │
├──────────┬──────────────────────┤
│ Steps    │  Content Box         │
│ (scroll) │  (scroll)            │
│          │                      │
└──────────┴──────────────────────┘
```

## New Layout
```
┌─────────────────────────────────┐
│ Top Header                      │
├──────────┬──────────────────────┤
│ Steps    │  Content Box         │
│ (sticky) │  (scroll)            │
│          │                      │
│ ─────────│                      │
│ Inspector│                      │
│ Panel    │                      │
│ (sticky) │                      │
│          │                      │
└──────────┴──────────────────────┘
```

## Changes Required

### 1. Page Layout Structure
**File:** `app/dashboard/advisor/profile/page.tsx`

- Change left sidebar from scrollable to sticky
- Add Inspector Panel component below steps
- Make only right content scrollable
- Pass inspector state to BlockEditor

### 2. Inspector Panel Integration
**File:** `components/block-editor/inspector-panel.tsx`

- Modify to work inline (not overlay)
- Remove backdrop
- Remove fixed positioning
- Add border/shadow for separation

### 3. BlockEditor Communication
**File:** `components/block-editor/block-editor.tsx`

- Lift inspector state up to page level
- Pass callbacks to open inspector
- Remove overlay InspectorPanel from BlockEditor

## Implementation Steps

### Step 1: Modify Page Layout
```tsx
<div className="flex gap-8">
  {/* Left Sidebar - STICKY */}
  <div className="w-64 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
    {/* Steps */}
    <div className="mb-6">
      {steps.map(...)}
    </div>
    
    {/* Inspector Panel */}
    <InspectorPanel
      isOpen={inspectorOpen}
      type={inspectorType}
      data={inspectorData}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      inline={true}  // NEW: inline mode
    />
  </div>

  {/* Right Content - SCROLLABLE */}
  <div className="flex-1 overflow-y-auto">
    {/* Content */}
  </div>
</div>
```

### Step 2: Create Inline Inspector Variant
```tsx
// inspector-panel.tsx
export function InspectorPanel({ inline = false, ... }) {
  if (inline) {
    // Render inline version (no backdrop, no fixed position)
    return (
      <div className="border rounded-lg bg-white p-4">
        {/* Settings */}
      </div>
    );
  }
  
  // Render overlay version (current)
  return (
    <>
      <div className="fixed inset-0 bg-black/20" />
      <div className="fixed right-0 ...">
        {/* Settings */}
      </div>
    </>
  );
}
```

### Step 3: Lift State to Page
```tsx
// page.tsx
const [inspectorOpen, setInspectorOpen] = useState(false);
const [inspectorType, setInspectorType] = useState(null);
const [inspectorData, setInspectorData] = useState(null);

// Pass to BlockEditor
<BlockEditor
  data={bioContent}
  onChange={setBioContent}
  onOpenInspector={(type, data, callbacks) => {
    setInspectorType(type);
    setInspectorData(data);
    setInspectorCallbacks(callbacks);
    setInspectorOpen(true);
  }}
/>
```

## Benefits

✅ **Always Visible** - Inspector in fixed position
✅ **No Viewport Issues** - Never cut off
✅ **Professional** - Like Elementor/Webflow
✅ **Better UX** - Dedicated space for settings
✅ **Organized** - Clear separation of concerns

## Timeline

- Step 1: Page layout restructure (10 min)
- Step 2: Inspector inline variant (10 min)  
- Step 3: State lifting & connection (10 min)
- Step 4: Testing & polish (10 min)

**Total: ~40 minutes**

## Next Steps

1. Backup current code
2. Implement page layout changes
3. Create inline Inspector variant
4. Connect state management
5. Test all functionality
6. Polish styling

Ready to proceed! 🚀
