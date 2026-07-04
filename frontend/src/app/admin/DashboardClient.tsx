"use client";

import { motion } from "framer-motion";
import { 
  FolderGit2, Mail, Wrench, Briefcase, 
  MessageSquareQuote, LayoutTemplate, ArrowRight,
  TrendingUp, Activity
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Animated Counter Component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(String(value), 10);
    if (start === end) return;
    
    const duration = 1500; // 1.5s
    const incrementTime = Math.max(16, duration / end);
    const step = Math.max(1, Math.ceil(end / (duration / 16)));
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

export default function DashboardClient({ 
  statsData, 
  recentMessages 
}: { 
  statsData: any, 
  recentMessages: any[] 
}) {
  const stats = [
    { label: 'Total Projects', value: statsData.projectCount, icon: FolderGit2, href: '/admin/projects', color: 'text-blue-400', bg: 'bg-blue-500/20', shadow: 'shadow-blue-500/30' },
    { label: 'Messages', value: statsData.messageCount, icon: Mail, href: '/admin/messages', color: 'text-emerald-400', bg: 'bg-emerald-500/20', shadow: 'shadow-emerald-500/30' },
    { label: 'Skills', value: statsData.skillCount, icon: Wrench, href: '/admin/skills', color: 'text-amber-400', bg: 'bg-amber-500/20', shadow: 'shadow-amber-500/30' },
    { label: 'Experiences', value: statsData.experienceCount, icon: Briefcase, href: '/admin/experience', color: 'text-purple-400', bg: 'bg-purple-500/20', shadow: 'shadow-purple-500/30' },
    { label: 'Testimonials', value: statsData.testimonialCount, icon: MessageSquareQuote, href: '/admin/testimonial', color: 'text-pink-400', bg: 'bg-pink-500/20', shadow: 'shadow-pink-500/30' },
    { label: 'Blogs', value: statsData.blogCount, icon: LayoutTemplate, href: '/admin/blog', color: 'text-cyan-400', bg: 'bg-cyan-500/20', shadow: 'shadow-cyan-500/30' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await fetch('/api/profile', { method: 'GET', signal: AbortSignal.timeout(2000) });
        if (res.ok) {
          setApiStatus('online');
        } else {
          setApiStatus('offline');
        }
      } catch (e) {
        setApiStatus('offline');
      }
    };
    checkApi();
    const interval = setInterval(checkApi, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 relative">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10"
      >
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-pulse">
            Command Center
          </h1>
          <p className="text-muted-foreground mt-3 text-lg font-medium">System status and content metrics overview.</p>
        </div>
        <div className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border backdrop-blur-xl text-sm font-bold shadow-lg transition-all ${
          apiStatus === 'online' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/20' :
          apiStatus === 'offline' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-red-500/20' :
          'bg-primary/10 text-primary border-primary/20 shadow-primary/20'
        }`}>
          <Activity size={18} className={apiStatus === 'checking' ? 'animate-pulse opacity-50' : apiStatus === 'online' ? 'animate-pulse' : ''} />
          <span className="uppercase tracking-widest text-[10px]">
            {apiStatus === 'online' ? 'API Online' : 
             apiStatus === 'offline' ? 'API Offline' : 
             'Checking...'}
          </span>
        </div>
      </motion.div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={item}>
              <Link href={stat.href} className="group block h-full">
                <div className={`h-full bg-background/30 backdrop-blur-3xl p-6 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(var(--primary),0.2)] hover:bg-background/50 hover:-translate-y-2 overflow-hidden relative`}>
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-muted-foreground font-black group-hover:text-foreground transition-colors uppercase tracking-[0.2em] text-[10px]">
                      {stat.label}
                    </h3>
                    <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)]`}>
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between relative z-10">
                    <p className="text-5xl font-black text-foreground drop-shadow-md tracking-tighter">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <div className={`opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${stat.color} drop-shadow-lg`}>
                      <ArrowRight size={28} />
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className={`absolute -right-12 -bottom-12 w-48 h-48 ${stat.bg} rounded-full blur-[50px] opacity-20 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`}></div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-background/30 backdrop-blur-3xl p-8 rounded-3xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden relative z-10"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              <TrendingUp size={22} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm">Recent Inquiries</h2>
          </div>
          <Link href="/admin/messages" className="text-sm font-bold uppercase tracking-wider text-primary hover:text-secondary transition-colors flex items-center gap-2 group">
            View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {recentMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center relative z-10">
            <div className="w-24 h-24 bg-background/50 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
              <Mail className="w-12 h-12 text-muted-foreground/40" />
            </div>
            <p className="text-foreground text-xl font-bold">Inbox is clear</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">You're all caught up. New contact form submissions will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 relative z-10 mt-6">
            {recentMessages.map((msg, i) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="group p-6 bg-background/20 hover:bg-background/40 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-black uppercase text-lg shadow-inner shrink-0">
                      {msg.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground flex items-center gap-2 drop-shadow-sm">
                        {msg.name}
                        {msg.isRead === false && <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-primary text-primary-foreground uppercase tracking-wider animate-pulse">New</span>}
                      </h4>
                      <a href={`mailto:${msg.email}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{msg.email}</a>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 bg-background/50 rounded-xl text-muted-foreground border border-white/5 shadow-inner">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="pl-16">
                  <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2 pl-3 border-l-2 border-primary/30 group-hover:border-primary transition-colors font-medium">
                    {msg.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
