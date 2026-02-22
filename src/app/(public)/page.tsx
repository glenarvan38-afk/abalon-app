import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Abalon</h1>
      <p className="text-lg text-gray-500">Welcome. Please sign in to continue.</p>
      <Link
        href="/login"
        className="rounded-md bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
      >
        Sign in
      </Link>
    </main>
  );
}
