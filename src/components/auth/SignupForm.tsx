"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp, type AuthState } from "@/lib/auth/actions";

export function SignupForm({ next, role }: { next?: string; role?: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signUp,
    null
  );

  const loginHref = next
    ? `/login?next=${encodeURIComponent(next)}`
    : "/login";

  if (state?.success) {
    return (
      <div className="space-y-4">
        <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          {state.success}
        </p>
        <Link
          href={loginHref}
          className="block w-full rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}
      {role && <input type="hidden" name="role" value={role} />}

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
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          placeholder="••••••••"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="confirm_password" className="block text-sm font-medium">
          Confirm password
        </label>
        <input
          id="confirm_password"
          name="confirm_password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
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
        {pending ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href={loginHref} className="text-gray-900 underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </form>
  );
}
