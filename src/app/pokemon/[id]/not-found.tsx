import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-red-600 mb-4">Pokemon Not Found</h2>
        <p className="text-gray-600 mb-8">
          The Pokemon you're looking for doesn't exist or the ID is invalid.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Pokemon Directory
        </Link>
      </div>
    </div>
  );
}
