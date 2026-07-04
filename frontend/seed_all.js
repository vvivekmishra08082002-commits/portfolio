const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database with all 10 models...");
  
  await prisma.education.create({ data: { degree: "B.Tech Computer Science", university: "Tech University", year: "2024" }});
  await prisma.certificate.create({ data: { name: "AWS Certified Developer", issuer: "Amazon", link: "#" }});
  await prisma.achievement.create({ data: { title: "Hackathon Winner", date: "2023", description: "First place out of 100 teams" }});
  await prisma.codingProfile.create({ data: { platform: "GitHub", username: "developer", link: "https://github.com" }});
  await prisma.blog.create({ data: { title: "Next.js 15 Features", snippet: "A deep dive into Next.js 15", url: "#" }});
  await prisma.testimonial.create({ data: { name: "John Doe", role: "CTO", quote: "An amazing developer." }});
  await prisma.service.create({ data: { title: "Full Stack Development", description: "Building scalable web apps" }});
  await prisma.gallery.create({ data: { title: "Conference Talk", imageUrl: "https://placehold.co/600x400" }});

  console.log("Database seeded successfully with all sections!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
