# Quick Start

## 1. Run locally
Open `index.html` directly in your browser.

## 2. Log in to GitHub CLI
```bash
gh auth login
```

## 3. Create and push user-site repo
Run inside this folder:
```bash
git init -b main
git add .
git commit -m "Initial portfolio"
gh repo create Astro.github.io --public --source=. --remote=origin --push
```

## 4. Enable Pages
On GitHub: **Astro.github.io → Settings → Pages**
- Source: **Deploy from a branch**
- Branch: **main / root**

## 5. Custom domain
`CNAME` already contains:
```txt
t3jiyami.page
```

Add DNS at your registrar:
- `A` record `@` → `185.199.108.153`
- `A` record `@` → `185.199.109.153`
- `A` record `@` → `185.199.110.153`
- `A` record `@` → `185.199.111.153`
- `CNAME` record `www` → `astro.github.io`

Then in GitHub Pages settings:
- Custom domain: `t3jiyami.page`
- Enable **HTTPS**
