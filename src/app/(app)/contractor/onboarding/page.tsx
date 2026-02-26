import { redirect } from "next/navigation";
import { getUserOrRedirect } from "@/lib/auth/guard";
import { createClient } from "@/lib/supabase/server";
import { ContractorOnboardingForm } from "@/components/contractor/ContractorOnboardingForm";

export const metadata = { title: "Contractor setup — Abalon" };

export default async function ContractorOnboardingPage() {
  const user = await getUserOrRedirect("/contractor/onboarding");

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("contractor_profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Set up your contractor profile
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Tell us about your business so we can match you with customers.
        </p>
      </div>
      <ContractorOnboardingForm />
    </div>
  );
}
