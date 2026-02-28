This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
ф
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## How to test

### 1. Apply the database migration
Open Supabase Dashboard → SQL Editor → New query, paste the contents of
`supabase/migrations/001_multi_role_foundation.sql`, and click **Run**.

### 2. Configure Supabase redirect URLs
Supabase Dashboard → Authentication → URL Configuration → Redirect URLs, add:
```
http://localhost:3000/auth/callback
https://abalon.app/auth/callback
```

### 3. Smoke tests

| # | Steps | Expected |
|---|-------|----------|
| 1 | Visit `/dashboard` while logged out | Redirected to `/login?next=/dashboard` |
| 2 | Sign in on `/login?next=/dashboard` | Lands on `/dashboard` |
| 3 | Visit `/account` | Shows email, member-since date, sign-in method, Sign out button |
| 4 | Sign out from `/account` | Redirected to `/login` |
| 5 | Visit `/reset-password` | Shows "Send reset link" form |
| 6 | Submit reset form with your email | Shows "Check your inbox" success message |
| 7 | Click reset link in email | Lands on `/reset-password/confirm` with password form |
| 8 | Set new password | Redirected to `/dashboard` |
| 9 | Visit `/customer/onboarding` as contractor user | Shows onboarding form |
| 10 | Submit onboarding form (name + ZIP) | Redirected to `/dashboard`, customer role shown |
| 11 | Visit `/customer/onboarding` again | Redirected to `/dashboard` (profile already exists) |

### 4. Build + deploy
```bash
npm run build          # must be green
vercel env ls production   # verify NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```
