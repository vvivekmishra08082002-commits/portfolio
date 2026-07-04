"use client";

import { useState, useEffect } from "react";

export default function AdminBlog() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/blog').then(res => res.json()).then(d => setData(d));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    
    const res = await fetch('/api/blog', {
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
    const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
    if (res.ok) setData(data.filter((item: any) => item.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Manage Blog</h1>
      
      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Add New Blog</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          <input name="title" required type="text" placeholder="title" className="w-full p-4 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] hover:bg-background/60 text-sm" />\n          <input name="snippet" required type="text" placeholder="snippet" className="w-full p-4 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] hover:bg-background/60 text-sm" />\n          <input name="url" required type="text" placeholder="url" className="w-full p-4 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] hover:bg-background/60 text-sm" />
          <button type="submit" className="group relative py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-black tracking-widest uppercase rounded-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_10px_20px_rgba(var(--primary),0.3)] hover:shadow-[0_15px_30px_rgba(var(--primary),0.5)] overflow-hidden">Add Blog</button>
        </form>
      </div>

      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Existing Blogs</h2>
        <div className="flex flex-col gap-4">
          {Array.isArray(data) ? data.map((item: any) => (
            <div key={item.id} className="p-4 bg-background border border-border/50 rounded-lg flex justify-between items-start">
              <div className="flex-1 overflow-hidden"><pre className="text-sm overflow-x-auto">{JSON.stringify(item, null, 2)}</pre></div>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500/10 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition-colors ml-4 shrink-0">Delete</button>
            </div>
          )) : <p className="text-muted-foreground">Failed to load.</p>}
        </div>
      </div>
    </div>
  );
}
