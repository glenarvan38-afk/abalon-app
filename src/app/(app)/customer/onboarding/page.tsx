import { redirect } from "next/navigation";
import { getUserOrRedirect } from "@/lib/auth/guard";
import { createClient } from "@/lib/supabase/server";
import { CustomerOnboardingForm } from "@/components/customer/CustomerOnboardingForm";

export const metadata = { title: "Add customer profile — Abalon" };

export default async function CustomerOnboardingPage() {
  const user = await getUserOrRedirect("/customer/onboarding");

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("customer_profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add customer profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          This lets you request services as a customer alongside your contractor account.
        </p>
      </div>
      <CustomerOnboardingForm />
    </div>
  );
}
