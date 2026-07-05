"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { 
  FolderGit2, Mail, Wrench, Briefcase, 
  MessageSquareQuote, LayoutTemplate, ArrowRight,
  TrendingUp, Activity, Sparkles, Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// Animated Counter Component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(String(value), 10);
    if (start === end) {
      setCount(end);
      return;
    }
    
    const duration = 1500;
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

// 3D Tilt Card Component
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`relative w-full h-full ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default function DashboardClient({ 
  statsData, 
  recentMessages 
}: { 
  statsData: any, 
  recentMessages: any[] 
}) {
  const stats = [
    { label: 'Total Projects', value: statsData.projectCount, icon: FolderGit2, href: '/admin/projects', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
    { label: 'Messages', value: statsData.messageCount, icon: Mail, href: '/admin/messages', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
    { label: 'Skills', value: statsData.skillCount, icon: Wrench, href: '/admin/skills', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' },
    { label: 'Experiences', value: statsData.experienceCount, icon: Briefcase, href: '/admin/experience', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
    { label: 'Testimonials', value: statsData.testimonialCount, icon: MessageSquareQuote, href: '/admin/testimonial', color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-500/30' },
    { label: 'Blogs', value: statsData.blogCount, icon: LayoutTemplate, href: '/admin/blog', color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/30' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
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
    <div className="space-y-12 relative min-h-screen">
      {/* Background Animated Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none -z-10 animate-[spin_30s_linear_infinite]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none -z-10 animate-[spin_40s_linear_infinite_reverse]" />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10 glass p-8 rounded-[2rem] border border-border/50 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-50 pointer-events-none" />
        
        <div className="flex flex-col relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-primary animate-pulse" size={24} />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Overview</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-primary">
            Command Center
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl leading-relaxed">
            Welcome to your digital headquarters. Monitor metrics, manage content, and track engagement in real-time.
          </p>
        </div>

        <div className={`flex items-center gap-4 px-6 py-3 rounded-full border backdrop-blur-md shadow-xl transition-all relative z-10 ${
          apiStatus === 'online' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
          apiStatus === 'offline' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
          'bg-primary/10 text-primary border-primary/30'
        }`}>
          <Activity size={20} className={apiStatus === 'online' ? 'animate-pulse' : ''} />
          <span className="uppercase tracking-widest text-xs font-black">
            {apiStatus === 'online' ? 'Systems Nominal' : 
             apiStatus === 'offline' ? 'API Offline' : 
             'Checking Systems...'}
          </span>
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={item} className="h-48 perspective-1000">
              <Link href={stat.href} className="block h-full group">
                <TiltCard className="rounded-3xl">
                  <div className={`h-full w-full glass p-6 rounded-3xl border ${stat.border} transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] flex flex-col justify-between overflow-hidden relative`}>
                    
                    {/* Glowing background orb for the card */}
                    <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${stat.bg} rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700 opacity-50 group-hover:opacity-100`}></div>

                    <div className="flex items-center justify-between relative z-10">
                      <h3 className="text-muted-foreground font-black uppercase tracking-[0.15em] text-xs group-hover:text-foreground transition-colors">
                        {stat.label}
                      </h3>
                      <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:rotate-12`}>
                        <Icon size={22} strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-between relative z-10">
                      <p className="text-6xl font-black text-foreground tracking-tighter drop-shadow-sm group-hover:scale-105 transition-transform duration-300 origin-left">
                        <AnimatedCounter value={stat.value} />
                      </p>
                      <div className={`opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100 ${stat.color}`}>
                        <ArrowRight size={28} />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Inquiries Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
        className="glass p-8 md:p-10 rounded-[2.5rem] border border-border/50 shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border/50 pb-8 mb-8 relative z-10 gap-4">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20 shadow-inner">
              <Zap size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-foreground">Recent Inquiries</h2>
              <p className="text-muted-foreground text-sm font-medium mt-1">Latest messages from your contact form.</p>
            </div>
          </div>
          <Link href="/admin/messages" className="px-6 py-2.5 rounded-full bg-background border border-border/50 text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center gap-2 group">
            View Inbox <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {recentMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center relative z-10">
            <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mb-6 border border-border/50">
              <Mail className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <p className="text-foreground text-2xl font-black tracking-tight">Inbox is clear</p>
            <p className="text-muted-foreground mt-2 font-medium">You have no new messages at this time.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 relative z-10">
            {recentMessages.map((msg, i) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (i * 0.1), type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="group flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-background/40 hover:bg-background/60 rounded-3xl border border-border/50 hover:border-primary/40 transition-all duration-300 shadow-sm relative overflow-hidden"
              >
                {/* Subtle neon left border on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                
                <div className="flex items-center gap-5 md:w-1/3 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-primary font-black uppercase text-2xl shadow-inner shrink-0 group-hover:rotate-12 transition-transform duration-300">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <h4 className="font-bold text-lg text-foreground flex items-center gap-3 truncate">
                      {msg.name}
                      {msg.isRead === false && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-primary text-primary-foreground uppercase tracking-widest shadow-[0_0_10px_rgba(var(--primary),0.5)]">
                          New
                        </span>
                      )}
                    </h4>
                    <a href={`mailto:${msg.email}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors truncate">
                      {msg.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed line-clamp-2 font-medium">
                    {msg.message}
                  </p>
                </div>
                
                <div className="shrink-0 md:text-right mt-2 md:mt-0">
                  <span className="text-xs font-bold px-4 py-2 bg-muted/30 rounded-full text-muted-foreground border border-border/50 inline-block">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
