import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Sign in — Abalon" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your email and password to access your account.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
