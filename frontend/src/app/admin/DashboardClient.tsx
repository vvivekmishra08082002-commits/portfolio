"use client";

import { motion } from "framer-motion";
import { 
  FolderGit2, 
  Mail, 
  Wrench, 
  Briefcase, 
  MessageSquareQuote,
  LayoutTemplate,
  ArrowRight,
  TrendingUp,
  Activity
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
    { label: 'Total Projects', value: statsData.projectCount, icon: FolderGit2, href: '/admin/projects', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Messages', value: statsData.messageCount, icon: Mail, href: '/admin/messages', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { label: 'Skills', value: statsData.skillCount, icon: Wrench, href: '/admin/skills', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { label: 'Experiences', value: statsData.experienceCount, icon: Briefcase, href: '/admin/experience', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'Testimonials', value: statsData.testimonialCount, icon: MessageSquareQuote, href: '/admin/testimonial', color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    { label: 'Blogs', value: statsData.blogCount, icon: LayoutTemplate, href: '/admin/blog', color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
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
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Command Center
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">System status and content metrics overview.</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
          apiStatus === 'online' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
          apiStatus === 'offline' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
          'bg-primary/10 text-primary border-primary/20'
        }`}>
          <Activity size={16} className={apiStatus === 'checking' ? 'animate-pulse opacity-50' : apiStatus === 'online' ? 'animate-pulse' : ''} />
          <span>
            {apiStatus === 'online' ? 'API Online' : 
             apiStatus === 'offline' ? 'API Offline' : 
             'Checking API...'}
          </span>
        </div>
      </motion.div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={item}>
              <Link href={stat.href} className="group block h-full">
                <div className={`h-full glass p-6 rounded-3xl border border-border/40 hover:${stat.border} transition-all duration-500 hover:shadow-2xl hover:shadow-${stat.color.replace('text-', '')}/10 relative overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl`}>
                  <div className="flex items-center justify-between mb-6 z-10 relative">
                    <h3 className="text-muted-foreground font-semibold group-hover:text-foreground transition-colors uppercase tracking-wider text-xs">
                      {stat.label}
                    </h3>
                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-inner`}>
                      <Icon size={22} strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between z-10 relative">
                    <p className="text-5xl font-black text-foreground tracking-tighter">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <div className={`opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${stat.color}`}>
                      <ArrowRight size={24} />
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className={`absolute -right-12 -bottom-12 w-40 h-40 ${stat.bg} rounded-full blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-700 z-0`}></div>
                  <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-border/10 to-transparent"></div>
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
        className="glass p-8 rounded-3xl w-full flex flex-col gap-6 border border-border/40 shadow-xl relative overflow-hidden bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="flex items-center justify-between border-b border-border/40 pb-4 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Recent Inquiries</h2>
          </div>
          <Link href="/admin/messages" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group">
            View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {recentMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center z-10 relative">
            <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mb-6 border border-border/50 shadow-inner">
              <Mail className="w-10 h-10 text-muted-foreground/60" />
            </div>
            <p className="text-foreground text-lg font-semibold">Inbox is clear</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">You're all caught up. When someone submits a contact form, their message will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 z-10 relative">
            {recentMessages.map((msg, i) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="group p-5 bg-background/40 hover:bg-background/80 rounded-2xl border border-border/40 hover:border-border transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-bold uppercase shrink-0">
                      {msg.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground flex items-center gap-2">
                        {msg.name}
                        {i === 0 && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground uppercase tracking-wider">New</span>}
                      </h4>
                      <a href={`mailto:${msg.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{msg.email}</a>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-secondary/50 rounded-full text-secondary-foreground whitespace-nowrap border border-secondary">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="pl-13">
                  <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-2 pl-2 border-l-2 border-primary/20 group-hover:border-primary/50 transition-colors">
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
