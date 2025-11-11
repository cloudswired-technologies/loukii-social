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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/loukii-social.git
   cd loukii-social
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
loukii-social/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with SEO
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   └── sitemap.ts           # Dynamic sitemap
├── components/              # React components
│   ├── top-header.tsx       # Main navigation
│   ├── left-navigation.tsx  # Sidebar navigation
│   ├── right-sidebar.tsx    # Trending content
│   ├── loop-card.tsx        # Advisor card
│   ├── comments-modal.tsx   # Reviews modal
│   ├── filter-dropdown.tsx  # Search filters
│   └── user-menu.tsx        # User dropdown
├── public/                  # Static assets
│   ├── docs/               # Demo images
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots
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
