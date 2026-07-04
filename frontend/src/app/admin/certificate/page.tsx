"use client";

import { useState, useEffect } from "react";

export default function AdminCertificate() {
  const [data, setData] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch('/api/certificate').then(res => res.json()).then(d => setData(d));
  }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    if (imageUrl) {
      body.imageUrl = imageUrl;
    }
    
    const res = await fetch('/api/certificate', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (res.ok) {
      const newItem = await res.json();
      setData([...data, newItem]);
      form.reset();
      setImageUrl("");
      alert("Added!");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this?")) return;
    const res = await fetch(`/api/certificate?id=${id}`, { method: 'DELETE' });
    if (res.ok) setData(data.filter((item: any) => item.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Manage Certificate</h1>
      
      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Add New Certificate</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          <input name="name" required type="text" placeholder="name" className="w-full p-4 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" />
          <input name="issuer" required type="text" placeholder="issuer" className="w-full p-4 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" />
          <input name="link" required type="text" placeholder="link" className="w-full p-4 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" />
          
          <label className="flex flex-col gap-2">
            <span className="font-bold text-sm">Certificate Image (Optional)</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border border-border rounded-md bg-background" />
          </label>
          
          {imageUrl && (
            <div className="w-32 h-32 rounded-lg overflow-hidden border border-border mt-2">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <button type="submit" className="py-3 bg-primary text-primary-foreground font-bold rounded-md hover:opacity-90 mt-2">Add Certificate</button>
        </form>
      </div>

      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Existing Certificates</h2>
        <div className="flex flex-col gap-4">
          {Array.isArray(data) ? data.map((item: any) => (
            <div key={item.id} className="p-4 bg-background border border-border/50 rounded-lg flex justify-between items-start">
              <div className="flex-1 overflow-hidden">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.issuer}</p>
                {item.imageUrl && <img src={item.imageUrl} className="h-16 mt-2 rounded" alt={item.name} />}
              </div>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500/10 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition-colors ml-4 shrink-0">Delete</button>
            </div>
          )) : <p className="text-muted-foreground">Failed to load.</p>}
        </div>
      </div>
    </div>
  );
}
