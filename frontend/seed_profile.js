const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.profile.findFirst();
  if (!existing) {
    await prisma.profile.create({
      data: {
        name: "Vivek Mishra",
        headline: "Software Engineer",
        bio: "Results-driven software developer with 2 years and 8 months of experience in web development, ERP systems, and AI-driven applications. Strong problem-solving mindset with a proven ability to deliver scalable, performance-oriented systems impacting 10,000+ users.",
        imageUrl: "https://placehold.co/400x400/png?text=Vivek+Mishra"
      }
    });
    console.log("Profile seeded successfully!");
  } else {
    console.log("Profile already exists.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
