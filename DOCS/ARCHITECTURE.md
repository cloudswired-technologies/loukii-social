# Loukii Social - Architecture Documentation

## 🏗️ System Architecture

### Technology Stack

```
Frontend Framework: Next.js 15+ (App Router)
Language: TypeScript
Styling: Tailwind CSS
UI Components: Radix UI
Icons: Lucide React
Rich Text Editor: Tiptap
Database: Supabase (PostgreSQL)
Authentication: Supabase Auth
State Management: React Hooks (useState, useEffect)
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
│   ├── layout.tsx                    # Root layout with SEO metadata
│   ├── page.tsx                      # Advisors feed (homepage)
│   ├── globals.css                   # Global styles & Tailwind
│   ├── advisor/[slug]/              # Dynamic advisor profile pages
│   ├── auth/                        # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── callback/               # OAuth callback
│   │   └── confirm/                # Email confirmation
│   ├── dashboard/advisor/          # Advisor dashboard
│   │   ├── page.tsx               # Overview with analytics
│   │   ├── profile/               # Profile management
│   │   ├── insights/              # Content creation
│   │   ├── reviews/               # Review management
│   │   ├── messages/              # Messaging system
│   │   ├── notifications/         # Notifications
│   │   ├── support/               # Support tickets
│   │   └── account/               # Account settings
│   ├── insights/                   # Public insights feed
│   ├── legal/                      # Legal pages
│   │   ├── page.tsx               # Legal hub
│   │   ├── terms-for-reviewers/
│   │   ├── terms-for-advisors/
│   │   └── terms-for-everyone/
│   ├── what-is-loukii/            # About page
│   ├── faq/                        # FAQ page
│   ├── contact/                    # Contact page
│   ├── privacy/                    # Privacy policy
│   └── terms/                      # Terms of service
│
├── components/
│   ├── editors/
│   │   └── tiptap-editor.tsx      # Tiptap rich text editor
│   ├── ui/                         # Radix UI components
│   ├── top-header.tsx             # Main navigation
│   ├── left-navigation.tsx        # Desktop sidebar
│   ├── mobile-bottom-nav.tsx      # Mobile navigation
│   ├── right-sidebar.tsx          # Trending sidebar
│   ├── insights-sidebar.tsx       # Insights sidebar
│   ├── loop-card.tsx              # Advisor profile card
│   ├── article-card.tsx           # Article preview card
│   ├── comments-modal.tsx         # Reviews modal
│   ├── search-sidebar.tsx         # Mobile search
│   ├── filter-dropdown.tsx        # Filter dropdown
│   ├── user-menu.tsx              # User menu
│   ├── legal-sidebar.tsx          # Legal pages sidebar
│   ├── landing-header.tsx         # Landing page header
│   ├── advisor-dashboard-sidebar.tsx  # Dashboard sidebar
│   └── dashboard-header.tsx       # Dashboard header
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Client-side Supabase
│   │   ├── server.ts              # Server-side Supabase
│   │   └── middleware.ts          # Auth middleware
│   └── utils.ts                    # Utility functions
│
├── DOCS/
│   ├── ARCHITECTURE.md            # This file
│   ├── README.md                  # Project documentation
│   └── [assets]                   # Images and logos
│
├── public/
│   └── docs/                      # Public assets
│
└── [config files]                 # Next.js, TypeScript, Tailwind
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

## ✅ Implemented Features

- [x] Supabase integration
- [x] User authentication (Email + Google OAuth)
- [x] Advisor dashboard with analytics
- [x] Profile management system
- [x] Tiptap rich text editor
- [x] Dynamic advisor profiles
- [x] Review system
- [x] Legal pages structure
- [x] Security headers
- [x] Image optimization
- [x] Responsive design

## 🔄 Future Enhancements

- [ ] Real-time messaging
- [ ] Advanced search with filters
- [ ] Filter persistence
- [ ] Analytics dashboard improvements
- [ ] PWA support
- [ ] Internationalization (i18n)
- [ ] Email notifications
- [ ] Payment integration

## 🧹 Recent Optimizations (Nov 2024)

### Removed:
- **Lexical Editor** - Full playground with 257 files removed
- **Excalidraw** - Drawing integration not needed
- **Protected/Tutorial pages** - Supabase template pages
- **Unused dependencies** - Reduced from 60+ to 30 packages
- **Template components** - deploy-button, env-var-warning, etc.

### Consolidated:
- **Single Editor** - Tiptap for all rich text editing
- **Optimized imports** - Package optimization in next.config
- **Security** - Added comprehensive security headers
- **Dependencies** - Removed 30+ unused packages

### Performance Impact:
- **Bundle size** - Reduced by ~60%
- **node_modules** - Significantly smaller
- **Build time** - Faster builds
- **Runtime** - Improved page load times

---

**Last Updated**: November 24, 2024
**Version**: 2.0.0
