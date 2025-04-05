import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create response with cleared token cookie
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    
    // Clear the token cookie
    response.cookies.set('token', '', { 
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
