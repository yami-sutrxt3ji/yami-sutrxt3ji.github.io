# 📊 KENKO_DECK.EXE - Slide Conversion Guide

Convert your PowerPoint presentation into optimized WebP images for the web slide viewer.

---

## 🎯 Why WebP?

- **Smaller file size** → Faster loads (especially mobile)
- **Better quality** → Works perfectly with retro pixel aesthetic
- **Future-proof** → Modern web standard
- **GitHub Pages friendly** → No bloat, instant deployment

---

## 📝 Quick Start: PPTX → WebP Images

### Option 1: LibreOffice (Linux/Mac/Windows) - RECOMMENDED

**Step 1: Export PPT to PDF**
```bash
# Use LibreOffice command line
libreoffice --headless --convert-to pdf kenko_pitch.pptx --outdir ./

# Output: kenko_pitch.pdf
```

**Step 2: Convert PDF to Images**
```bash
# Using ImageMagick (install: brew install imagemagick)
convert -density 150 kenko_pitch.pdf -quality 85 slide_%02d.png

# Output: slide_01.png, slide_02.png, etc.
```

**Step 3: Convert PNG to WebP**
```bash
# Install cwebp: brew install webp (or apt-get install webp)

# Convert single image
cwebp -q 85 slide_01.png -o slide_01.webp

# Convert all PNGs to WebP
for file in slide_*.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
  rm "$file"  # Clean up PNG
done
```

**Step 4: Organize Files**
```bash
# Create directory structure
mkdir -p assets/slides/kenko

# Move files
mv slide_*.webp assets/slides/kenko/

# Result:
# assets/slides/kenko/
#   ├── 01.webp
#   ├── 02.webp
#   ├── 03.webp
#   └── ...
```

**Step 5: Update Viewer**

In `projects/kenko-pitch.html`, update the JavaScript:
```javascript
totalSlides: 8,  // Change to your slide count
slideDir: 'assets/slides/kenko/',
slideExt: '.webp',
```

---

### Option 2: Google Slides (Web-based - EASIEST)

**Step 1: Convert PPT to Google Slides**
- Open Google Slides
- Create new presentation
- File → Open → Upload kenko_pitch.pptx
- Click "Convert to Google Slides"

**Step 2: Export Slides as Images**
- File → Download → PNG Image (or PDF)
- This downloads slides as individual PNGs

**Step 3: Convert to WebP (Local)**
```bash
# After downloading all slide PNGs
for file in *.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done

# Rename and organize
mkdir -p assets/slides/kenko
mv *.webp assets/slides/kenko/

# Rename to numbers: 01.webp, 02.webp
cd assets/slides/kenko
count=1
for file in *.webp; do
  mv "$file" "$(printf '%02d' $count).webp"
  ((count++))
done
```

---

### Option 3: Microsoft PowerPoint (Windows)

**Step 1: Export to PDF**
- PowerPoint → File → Export As → PDF
- Save as `kenko_pitch.pdf`

**Step 2: Use Online Converter**
- Go to: https://pdf2image.com/ or similar
- Upload PDF
- Download as ZIP of images

**Step 3: Convert to WebP (on Windows with WSL)**
```bash
# Install WSL if not already done
# Inside WSL:
wsl apt-get install -y webp

# Convert
for file in *.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

**Step 4: Move to Repository**
```
assets/slides/kenko/01.webp, 02.webp, etc.
```

---

## 📋 Batch Conversion Script (Linux/Mac)

Save as `convert_slides.sh`:

```bash
#!/bin/bash

# Configuration
INPUT_PPT="kenko_pitch.pptx"
OUTPUT_DIR="assets/slides/kenko"
QUALITY=85

echo "🎬 Converting slides..."

# Step 1: PPT to PDF
echo "📄 Step 1: Converting PPT to PDF..."
libreoffice --headless --convert-to pdf "$INPUT_PPT" --outdir ./

# Extract PDF name
PDF_NAME="${INPUT_PPT%.pptx}.pdf"

