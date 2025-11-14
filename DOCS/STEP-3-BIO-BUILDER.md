# Step 3: Personal Bio Builder - Feature Documentation

## Overview
Step 3 provides a **Medium/Gutenberg-style blog builder** for advisors to create rich, professional bios with drag-and-drop functionality.

---

## 🎯 Core Concept

### Blog-Style Builder
- **Block-based system** - Content organized in blocks
- **Column layouts** - 1, 2, or 3 columns per block
- **Widget-based** - Multiple widget types (text, images, videos, lists, etc.)
- **Drag & drop** - Reorder widgets between columns and blocks
- **Visual editor** - WYSIWYG editing experience

---

## 📦 Block System

### Block Structure
```javascript
interface BioBlock {
  id: string;
  columns: number; // 1, 2, or 3
  widgets: Widget[][]; // Array of columns, each containing widgets
}
```

### Block Features
- ✅ **Add blocks** - 1, 2, or 3 column layouts
- ✅ **Delete blocks** - Remove entire block with all widgets
- ✅ **Hover controls** - Delete button appears on hover
- ✅ **Visual grid** - Responsive column layout

---

## 🧩 Widget Types

### 1. **Paragraph**
- Multi-line text input
- Textarea with auto-resize
- Plain text content

**Use case:** Main body text, descriptions

### 2. **Heading**
- H1, H2, H3 levels
- Level selector buttons
- Dynamic font sizing
- Single-line input

**Use case:** Section titles, subtitles

### 3. **Image**
- File upload
- Image preview
- Remove/replace functionality
- Drag-and-drop upload area

**Use case:** Profile photos, certificates, infographics

### 4. **Video**
- YouTube URL input
- Video preview placeholder
- Embed support

**Use case:** Introduction videos, testimonials

### 5. **Bullet List**
- Unordered list
- Add/remove items
- Bullet point (•) prefix

**Use case:** Key points, features, benefits

### 6. **Numbered List**
- Ordered list
- Auto-numbering (1, 2, 3...)
- Add/remove items

**Use case:** Steps, processes, rankings

### 7. **Icon List** *(Future)*
- List with custom icons
- Icon selector
- Styled list items

**Use case:** Services, achievements, skills

### 8. **Quote**
- Blockquote styling
- Blue left border
- Italic text
- Light blue background

**Use case:** Testimonials, mission statements

### 9. **Divider**
- Horizontal line
- Section separator
- No editable content

**Use case:** Visual separation between sections

---

## 🎨 Widget Interface

### Widget Structure
```javascript
interface Widget {
  id: string;
  type: WidgetType;
  content: string;
  level?: number; // For headings (1, 2, 3)
  imageFile?: File;
  imagePreview?: string;
  videoUrl?: string;
  items?: string[]; // For lists
  icon?: string; // For icon list
}
```

### Widget Controls
- ✅ **Delete button** - Remove widget
- ✅ **Drag handle** - Reorder widget
- ✅ **Hover state** - Show controls on hover
- ✅ **Inline editing** - Edit content directly

---

## 🔄 Drag & Drop System

### How It Works

#### 1. **Drag Start**
```javascript
onDragStart={() => setDraggedWidget({ 
  blockId: block.id, 
  colIndex: colIdx, 
  widgetIndex: widgetIdx 
})}
```

#### 2. **Drag Over**
```javascript
onDragOver={(e) => e.preventDefault()}
```

#### 3. **Drop**
```javascript
onDrop={(e) => {
  e.preventDefault();
  if (draggedWidget) {
    moveWidget(
      draggedWidget.blockId,
      draggedWidget.colIndex,
      draggedWidget.widgetIndex,
      block.id,
      colIdx,
      columnWidgets.length
    );
    setDraggedWidget(null);
  }
}}
```

### Drag Features
- ✅ **Within same column** - Reorder widgets
- ✅ **Between columns** - Move widgets across columns
- ✅ **Between blocks** - Move widgets across blocks
- ✅ **Visual feedback** - Cursor changes during drag

---

## 🎯 User Flow

### Example: Creating a Bio

**Step 1: Add First Block**
```
User clicks: "+ Add 1 Column"
→ Creates block with 1 column
→ Shows "+ Add Widget" button
```

**Step 2: Add Paragraph Widget**
```
User clicks: "+ Add Widget"
→ Widget menu appears
User clicks: "Paragraph"
→ Paragraph widget added
→ User types content
```

