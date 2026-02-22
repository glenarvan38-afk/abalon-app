import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard — Abalon" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-sm text-gray-600">
        Signed in as <span className="font-medium text-black">{user?.email}</span>
      </p>
    </div>
  );
}
