"use client";
import { useState, useEffect } from "react";

export default function AdminMessages() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/contact').then(res => res.json()).then(d => setData(d));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
    if (res.ok) setData(data.filter((item: any) => item.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Manage Messages</h1>

      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Inbox</h2>
        <div className="flex flex-col gap-4">
          {Array.isArray(data) && data.length > 0 ? data.map((item: any) => (
            <div key={item.id} className="p-4 bg-background border border-border/50 rounded-lg flex justify-between items-start">
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-lg">{item.name} <span className="text-sm font-normal text-muted-foreground">&lt;{item.email}&gt;</span></p>
                <p className="mt-2 text-foreground/80">{item.message}</p>
                <p className="mt-4 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500/10 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition-colors ml-4 shrink-0">Delete</button>
            </div>
          )) : <p className="text-muted-foreground">No messages yet.</p>}
        </div>
      </div>
    </div>
  );
}
