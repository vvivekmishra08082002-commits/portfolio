"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, User, MessageSquare, Briefcase, 
  Code, Award, BookOpen, FileBadge, Trophy, 
  Terminal, Edit3, MessageCircle, Wrench, Image as ImageIcon,
  LogOut
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Profile Settings', path: '/admin/profile', icon: User },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Skills', path: '/admin/skills', icon: Code },
    { name: 'Experience', path: '/admin/experience', icon: Award },
    { name: 'Education', path: '/admin/education', icon: BookOpen },
    { name: 'Certificates', path: '/admin/certificate', icon: FileBadge },
    { name: 'Achievements', path: '/admin/achievement', icon: Trophy },
    { name: 'Coding Profiles', path: '/admin/codingprofile', icon: Terminal },
    { name: 'Blogs', path: '/admin/blog', icon: Edit3 },
    { name: 'Testimonials', path: '/admin/testimonial', icon: MessageCircle },
    { name: 'Services', path: '/admin/service', icon: Wrench },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  ];

  return (
    <aside className="w-72 glass border-r border-border/40 p-6 flex flex-col gap-2 overflow-y-auto h-screen sticky top-0 custom-scrollbar z-50">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
          <span className="text-xl font-black text-primary">V</span>
        </div>
        <div>
          <h2 className="font-black text-xl tracking-tight leading-none">Admin Panel</h2>
          <p className="text-xs text-primary font-bold tracking-widest uppercase mt-1">Workspace</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-1.5 flex-1">
        {navItems.map(item => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.path} 
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 group relative overflow-hidden
                ${isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                  : "hover:bg-primary/10 text-muted-foreground hover:text-foreground hover:scale-[1.02]"}
              `}
            >
              {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-white/50" />}
              <Icon size={18} className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-primary"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-border/40">
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-destructive/20"
        >
          <LogOut size={18} />
          <span>Secure Logout</span>
        </button>
      </div>
    </aside>
  );
}
