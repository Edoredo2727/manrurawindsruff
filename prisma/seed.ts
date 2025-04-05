import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  // Create admin user
  const hashedPassword = await hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

  console.log(`Created admin user with id: ${admin.id}`);
  
  // Create a sample post for the admin
  await prisma.post.create({
    data: {
      title: 'Welcome to the Blog Platform',
      content: 'This is the first post on our new blog platform. Feel free to explore all the features!',
      published: true,
      authorId: admin.id,
    },
  });

  console.log('Created sample post for admin user');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
