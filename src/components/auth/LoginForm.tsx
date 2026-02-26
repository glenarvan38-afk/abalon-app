"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn, type AuthState } from "@/lib/auth/actions";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signIn,
    null
  );

  return (
    <form action={action} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <a
            href="/reset-password"
            className="text-sm text-gray-500 hover:text-black"
          >
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href={next ? `/signup?next=${encodeURIComponent(next)}` : "/signup"}
          className="text-gray-900 underline underline-offset-2"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
