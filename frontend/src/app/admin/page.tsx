import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [
    projectCount,
    messageCount,
    skillCount,
    experienceCount,
    testimonialCount,
    blogCount,
    recentMessages
  ] = await Promise.all([
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
