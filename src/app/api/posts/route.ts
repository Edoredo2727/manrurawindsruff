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

// Get all published posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// Create a new post
export async function POST(request: Request) {
  try {
    const userId = getUserIdFromToken(request);
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { title, content, published = false } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId: userId,
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
    
    return NextResponse.json(
      { post, message: 'Post created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { message: 'Failed to create post' },
      { status: 500 }
    );
  }
}
