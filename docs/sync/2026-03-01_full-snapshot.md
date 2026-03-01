# Project Snapshot — 2026-03-01 00:00

---

## 1. Workspace

| Field | Value |
|---|---|
| pwd | `/Users/alekszem/Downloads/War/APP/abalon-app` |
| Repo root confirmed | yes — `.git/` present |
| Node version | v24.13.0 |
| npm version | 11.6.2 |

---

## 2. Repository Structure

### Root (depth 1)

```
abalon-app/
├── CLAUDE.md
├── README.md
├── docs/
│   └── sync/
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── node_modules/
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
├── src/
├── supabase/
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

### public/

```
public/
├── favicon.svg
├── file.svg
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

### supabase/

```
supabase/
└── migrations/
    ├── 001_multi_role_foundation.sql
    └── 002_user_roles_update_policy.sql
```

### src/ (full file tree)

```
src/
├── app/
│   ├── (app)/
│   │   ├── account/
│   │   │   └── page.tsx
│   │   ├── contractor/
│   │   │   └── onboarding/
│   │   │       └── page.tsx
│   │   ├── customer/
│   │   │   └── onboarding/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (public)/
│   │   ├── categories/
│   │   │   └── page.tsx
│   │   ├── category/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── contractor-signup/
│   │   │   └── page.tsx
│   │   ├── customer-request/
│   │   │   └── page.tsx
│   │   ├── how-it-works/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── reset-password/
│   │   │   ├── confirm/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── success/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── jobs/
│   │       └── create/
│   │           └── route.ts
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── ResetPasswordConfirmForm.tsx
│   │   ├── ResetPasswordRequestForm.tsx
│   │   └── SignupForm.tsx
│   ├── contractor/
│   │   └── ContractorOnboardingForm.tsx
│   ├── customer/
│   │   └── CustomerOnboardingForm.tsx
│   └── layout/
│       ├── Header.tsx
│       └── SignOutButton.tsx
├── legacy/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   └── ServiceAreaMap.jsx
│   ├── data/
│   │   └── categories.js
│   ├── i18n.ts
│   ├── locales/
│   │   ├── de.js
│   │   ├── en.js
│   │   ├── es.js
│   │   ├── fr.js
│   │   └── ru.js
│   ├── pages/
│   │   ├── ContractorSignupPage.jsx
│   │   ├── CustomerRequestPage.jsx
│   │   ├── LandingPage.jsx
│   │   └── SuccessPage.jsx
│   └── utils/
│       └── zipCodeService.js
└── lib/
    ├── auth/
    │   ├── actions.ts
    │   └── guard.ts
    ├── config/
    │   └── env.ts
    └── supabase/
        ├── client.ts
        └── server.ts
```

---

## 3. Routing Inventory

Derived from `src/app/` filesystem and confirmed by `npm run build` output.

Route group `(app)` and `(public)` are Next.js route groups (parentheses are stripped from URL).

| URL Route | File Path | Component Type | Static/Dynamic | Notes |
|---|---|---|---|---|
| `/` | `src/app/(public)/page.tsx` | Client (`"use client"`) | Static (○) | Renders `LandingPage` from legacy |
| `/_not-found` | Next.js built-in | Server | Static (○) | |
| `/account` | `src/app/(app)/account/page.tsx` | Server | Dynamic (ƒ) | |
| `/categories` | `src/app/(public)/categories/page.tsx` | Server | Static (○) | |
| `/category/[id]` | `src/app/(public)/category/[id]/page.tsx` | Server | Dynamic (ƒ) | Dynamic segment: `id` |
| `/contractor-signup` | `src/app/(public)/contractor-signup/page.tsx` | Client (`"use client"`) | Static (○) | Renders `ContractorSignupPage` from legacy |
| `/contractor/onboarding` | `src/app/(app)/contractor/onboarding/page.tsx` | Server | Dynamic (ƒ) | Inside `(app)` group |
| `/customer-request` | `src/app/(public)/customer-request/page.tsx` | Client (`"use client"`) | Static (○) | Renders `CustomerRequestPage` from legacy |
| `/customer/onboarding` | `src/app/(app)/customer/onboarding/page.tsx` | Server | Dynamic (ƒ) | Inside `(app)` group |
| `/dashboard` | `src/app/(app)/dashboard/page.tsx` | Server | Dynamic (ƒ) | Inside `(app)` group |
| `/how-it-works` | `src/app/(public)/how-it-works/page.tsx` | Server | Static (○) | |
| `/login` | `src/app/(public)/login/page.tsx` | Server | Dynamic (ƒ) | |
| `/reset-password` | `src/app/(public)/reset-password/page.tsx` | Server | Static (○) | |
| `/reset-password/confirm` | `src/app/(public)/reset-password/confirm/page.tsx` | Server | Dynamic (ƒ) | |
| `/signup` | `src/app/(public)/signup/page.tsx` | Server | Dynamic (ƒ) | |
| `/success` | `src/app/(public)/success/page.tsx` | Client (`"use client"`) | Static (○) | Renders `SuccessPage` from legacy |
| `/api/jobs/create` | `src/app/api/jobs/create/route.ts` | API Route | Dynamic (ƒ) | POST only |
| `/auth/callback` | `src/app/auth/callback/route.ts` | API Route | Dynamic (ƒ) | GET only |

**Layouts:**

| File | Scope |
|---|---|
| `src/app/layout.tsx` | Root layout (wraps all routes) |
| `src/app/(public)/layout.tsx` | Wraps all `(public)` routes |
| `src/app/(app)/layout.tsx` | Wraps all `(app)` routes |

