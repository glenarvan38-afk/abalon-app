import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ResetPasswordConfirmForm } from "@/components/auth/ResetPasswordConfirmForm";

export const metadata = { title: "Set new password — Abalon" };

export default async function ResetPasswordConfirmPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/reset-password");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
          <p className="mt-1 text-sm text-gray-500">
            Choose a strong password for your account.
          </p>
        </div>
        <ResetPasswordConfirmForm />
      </div>
    </main>
  );
}
