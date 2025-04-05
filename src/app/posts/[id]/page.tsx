import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostActions from '@/components/PostActions';

async function getPost(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, { 
      cache: 'no-store'
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch post');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const data = await getPost(params.id);
  
  if (!data || !data.post) {
    notFound();
  }
  
  const { post } = data;
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/posts"
          className="text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Posts
        </Link>
      </div>
      
      <article className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 mr-2">
                {post.author?.name?.[0] || 'A'}
              </div>
              <span>By {post.author?.name || 'Anonymous'}</span>
            </div>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
          
          <div className="prose prose-indigo max-w-none">
            {post.content ? (
              <div className="whitespace-pre-wrap">{post.content}</div>
            ) : (
              <p className="text-gray-500 italic">No content provided for this post.</p>
            )}
          </div>
        </div>
      </article>
      
      <div className="mt-8">
        <PostActions post={post} />
      </div>
    </div>
  );
}
