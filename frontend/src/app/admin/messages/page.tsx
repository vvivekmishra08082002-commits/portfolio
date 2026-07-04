"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, CheckCircle2, Trash2 } from "lucide-react";

export default function AdminMessages() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
    if (res.ok) setData(data.filter((item: any) => item.id !== id));
  }

  async function handleMarkRead(id: string, currentStatus: boolean) {
    const res = await fetch(`/api/contact?id=${id}`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: !currentStatus })
    });
    if (res.ok) {
      setData(data.map((item: any) => 
        item.id === id ? { ...item, isRead: !currentStatus } : item
      ));
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-sm">
          Message Center
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Manage and respond to your latest inquiries.</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {Array.isArray(data) && data.length > 0 ? data.map((item: any, i) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`group relative backdrop-blur-3xl p-6 md:p-8 rounded-3xl border flex flex-col md:flex-row gap-6 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
                  item.isRead 
                    ? 'bg-background/20 border-white/5 shadow-sm' 
                    : 'bg-primary/5 border-primary/20 shadow-[0_8px_32px_rgba(var(--primary),0.15)] hover:shadow-[0_12px_40px_rgba(var(--primary),0.25)]'
                }`}
              >
                {!item.isRead && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-secondary"></div>
                )}
                
                <div className="flex-1 flex flex-col relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-xl text-foreground drop-shadow-sm">{item.name}</h3>
                    {!item.isRead && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary text-primary-foreground animate-pulse">
                        New
                      </span>
                    )}
                  </div>
                  <a href={`mailto:${item.email}`} className="text-sm font-semibold text-secondary hover:text-primary transition-colors hover:underline inline-block mb-4">
                    {item.email}
                  </a>
                  
                  <div className="bg-background/50 rounded-2xl p-5 border border-white/5 shadow-inner">
                    <p className="text-foreground/90 leading-relaxed font-medium">{item.message}</p>
                  </div>
                  
                  <p className="mt-4 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
                    {new Date(item.createdAt).toLocaleString(undefined, {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div className="flex md:flex-col gap-3 shrink-0 relative z-10">
                  <button 
                    onClick={() => handleMarkRead(item.id, item.isRead)} 
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 shadow-sm border hover:-translate-y-0.5 ${
                      item.isRead 
                        ? 'bg-background hover:bg-muted text-muted-foreground border-white/10' 
                        : 'bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]'
                    }`}
                  >
                    {item.isRead ? <CheckCircle2 size={18} /> : <CheckCircle size={18} />}
                    <span className="font-bold text-sm">{item.isRead ? 'Mark Unread' : 'Mark Read'}</span>
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-xl transition-all duration-300 shadow-sm border border-destructive/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:-translate-y-0.5"
                  >
                    <Trash2 size={18} />
                    <span className="font-bold text-sm hidden md:inline">Delete</span>
                  </button>
                </div>
              </motion.div>
            )) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center bg-background/20 backdrop-blur-xl rounded-3xl border border-white/5">
                <p className="text-muted-foreground text-lg font-medium">Inbox is empty.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
