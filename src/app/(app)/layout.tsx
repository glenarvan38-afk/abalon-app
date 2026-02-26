import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";

// These routes are exempt from profile gating to prevent redirect loops.
const ONBOARDING_PATHS = ["/customer/onboarding", "/contractor/onboarding"];

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/dashboard";

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(pathname)}`);
  }

  if (!ONBOARDING_PATHS.includes(pathname)) {
    const { data: roles, error: rolesError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    // If the DB query failed, fail open — don't block the user on infra errors.
    if (!rolesError) {
      const roleNames = (roles ?? []).map((r: { role: string }) => r.role);

      if (roleNames.length === 0) {
        // No role assigned — send back to start to pick one.
        redirect("/");
      }

      const hasCustomer = roleNames.includes("customer");
      const hasContractor = roleNames.includes("contractor");

      // Only fetch profiles for roles the user actually has.
      const [cpResult, conpResult] = await Promise.all([
        hasCustomer
          ? supabase
              .from("customer_profiles")
              .select("user_id")
              .eq("user_id", user.id)
              .maybeSingle()
          : Promise.resolve({ data: null }),
        hasContractor
          ? supabase
              .from("contractor_profiles")
              .select("user_id")
              .eq("user_id", user.id)
              .maybeSingle()
          : Promise.resolve({ data: null }),
      ]);

      const customerComplete = hasCustomer && !!cpResult.data;
      const contractorComplete = hasContractor && !!conpResult.data;

      // Block until at least one role has a complete profile.
      if (!customerComplete && !contractorComplete) {
        if (hasCustomer) redirect("/customer/onboarding");
        if (hasContractor) redirect("/contractor/onboarding");
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header email={user.email ?? ""} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
