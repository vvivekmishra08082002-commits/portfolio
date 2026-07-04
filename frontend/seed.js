const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.skill.createMany({
    data: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js 15', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Python', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Tailwind CSS', category: 'Frontend' },
    ]
  });

  await prisma.project.create({
    data: {
      title: 'Enterprise SaaS Dashboard',
      description: 'A scalable dashboard built with Next.js, FastAPI, and PostgreSQL.',
      tags: 'Next.js,FastAPI,Tailwind,PostgreSQL',
      link: '#',
      github: '#'
    }
  });
  
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
