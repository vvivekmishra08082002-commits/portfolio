"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, User, MessageSquare, Briefcase, 
  Code, Award, BookOpen, FileBadge, Trophy, 
  Terminal, Edit3, MessageCircle, Wrench, Image as ImageIcon,
  LogOut, Settings
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
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0 z-50">
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground">
          <Settings size={18} />
        </div>
        <div>
          <h2 className="font-bold text-sm tracking-tight text-foreground">Admin Portal</h2>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Enterprise Mode</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-1">
        {navItems.map(item => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.path} 
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors
                ${isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}
              `}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground hover:bg-destructive hover:text-destructive-foreground font-medium rounded-lg transition-colors text-sm"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
