# Ashish Borchate — Interactive Career Portfolio

Premium, data-driven career portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

## Run locally

```bash
npm install
npm run dev -- --port 43123
```

Open [http://localhost:43123](http://localhost:43123).

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

## Sound

Optional sound architecture lives in `context/sound-context.tsx`. `SOUND_GLOBALLY_DISABLED` is `true` until audio assets and UX are ready.
