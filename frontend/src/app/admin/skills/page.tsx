"use client";

import { useState, useEffect } from "react";

export default function AdminSkills() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/skills').then(res => res.json()).then(data => setSkills(data));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLInputElement).value,
    };
    
    const res = await fetch('/api/skills', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (res.ok) {
      const newSkill = await res.json();
      setSkills([...skills, newSkill]);
      form.reset();
      alert("Skill added!");
    }
  }


  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this?")) return;
    const res = await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
    if (res.ok) setSkills(skills.filter((item: any) => item.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Manage Skills</h1>
      
      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          <input name="name" required type="text" placeholder="Skill Name (e.g. React)" className="p-3 rounded-md bg-background border border-border" />
          <input name="category" type="text" placeholder="Category (e.g. Frontend)" className="p-3 rounded-md bg-background border border-border" />
          <button type="submit" className="py-3 bg-primary text-primary-foreground font-bold rounded-md hover:opacity-90">Add Skill</button>
        </form>
      </div>

      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Existing Skills</h2>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(skills) ? skills.map((s: any) => (
            <div key={s.id} className="bg-background border border-border pl-3 pr-1 py-1 rounded-full font-medium flex items-center gap-2">
              {s.name} <span className="text-muted-foreground text-xs">({s.category})</span>
              <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">&times;</button>
            </div>
          )) : <p className="text-muted-foreground text-sm">No skills found or failed to load.</p>}
        </div>
      </div>
    </div>
  );
}
