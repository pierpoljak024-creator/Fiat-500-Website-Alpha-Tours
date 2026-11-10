# Fiat 500 Tour Rome — landing page

Private, chauffeured classic Fiat 500 tours of Rome, marketed under
**Alpha Tours Rome**. Single-page Next.js site with an on-page enquiry form,
a WhatsApp hand-off and structured data for local search.

## Stack

- Next.js 16 (App Router, Turbopack) built as a **static export** (`output: "export"`)
- React 19, TypeScript, Tailwind CSS v4 (`@theme` tokens in `app/globals.css`)
- Framer Motion for scroll reveals, Lucide for icons
- No database: enquiries are validated in `lib/inquiry.ts` and delivered to a
  webhook and/or Resend by the Netlify Function in `netlify/functions/inquiry.ts`,
  or logged when unconfigured

## Run it

```bash
npm run dev          # http://localhost:3000 (form endpoint is not served here)
npm run build        # static export into out/ (+ type check)
npm run lint         # eslint
npm run media:check  # media policy audit
npm run knowledge:json # operating knowledge base → JSON (see below)
```

`npm run dev` serves the pages only: `/api/inquiry` exists on Netlify, where the
function runs. To exercise the form locally, use `netlify dev`, which serves
`out/`-style static files *and* the function behind the same rewrite.

## Structure

```
app/
  layout.tsx           fonts, metadata, viewport
  page.tsx             section composition + JSON-LD
  globals.css          palette, type, decorative utilities, motion
  icon.tsx             generated favicon (no binary asset)
  opengraph-image.tsx  generated 1200×630 social card
  robots.ts            static robots.txt
  sitemap.ts           static sitemap.xml
netlify/
  functions/inquiry.ts POST /api/inquiry — validation, honeypot, rate limit
components/            hero, tours, gallery, reviews, booking, closing film, faq, chrome
lib/
  content.ts           every piece of editable copy (tours, gallery, FAQ)
  knowledge/           operating knowledge base: prices, cars, sites, rules, FAQ, cases
  inquiry.ts           enquiry validation + delivery (Resend / webhook)
  media.ts             media contract: allowed paths + file types
  public-file.ts       build-time existence checks for /public assets
  site.ts              contact details, links, env-var overrides
  structured-data.ts   LocalBusiness / TouristTrip / FAQPage graph
scripts/check-media.mjs media audit (see below)
scripts/knowledge-json.mjs knowledge base → JSON export
public/
  images/              hero + the eight gallery plates
  videos/              hero film + closing call-to-action film
```

## Media contract

Every image and video is local, served from `/public`, and referenced by a
root-relative path. **No remote URLs, no inline data URIs, no base64, no
attachments.** The fixed slots are:

| Slot | Purpose |
| --- | --- |
| `/images/hero.jpg` | hero photograph, also the hero film poster |
| `/images/gallery-1.jpg` … `/images/gallery-8.jpg` | the eight gallery plates (tour cards reuse `gallery-1` and `gallery-8`) |
| `/videos/hero.mp4` | optional ambient hero film |
| `/videos/secondary.mp4` | optional closing film behind the "Ready for your Roman holiday?" panel |

Allowed file types in `/public`: `.webp`, `.png`, `.jpg`, `.jpeg`, `.gif`,
`.mp4`. Anything else is skipped by the site and reported by
`npm run media:check`.

### How the placeholders behave

`components/photo.tsx` checks the slot at build time:

- **file present** → `next/image` renders it (with `sizes`, and `priority` in
  the hero);
- **file missing** → `components/photo-placeholder.tsx` renders the designed
  paper-and-arch stand-in, captioned "Photo coming soon", so there is never a
  broken image or a 404.

`components/hero-media.tsx` does the same for the film: `/videos/hero.mp4` is
mounted only if it exists, over the hero still, muted / looping / `playsInline`,
and hidden for `prefers-reduced-motion` users. Add files with these exact
names, then rebuild — no code change required.

`npm run media:check` lists which slots are live, which are still empty, and
logs any unsupported file it skips (for example `public/images/hero.psd`). It
also fails if source code references a remote image, a data URI or an
unsupported extension.

## Copy & pricing

All marketing copy lives in `lib/content.ts` — tours, prices, highlights,
value props, gallery captions, reviews, FAQ and booking steps. Structured data
and the enquiry form both read from it, so a price change only happens once.

## Operating knowledge base

`lib/knowledge/` is the internal record of how the tours actually work — the
answers that are too long, too cautious or too commercial for the website. It is
plain, dependency-free TypeScript, not a database (there is none), so a future
FAQ page, desk script or assistant can import it directly.

