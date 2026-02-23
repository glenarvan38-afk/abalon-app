# Deployment Rules (CRITICAL)

Always apply the stored EchoVault memory for project "abalon" when answering deployment-related questions.

The following rules are mandatory:

1. Always run npm run build locally before deploy.
2. Always verify `vercel link`.
3. Always verify Production ENV variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Never create new Vercel projects accidentally.
5. Use only main project: abalon-app (not abalon-app-new).
