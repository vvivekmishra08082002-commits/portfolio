"use client";

import { useState, useEffect } from "react";

export default function AdminGallery() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/gallery').then(res => res.json()).then(d => setData(d));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    
    const res = await fetch('/api/gallery', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (res.ok) {
      const newItem = await res.json();
      setData([...data, newItem]);
      form.reset();
      alert("Added!");
    }
  }


  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this?")) return;
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    if (res.ok) setData(data.filter((item: any) => item.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Manage Gallery</h1>
      
      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Add New Gallery</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          <input name="title" required type="text" placeholder="title" className="w-full p-4 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] hover:bg-background/60 text-sm" />\n          <input name="imageUrl" required type="text" placeholder="imageUrl" className="w-full p-4 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] hover:bg-background/60 text-sm" />
          <button type="submit" className="group relative py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-black tracking-widest uppercase rounded-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_10px_20px_rgba(var(--primary),0.3)] hover:shadow-[0_15px_30px_rgba(var(--primary),0.5)] overflow-hidden">Add Gallery</button>
        </form>
      </div>

      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Existing Gallerys</h2>
        <div className="flex flex-col gap-4">
          {Array.isArray(data) ? data.map((item: any) => (
            
            <div key={item.id} className="group relative bg-background/40 backdrop-blur-3xl p-6 rounded-3xl border border-white/10 flex flex-col gap-4 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(var(--primary),0.3)] transition-all duration-500 hover:-translate-y-2 hover:bg-background/60">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              <div className="flex justify-between items-start gap-4 relative z-10">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                  {Object.entries(item).filter(([k]) => k !== 'id' && k !== 'createdAt' && k !== 'updatedAt').map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1.5 opacity-80">{key}</span>
                      <span className="text-sm font-semibold text-foreground break-words drop-shadow-md">
                        {typeof val === 'string' && val.startsWith('data:image') 
                          ? <img src={val} alt={key} className="h-24 w-auto rounded-xl border border-white/20 mt-2 object-contain shadow-lg group-hover:scale-105 transition-transform duration-500" />
                          : typeof val === 'string' && (val.startsWith('http') || val.startsWith('www'))
                          ? <a href={val} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors hover:underline truncate block">{val}</a>
                          : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleDelete(item.id)} className="shrink-0 p-3 text-destructive/70 hover:bg-destructive hover:text-white rounded-2xl transition-all duration-300 shadow-sm border border-destructive/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:-translate-y-1 hover:scale-110 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          )) : <p className="text-muted-foreground">Failed to load.</p>}
        </div>
      </div>
    </div>
  );
}
