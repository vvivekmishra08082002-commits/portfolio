import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  let projectCount = 0, messageCount = 0, skillCount = 0, experienceCount = 0, testimonialCount = 0, blogCount = 0;
  let recentMessages: any[] = [];

  try {
    const results = await Promise.all([
      prisma.project.count(),
      prisma.message.count(),
      prisma.skill.count(),
      prisma.experience.count(),
      prisma.testimonial.count(),
      prisma.blog.count(),
      prisma.message.findMany({
        take: 5,
        orderBy: { createdAt: "desc" }
      })
    ]);
    
    projectCount = results[0];
    messageCount = results[1];
    skillCount = results[2];
    experienceCount = results[3];
    testimonialCount = results[4];
    blogCount = results[5];
    recentMessages = results[6] as any[];
  } catch (error) {
    console.error("Database connection failed on Admin page:", error);
  }

  const statsData = {
    projectCount,
    messageCount,
    skillCount,
    experienceCount,
    testimonialCount,
    blogCount
  };

  return (
    <DashboardClient 
      statsData={statsData} 
      recentMessages={recentMessages} 
    />
  );
}
