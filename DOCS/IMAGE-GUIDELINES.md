# Image Upload Guidelines

## 📸 Recommended Image Specifications

### Loop Card (Advisor Posts) Images

**Aspect Ratio**: 16:9 (Landscape) or 4:3  
**Recommended Dimensions**:
- **Minimum**: 1200 x 675px (16:9) or 1200 x 900px (4:3)
- **Optimal**: 1920 x 1080px (16:9) or 1600 x 1200px (4:3)
- **Maximum**: 3840 x 2160px (4K)

**Display Size**:
- **Mobile**: 224px height (h-56)
- **Desktop**: 320px height (h-80)
- **Width**: Full container width (responsive)

**File Format**: JPG, PNG, WebP  
**Max File Size**: 5MB per image  
**Quality**: 75-85% compression recommended

---

## 🎨 Image Best Practices

### 1. **Aspect Ratio**
- Use **16:9** for landscape photos (most common)
- Use **4:3** for standard photos
- Avoid vertical/portrait images (they will be cropped)

### 2. **Resolution**
- Upload high-resolution images (at least 1200px wide)
- Images will be automatically optimized by Next.js
- Multiple sizes generated for different devices

### 3. **Content Guidelines**
- Keep important content in the center
- Avoid text-heavy images (may be hard to read)
- Use clear, high-quality photos
- Ensure good lighting and contrast

### 4. **File Size**
- Compress images before upload
- Recommended tools: TinyPNG, ImageOptim, Squoosh
- Target: Under 500KB per image for best performance

---

## 📐 Technical Specifications

### Image Container
```tsx
// Mobile
height: 224px (h-56)
width: 100% (full width)

// Desktop  
height: 320px (h-80)
width: 100% (max-width: 768px)
```

### Aspect Ratio Calculation
```
16:9 Landscape:
- Width: 1920px → Height: 1080px
- Width: 1600px → Height: 900px
- Width: 1200px → Height: 675px

4:3 Standard:
- Width: 1600px → Height: 1200px
- Width: 1200px → Height: 900px
- Width: 800px → Height: 600px
```

---

## ✅ Upload Checklist

Before uploading images, ensure:

- [ ] Image is landscape orientation (16:9 or 4:3)
- [ ] Minimum width is 1200px
- [ ] File size is under 5MB
- [ ] Format is JPG, PNG, or WebP
- [ ] Image is clear and high quality
- [ ] Important content is centered
- [ ] No copyright issues

---

## 🚫 What to Avoid

❌ **Vertical/Portrait Images** - Will be cropped significantly  
❌ **Low Resolution** - Will appear blurry (< 800px wide)  
❌ **Large File Sizes** - Slow loading (> 5MB)  
❌ **Text-Heavy Images** - Hard to read on mobile  
❌ **Extreme Aspect Ratios** - Will be cropped awkwardly

---

## 💡 Tips for Best Results

1. **Use Professional Photos**: Clear, well-lit, high-quality
2. **Optimize Before Upload**: Compress to reduce file size
3. **Test on Mobile**: Check how it looks on small screens
4. **Multiple Images**: Upload 2-5 images per post for variety
5. **Consistent Style**: Use similar quality across all images

---

## 🔧 Image Optimization Tools

### Online Tools
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Advanced image optimization
- [ImageOptim](https://imageoptim.com/) - Mac app for compression

### Recommended Settings
- **Format**: WebP (best) or JPG
- **Quality**: 75-85%
- **Resize**: Max width 1920px
- **Strip Metadata**: Yes (reduces file size)

---

## 📱 Display Examples

### Mobile View (224px height)
```
┌─────────────────────────┐
│                         │
│    Image (16:9)         │ 224px
│                         │
└─────────────────────────┘
     Full width
```

### Desktop View (320px height)
```
┌──────────────────────────────────┐
│                                  │
│       Image (16:9)               │ 320px
│                                  │
└──────────────────────────────────┘
        Max 768px width
```

---

## 🎯 Summary

**Quick Reference**:
- **Aspect Ratio**: 16:9 (landscape)
- **Size**: 1920 x 1080px (optimal)
- **Format**: JPG or WebP
- **Max File**: 5MB
- **Display**: 224px (mobile), 320px (desktop)

For best results, upload landscape images with 16:9 aspect ratio at 1920x1080px resolution.

---

*Last Updated: November 12, 2024*
