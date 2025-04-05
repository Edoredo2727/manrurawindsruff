import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verify } from 'jsonwebtoken';

// Helper to get user ID from token
const getUserIdFromToken = (request: Request) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production') as { id: string };
    return decoded.id;
  } catch (error) {
    return null;
  }
};

// Get a single post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { message: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// Update a post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserIdFromToken(request);
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Find the post first to check ownership
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    });
    
    if (!existingPost) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Check if user is the author
    if (existingPost.authorId !== userId) {
      return NextResponse.json(
        { message: 'You can only update your own posts' },
        { status: 403 }
      );
    }
    
    const { title, content, published } = await request.json();
    
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        content,
        published,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return NextResponse.json({ 
      post: updatedPost,
      message: 'Post updated successfully'
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { message: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// Delete a post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserIdFromToken(request);
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Find the post first to check ownership
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    });
    
    if (!existingPost) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Check if user is the author
    if (existingPost.authorId !== userId) {
      return NextResponse.json(
        { message: 'You can only delete your own posts' },
        { status: 403 }
      );
    }
    
    await prisma.post.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ 
      message: 'Post deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { message: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
