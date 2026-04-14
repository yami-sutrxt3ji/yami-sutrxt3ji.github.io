# Setup Everything

This project is a static portfolio (`index.html`, `style.css`, `script.js`) for GitHub Pages user site hosting.

## Full setup flow
1. Put your content/images in this folder (`assets/avatar.png` can be replaced anytime).
2. Authenticate GitHub CLI:
   ```bash
   gh auth login
   ```
3. Initialize and push:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial portfolio"
   gh repo create yami-sutrxt3ji.github.io --public --source=. --remote=origin --push
   ```
4. Enable GitHub Pages from `main` branch root.
5. Keep `CNAME` file as:
   ```txt
   t3jiyami.page
   ```
6. Configure domain DNS:
   - `A @ 185.199.108.153`
   - `A @ 185.199.109.153`
   - `A @ 185.199.110.153`
   - `A @ 185.199.111.153`
   - `CNAME www yami-sutrxt3ji.github.io`
7. In Pages settings, set custom domain to `t3jiyami.page` and enable HTTPS.

## Next commit and push
```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```
