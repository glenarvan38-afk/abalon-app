import Link from "next/link";
import { getUserOrRedirect } from "@/lib/auth/guard";

export const metadata = { title: "Contractor onboarding — Abalon" };

export default async function ContractorOnboardingPage() {
  await getUserOrRedirect("/contractor/onboarding");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        Contractor onboarding
      </h1>
      <p className="mt-2 text-gray-500">Coming next sprint.</p>
      <Link
        href="/dashboard"
        className="mt-6 text-sm text-gray-900 underline underline-offset-2"
      >
        Go to dashboard
      </Link>
    </div>
  );
}
