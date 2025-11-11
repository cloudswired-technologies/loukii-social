<h1 align="center">🌟 Loukii</h1>

<p align="center">
  <strong>The Social Trust Network</strong>
</p>

<p align="center">
  Discover trusted advisors • Read expert content • Build credibility through engagement
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a> ·
  <a href="#project-structure"><strong>Project Structure</strong></a>
</p>

<br/>

## ✨ Features

### For Users (Reviewers)
- 🔍 **Discover Advisors** - Browse verified professionals across all industries
- 📰 **Read Expert Content** - Articles, posts, and insights from advisors
- ⭐ **Authentic Reviews** - One verified review per advisor
- 💬 **Engage & Follow** - Comment, react, and follow trusted advisors
- 📱 **Responsive Design** - Perfect on mobile and desktop
- 🔔 **Smart Notifications** - Stay updated on reviews, messages, and activity

### For Advisors
- 👤 **Professional Profiles** - Showcase expertise, credentials, and services
- ✍️ **Content Creation** - Publish articles, micro-posts, and announcements
- 🖼️ **Portfolio Gallery** - Swipeable image slider for work showcase
- 📈 **Build Credibility** - Collect reviews and grow follower base
- 📊 **Analytics Dashboard** - Track profile views, article reads, engagement
- 💼 **Lead Generation** - Receive inbound messages and requests
- 🎯 **Targeted Visibility** - Filter by category, brand, location, rating

### Platform Features
- 🌐 **Social Trust Network** - Combines directory + social media (LinkedIn + Medium hybrid)
- 🎨 **Apple-Style UI** - Clean, modern, intuitive interface
- 🌓 **Dark Mode** - Automatic theme switching
- 🚀 **Dynamic Feed** - Latest, Trending, Following filters
- 📸 **Image Optimization** - Fast loading with AVIF/WebP
- 🔒 **Secure** - Built with Supabase authentication
- 📱 **PWA Ready** - Install as mobile app
- 💬 **Private Messaging** - Direct communication between users and advisors

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Font**: Geist Sans

## Responsive Breakpoints

- **Mobile:** < 768px (Bottom navigation, full-width content)
- **Tablet:** 768px - 1024px (Top navigation, full-width content)
- **Desktop:** > 1024px (3-column layout with sidebars)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/loukii-social.git

# Navigate to project directory
cd loukii-social

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Project Structure

```
loukii-social/
├── app/
│   ├── page.tsx                 # Advisors feed (homepage)
│   ├── insights/
│   │   └── page.tsx            # Insights/articles feed
│   ├── layout.tsx              # Root layout with metadata
│   └── globals.css             # Global styles
├── components/
│   ├── top-header.tsx          # Main navigation with search & filters
│   ├── left-navigation.tsx     # Desktop sidebar navigation
│   ├── mobile-bottom-nav.tsx   # Mobile bottom navigation
│   ├── right-sidebar.tsx       # Homepage sidebar (trending)
│   ├── insights-sidebar.tsx    # Insights page sidebar
│   ├── loop-card.tsx           # Advisor post card component
│   ├── article-card.tsx        # Article card component
│   ├── comments-modal.tsx      # Comments modal dialog
│   ├── filter-dropdown.tsx     # Filter dropdown component
│   └── user-menu.tsx           # User profile menu
├── public/
│   └── docs/                   # Sample images and assets
└── README.md
├── lib/                    # Utilities
│   └── supabase/          # Supabase client
├── DEPLOYMENT.md          # Deployment guide
└── README.md             # This file
```

## 🎨 Key Components

### Loop Card (Feed Item)
- Advisor profile with rating and verified badge
- 20-word bio/description
- Swipeable image gallery (infinite loop)
- View profile & WhatsApp buttons
- Latest client review preview
- Engagement stats (views, comments)

### Trending Sidebar
- 3 trending articles with author profile
- 20 trending brands/companies
- "Become an Advisor" CTA banner
- Top advisors to follow

### Filter System
- Mega menu style dropdowns with search
- Filters: Country, State, Category, Brand, Rating
- Smart search across advisors, articles, and content
- Sort by: Latest, Trending, Following

### Content Types
- **Articles** - Long-form content (Medium-style)
- **Micro-Posts** - Short updates and tips
- **Reviews** - User feedback on advisors
- All content appears in unified feed

## 📱 Layout

- **20:55:25** responsive column ratio
- **Left**: Navigation (20%)
- **Center**: Advisor feed (55%)
- **Right**: Trending content (25%)

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 🔧 Configuration

### Environment Variables

**Development** (`.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_dev_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_key
```

**Production** (`.env.production`):
```env
NEXT_PUBLIC_SITE_URL=https://loukii.com
NEXT_PUBLIC_SUPABASE_URL=your_prod_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_key
```

## 📊 Performance

- ✅ Lighthouse Score: 95+
- ✅ Image optimization (AVIF/WebP)
- ✅ Code splitting
- ✅ Font optimization
- ✅ Gzip compression
- ✅ SWC minification

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by [Cloudswired Technologies](https://cloudswired.com)

## 📞 Support

For support, email support@loukii.com or join our community.

---

<p align="center">Made with ❤️ in Malaysia 🇲🇾</p>