**Step 3: Add Two-Column Block**
```
User clicks: "+ 2 Columns"
→ Creates block with 2 columns
→ Each column has "+ Add Widget" button
```

**Step 4: Add Image (Left) & Video (Right)**
```
Left column:
  User clicks: "+ Add Widget" → "Image"
  → Uploads image
  
Right column:
  User clicks: "+ Add Widget" → "Video"
  → Pastes YouTube URL
```

**Step 5: Continue Building**
```
User adds more blocks:
  - Heading widget
  - Bullet list widget
  - Quote widget
  - Divider widget
```

**Step 6: Reorder Content**
```
User drags heading widget to top
User drags image to different column
User deletes unwanted widgets
```

---

## 💡 Example Bio Structure

```
┌─────────────────────────────────────┐
│ BLOCK 1 (1 Column)                  │
│ ┌─────────────────────────────────┐ │
│ │ Heading (H1): "About Me"        │ │
│ │ Paragraph: "I am a financial..." │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ BLOCK 2 (2 Columns)                 │
│ ┌──────────────┐ ┌────────────────┐ │
│ │ Image:       │ │ Video:         │ │
│ │ [Profile]    │ │ [YouTube]      │ │
│ └──────────────┘ └────────────────┘ │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ BLOCK 3 (1 Column)                  │
│ ┌─────────────────────────────────┐ │
│ │ Heading (H2): "My Services"     │ │
│ │ Bullet List:                    │ │
│ │   • Financial Planning          │ │
│ │   • Investment Advisory         │ │
│ │   • Retirement Planning         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ BLOCK 4 (1 Column)                  │
│ ┌─────────────────────────────────┐ │
│ │ Quote: "Your financial future..." │
│ │ Divider: ─────────────────────  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 🎨 UI/UX Design

### Empty State
- Large icon (document)
- Helpful text: "Start building your bio..."
- Three buttons: "+ Add 1/2/3 Column(s)"

### Block Appearance
- White background
- Gray border
- Rounded corners
- Padding: 24px
- Hover: Delete button appears

### Column Layout
- Dashed border (gray)
- Min height: 100px
- Padding: 16px
- Gap between columns: 24px

### Widget Menu
- Grid layout (2 columns)
- Icons + labels
- Hover effect
- Cancel button at bottom

### Widget Appearance
- White background
- Border on hover
- Delete & drag controls
- Smooth transitions

---

## 🔧 Technical Implementation

### State Management
```javascript
const [bioBlocks, setBioBlocks] = useState<BioBlock[]>([]);
const [showWidgetMenu, setShowWidgetMenu] = useState<{
  blockId: string, 
  colIndex: number
} | null>(null);
const [draggedWidget, setDraggedWidget] = useState<{
  blockId: string, 
  colIndex: number, 
  widgetIndex: number
} | null>(null);
```

### Key Functions

#### 1. **addBlock(columns)**
```javascript
const addBlock = (columns: number) => {
  const newBlock: BioBlock = {
    id: `block-${Date.now()}`,
    columns,
    widgets: Array(columns).fill([]).map(() => [])
  };
  setBioBlocks([...bioBlocks, newBlock]);
};
```

#### 2. **addWidget(blockId, colIndex, type)**
```javascript
const addWidget = (blockId: string, colIndex: number, type: WidgetType) => {
  const newWidget: Widget = {
    id: `widget-${Date.now()}`,
    type,
    content: "",
    // ... type-specific defaults
  };
  // Add to specific column in specific block
};
```

#### 3. **updateWidget(blockId, colIndex, widgetIndex, updates)**
```javascript
const updateWidget = (blockId, colIndex, widgetIndex, updates) => {
  // Find block → column → widget
  // Merge updates
  // Update state
};
```

#### 4. **deleteWidget(blockId, colIndex, widgetIndex)**
```javascript
const deleteWidget = (blockId, colIndex, widgetIndex) => {
  // Filter out widget from column
};
```

#### 5. **moveWidget(from, to)**
```javascript
const moveWidget = (
  fromBlockId, fromCol, fromIndex,
  toBlockId, toCol, toIndex
) => {
  // Remove from source
  // Insert at destination
};
```

---

## 📱 Responsive Design

### Desktop (>1024px)
- Full 3-column support
- Side-by-side editing
- Hover controls

### Tablet (768px - 1024px)
- 2-column max recommended
- Touch-friendly controls
- Larger tap targets

### Mobile (<768px)
- 1-column recommended
- Stack all content
- Mobile-optimized inputs

---

## 🚀 Future Enhancements

### Planned Features
- [ ] **Icon List widget** - Custom icons for list items
- [ ] **Code Block widget** - Syntax-highlighted code
- [ ] **Table widget** - Data tables
- [ ] **Accordion widget** - Collapsible sections
- [ ] **Button widget** - CTA buttons
- [ ] **Spacer widget** - Custom spacing
- [ ] **Embed widget** - External content (Twitter, Instagram, etc.)

### Advanced Features
- [ ] **Templates** - Pre-built bio templates
- [ ] **Duplicate block** - Copy entire blocks
- [ ] **Block reordering** - Drag blocks up/down
- [ ] **Undo/Redo** - History management
- [ ] **Auto-save** - Save draft every 30 seconds
- [ ] **Preview mode** - See how bio looks on profile
- [ ] **Export/Import** - JSON export for backup

---

## ✅ Testing Checklist

### Functionality
- [ ] Add 1-column block
- [ ] Add 2-column block
- [ ] Add 3-column block
- [ ] Add paragraph widget
- [ ] Add heading widget (H1, H2, H3)
- [ ] Add image widget (upload)
- [ ] Add video widget (YouTube URL)
- [ ] Add bullet list widget
- [ ] Add numbered list widget
- [ ] Add quote widget
- [ ] Add divider widget
- [ ] Delete widget
- [ ] Delete block
- [ ] Drag widget within column
- [ ] Drag widget between columns
- [ ] Drag widget between blocks
- [ ] Edit widget content
- [ ] Widget menu open/close

### UI/UX
- [ ] Empty state displays correctly
- [ ] Block hover shows delete button
- [ ] Widget hover shows controls
- [ ] Drag cursor changes
- [ ] Responsive column layout
- [ ] Widget menu grid layout
- [ ] Smooth transitions
- [ ] Mobile-friendly

### Edge Cases
- [ ] Delete last widget in column
- [ ] Delete last block
- [ ] Drag to empty column
- [ ] Multiple blocks with different columns
- [ ] Long content in widgets
- [ ] Special characters in text
- [ ] Large images
- [ ] Invalid YouTube URLs

---

## 📊 Data Structure Example

```json
{
  "bioBlocks": [
    {
      "id": "block-1699999999",
      "columns": 1,
      "widgets": [
        [
          {
            "id": "widget-1699999999",
            "type": "heading",
            "content": "About Me",
            "level": 1
          },
          {
            "id": "widget-1700000000",
            "type": "paragraph",
            "content": "I am a certified financial advisor..."
          }
        ]
      ]
    },
    {
      "id": "block-1700000001",
      "columns": 2,
      "widgets": [
        [
          {
            "id": "widget-1700000002",
            "type": "image",
            "content": "",
            "imagePreview": "data:image/jpeg;base64,..."
          }
        ],
        [
          {
            "id": "widget-1700000003",
            "type": "video",
            "content": "",
            "videoUrl": "https://youtube.com/watch?v=..."
          }
        ]
      ]
    }
  ]
}
```

---

## 🎓 Best Practices

### For Users
1. **Start simple** - Begin with 1-column blocks
2. **Use headings** - Structure content with H1, H2, H3
3. **Add visuals** - Include images and videos
4. **Keep it scannable** - Use lists and dividers
5. **Test on mobile** - Check how it looks on small screens

### For Developers
1. **Immutable updates** - Always create new arrays/objects
2. **Unique IDs** - Use timestamps or UUID
3. **Type safety** - Leverage TypeScript interfaces
4. **Error handling** - Validate file uploads, URLs
5. **Performance** - Optimize re-renders with React.memo

---

**Last Updated:** November 15, 2025  
**Version:** 1.0  
**Status:** ✅ Complete & Ready for Testing

---

## 🎉 Summary

Step 3 provides a powerful, intuitive bio builder that allows advisors to create professional, engaging bios without coding. The drag-and-drop interface, combined with multiple widget types and flexible layouts, makes it easy to showcase expertise, experience, and personality.

**Key Features:**
- ✅ Block-based system
- ✅ 1/2/3 column layouts
- ✅ 9 widget types
- ✅ Drag & drop reordering
- ✅ Inline editing
- ✅ Responsive design
- ✅ Medium/Gutenberg-style UX
