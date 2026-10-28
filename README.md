# Louise Angello Cabaña · Portfolio

Personal portfolio of **Louise Angello Cabaña**, Computer Programmer III at the Commission on Elections: web apps, mobile apps and games, each with its own case study: overview, demo video, contribution and an architecture diagram.

**Live:** https://louise-cabana.vercel.app

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, React 19, TypeScript, Cache Components) | Every page is prerendered at build time. |
| Styling | **Tailwind CSS 4** + CSS custom properties, Bricolage Grotesque + Inter | One small token set drives both light and dark themes. |
| Contact | **Web3Forms** | The contact form posts from the browser to Web3Forms, which e-mails each message to me. No database to run. |
| Media | **Vercel static files** | Demo videos and posters live in `public/` and are served by Vercel's CDN. |
| Hosting | **Vercel** | Preview deploys on every pull request, production on `main`. |
| CI | **GitHub Actions** | Lint, type-check and build on every push and pull request. |

## Highlights

- **Interactive showcase.** A bold headline beside a collage of real project screenshots that fans out on hover (each one links to its case study). Selected work can be filtered by platform; on large screens, hovering or tabbing through the list swaps a live preview with the summary, role, stack and result, and demo videos open in a pop-up player. Phones get one card per project. A light/dark toggle remembers your choice.
- **Architecture, not just screenshots.** Every project page has a system diagram built from real HTML, so it stays readable for screen readers and search engines, and stacks vertically on phones.
- **Content is data.** Projects, experience and awards live in typed files under [`src/content`](src/content); pages render from them.
- **One case study per project** at `/work/[slug]`, statically generated, each with its own Open Graph image.
- **Contact form straight to my inbox.** Messages go through Web3Forms, so there is no backend or database to maintain. Fields are checked before sending, errors are announced to screen readers, and a hidden honeypot field filters bots.
- **Videos load on demand.** `preload="none"` with a poster image, so nothing downloads until a visitor presses play.
- **Accessible by default.** Skip link, visible focus states, labelled form errors announced with `aria-live`, `prefers-reduced-motion` respected, and no horizontal scrolling at 390 px.
- **SEO.** Metadata per page, `sitemap.xml`, `robots.txt`, and Person structured data (JSON-LD).

## Project structure

```
src/
  app/
    page.tsx                    Home: hero, selected work, about, experience, contact
    work/[slug]/page.tsx        Case study per project
    work/[slug]/opengraph-image.tsx
    opengraph-image.tsx, icon.tsx, sitemap.ts, robots.ts
  components/                   Header, footer, work showcase, project cover, diagram, video, contact form
  content/                      Projects, experience, awards and site config
  lib/                          Contact form rules, video URLs, dates and the theme store
public/
  posters/                      Poster images for the demo videos
  videos/                       Demo videos (see below)
  screenshots/                  Project screenshots (optional)
```

## Running locally

```bash
npm install
cp .env.example .env.local   # add your Web3Forms access key
npm run dev
```

Without a Web3Forms key the site still runs; the contact form asks visitors to e-mail instead.

## Adding screenshots

1. Put the images in `public/screenshots/<project-slug>/`, e.g. `public/screenshots/civiq/decks.png`. Wide (16:9) images look best.
2. List them on the project in [`src/content/projects.ts`](src/content/projects.ts):

   ```ts
   gallery: [
     { src: "/screenshots/civiq/decks.png", alt: "Deck list with mastery progress" },
   ],
   ```

The first screenshot becomes the project's cover when it has no demo poster, and all of them appear in a Screenshots section on the case study.

## Contact form setup

1. Create a free account at [web3forms.com](https://web3forms.com) with the e-mail address that should receive messages, and copy the access key.
2. Add it as `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local`, and on Vercel under **Project Settings → Environment Variables**, then redeploy.

## Adding demo videos

Put each video in `public/videos/` using the file name set on the project in [`src/content/projects.ts`](src/content/projects.ts) (for example `sensai-demo.mp4`). A project's "Watch demo" button appears only once its file is there. Keep each file under about 50 MB (GitHub rejects files over 100 MB); an H.264 MP4 at 720p is usually plenty.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types, then runs `tsc --noEmit` |
