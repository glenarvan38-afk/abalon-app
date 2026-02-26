import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = { title: "Create account — Abalon" };

const VALID_ROLES = ["customer", "contractor"] as const;
type Role = (typeof VALID_ROLES)[number];

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; role?: string }>;
}) {
  const { next, role: rawRole } = await searchParams;

  const role: Role | undefined = VALID_ROLES.includes(rawRole as Role)
    ? (rawRole as Role)
    : undefined;

  const subtitle = role
    ? `Joining as a ${role}.`
    : "Enter your details to get started.";

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <SignupForm next={next} role={role} />
      </div>
    </main>
  );
}
