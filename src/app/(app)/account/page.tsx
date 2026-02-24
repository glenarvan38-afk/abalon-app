import { getUserOrRedirect } from "@/lib/auth/guard";
import { SignOutButton } from "@/components/layout/SignOutButton";

export const metadata = { title: "Account — Abalon" };

export default async function AccountPage() {
  const user = await getUserOrRedirect("/account");

  const provider = user.app_metadata?.provider ?? "email";
  const createdAt = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Account</h1>

      <dl className="divide-y divide-gray-100 rounded-lg border border-gray-200">
        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{user.email}</dd>
        </div>
        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Member since</dt>
          <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{createdAt}</dd>
        </div>
        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Sign-in method</dt>
          <dd className="mt-1 text-sm capitalize sm:col-span-2 sm:mt-0">{provider}</dd>
        </div>
      </dl>

      <div>
        <SignOutButton />
      </div>
    </div>
  );
}
