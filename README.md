# BookCraft — Vercel Deployment Guide

## Project Structure

```
bookcraft/
├── api/
│   └── export-epub.js      ← Vercel serverless function (Node.js)
├── public/
│   └── index.html          ← The BookCraft app (your existing file)
├── package.json
├── vercel.json
└── README.md
```

---

## How It Works

When the user clicks **Export EPUB**:

1. The browser renders the markdown → HTML using the existing `marked` pipeline
2. It splits the HTML into chapters at each `<h1>` boundary
3. It POSTs the chapters as JSON to `/api/export-epub`
4. The Vercel serverless function uses **epub-gen-memory** to build a valid EPUB 3 file
5. The binary `.epub` is streamed back and downloaded by the browser

No native binaries. No Pandoc. Works entirely within Vercel's serverless environment.

---

## Deployment Steps

### Prerequisites
- Node.js 18+ installed locally
- A [Vercel account](https://vercel.com) (free tier works)
- Vercel CLI installed:
  ```bash
  npm install -g vercel
  ```

---

### Step 1 — Install dependencies locally (for testing)

```bash
cd bookcraft
npm install
```

---

### Step 2 — Test locally with Vercel Dev

Vercel Dev emulates the serverless environment on your machine:

```bash
vercel dev
```

Open `http://localhost:3000` — the app runs with the API working exactly as it will in production. Test an EPUB export before deploying.

---

### Step 3 — Deploy to Vercel

```bash
vercel --prod
```

On first run, Vercel CLI will ask:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (first time) or Yes if updating
- **Project name** → `bookcraft` (or anything you like)
- **In which directory is your code?** → `.` (current directory)

Vercel will detect the `api/` folder automatically and deploy the function.

You'll get a URL like: `https://bookcraft-xyz.vercel.app`

---

### Step 4 — Subsequent deploys

After making any change:

```bash
vercel --prod
```

That's it. Vercel rebuilds and redeploys in ~30 seconds.

---

## Vercel Free Tier Limits (all fine for BookCraft)

| Limit | Free Tier | BookCraft Usage |
|---|---|---|
| Serverless function memory | 1024 MB | Set in vercel.json |
| Max function duration | 10s (Hobby) / 30s (Pro) | EPUB gen is ~1–3s |
| Request body size | 4.5 MB default | Set to 10 MB in code |
| Bandwidth | 100 GB/month | Negligible |

> **Note:** If your books contain many large base64-encoded images, the 4.5 MB default request body limit can be hit. The `sizeLimit: '10mb'` config in `api/export-epub.js` raises this. For very large image-heavy books, consider having users link images by URL instead of embedding them.

---

## Troubleshooting

**"Module not found: epub-gen-memory"**
→ Run `npm install` before deploying. Vercel installs from `package.json` automatically during build.

**EPUB downloads but won't open**
→ Verify the file isn't empty (check browser DevTools Network tab — the response should be a binary blob, not JSON). If the API returns a 500 error, check Vercel Function Logs in the dashboard.

**"HTTP 413 Payload Too Large"**
→ Your book has very large embedded images. Either reduce image size or switch to URL-referenced images.

**EPUB opens but images are missing**
→ Images embedded as base64 data URIs in the markdown are included in the payload and handled server-side. If images are hosted URLs, epub-gen-memory will attempt to fetch them during generation. Ensure those URLs are publicly accessible.

---

## Package Used

**epub-gen-memory** (`epub-gen-memory` on npm)
- Pure JavaScript — no native binaries, no Pandoc, no Calibre
- Produces valid EPUB 3 files
- Accepts HTML content per chapter
- Handles TOC/nav generation automatically
- Works in Vercel's serverless Node.js runtime