**Middleware:**

| File | Note |
|---|---|
| `src/proxy.ts` | Listed by build as `ƒ Proxy (Middleware)` |

---

## 4. API Inventory

### `src/app/api/jobs/create/route.ts`

- **Exported methods:** `POST`
- **Handler body (first 20 lines):**

```ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.workType || !body.zipCode || !body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: persist to Supabase jobs table
    console.log("[api/jobs/create] received:", body);

    return NextResponse.json({ ok: true, message: "Job request received" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

### `src/app/auth/callback/route.ts`

- **Exported methods:** `GET`
- **Handler body (first 20 lines):**

```ts
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function sanitizeNext(next: string | null): string {
  if (next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/http")) {
    return next;
  }
  return "/dashboard";
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeNext(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    if (process.env.NODE_ENV === "development") {
      console.error("[auth/callback]", error);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=link_expired`);
}
```

---

## 5. Environment Variables (Referenced)

### Variables referenced in source code

| Variable | Referenced Via |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `process.env.NEXT_PUBLIC_SUPABASE_URL` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | `process.env.NEXT_PUBLIC_MAPBOX_TOKEN` |
| `NEXT_PUBLIC_SITE_URL` | `process.env.NEXT_PUBLIC_SITE_URL` |
| `NODE_ENV` | `process.env.NODE_ENV` |

### `.env.local`

- **Exists:** yes
- **Variables defined (names only, no values):**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### `.env.local.example`

- **Exists:** yes
- **Variables defined (names only):**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Variables referenced in code but NOT defined in `.env.local`

| Variable |
|---|
| `NEXT_PUBLIC_MAPBOX_TOKEN` |
| `NEXT_PUBLIC_SITE_URL` |

---

## 6. Git State

| Field | Value |
|---|---|
| Current branch | `main` |
| Latest commit hash | `c55cac7` |
| Uncommitted changes | none (working tree clean) |
| Remote origin | `https://github.com/glenarvan38-afk/abalon-app.git` |

### Last 10 commits

```
c55cac7 Merge pull request #1 from glenarvan38-afk/merge-abalon-site
c757282 feat: stabilize legacy UI migration (ServiceAreaMap fix, routing placeholders, signup fallback)
ae5ebfd feat: server-side role gating + contractor onboarding form
7b4db91 fix: preserve ?next= through email confirm + explicit user_id filter
09f058b feat: signup flow + role assignment via ?role= query param
83b5f68 feat: start page + contractor/onboarding placeholder
978e8de feat: multi-role SQL migration + How to test README section
59cc591 feat: customer onboarding + dashboard role status + CTA
bf777d2 feat: account page + getUserOrRedirect guard
d8dc53b feat: ReturnTo (?next=) on login and layout redirects
```

---

## 7. Dependencies

### dependencies

| Package | Version | Highlighted |
|---|---|---|
| `@supabase/ssr` | ^0.8.0 | ✓ supabase |
| `@supabase/supabase-js` | ^2.97.0 | ✓ supabase |
| `i18next` | ^25.8.13 | ✓ i18next |
| `mapbox-gl` | ^3.19.0 | |
| `next` | 16.1.6 | |
| `react` | 19.2.3 | |
| `react-dom` | 19.2.3 | |
| `react-dropzone` | ^15.0.0 | |
| `react-hook-form` | ^7.71.2 | ✓ react-hook-form |
| `react-i18next` | ^16.5.4 | ✓ i18next |
| `react-map-gl` | ^8.1.0 | ✓ react-map-gl |
| `react-router-dom` | ^7.13.1 | |
| `zod` | ^4.3.6 | |

### devDependencies

| Package | Version |
|---|---|
| `@tailwindcss/postcss` | ^4 |
| `@types/node` | ^20 |
| `@types/react` | ^19 |
| `@types/react-dom` | ^19 |
| `eslint` | ^9 |
| `eslint-config-next` | 16.1.6 |
| `tailwindcss` | ^4 |
| `typescript` | ^5 |

**Highlighted presence check:**

| Package | Present |
|---|---|
| react-map-gl | yes |
| @supabase/supabase-js | yes |
| @supabase/ssr | yes |
| stripe | no |
| react-hook-form | yes |
| i18next | yes |

---

## 8. Build Status

**Command:** `npm run build`

**Result:** SUCCESS

```
▲ Next.js 16.1.6 (Turbopack)
✓ Compiled successfully in 6.0s
✓ Generating static pages using 7 workers (19/19) in 283.7ms
```

No TypeScript errors. No compilation errors.

**Build output — Route table:**

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /account
├ ƒ /api/jobs/create
├ ƒ /auth/callback
├ ○ /categories
├ ƒ /category/[id]
├ ○ /contractor-signup
├ ƒ /contractor/onboarding
├ ○ /customer-request
├ ƒ /customer/onboarding
├ ƒ /dashboard
├ ○ /how-it-works
├ ƒ /login
├ ○ /reset-password
├ ƒ /reset-password/confirm
├ ƒ /signup
└ ○ /success

ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

---

## 9. Factual Summary

| Metric | Count |
|---|---|
| Page routes detected | 16 (excluding `/_not-found`) |
| API endpoint files detected | 2 (`/api/jobs/create`, `/auth/callback`) |
| API methods exposed | 2 (POST, GET) |
| Env variables referenced in code | 5 |
| Env variables defined in `.env.local` | 2 |
| Build status | SUCCESS |
| Legacy directory present | yes (`src/legacy/`) |
| Supabase SQL migrations | 2 |
| Static routes | 8 |
| Dynamic (server-rendered) routes | 10 |
