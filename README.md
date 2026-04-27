# ASHISH.EXE - Retro Portfolio Experience

A nostalgic, interactive portfolio website inspired by Windows 98, BIOS terminals, CRT monitors, and cyberpunk aesthetics.

![Portfolio Status](https://img.shields.io/badge/status-active-brightgreen)
![Built With](https://img.shields.io/badge/built%20with-vanilla%20HTML%2FCSS%2FJS-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎮 Features

### **Boot Sequence**
Experience an authentic system startup:
- BIOS UEFI firmware initialization
- System memory and adapter detection  
- Bootloader diagnostics
- Gradual fade to main portfolio

### **Main Portfolio**
- **About Section** - Detailed bio as CS student, maker, and systems engineer
- **Projects** - Honest showcase:
  - KENKO_AAHARA (Nutrition system for chronic illness)
  - IDEA_LAB (Future explorations)
  - PORTFOLIO_OS (This website itself)
- **Skills & Experience** - Technical competencies
- **Contact** - Social links and communication methods
- **Arcade.exe** - Hidden retro game (Pong)

### **KENKO_DECK.EXE Application**
Interactive Windows 98-style slide viewer:
- **Draggable Window** - Grab and move around
- **Boot Sequence** - Terminal animation on launch
- **CRT Effects** - Scanlines, screen glow, subtle flicker
- **21-Slide Viewer** - Navigate with buttons or keyboard
- **Fullscreen Support** - Immersive presentation mode
- **Responsive Design** - Perfect on desktop, tablet, and mobile

### **Contact Card (/connect)**
Digital business card landing page:
- One-tap calling and email
- vCard download (phone contacts integration)
- Social media links
- QR code viewer
- Mobile-optimized design

### **Design System**
- **Colors**: Cyan (#00e5ff), Pink (#ff4b81), Deep Violet (#070711)
- **Fonts**: Silkscreen (titles), IBM Plex Mono (body), VT323 (terminal)
- **Theme**: Windows 98 + BIOS + Cyberpunk = Retro-Futuristic

---

## 🏗️ Architecture

```
yami-sutrxt3ji.github.io/
├── index.html              # Main portfolio (boot + UI)
├── connect.html            # Digital business card
├── projects/
│   └── kenko-pitch.html    # Extended slide viewer
├── src/
│   └── css/
│       ├── variables.css        # Design tokens
│       ├── boot-redesign.css    # Boot animation
│       ├── portfolio.css        # Main styles + Win98 app
│       ├── arcade.css           # Game styling
│       └── responsive.css       # Media queries
├── assets/
│   ├── avatar.png
│   ├── qr-code.png        # QR code for /connect
│   ├── ashish-contact.vcf # vCard file
│   └── slides/
│       └── kenko/
│           ├── 01.webp through 21.webp
│           └── (Presentation slides)
├── script.js               # Boot sequence, arcade, apps
└── style.css              # Legacy styling
```

---

## 🚀 Quick Start

### View Locally
```bash
# Clone repository
git clone https://github.com/yami-sutrxt3ji/yami-sutrxt3ji.github.io.git
cd yami-sutrxt3ji.github.io

# Open in browser (no build required)
open index.html
# or
firefox index.html
```

### Online
Visit: **https://t3jiyami.page**

---

## 🎯 How to Use

### **Main Portfolio**
1. Wait for boot sequence (or press ESC to skip)
2. Explore sections: About, Projects, Skills, Contact
3. Click project cards to learn more
4. Find hidden arcade game in hero section

### **Launch KENKO_DECK.EXE**
1. Scroll to Projects section
2. Click **[ LAUNCH ]** on KENKO_AAHARA card
3. Wait for boot sequence animation
4. Navigate slides with:
   - Buttons: **[◀ PREV]** and **[NEXT ▶]**
   - Keyboard: **Arrow Keys** or **Space**
   - Fullscreen: Press **F**
   - Close: Click **[✕]** or press **ESC**

### **View Contact Card**
1. Visit: **https://t3jiyami.page/connect**
2. Or scan QR code from anywhere
3. One-tap: **Call**, **Email**, **Save Contact**
4. View QR code or visit social profiles

### **Play Arcade**
1. Found in hero section (look for "ARCADE.EXE")
2. Control paddle with mouse
3. Get high score (saved to localStorage)

---

## 🎨 Design Inspiration

| Influence | Element | Example |
|-----------|---------|---------|
| **Windows 98** | Beveled UI, title bars, buttons | KENKO_DECK.EXE window |
| **BIOS** | Terminal aesthetics, boot messages | Startup sequence |
| **CRT Monitors** | Scanlines, screen glow, flicker | Video display effects |
| **Cyberpunk** | Neon cyan/pink accents | Glow effects, glitch style |
| **Pixel Art** | Retro fonts, chunky UI | Silkscreen typography |

---

## 🛠️ Technologies

- **HTML5** - Semantic structure
- **CSS3** - Animations, gradients, responsive design
- **Vanilla JavaScript** - No frameworks
- **Web Audio API** - Optional sound effects
- **LocalStorage** - Arcade high score persistence
- **Responsive Design** - 480px → 1920px+

---

## 📱 Responsive Breakpoints

- **Desktop** (900px+) - Full experience, draggable windows
- **Tablet** (768px) - Stacked layouts, touch-friendly
- **Mobile** (480px) - Full-screen apps, optimized controls

---

## 🎮 Boot Sequence Steps

1. **POWER ON** - Black screen with startup text
2. **DIAGNOSTICS** - Hardware detection and checks
3. **ASCII BANNER** - Retro title screen
4. **MAIN PORTFOLIO** - Fade to portfolio interface

Total duration: ~4-6 seconds (or skip with ESC)

---

## 🔧 Customization

### **Update Contact Information**
Edit `/connect.html`:
- Phone number (tel: link)
- Email address (mailto: link)
- Social media URLs
- Avatar image

### **Add/Modify Slides**
1. Convert your PPT to WebP images
2. Save as `assets/slides/kenko/01.webp` through `21.webp`
3. Update `kenkoTotalSlides` in `script.js` if count changes

### **Change Color Theme**
Edit `src/css/variables.css`:
```css
--portfolio-bg: #070711;
--portfolio-border: #00e5ff;
--portfolio-accent: #ff4b81;
```

### **Modify Boot Messages**
Edit `script.js` - `kenkoBootMessages` array:
```javascript
const kenkoBootMessages = [
  "> mount project://kenko",
  "> checking memory...",
  // Add your own messages here
];
```

---

## 📊 Project Status

| Section | Status | Notes |
|---------|--------|-------|
| Boot Sequence | ✅ Complete | 4 stages, 4-6s duration |
| Main Portfolio | ✅ Complete | All sections responsive |
| About Section | ✅ Complete | Authentic bio, hashtags |
| Projects | ✅ Complete | 3 projects, honest showcase |
| KENKO_DECK.EXE | ✅ Complete | Windows 98 app, 21 slides |
| Contact Card | ✅ Complete | vCard download, QR viewer |
| Arcade Game | ✅ Complete | Pong with high score |
| Mobile Responsive | ✅ Complete | 480px → 1920px+ |
| Performance | ✅ Complete | <100KB total JS |

---

## 🎯 Next Steps (Future)

- [ ] Add more projects as they're completed
- [ ] Create project detail pages
- [ ] Add blog section
- [ ] Integrate analytics
- [ ] Add dark/light mode toggle
- [ ] Create custom cursor system
- [ ] Add portfolio filters (by category/tech)
- [ ] Build project showcase videos

---

## 📚 Documentation

Additional guides are available in the repository root:

- **SLIDE_CONVERSION_GUIDE.md** - Convert PPT to WebP slides
- **QR_SETUP_GUIDE.md** - Generate QR codes for contact card

---

## 🎵 Audio

Optional retro sound effects:

- **Boot beep** (800Hz sine wave, 100ms) - On startup
- **Click sound** (600Hz sine wave, 50ms) - On navigation

Gracefully disabled if Web Audio API unavailable.

---

## 🔐 Privacy

- No tracking or analytics by default
- No external APIs required
- LocalStorage only for arcade high score
- Contact info is public (by design)
- All data stays in-browser

---

## 📄 License

MIT License - Feel free to fork and customize!

---

## 👨‍💻 About The Builder

**Ashish** - 2nd year CS student at GITAM Hyderabad

Interests: Firmware, embedded systems, OS internals, memory, binaries, cybersecurity, game development, 3D printing, open source.

🔗 **Connect**
- **GitHub**: [@yami-sutrxt3ji](https://github.com/yami-sutrxt3ji)
- **LinkedIn**: [Ashish Kumar](https://linkedin.com/in/ashish-kumar-9a5b4b)
- **Contact Card**: [t3jiyami.page/connect](https://t3jiyami.page/connect)

---

## 🙏 Acknowledgments

- **Inspiration**: Windows 98, BIOS screens, CRT monitors, cyberpunk aesthetics
- **Fonts**: Press Start 2P, VT323, IBM Plex Mono
- **Community**: Open source software and community-driven tools

---

## 🐛 Troubleshooting

### **Boot sequence doesn't play**
- Check browser console for errors
- Press ESC to skip and continue
- Clear cache and reload

### **Slides don't load in KENKO_DECK.EXE**
- Verify slides exist: `assets/slides/kenko/01.webp` → `21.webp`
- Check file naming (zero-padded: 01, 02, etc.)
- Ensure WebP format (not PNG or JPG)

### **Contact card QR doesn't scan**
- Generate new QR code pointing to `t3jiyami.page/connect`
- Test URL in browser first
- Ensure QR image is uploaded to GitHub

### **Mobile layout broken**
- Check viewport meta tag in `<head>`
- Verify CSS media queries load
- Test on different screen sizes

### **Arcade game laggy**
- Close other browser tabs
- Check browser performance monitor
- Try different browser

---

## 📞 Support

Issues? Questions?

1. Check this README
2. Review guide files (SLIDE_CONVERSION_GUIDE.md, QR_SETUP_GUIDE.md)
3. Inspect browser console for errors
4. Reach out via contact card at t3jiyami.page/connect

---

## 🎉 Made with curiosity and code

*A retro-futuristic portfolio celebrating the joy of building interactive experiences.*

---

**Status**: ✅ Live at https://t3jiyami.page
**Last Updated**: April 2026
**Built By**: Ashish (CS Student, Builder, Maker)

```
╔════════════════════════════════════════════════════════════════╗
║                   ASHISH.EXE v1.0                             ║
║              Welcome to 1998. Welcome to the future.           ║
╚════════════════════════════════════════════════════════════════╝
```
