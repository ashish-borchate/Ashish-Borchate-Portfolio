# Open the portfolio like Altura (local file / Netlify Drop)

Your **Expense Tracker** / **Altura** style: one folder on the Mac, open and it works.

This portfolio is built with **Next.js** (many files + JavaScript bundles). Browsers block most of that on `file://`, so it needs a **one-click launcher** that starts a tiny server and opens Safari/Chrome — same habit as double-clicking `index.html`, one extra terminal window in the background.

## One-click on your Mac (after `export:desktop`)

1. In Finder go to **`~/Documents/cursor/Ashish-Borchate-Portfolio`**
2. Double-click **`index.html`** for styled layout and **tabs that switch without JavaScript**.
3. For **Journey scroll pin** and **metric count-up**, double-click **`Open Portfolio.command`**.

The launcher runs **`npm run start`** from **`~/Ashish-Borchate-Portfolio`** (full Next.js). It **restarts** the server on port 8765 so you are not stuck on an old tab.

After **`git pull`**, run:

```bash
cd ~/Ashish-Borchate-Portfolio
npm run build
npm run refresh:desktop
```

Then double-click **`Open Portfolio.command`** again.

If the page looks unstyled (plain blue links): you have an **old copy** — in the repo run `git pull` and `npm run export:desktop` again.

---

Your **Altura** project is a single `index.html` — double‑clicking it works with `file://`.

This portfolio is a **Next.js app**. After a static build you get a **folder** with `index.html` plus `_next/` and `assets/`. You still use that folder the same way in practice: one place on disk, rebuild to update, drag to Netlify when ready.

## One-time setup (on your Mac)

Clone the repo ([Origin CLI](https://cursor.com/docs/origin/cli)):

```bash
curl -fsSL https://downloads.cursor.com/origin/install.sh | sh
origin auth login
origin repo clone ashish-borchate/Ashish-Borchate-Portfolio
cd Ashish-Borchate-Portfolio
npm install
```

If `origin` is not found:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Codebase (private): [Ashish-Borchate-Portfolio on Cursor](https://cursor.com/codebase/ashish-borchate/Ashish-Borchate-Portfolio)

---

## Update your local “always open this” copy

From the repo root:

```bash
# Build static site into ./out
npm run build:static

# Optional: copy to Documents/cursor (Altura-style location)
npm run export:desktop
```

That copies the site to:

`~/Documents/cursor/Ashish-Borchate-Portfolio/index.html`  
(and `_next/`, `assets/`, etc. in the same folder)

**Important:** Do **not** expect `file:///…/index.html` alone to behave like Altura. Browsers block many scripts on `file://`. Use the preview command below (takes 2 seconds, works every time).

### Open the updated site (recommended)

```bash
npm run preview:static
```

Then open **http://localhost:8765** in Chrome/Safari.

Or from the Desktop folder:

```bash
cd ~/Documents/cursor/Ashish-Borchate-Portfolio
npx serve -p 8765 .
```

---

## Upload to Netlify (no Git required)

1. Run `npm run build:static`
2. Open [Netlify Drop](https://app.netlify.com/drop)
3. Drag the entire **`out`** folder (from the repo) onto the page

You get a live URL. Connect the Git repo later if you want auto-deploy on push (uses `netlify.toml` in the repo root).

---

## Which build for what?

| Command | Output | Use for |
|--------|--------|--------|
| `npm run build:static` | `./out/` | Netlify Drop, USB copy, Desktop folder |
| `npm run build` + `npm start` | Server | Full Next.js locally |
| `npm run dev` | Dev server | Editing code only |

After content changes in `/data`, run **`npm run export:desktop`** again (or `build:static` + copy) to refresh your local copy.
