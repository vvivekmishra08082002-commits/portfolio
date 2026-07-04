"use client";

import { 
  FolderGit2, Mail, Wrench, Briefcase, 
  MessageSquareQuote, LayoutTemplate, ArrowRight,
  TrendingUp, Activity
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardClient({ 
  statsData, 
  recentMessages 
}: { 
  statsData: any, 
  recentMessages: any[] 
}) {
  const stats = [
    { label: 'Total Projects', value: statsData.projectCount, icon: FolderGit2, href: '/admin/projects', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Messages', value: statsData.messageCount, icon: Mail, href: '/admin/messages', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Skills', value: statsData.skillCount, icon: Wrench, href: '/admin/skills', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Experiences', value: statsData.experienceCount, icon: Briefcase, href: '/admin/experience', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Testimonials', value: statsData.testimonialCount, icon: MessageSquareQuote, href: '/admin/testimonial', color: 'text-pink-600', bg: 'bg-pink-50' },
    { label: 'Blogs', value: statsData.blogCount, icon: LayoutTemplate, href: '/admin/blog', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Monitor your portfolio metrics and recent activities.</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-semibold ${
          apiStatus === 'online' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          apiStatus === 'offline' ? 'bg-red-50 text-red-700 border-red-200' :
          'bg-secondary text-secondary-foreground border-border'
        }`}>
          <Activity size={14} className={apiStatus === 'checking' ? 'animate-pulse opacity-50' : apiStatus === 'online' ? 'animate-pulse' : ''} />
          <span>
            {apiStatus === 'online' ? 'System Online' : 
             apiStatus === 'offline' ? 'System Offline' : 
             'Checking Status...'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="group block h-full">
              <div className="h-full bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </h3>
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                    <Icon size={18} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-muted-foreground" />
            <h2 className="text-lg font-semibold">Recent Inquiries</h2>
          </div>
          <Link href="/admin/messages" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        
        {recentMessages.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-foreground font-medium">No messages yet</p>
            <p className="text-sm text-muted-foreground mt-1">When someone contacts you, their message will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentMessages.map((msg, i) => (
              <div key={msg.id} className="p-6 hover:bg-muted/10 transition-colors flex flex-col sm:flex-row gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold shrink-0">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm truncate">{msg.name}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                      {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{msg.email}</p>
                  <p className="text-sm text-foreground/80 line-clamp-2">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
