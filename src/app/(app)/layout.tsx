import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") ?? "/dashboard";
    redirect(`/login?next=${encodeURIComponent(pathname)}`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header email={user.email ?? ""} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
