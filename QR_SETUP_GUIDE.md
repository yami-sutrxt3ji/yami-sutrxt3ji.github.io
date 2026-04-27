# 📱 QR CODE SETUP GUIDE - ASHISH.EXE Connect Card

Your digital contact card is ready at: **`https://t3jiyami.page/connect`**

Now generate a QR code that points to it.

---

## 🎯 Why QR Code?

✅ Easy to share (business cards, posters, bios)
✅ Works across platforms
✅ No character limit (unlike raw vCard QR)
✅ Updates automatically (QR always points to current page)
✅ Professional branded experience

---

## 🔧 How to Generate QR Code

### Option 1: Free Online (Easiest)

**Method A - QR Code Generator**
1. Go to: https://www.qr-code-generator.com/
2. Paste URL: `https://t3jiyami.page/connect`
3. Select size: 300x300px or larger
4. Click "Download as PNG"
5. Save as `assets/qr-code.png`

**Method B - QR Server (Dynamic)**
```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://t3jiyami.page/connect
```
Use this direct link in HTML:
```html
<img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://t3jiyami.page/connect" alt="QR Code">
```

**Method C - GoQR**
1. Go to: https://goqr.me/
2. Enter: `https://t3jiyami.page/connect`
3. Customize color (optional)
4. Download PNG

---

### Option 2: Command Line (Linux/Mac)

**Using qrencode:**
```bash
# Install
brew install qrencode  # Mac
apt-get install qrencode  # Linux

# Generate
qrencode -s 10 -o assets/qr-code.png "https://t3jiyami.page/connect"

# -s 10 = module size (higher = bigger image)
# Result: 300x300px PNG
```

**Using Python:**
```python
import qrcode

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data('https://t3jiyami.page/connect')
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save('assets/qr-code.png')

print("✅ QR code saved to assets/qr-code.png")
```

---

## 📁 File Setup

1. **Download QR code PNG** (300x300px recommended)

2. **Save to:** `assets/qr-code.png`

3. **File structure:**
```
yami-sutrxt3ji.github.io/
├── connect.html          ← Contact page
├── assets/
│   ├── qr-code.png       ← QR code image
│   └── avatar.png        ← Already exists
```

4. **Update connect.html** (if using local file):
```html
<img src="assets/qr-code.png" alt="QR Code">
```

---

## 🎨 QR Code Best Practices

| Property | Recommended |
|----------|-------------|
| Size | 300x300px or larger |
| Color | Black on white (best readability) |
| Format | PNG (lossless) |
| Error Correction | L or M level |
| Border | 4+ modules white space |

---

## 🚀 Deployment

Once you have the QR code:

```bash
# Save QR code to assets/
cp /path/to/qr-code.png assets/qr-code.png

# Commit
git add assets/qr-code.png connect.html
git commit -m "Add digital contact card with QR code"
git push origin main
```

---

## 📋 Where to Use QR Code

### Digital Placements
- 🧬 GitHub profile README
- 📱 Instagram bio link
- 💼 LinkedIn About section
- 🐦 Twitter bio
- 💬 Discord status

### Physical Placements
- 📇 Business cards
- 🖼️ Portfolio prints
- 📋 Resume footer
- 🎨 Portfolio website footer
- 📸 Portfolio photos

---

## ✨ Testing

**Before deploying:**

1. **Generate QR code** pointing to `https://t3jiyami.page/connect`

2. **Test with phone camera:**
   - Point camera at QR code
   - Should open `/connect` page
   - All buttons should work
   - Download vCard should work

3. **Check mobile experience:**
   - Buttons responsive ✅
   - No overflow ✅
   - Avatar displays ✅
   - Links work ✅

---

## 🎯 Next Steps

1. ✅ Generate QR code (see options above)
2. ✅ Save as `assets/qr-code.png`
3. ✅ Push to GitHub
4. ✅ Share the QR code!

---

## 💡 Pro Tips

**Dynamic QR Codes** (Premium, optional):
- Use services like bit.ly or Rebrandly
- Track scan analytics
- Change destination without regenerating QR

**Branded QR Codes** (Advanced):
- Add your logo in center (stays scannable)
- Use custom colors
- Try QR code artists online

**Version Control**:
- Keep backup of QR code
- Document URL it points to
- Test after any URL changes

---

## 🔗 Current Setup

Your contact card is configured with:
- ✅ Call button (tel: link)
- ✅ Email button (mailto: link)
- ✅ Save Contact (downloads .vcf file)
- ✅ Social links (GitHub, Instagram, LinkedIn, Website)
- ✅ QR code modal viewer
- ✅ Mobile responsive design
- ✅ Print-friendly layout

---

## 📞 Contact Information Used

Update these in `connect.html` if needed:

```html
<!-- Phone Number -->
<a href="tel:+919876543210">

<!-- Email -->
<a href="mailto:gator77@t3jiyami.page">

<!-- Social Links -->
https://github.com/yami-sutrxt3ji
https://linkedin.com/in/ashish-kumar-9a5b4b
https://instagram.com/
https://t3jiyami.page
```

---

Made with curiosity and cyan pixels ✨
