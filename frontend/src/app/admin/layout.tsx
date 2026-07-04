import AdminSidebar from "@/components/layout/AdminSidebar";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let unreadCount = 0;
  try {
    unreadCount = await prisma.message.count({
      where: { isRead: false }
    });
  } catch (e) {
    console.error("Failed to fetch unread count", e);
  }

  return (
    <div className="flex min-h-screen bg-background relative w-full overflow-hidden text-foreground">
      {/* Vibrant Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[140px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[140px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      <AdminSidebar unreadCount={unreadCount} />
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto custom-scrollbar relative z-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
