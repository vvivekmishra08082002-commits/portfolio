"use client";

import { useState, useEffect } from "react";

export default function AdminTestimonial() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/testimonial').then(res => res.json()).then(d => setData(d));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    
    const res = await fetch('/api/testimonial', {
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
    const res = await fetch(`/api/testimonial?id=${id}`, { method: 'DELETE' });
    if (res.ok) setData(data.filter((item: any) => item.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Manage Testimonial</h1>
      
      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Add New Testimonial</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          <input name="name" required type="text" placeholder="name" className="p-3 rounded-md bg-background border border-border" />
          <input name="role" required type="text" placeholder="role" className="p-3 rounded-md bg-background border border-border" />
          <input name="quote" required type="text" placeholder="quote" className="p-3 rounded-md bg-background border border-border" />
          <input name="imageUrl" type="url" placeholder="Profile Image URL (optional)" className="p-3 rounded-md bg-background border border-border" />
          <button type="submit" className="py-3 bg-primary text-primary-foreground font-bold rounded-md hover:opacity-90">Add Testimonial</button>
        </form>
      </div>

      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Existing Testimonials</h2>
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
