import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getUserOrRedirect(nextPath?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const qs = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
    redirect(`/login${qs}`);
  }

  return user;
}
