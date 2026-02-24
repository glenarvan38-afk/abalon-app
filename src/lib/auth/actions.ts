"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; success?: string } | null;

function sanitizeNext(next: string | null | undefined): string {
  if (next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/http")) {
    return next;
  }
  return "/dashboard";
}

function formatAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials") || lower.includes("invalid credentials")) {
    return "Incorrect email or password.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email address. Check your inbox for a confirmation link.";
  }
  if (lower.includes("too many") || lower.includes("rate limit")) {
    return "Too many sign-in attempts. Please wait a moment and try again.";
  }
  return message;
}

export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: formatAuthError(error.message) };
  }

  const next = sanitizeNext(formData.get("next") as string | null);
  redirect(next);
}

export async function signOut(): Promise<never> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function requestPasswordReset(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim();
  if (!email) return { error: "Email is required." };

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abalon.app";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password/confirm`,
  });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[requestPasswordReset]", error);
    }
    return { error: "Unable to send reset email. Please try again." };
  }

  return { success: "Check your inbox for a password reset link." };
}

export async function updatePassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const password = formData.get("password") as string;
  if (!password || password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[updatePassword]", error);
    }
    return { error: "Failed to update password. Please request a new reset link." };
  }

  redirect("/dashboard");
}

export async function createCustomerProfile(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/customer/onboarding");
  }

  const fullName = (formData.get("full_name") as string)?.trim();
  const homeZip = (formData.get("home_zip") as string)?.trim();
  const homeAddress = (formData.get("home_address") as string)?.trim() || null;

  if (!fullName) return { error: "Full name is required." };
  if (!homeZip || !/^\d{5}$/.test(homeZip)) {
    return { error: "ZIP code must be exactly 5 digits." };
  }

  const { error: insertError } = await supabase
    .from("customer_profiles")
    .insert({ user_id: user.id, full_name: fullName, home_zip: homeZip, home_address: homeAddress });

  if (insertError) {
    if (process.env.NODE_ENV === "development") {
      console.error("[createCustomerProfile]", insertError);
    }
    if (insertError.code === "23505") {
      return { error: "Customer profile already exists." };
    }
    return { error: "Failed to create profile. Please try again." };
  }

  await supabase
    .from("user_roles")
    .upsert({ user_id: user.id, role: "customer" }, { onConflict: "user_id,role" });

  redirect("/dashboard");
}
