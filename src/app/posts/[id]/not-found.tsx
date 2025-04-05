import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">
          The post you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/posts"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Browse All Posts
        </Link>
      </div>
    </div>
  );
}
