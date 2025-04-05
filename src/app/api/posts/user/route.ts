import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verify } from 'jsonwebtoken';

// Helper to get user ID from token
const getUserIdFromToken = (request: Request) => {
  // First try from Authorization header
  const token = request.headers.get('Authorization')?.split(' ')[1];
  
  // If not in header, try from cookies
  if (!token) {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return null;
    
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map(cookie => {
        const [name, value] = cookie.split('=');
        return [name, value];
      })
    );
    
    if (!cookies.token) return null;
    
    try {
      const decoded = verify(
        cookies.token, 
        process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production'
      ) as { id: string };
      return decoded.id;
    } catch (error) {
      return null;
    }
  }
  
  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production'
    ) as { id: string };
    return decoded.id;
  } catch (error) {
    return null;
  }
};

// Get all posts for the authenticated user
export async function GET(request: Request) {
  try {
    const userId = getUserIdFromToken(request);
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
