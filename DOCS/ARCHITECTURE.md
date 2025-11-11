# Loukii Social - Architecture Documentation

## 🏗️ System Architecture

### Technology Stack

```
Frontend Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: Tailwind CSS
Icons: Lucide React
State Management: React Hooks (useState, usePathname)
Image Optimization: Next.js Image Component
Deployment: Vercel
```

### Responsive Breakpoints

```typescript
Mobile:  < 768px   (sm)
Tablet:  768-1024px (md)
Desktop: ≥ 1024px  (lg)
```

## 📁 Project Structure

```
loukii-social/
├── app/
│   ├── layout.tsx              # Root layout with SEO metadata
│   ├── page.tsx                # Advisors feed (homepage)
│   ├── insights/
│   │   └── page.tsx           # Insights/articles feed
│   └── globals.css            # Global styles & Tailwind
│
├── components/
│   ├── top-header.tsx         # Main navigation with dynamic filters
│   ├── left-navigation.tsx    # Desktop sidebar navigation
│   ├── mobile-bottom-nav.tsx  # Mobile bottom navigation bar
│   ├── right-sidebar.tsx      # Homepage trending sidebar
│   ├── insights-sidebar.tsx   # Insights page sidebar
│   ├── loop-card.tsx          # Advisor profile card
│   ├── article-card.tsx       # Article preview card
│   ├── comments-modal.tsx     # Reviews modal dialog
│   ├── search-sidebar.tsx     # Mobile/tablet search sidebar
│   ├── filter-dropdown.tsx    # Desktop filter dropdown
│   └── user-menu.tsx          # User profile menu
│
├── docs/
│   ├── README.md              # Complete documentation
│   ├── DEPLOYMENT.md          # Deployment guide
│   ├── CONTRIBUTING.md        # Contribution guidelines
│   ├── CHANGELOG.md           # Version history
│   ├── OPTIMIZATION-SUMMARY.md # Performance & SEO
│   ├── MOBILE-OPTIMIZATION.md  # Mobile/tablet guide
│   ├── FOLDER-STRUCTURE.md     # Documentation organization
│   ├── ARCHITECTURE.md         # This file
│   └── FINAL-SUMMARY.md        # Project completion summary
│
├── public/
│   └── docs/                  # Sample images and assets
│
└── [config files]             # Next.js, TypeScript, Tailwind configs
```

## 🎨 Component Architecture

### Page Components

#### Homepage (`app/page.tsx`)
- **Purpose**: Advisors feed with loop cards
- **Layout**: 3-column (desktop), full-width (mobile/tablet)
- **Features**: Dynamic filters, trending sidebar, bottom nav (mobile)

#### Insights Page (`app/insights/page.tsx`)
- **Purpose**: Articles and expert content feed
- **Layout**: 3-column (desktop), full-width (mobile/tablet)
- **Features**: Category/tag filters, trending sidebar

### Core Components

#### TopHeader
- **Responsive Behavior**:
  - Mobile/Tablet: Search icon → Opens sidebar
  - Desktop: Functional search bar + filter dropdowns
- **Dynamic Filters**: Changes based on current page (Advisors vs Insights)
- **Features**: Logo, search, filters, user menu

#### LoopCard (Advisor Profile)
- **Structure**:
  - Profile header (avatar, name, role, rating)
  - 20-word bio
  - Image carousel (swipeable)
  - Stats (views, comments)
  - Latest review preview
  - Helpful/Report actions
- **Responsive**: Smaller images and text on mobile

#### ArticleCard
- **Structure**:
  - Author info + category badge
  - Title and description
  - Featured image
  - Engagement stats
  - "Read full article" CTA
- **Responsive**: Image size adjusts for mobile

#### CommentsModal
- **Purpose**: Display all reviews/comments
- **Features**:
  - Review title and text
  - Helpful count
  - Report functionality
  - Scrollable list
- **Responsive**: Full-screen on mobile, centered on desktop

#### SearchSidebar
- **Visibility**: Mobile/Tablet only (lg:hidden)
- **Features**:
  - Slide from left (80% width mobile)
  - Dynamic filters based on page
  - Search within each filter
  - Multi-select checkboxes
  - Backdrop overlay

#### FilterDropdown
- **Visibility**: Desktop only (lg:flex)
- **Features**:
  - Dropdown with search
  - Multi-select checkboxes
  - Selected count badge
  - Click outside to close

