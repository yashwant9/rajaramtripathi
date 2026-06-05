# Dr. Rajaram Tripathi — Biography Website

A single-page editorial biography site for **Dr. Rajaram Tripathi** — herbal scientist,
organic farmer, and founder of the **Maa Danteshwari Herbal Group**.

Built as a static website (HTML + CSS + vanilla JavaScript). No build step, no
dependencies — just open it in a browser or host the folder anywhere.

---

## 📁 File structure

```
.
├── index.html        # All page markup
├── style.css         # All styles (design system + sections)
├── script.js         # Scroll reveals, stat counters, bio scroll-spy, parallax
├── assets/           # Images, icons, SVGs
│   └── logos/         # (optional) drop partner / channel logos here
├── README.md         # This file
└── archive/          # Previous design versions (safe to delete)
```

## 🚀 Run locally

**Option A — open directly**
Double-click `index.html`. (Fonts load from Google Fonts, so keep an internet
connection the first time.)

**Option B — local server** (recommended, avoids any path issues)

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

```bash
# or Node
npx serve .
```

## 🌐 Deploy to GitHub Pages

1. Create a new GitHub repository and push these files to the `main` branch root:
   ```bash
   git init
   git add .
   git commit -m "Dr. Rajaram Tripathi biography site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment**
   → Source: **Deploy from a branch** → Branch: **main / (root)** → **Save**.
3. Your site goes live at `https://<you>.github.io/<repo>/` within a minute.

Works the same on **Netlify**, **Vercel**, **Cloudflare Pages**, or any static host —
just point it at this folder.

## ✏️ Customising

| What | Where |
|------|-------|
| Text / content | `index.html` |
| Colours, fonts, spacing | `:root` variables at the top of `style.css` |
| Photos | replace files in `assets/` (keep the same filenames, or update the `src`/`url()` references) |
| "As Featured In" logos | replace the placeholder wordmarks in the `.marquee__track` block, or add real logo images into `assets/logos/` |
| YouTube links | update the `href="https://www.youtube.com/"` values on the `.watch__channel` button and each `.vcard` in the **Watch** section |
| Contact details / map | the `<footer>` block in `index.html` |

## 🔤 Fonts

- **Cormorant Garamond** (display serif) + **Manrope** (UI / body) via Google Fonts.
- Loaded in the `<head>` of `index.html`. To self-host for full offline use,
  download the font files and replace the `<link>` with local `@font-face` rules.

## 📝 Notes

- The press-gallery captions and the "As Featured In" wordmarks are **placeholders** —
  swap in real outlet names and logos.
- The play buttons / video cards link out to YouTube; point them at the real videos.
- Layout is tuned for desktop (1440px design width). Ask for a responsive pass if you
  need tablet / mobile breakpoints.

---

© 2020 Dr. Rajaram Tripathi · Maa Danteshwari Herbal Group.
