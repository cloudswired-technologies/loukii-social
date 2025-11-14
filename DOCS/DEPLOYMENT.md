# Loukii - Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Create `.env.production` with::
```env
NEXT_PUBLIC_SITE_URL=https://loukii.com
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

### 2. Required Assets
Create these images in `/public`:
- `favicon.ico` (16x16, 32x32)
- `icon.png` (32x32)
- `apple-icon.png` (180x180)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `og-image.png` (1200x630 for social sharing)

### 3. Build Test
```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy

### Environment Variables in Vercel
Add these in Project Settings → Environment Variables:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Post-Deployment

### 1. Verify SEO
- Check meta tags: View page source
- Test Open Graph: https://www.opengraph.xyz/
- Test Twitter Cards: https://cards-dev.twitter.com/validator

### 2. Performance Check
- Lighthouse score: https://pagespeed.web.dev/
- Core Web Vitals
- Image optimization

### 3. Submit to Search Engines
- Google Search Console: Submit sitemap.xml
- Bing Webmaster Tools

## Performance Optimizations Applied

✅ Image optimization (AVIF, WebP)
✅ SWC minification
✅ Gzip compression
✅ Font optimization (swap)
✅ Preconnect to external domains
✅ React strict mode
✅ Package import optimization

## SEO Features

✅ Comprehensive meta tags
✅ Open Graph tags
✅ Twitter Card tags
✅ Structured data ready
✅ Sitemap.xml
✅ Robots.txt
✅ PWA manifest
✅ Semantic HTML

## Monitoring

### Recommended Tools
- Vercel Analytics (built-in)
- Google Analytics
- Sentry for error tracking
- Hotjar for user behavior

## Domain Setup

1. Add custom domain in Vercel
2. Update DNS records
3. Enable automatic HTTPS
4. Update `NEXT_PUBLIC_SITE_URL`

## Support

For issues, contact: support@loukii.com
