import { ResetPasswordRequestForm } from "@/components/auth/ResetPasswordRequestForm";

export const metadata = { title: "Reset password — Abalon" };

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reset your password</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>
        <ResetPasswordRequestForm />
        <p className="text-center text-sm text-gray-500">
          <a href="/login" className="hover:text-black">
            Back to sign in
          </a>
        </p>
      </div>
    </main>
  );
}
