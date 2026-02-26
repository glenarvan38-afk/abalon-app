import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Abalon" };

export default async function StartPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const customerHref = user
    ? "/customer/onboarding"
    : "/login?next=/customer/onboarding";

  const contractorHref = user
    ? "/contractor/onboarding"
    : "/login?next=/contractor/onboarding";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Abalon</h1>
          <p className="mt-2 text-gray-500">
            Choose how you want to use the platform
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900">I need a contractor</h2>
            <p className="mt-1 text-sm text-gray-500">
              Find trusted professionals for your home.
            </p>
            <Link
              href={customerHref}
              className="mt-4 block w-full rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Continue as customer
            </Link>
          </div>

          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900">I am a contractor</h2>
            <p className="mt-1 text-sm text-gray-500">
              Offer your services and grow your business.
            </p>
            <Link
              href={contractorHref}
              className="mt-4 block w-full rounded-md border border-gray-900 px-4 py-2 text-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
            >
              Continue as contractor
            </Link>
          </div>
        </div>

        {!user && (
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-gray-900 underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
