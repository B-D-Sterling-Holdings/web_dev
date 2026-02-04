# BD Sterling Holdings Website - Claude Code Instructions

## Project Overview
This is a Next.js 15 website for BD Sterling Holdings, an investment firm. The site includes public marketing pages and a protected investor portal.

## Tech Stack
- **Framework:** Next.js 15.3.6 with App Router
- **UI Library:** React 19
- **Styling:** Tailwind CSS 3.4.17
- **Animations:** Framer Motion 12.16.0, GSAP
- **Charting:** Chart.js, Plotly.js
- **Icons:** lucide-react

## Directory Structure

### Frontend (Safe to Modify)
- `/src/app/` - Page components (layout.js, page.jsx files)
- `/src/components/` - Reusable UI components
- `/src/styles/globals.css` - Global styles and CSS variables
- `/public/` - Static assets (images, logos)
- `tailwind.config.mjs` - Tailwind configuration

### Backend (DO NOT MODIFY)
- `/src/app/api/` - API routes (Google Sheets integration, authentication)
- `.env.local` - Environment variables and credentials
- Any files handling authentication logic

## Important Constraints

**FRONTEND ONLY:** This project is being developed with frontend improvements only. Do not:
- Modify any files in `/src/app/api/`
- Change authentication logic
- Alter API endpoints or data fetching methods
- Modify environment variable configurations

**MAINTAIN FUNCTIONALITY:** All existing features must continue to work:
- Google Sheets data integration
- Login/authentication flow
- Contact form submissions
- Embedded Google Docs in research pages

## Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Navbar | `/src/components/Navbar.jsx` | Site navigation |
| Faq | `/src/components/Faq.jsx` | FAQ accordion |
| StatBoxSection | `/src/components/StatBoxSection.jsx` | Statistics display |
| FundVsSP500Chart | `/src/components/FundVsSP500Chart.jsx` | Performance chart |
| SheetTable | `/src/components/SheetTable.jsx` | Portfolio data table |
| login | `/src/components/login.jsx` | Login form UI |

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `/src/app/page.jsx` | Homepage |
| `/about` | `/src/app/about/page.jsx` | About page |
| `/contact` | `/src/app/contact/page.jsx` | Contact form |
| `/strategy` | `/src/app/strategy/page.jsx` | Investment strategy |
| `/research` | `/src/app/research/page.jsx` | Research hub |
| `/tools` | `/src/app/tools/page.jsx` | Tools page |
| `/progress-letters` | `/src/app/progress-letters/page.jsx` | Progress letters |
| `/portfolio-analytics` | `/src/app/portfolio-analytics/page.jsx` | Investor portal (protected) |

## Styling Guidelines
- Use Tailwind CSS utility classes for styling
- Custom animations are in `/src/styles/globals.css`
- Component-specific styles use CSS Modules (e.g., `StatBox.module.css`)
- Font: "Plus Jakarta Sans"
- Support both light and dark mode via CSS variables

## Development Commands
```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # Run ESLint
```

## When Making Changes
1. Preserve all existing functionality
2. Test that API integrations still work (data loading, forms)
3. Ensure responsive design works on mobile
4. Maintain accessibility standards
5. Keep animations smooth and performant
