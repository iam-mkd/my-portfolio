# Mrinmoy Kumar Das, portfolio

Personal site built with React 19, TypeScript, Vite and Motion.

The hero is a distributed trace of my stack: each span is a part of what I work on, and hovering or tabbing to a span shows its attributes. Press `Ctrl K` (or `⌘ K`) anywhere for a command menu.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Edit content

All personal content lives in [`src/content.ts`](src/content.ts): profile, experience and case studies, skills, projects and the "Recently" updates. The hero trace is in [`src/trace.ts`](src/trace.ts). The résumé PDF is `public/Mrinmoy-Kumar-Das-Resume.pdf`; replace the file to update it.

To add a LinkedIn post to "Recently", add an entry to `updates` with `source: 'LinkedIn'`.

## Scripts

| Command           | What it does                    |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start the dev server            |
| `npm run build`   | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build      |
| `npm run lint`    | Lint with oxlint                |
| `npm run format`  | Format with Prettier            |

## Deploy

Vercel detects Vite automatically: framework preset Vite, build command `npm run build`, output directory `dist`.