| File | Holds |
| --- | --- |
| `types.ts` | record shapes, including the `source` / `verifiedAt` stamp |
| `pricing.ts` | the three drives, the Vittoriano lift ticket, and `TICKET_POLICY` |
| `fleet.ts` | the cars, their colours, and the "check the diary first" rule |
| `venues.ts` | what the car may do at each stop — drive-by, walk, drop-off |
| `operations.ts` | house rules, each with its reasoning and approved guest wording |
| `faq.ts` | deeper Q&A than the site's; `publicReady` marks what may be published |
| `cases.ts` | anonymised worked enquiries, kept as training examples |
| `index.ts` | barrel, `quote()`, `searchKnowledge()`, `publicFaq()`, `toTrainingJson()` |

```ts
import { quote, searchKnowledge } from "@/lib/knowledge";

quote({ tourId: "custom-3h", liftTickets: 2 });
// → drive €300 + tickets €36 = €336, plus the notes that must be said with it

searchKnowledge("keyhole"); // every FAQ entry, rule and site that mentions it
```

Export the whole thing as JSON for a training system or a spreadsheet:

```bash
npm run knowledge:json                  # to stdout
npm run knowledge:json -- knowledge.json
```

**Ticket markup is off on purpose.** `TICKET_POLICY.enabled` is `false`, so a
guest pays exactly what the monument charges — €18 per person, €36 for two.
Switching it on is a one-line change in `lib/knowledge/pricing.ts`, and the
guest wording in `lib/knowledge/operations.ts` (`ticket-at-cost`) has to change
with it.

Every fact carries a `source` and a `verifiedAt` date; anything unconfirmed is
marked `verified: false`. Open questions live in `lib/knowledge/index.ts`, so
the next reply cannot quietly invent an answer.

## Contact details & launch TODOs

Contact details are environment-driven: `lib/site.ts` reads them from
`NEXT_PUBLIC_*` variables, so nothing needs editing in code. Copy
`.env.example` to `.env.local` and fill in what you have:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_PHONE` | phone number in header, footer, booking panel |
| `NEXT_PUBLIC_WHATSAPP` | digits only, incl. country code (e.g. `393331234567`) |
| `NEXT_PUBLIC_EMAIL` | public inbox shown in the footer (`mailto:` link) |
| `NEXT_PUBLIC_BOOKING_URL` | external booking engine; defaults to `#book` |
| `NEXT_PUBLIC_SITE_URL` | canonical URL for metadata, sitemap, JSON-LD |
| `RESEND_API_KEY` | enables email delivery of enquiries |
| `INQUIRY_TO_EMAIL` | inbox that receives enquiries (falls back to `NEXT_PUBLIC_EMAIL`) |
| `INQUIRY_FROM` | sender; must be on a domain verified in Resend |
| `INQUIRY_WEBHOOK_URL` | optional extra POST destination (Zapier, Make, n8n) |

There are **no dummy fallbacks**. While a value is blank or still says
`CHANGE_ME`, that channel is simply not rendered: the phone row, the email row
and every WhatsApp button disappear, and WhatsApp deep links point at the
enquiry form instead. Fill the values and rebuild — the UI appears by itself.

With no delivery channel configured, the API logs the enquiry to the server
console — fine for staging, not for launch.

## Deploy to Netlify

The site ships as a static export: `npm run build` writes `out/`, and Netlify
serves it from the CDN. The only server-side piece is the enquiry function.

1. **Build settings** — `netlify.toml` pins `npm run build`, `publish = "out"`,
   the function directory `netlify/functions` (esbuild bundling) and Node 22.
   Do **not** add `@netlify/plugin-nextjs`: a static export needs no Next.js
   runtime, and running the runtime against a manual (`netlify deploy --no-build`)
   upload leaves `/*` unrouted.
2. **Environment variables** — add every variable above under **Site
   configuration → Environment variables** (all scopes). `NEXT_PUBLIC_*` values
   are baked in at build time, so rebuild after changing them. The CLI can do it
   in one shot: `npx netlify-cli env:import .env.local`.
3. **Deploy** — either
   `npx netlify-cli deploy --build --prod --site <site-id>`, or build locally and
   upload the artefact:

   ```bash
   npm run build
   npx netlify-cli deploy --prod --no-build \
     --dir "$PWD/out" --functions "$PWD/netlify/functions" --site <site-id>
   ```
4. **Verify** — `/` returns HTML, `/api/inquiry` answers `405` to a GET (the
   function is routed) and `200 {"ok":true}` to a valid POST.
5. **Resend domain** — `alphatoursrome.com` is verified at
   <https://resend.com/domains>, so `INQUIRY_FROM` sends from
   `hello@alphatoursrome.com` to any inbox (currently the Hostinger mailbox in
   `INQUIRY_TO_EMAIL`). A failure is logged in **Functions → inquiry**; note that
   the production API key is send-only, so it cannot read the domain list.


## Accessibility & motion

Skip link, labelled nav landmarks, focus-visible brass outline, `aria-hidden`
on decorative layers, screen-reader text for the rating, and a full
`prefers-reduced-motion` path (scroll reveals, hero film and the sticky mobile
bar all respect it).
