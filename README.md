# Rahul Kumar — Portfolio

A responsive Next.js portfolio with a warm, editorial visual design, self-hosted variable fonts, Motion (formerly Framer Motion), and a GitHub-powered project archive.

## Run locally

Requires Node.js 20.9+ (Node.js 22 recommended).

```bash
npm install
npm run dev
```

Open the Local URL printed in your terminal (normally http://localhost:3000).

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

The production server requires a successful build. Do not run a production build while the development server is using the same `.next` directory.

## Pages and sections

The second design pass adds an interactive portrait / code hero with gentle pointer tilt, a keyboard-accessible featured-project explorer, real screenshots of Maison Cacao and DSA Solver captured from their live apps on October 27, 2026, and a live API playground. DSA Solver’s preview uses its built-in Two Sum sample. The third featured project and archive covers use original CSS artwork. All motion respects reduced-motion preferences.

The playground calls `GET /api/projects?limit=3` and displays an actual JSON response and measured request time. This public endpoint accepts an integer limit from 1 through 6, returns selected public project metadata, and shares the server-side GitHub cache and snapshot fallback. It does not expose a token or contact details. The endpoint is also useful for inspecting how the gallery data is served.

A reading-progress bar and a keyboard-accessible Back to top button help visitors navigate longer pages. Project archive cards have direct source and demo links.

- `/`: interactive introduction, featured-project explorer, about preview, skills, live API playground, and contact.
- `/projects`: searchable project gallery with category and language filters, sorting, and real GitHub repository metadata.
- `/projects/[slug]`: project details, GitHub source, the repository’s demo link when provided, and a safely rendered plain-text README preview.
- `/about`: background, working approach, education, and toolkit.
- `/contact`: real email links, copy-email button, and a validated enquiry form that opens the visitor’s email app with a draft. The visitor sends it from their email app; there is no mail server or stored submission.
- Custom loading and 404 pages.

## Make it yours

Edit `lib/profile.ts` for the name, email, GitHub username, site URL, skills, and optional featured-project descriptions. The existing `public/profile.png` is preserved. Colors, spacing, and responsive rules are in `app/styles/globals.css`.

The fonts (DM Sans, Space Grotesk, JetBrains Mono) are installed through Fontsource and served locally. Google Fonts access is not needed at build or runtime. The new site uses `motion/react` from the existing `motion` dependency, the current name of Framer Motion. Animations respect the visitor’s reduced-motion preference.

The original experimental components in `components/ui`, `hooks`, and the other original component folders are retained, but the redesigned pages use `components/portfolio`.

## How GitHub projects work

`lib/github.ts` requests public repositories for `importantboy` from the GitHub REST API on the server, follows pagination, removes forks and archived repositories, and caches successful API requests for one hour. When GitHub is unavailable or rate-limited, it uses `lib/github-snapshot.json`, a real metadata snapshot captured on October 27, 2026. The Projects page distinguishes fresh API data from this fallback.

New public repositories appear on the next cache refresh. Give each repository a useful Description, Topics, and Website URL in its GitHub About settings. The Website URL becomes the **Open demo** link; a demo link does not guarantee that a separately deployed project is online. External URLs are restricted to HTTP/HTTPS.

You can optionally set `GITHUB_TOKEN` in `.env.local` or your host’s server environment for a higher API rate limit. Use a token that can read public metadata. Do not use a `NEXT_PUBLIC_` variable for a token. No token is required and none is included in the project.

Update the fallback when needed:

```bash
npm run refresh:projects
```

If you change the account, update both `profile.github` and the snapshot with `node scripts/refresh-github-snapshot.mjs YOUR_USERNAME`. The script updates the fallback timestamp automatically.

`projectEditorial` supplies optional, curated titles, artwork, tags, descriptions, and highlights for featured work. Repositories without an entry still appear automatically. The abstract / illustrated project covers are original CSS artwork, not screenshots or a claim about a project’s deployed UI.

## Deploy

Deploy this repository as a Next.js app on a host with Node.js support (for example Vercel). Use `npm run build` as the build command. The GitHub integration runs on the server; a static HTML-only export is not configured. Set `profile.website` to the final domain for correct social metadata. No deployment or GitHub push is performed by the local setup.

## Accessibility and responsive behavior

- Fluid layouts for phones, tablets, and desktops.
- Keyboard-accessible mobile menu with Escape, focus management, and focus containment.
- Visible focus states, form labels, required-field validation, live filter count, and skip link.
- Reduced-motion support and locally hosted fonts.
- Responsive image sizing with the original portrait.

## Useful files

```text
app/                     Pages, layouts, and global styling
components/portfolio/    Redesign components and Motion interactions
lib/profile.ts           Profile, skills, and optional editorial project content
lib/github.ts            Server-only GitHub fetching, caching, and fallback
lib/github-snapshot.json Public repository metadata fallback
scripts/                 Snapshot refresh utility
public/profile.png       Original portrait
```
