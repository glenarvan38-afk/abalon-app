import Link from "next/link";

export default function CategoryPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-light py-16">
      <div className="container-custom max-w-2xl text-center">
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="text-6xl mb-6">🚧</div>
          <h1 className="text-3xl font-bold mb-4">Category: {params.id}</h1>
          <p className="text-gray-600 mb-8">This page is coming soon.</p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
