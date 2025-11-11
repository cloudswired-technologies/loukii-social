# Loukii Social Platform

> The Social Trust Network connecting verified advisors with clients across Malaysia.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Complete Documentation](./docs/README.md)** - Full feature list and guides
- **[Architecture](./docs/ARCHITECTURE.md)** - System architecture and design
- **[Mobile Optimization](./docs/MOBILE-OPTIMIZATION.md)** - Responsive design guide
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment
- **[Contributing](./docs/CONTRIBUTING.md)** - Contribution guidelines
- **[Changelog](./docs/CHANGELOG.md)** - Version history
- **[Optimization Summary](./docs/OPTIMIZATION-SUMMARY.md)** - Performance & SEO

## ✨ Key Features

### 🔍 Discovery
- Browse verified financial advisors and takaful consultants
- Filter by country, state, category, brand, and rating
- Search across advisors, articles, and categories

### 📰 Content
- Expert articles and financial insights
- Category and tag-based filtering
- Trending content and advisors

### ⭐ Reviews & Engagement
- Authentic client reviews with titles
- Helpful and report functionality
- Comments modal with full review details
- Latest review preview on advisor cards

### 📱 Responsive Design
- **Mobile** (< 768px): Bottom navigation, search sidebar
- **Tablet** (768-1024px): Optimized touch targets
- **Desktop** (≥ 1024px): 3-column layout, filter dropdowns

### 🎨 UI/UX
- Dark mode support
- Smooth animations and transitions
- Touch-friendly interactions
- Accessible navigation

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| State | React Hooks |
| Images | Next.js Image |
| Deployment | Vercel |

## 📁 Project Structure

```
loukii-social/
├── app/
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx            # Advisors feed
│   └── insights/           # Insights page
├── components/
│   ├── top-header.tsx      # Navigation & filters
│   ├── loop-card.tsx       # Advisor cards
│   ├── article-card.tsx    # Article cards
│   ├── search-sidebar.tsx  # Mobile search
│   └── ...                 # Other components
├── docs/                   # Documentation
└── public/                 # Static assets
```

## 🎯 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: ≥ 1024px

## 🔍 Search & Filters

### Desktop
- Functional search bar (type directly)
- Filter dropdowns with multi-select checkboxes
- Search within each filter

### Mobile/Tablet
- Search icon opens slide-out sidebar
- Accordion-style filters
- Multi-select with checkboxes
- Search within filters

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

## 👥 Team

Built with ❤️ by [Cloudswired Technologies](https://cloudswired.com)

## 📞 Support

For support, email support@loukii.com

---

<p align="center">Made in Malaysia 🇲🇾</p>
