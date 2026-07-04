import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Profile Settings', path: '/admin/profile' },
    { name: 'Messages', path: '/admin/messages' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Skills', path: '/admin/skills' },
    { name: 'Experience', path: '/admin/experience' },
    { name: 'Education', path: '/admin/education' },
    { name: 'Certificates', path: '/admin/certificate' },
    { name: 'Achievements', path: '/admin/achievement' },
    { name: 'Coding Profiles', path: '/admin/codingprofile' },
    { name: 'Blogs', path: '/admin/blog' },
    { name: 'Testimonials', path: '/admin/testimonial' },
    { name: 'Services', path: '/admin/service' },
    { name: 'Gallery', path: '/admin/gallery' },
  ];

  return (
    <div className="flex min-h-screen bg-muted/10 w-full">
      <aside className="w-64 bg-background border-r border-border p-6 flex flex-col gap-2 overflow-y-auto h-screen sticky top-0">
        <h2 className="font-bold text-xl mb-4">Admin Panel</h2>
        {navItems.map(item => (
          <Link key={item.name} href={item.path} className="p-2 hover:bg-muted rounded-md font-medium text-sm">
            {item.name}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
