'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

type PostActionsProps = {
  post: {
    id: string;
    authorId: string;
    published: boolean;
  };
};

export default function PostActions({ post }: PostActionsProps) {
  const { user, isAuthenticated } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const isAuthor = isAuthenticated && user?.id === post.authorId;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete post');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      console.error('Error deleting post:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePublishToggle = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          published: !post.published,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update post');
      }

      router.refresh();
    } catch (err: any) {
      console.error('Error updating post:', err);
      alert(err.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/posts"
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        View All Posts
      </Link>

      {isAuthor && (
        <>
          <Link
            href={`/posts/edit/${post.id}`}
            className="inline-flex items-center px-4 py-2 border border-indigo-500 rounded-md text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
          >
            Edit Post
          </Link>

          <button
            onClick={handlePublishToggle}
            className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
              post.published
                ? 'border-yellow-500 text-yellow-700 bg-yellow-50 hover:bg-yellow-100'
                : 'border-green-500 text-green-700 bg-green-50 hover:bg-green-100'
            }`}
          >
            {post.published ? 'Unpublish' : 'Publish'}
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center px-4 py-2 border border-red-500 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete Post'}
          </button>
        </>
      )}

      {error && (
        <div className="w-full mt-2 p-2 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
