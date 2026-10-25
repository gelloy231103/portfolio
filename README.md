# Loy Cabaña · Portfolio

Personal portfolio of **Louise Angello “Loy” Cabaña**: web apps, mobile apps and games, with a case-study page and demo video for each project.

**Live:** _added after the first deploy_

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, React 19, TypeScript, Cache Components) | Every page is prerendered at build time; the contact form uses a Server Action. |
| Styling | **Tailwind CSS 4** + CSS custom properties | One token set drives light and dark themes; device mock-ups are drawn in CSS, not images. |
| Data | **Supabase** (Postgres + Storage) | Contact messages go to a table protected by Row Level Security; demo videos are served from a public Storage bucket. |
| Hosting | **Vercel** | Preview deploys on every pull request, production on `main`. |
| CI | **GitHub Actions** | Lint, type-check and build on every push and pull request. |

## Highlights

- **Content is data.** Projects, skills and awards live in typed files under [`src/content`](src/content); pages render from them.
- **One case-study page per project** at `/work/[slug]`, statically generated, each with its own Open Graph image.
- **Secure contact form.** The public key can only `INSERT` into `contact_messages` (RLS + column-level grants), so it can never read messages back. Input is validated on the server with Zod, and a honeypot field filters bots.
- **Videos load on demand.** `preload="none"` with a poster image, so nothing downloads until a visitor presses play.
- **Accessible by default.** Skip link, visible focus states, labelled form errors announced with `aria-live`, `prefers-reduced-motion` respected, and no horizontal scrolling at 390 px.
- **SEO.** Metadata per page, `sitemap.xml`, `robots.txt`, and Person structured data (JSON-LD).

## Project structure

```
src/
  app/
    page.tsx                    Home: hero, work grid, about, journey, awards, contact
    work/[slug]/page.tsx        Case-study page per project
    work/[slug]/opengraph-image.tsx
    actions/contact.ts          Server Action for the contact form
    opengraph-image.tsx, icon.tsx, sitemap.ts, robots.ts
  components/                   UI components (device mocks, cards, form, header)
  content/                      Projects, skills, awards and site config
  lib/                          Supabase client (server-only) and media URLs
supabase/migrations/            Database schema, RLS policies and the media bucket
```

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL and anon key
npm run dev
```

Without Supabase variables the site still runs: videos are hidden and the contact form asks visitors to e-mail instead.

## Supabase setup

1. Create a project, then apply the migration in [`supabase/migrations`](supabase/migrations) (SQL editor or `supabase db push`).
2. Upload the demo videos to the `media` bucket using the file names in [`src/content/projects.ts`](src/content/projects.ts).
3. Read messages in the dashboard under **Table Editor → contact_messages**.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types, then runs `tsc --noEmit` |
