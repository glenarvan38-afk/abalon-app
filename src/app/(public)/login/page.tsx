import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Sign in — Abalon" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your email and password to access your account.
          </p>
        </div>
        {error === "link_expired" && (
          <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
            That link has expired. Please request a new one.
          </p>
        )}
        <LoginForm next={next} />
      </div>
    </main>
  );
}
