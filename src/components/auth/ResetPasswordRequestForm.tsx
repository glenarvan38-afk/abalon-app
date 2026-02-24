"use client";

import { useActionState } from "react";
import { requestPasswordReset, type AuthState } from "@/lib/auth/actions";

export function ResetPasswordRequestForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    requestPasswordReset,
    null
  );

  if (state?.success) {
    return (
      <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
        {state.success}
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
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
        {pending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