# Step 2: PDF to PNG
echo "🖼️  Step 2: Converting PDF to PNG..."
convert -density 150 "$PDF_NAME" -quality 85 temp_slide_%02d.png

# Step 3: PNG to WebP
echo "🎨 Step 3: Converting PNG to WebP..."
for file in temp_slide_*.png; do
  slide_num=$(echo "$file" | sed 's/.*_//;s/\.png//')
  cwebp -q $QUALITY "$file" -o "${slide_num}.webp"
  rm "$file"
done

# Step 4: Organize
echo "📁 Step 4: Organizing files..."
mkdir -p "$OUTPUT_DIR"
mv [0-9][0-9].webp "$OUTPUT_DIR/"

# Cleanup
rm "$PDF_NAME"

echo "✅ Complete! Slides ready at: $OUTPUT_DIR"
echo "📊 Total slides: $(ls $OUTPUT_DIR/*.webp 2>/dev/null | wc -l)"
```

**Usage:**
```bash
chmod +x convert_slides.sh
./convert_slides.sh
```

---

## 🎯 Quality Settings

| Quality | File Size | Best For |
|---------|-----------|----------|
| 100 | ~500KB/slide | Crisp text, high quality |
| 85 | ~150KB/slide | **RECOMMENDED** |
| 75 | ~80KB/slide | Mobile-optimized |
| 60 | ~50KB/slide | Very slow connections |

---

## 📱 Mobile Optimization

For even faster mobile loads, create 2x resolutions:

```bash
# Full quality (desktop)
assets/slides/kenko/01.webp

# Mobile optimized (half size)
assets/slides/kenko/01-mobile.webp
```

Then update JavaScript:
```javascript
const isMobile = window.innerWidth < 768;
const slideExt = isMobile ? '.webp' : '.webp';
```

---

## 🔍 Verify Slides

After conversion, test locally:

```bash
# Open in Python HTTP server
cd /path/to/website
python3 -m http.server 8000

# Visit: http://localhost:8000/projects/kenko-pitch.html
```

---

## 🚀 Deploy to GitHub

```bash
git add assets/slides/kenko/
git commit -m "Add Kenko pitch deck slides (WebP format)"
git push origin main
```

Your slides are now live! 🎉

---

## 📊 Example File Structure

```
yami-sutrxt3ji.github.io/
├── projects/
│   └── kenko-pitch.html      ← Viewer
├── assets/
│   └── slides/
│       └── kenko/
│           ├── 01.webp       ← Title slide
│           ├── 02.webp       ← Problem
│           ├── 03.webp       ← Solution
│           ├── 04.webp       ← Market
│           ├── 05.webp       ← Users
│           ├── 06.webp       ← Features
│           ├── 07.webp       ← Timeline
│           └── 08.webp       ← Thank you
```

---

## ⌨️ Keyboard Shortcuts (Viewer)

| Key | Action |
|-----|--------|
| `→` / `SPACE` | Next slide |
| `←` | Previous slide |
| `P` / `ENTER` | Play/Pause autoplay |
| `F` | Fullscreen |
| `?` | Help |
| `ESC` | Close |

---

## 📞 Troubleshooting

**Q: Slides not showing?**
- Check file path: `assets/slides/kenko/01.webp`
- Verify file naming: `01.webp`, `02.webp` (zero-padded)
- Update `totalSlides` count in JavaScript

**Q: Images pixelated?**
- Increase density in ImageMagick: `convert -density 200`
- Increase cwebp quality: `cwebp -q 90`

**Q: Too slow on mobile?**
- Use quality 75-80
- Create mobile-optimized versions
- Lazy-load next slide in background

---

## 🎬 Next: Add Slides to Website

Once converted:

1. Update `projects/kenko-pitch.html` JavaScript:
   ```javascript
   totalSlides: 8  // Your slide count
   ```

2. Test locally
3. Push to GitHub
4. Share the link!

---

Made with curiosity and WebP magic ✨
