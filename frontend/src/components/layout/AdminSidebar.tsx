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
import { motion } from "framer-motion";

export default function AdminSidebar({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Profile Settings', path: '/admin/profile', icon: User },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare, badge: unreadCount },
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
    <aside className="w-72 glass border-r border-border/40 flex flex-col h-screen sticky top-0 z-50 bg-background/40 backdrop-blur-3xl shadow-[4px_0_24px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-4 p-8 border-b border-border/40">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-black text-xl shadow-[0_0_20px_rgba(var(--primary),0.5)]">
          V
        </div>
        <div>
          <h2 className="font-bold text-lg tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Admin Portal</h2>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Creator Workspace</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 flex flex-col gap-2">
        {navItems.map(item => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.path} 
              className={`
                group flex items-center justify-between px-4 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 relative overflow-hidden
                ${isActive 
                  ? "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(var(--primary),0.3)] scale-[1.02]" 
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground hover:scale-[1.02]"}
              `}
            >
              {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />}
              <div className="flex items-center gap-3 relative z-10">
                <Icon size={18} className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-primary"}`} />
                {item.name}
              </div>
              
              {item.badge !== undefined && item.badge > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10px] font-black z-10 shadow-lg ${isActive ? "bg-white text-primary" : "bg-destructive text-destructive-foreground shadow-destructive/40"}`}
                >
                  {item.badge}
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-border/40">
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="group w-full flex items-center justify-center gap-2 px-4 py-4 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground font-bold rounded-2xl transition-all duration-300 text-sm hover:shadow-[0_4px_20px_rgba(239,68,68,0.3)] hover:scale-[1.02] active:scale-95"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Secure Logout</span>
        </button>
      </div>
    </aside>
  );
}
