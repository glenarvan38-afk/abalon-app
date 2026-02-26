import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard — Abalon" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Gracefully handle tables not yet existing (migration not applied)
  const [rolesResult, cpResult, conpResult] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user!.id),
    supabase.from("customer_profiles").select("user_id").maybeSingle(),
    supabase.from("contractor_profiles").select("user_id").maybeSingle(),
  ]);

  const roles: string[] = rolesResult.data?.map((r: { role: string }) => r.role) ?? [];
  const hasCustomerProfile = !!cpResult.data;
  const hasContractorProfile = !!conpResult.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Signed in as <span className="font-medium text-black">{user?.email}</span>
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 p-4 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">Your profiles</h2>

        {roles.length === 0 ? (
          <p className="text-sm text-gray-400">No profiles yet.</p>
        ) : (
          <ul className="space-y-1">
            {roles.map((role) => (
              <li key={role} className="flex items-center gap-2 text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                <span className="capitalize">{role}</span>
              </li>
            ))}
          </ul>
        )}

        {hasContractorProfile && !hasCustomerProfile && (
          <a
            href="/customer/onboarding"
            className="inline-block rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Add customer profile →
          </a>
        )}
      </div>
    </div>
  );
}
