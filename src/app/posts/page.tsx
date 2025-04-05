import Link from 'next/link';

async function getPosts() {
  const response = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  if (!response.ok) return { posts: [] };
  return response.json();
}

export default async function Posts() {
  const { posts = [] } = await getPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
        <Link
          href="/posts/new"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500 mb-4">No posts found.</p>
          <Link
            href="/posts/new"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Be the first to create a post!
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  <Link href={`/posts/${post.id}`} className="hover:text-indigo-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.content?.substring(0, 200)}
                  {post.content && post.content.length > 200 ? '...' : ''}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 mr-2">
                      {post.author?.name?.[0] || 'A'}
                    </div>
                    <span>By {post.author?.name || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <Link 
                      href={`/posts/${post.id}`} 
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
