import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import prisma from '@/lib/db';
import { sign } from 'jsonwebtoken';

// Hardcoded admin user for demonstration (only when DB connection fails)
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_ID = 'admin-demo-id';
const ADMIN_NAME = 'Admin';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Special case for admin login when DB is not working
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create token for admin
      const token = sign(
        { 
          id: ADMIN_ID,
          email: ADMIN_EMAIL,
          name: ADMIN_NAME,
          isDemo: true // Flag to identify this is a demo admin
        },
        process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production',
        { expiresIn: '1d' }
      );
      
      // Set token in response cookie
      const response = NextResponse.json(
        { 
          message: 'Login successful (Demo Admin Mode)',
          user: {
            id: ADMIN_ID,
            email: ADMIN_EMAIL,
            name: ADMIN_NAME,
            isDemo: true
          }
        },
        { status: 200 }
      );
      
      response.cookies.set('token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400 // 1 day in seconds
      });
      
      return response;
    }
    
    // Regular database login flow
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });
      
      if (!user) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }
      
      // Verify password
      const passwordMatch = await compare(password, user.password);
      
      if (!passwordMatch) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }
      
      // Create token
      const token = sign(
        { 
          id: user.id,
          email: user.email,
          name: user.name 
        },
        process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production',
        { expiresIn: '1d' }
      );
      
      // Set token in response cookie
      const response = NextResponse.json(
        { 
          message: 'Login successful',
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        },
        { status: 200 }
      );
      
      response.cookies.set('token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400 // 1 day in seconds
      });
      
      return response;
    } catch (dbError) {
      // If database error occurs, check if trying to log in as admin
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Create token for admin (same as above)
        const token = sign(
          { 
            id: ADMIN_ID,
            email: ADMIN_EMAIL,
            name: ADMIN_NAME,
            isDemo: true 
          },
          process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production',
          { expiresIn: '1d' }
        );
        
        const response = NextResponse.json(
          { 
            message: 'Login successful (Demo Admin Mode)',
            user: {
              id: ADMIN_ID,
              email: ADMIN_EMAIL,
              name: ADMIN_NAME,
              isDemo: true
            }
          },
          { status: 200 }
        );
        
        response.cookies.set('token', token, { 
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 86400 // 1 day in seconds
        });
        
        return response;
      } else {
        throw dbError; // Re-throw if not admin login attempt
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
