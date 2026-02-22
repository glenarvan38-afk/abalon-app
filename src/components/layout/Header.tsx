import { SignOutButton } from "./SignOutButton";

export function Header({ email }: { email: string }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-8 py-4">
      <span className="font-semibold tracking-tight">Abalon</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{email}</span>
        <SignOutButton />
      </div>
    </header>
  );
}
