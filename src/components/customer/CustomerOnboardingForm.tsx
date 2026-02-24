"use client";

import { useActionState } from "react";
import { createCustomerProfile, type AuthState } from "@/lib/auth/actions";

export function CustomerOnboardingForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    createCustomerProfile,
    null
  );

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="full_name" className="block text-sm font-medium">
          Full name <span className="text-red-500">*</span>
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          placeholder="Jane Smith"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="home_zip" className="block text-sm font-medium">
          Home ZIP code <span className="text-red-500">*</span>
        </label>
        <input
          id="home_zip"
          name="home_zip"
          type="text"
          required
          pattern="\d{5}"
          maxLength={5}
          autoComplete="postal-code"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          placeholder="27601"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="home_address" className="block text-sm font-medium">
          Home address <span className="text-gray-400 text-xs font-normal">(optional)</span>
        </label>
        <input
          id="home_address"
          name="home_address"
          type="text"
          autoComplete="street-address"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          placeholder="123 Main St"
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
        {pending ? "Saving…" : "Save customer profile"}
      </button>
    </form>
  );
}
