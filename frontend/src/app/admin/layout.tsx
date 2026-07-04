import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20 relative w-full overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
