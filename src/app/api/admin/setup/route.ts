import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/db';

// This endpoint should only be used once to create an admin user
// In a production app, this should be protected by additional security measures

export async function GET(request: Request) {
  try {
    // Check if admin already exists to prevent multiple admins
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    });

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists', userId: existingAdmin.id },
        { status: 200 }
      );
    }

    // Create admin user with hashed password
    const hashedPassword = await hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
      },
    });

    // Create a sample welcome post
    await prisma.post.create({
      data: {
        title: 'Welcome to the Blog Platform',
        content: 'This is the first post on our new blog platform. Feel free to explore all the features!',
        published: true,
        authorId: admin.id,
      },
    });

    return NextResponse.json(
      { 
        message: 'Admin user created successfully', 
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name
        },
        credentials: {
          email: 'admin@example.com',
          password: 'admin123' // Only shown once during setup
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json(
      { message: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
