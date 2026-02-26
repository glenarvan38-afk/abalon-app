"use client";

import { useActionState } from "react";
import { createContractorProfile, type AuthState } from "@/lib/auth/actions";

const INPUT =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black";

export function ContractorOnboardingForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    createContractorProfile,
    null
  );

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="company_name" className="block text-sm font-medium">
          Company name <span className="text-red-500">*</span>
        </label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          required
          className={INPUT}
          placeholder="Acme Contractors LLC"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="contact_name" className="block text-sm font-medium">
          Your name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact_name"
          name="contact_name"
          type="text"
          required
          autoComplete="name"
          className={INPUT}
          placeholder="Jane Smith"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className={INPUT}
          placeholder="(919) 555-0100"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="office_address" className="block text-sm font-medium">
          Office address <span className="text-red-500">*</span>
        </label>
        <input
          id="office_address"
          name="office_address"
          type="text"
          required
          autoComplete="street-address"
          className={INPUT}
          placeholder="123 Main St, Raleigh"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="office_zip" className="block text-sm font-medium">
            ZIP <span className="text-red-500">*</span>
          </label>
          <input
            id="office_zip"
            name="office_zip"
            type="text"
            required
            pattern="\d{5}"
            maxLength={5}
            autoComplete="postal-code"
            className={INPUT}
            placeholder="27601"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="state" className="block text-sm font-medium">
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            maxLength={2}
            defaultValue="NC"
            className={INPUT}
            placeholder="NC"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="service_radius_miles"
          className="block text-sm font-medium"
        >
          Service radius <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="service_radius_miles"
            name="service_radius_miles"
            type="number"
            required
            min={1}
            max={500}
            className={INPUT}
            placeholder="25"
          />
          <span className="shrink-0 text-sm text-gray-500">miles</span>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="services" className="block text-sm font-medium">
          Services offered <span className="text-red-500">*</span>
        </label>
        <input
          id="services"
          name="services"
          type="text"
          required
          className={INPUT}
          placeholder="Landscaping, Fencing, Grading"
        />
        <p className="text-xs text-gray-400">Separate multiple services with commas.</p>
      </div>

      <div className="space-y-1">
        <label htmlFor="license_number" className="block text-sm font-medium">
          License number{" "}
          <span className="font-normal text-gray-400 text-xs">(optional)</span>
        </label>
        <input
          id="license_number"
          name="license_number"
          type="text"
          className={INPUT}
          placeholder="NC-123456"
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
        {pending ? "Saving…" : "Complete setup"}
      </button>
    </form>
  );
}
