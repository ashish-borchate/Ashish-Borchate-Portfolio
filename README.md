# Ashish Borchate — Interactive Career Portfolio

Premium, data-driven career portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

## Run locally (on your computer)

```bash
npm install
npm run dev -- --port 43123
```

Open [http://localhost:43123](http://localhost:43123) **in the same machine where the command is running**.

## Preview while using a Cloud Agent

**`http://127.0.0.1:43123` is not your laptop.** It is the remote agent’s machine. Pasting that address into Chrome on your PC will usually fail or behave inconsistently.

Reliable options:

1. **Cursor Preview** — On the agent’s reply, use the **Preview** control (opens the site inside Cursor’s cloud desktop). Do not rely on your own browser with `127.0.0.1`.
2. **Public link for this session** — The agent may share a temporary URL (for example Cloudflare `trycloudflare.com`). It must point at a **production** server (`npm run build && npm run start`), not `npm run dev`. Dev mode + tunnels often break JavaScript, which hides headlines and scroll sections.
3. **Always-on URL (recommended)** — Create a GitHub repo from this project, connect it to [Netlify](https://netlify.com) (this repo includes `netlify.toml`), and use your Netlify production URL. Redeploys automatically when you push.

After you connect Netlify or Vercel to your repo, update `metadataBase` in `app/layout.tsx` to your production domain.

## Build

```bash
npm run build
npm start
```

## Content updates

Edit structured data under `/data` — not UI components — for profile copy, experience, case studies, metrics, tools, and testimonials.

Use placeholders such as `[VERIFY METRIC]` and `[FINAL COPY]` until resume content is approved.

## Assets

See `public/assets/README.md`.

## Deploy (Netlify)

Repository includes `netlify.toml` for the Next.js Netlify plugin. Connect the repo and deploy; set your production URL in `app/layout.tsx` `metadataBase` when known.

### Static folder (Altura-style local copy + Netlify Drop)

See **`STATIC-PORTFOLIO.md`** — build a self-contained `out/` folder, copy to `~/Documents/cursor/Ashish-Borchate-Portfolio`, open with `npm run preview:static`, or drag `out/` to [Netlify Drop](https://app.netlify.com/drop).

## Sound

Optional sound architecture lives in `context/sound-context.tsx`. `SOUND_GLOBALLY_DISABLED` is `true` until audio assets and UX are ready.