## 🔄 State Management

### Component State
```typescript
// Search functionality
const [searchQuery, setSearchQuery] = useState("");
const [isSearchOpen, setIsSearchOpen] = useState(false);

// Filter state
const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
const [selectedItems, setSelectedItems] = useState<string[]>([]);

// Modal state
const [showCommentsModal, setShowCommentsModal] = useState(false);

// Navigation state
const pathname = usePathname();
const isActive = (path: string) => pathname === path;
```

## 🎯 Routing & Navigation

### App Router Structure
```
/                    → Advisors feed (homepage)
/insights            → Insights/articles feed
/search              → Not used (search is sidebar/inline)
/account             → User account (future)
```

### Navigation Components
- **Desktop**: Left sidebar navigation
- **Mobile/Tablet**: Bottom navigation bar
- **Active States**: Dynamic based on `usePathname()`

## 📱 Responsive Design Strategy

### Mobile (< 768px)
- Bottom navigation bar (sticky)
- Full-width content
- Hidden sidebars
- Search icon → Sidebar popup
- Compact spacing and smaller text
- Touch-friendly buttons (44px minimum)

### Tablet (768-1024px)
- Bottom navigation bar OR top nav
- Full-width content
- Hidden sidebars
- Search icon → Sidebar popup
- Medium spacing

### Desktop (≥ 1024px)
- 3-column layout (20-55-25 ratio)
- Left navigation sidebar
- Right trending sidebar
- Functional search bar
- Filter dropdowns
- Full spacing and features

## 🔍 Search & Filter Architecture

### Desktop
```
TopHeader
  ├── Functional search bar (type directly)
  ├── FilterDropdown (Country)
  ├── FilterDropdown (State)
  ├── FilterDropdown (Category)
  ├── FilterDropdown (Brand)
  └── FilterDropdown (Rating)
```

### Mobile/Tablet
```
TopHeader
  └── Search icon button → Opens SearchSidebar

SearchSidebar
  ├── Main search bar
  ├── Accordion filter (Country) with search + checkboxes
  ├── Accordion filter (State) with search + checkboxes
  ├── Accordion filter (Category) with search + checkboxes
  ├── Accordion filter (Brand) with search + checkboxes
  ├── Accordion filter (Rating) with checkboxes
  ├── Apply Filters button
  └── Clear All button
```

### Filter Logic
- **Multi-select**: Checkboxes for all filters
- **Search within filter**: Real-time filtering
- **Dynamic filters**: Different for Advisors vs Insights pages
- **Persistent state**: Filters stay open until clicked again

## 🎨 Design System

### Colors
```css
Primary: #16A34A (Green)
Hover: #15803d (Darker green)
Background: white / gray-950 (dark mode)
Border: gray-200 / gray-800 (dark mode)
Text: gray-900 / white (dark mode)
```

### Typography
```css
Font: Geist Sans
Headings: font-bold
Body: text-sm to text-base
Small: text-xs
```

### Spacing Scale
```css
Mobile: Compact (p-3, gap-2, mb-3)
Desktop: Normal (p-4, gap-4, mb-4)
```

## ⚡ Performance Optimizations

### Image Optimization
- Next.js Image component with automatic optimization
- Lazy loading
- Responsive images with proper sizes
- WebP/AVIF format support

### Code Splitting
- Dynamic imports for modals
- Route-based code splitting (App Router)
- Tree shaking for unused code

### CSS Optimization
- Tailwind CSS purging
- Minimal custom CSS
- Dark mode with class strategy

## 🔐 Security Best Practices

- No exposed API keys
- XSS protection via React
- CSRF protection ready
- Secure headers configuration
- Content Security Policy ready

## 🚀 Deployment Architecture

```
Development:  localhost:3000
Production:   Vercel Edge Network
CDN:          Vercel CDN for static assets
Database:     Supabase (future)
Auth:         Supabase Auth (future)
```

## 📊 Data Flow

### Current (Static)
```
Component → Local State → Render
```

### Future (With Backend)
```
Component → API Call → Supabase → Response → State → Render
```

## 🔄 Future Enhancements

- [ ] Supabase integration
- [ ] Real-time updates
- [ ] User authentication
- [ ] Actual search functionality
- [ ] Filter persistence
- [ ] Analytics integration
- [ ] PWA support
- [ ] Internationalization (i18n)

---

**Last Updated**: November 12, 2024
**Version**: 1.0.0
