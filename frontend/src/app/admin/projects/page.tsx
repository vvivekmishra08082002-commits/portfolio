"use client";

import { useState, useEffect } from "react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(data => setProjects(data));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      tags: (form.elements.namedItem('tags') as HTMLInputElement).value,
      link: (form.elements.namedItem('link') as HTMLInputElement).value,
      github: (form.elements.namedItem('github') as HTMLInputElement).value,
    };
    
    const res = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (res.ok) {
      const newProject = await res.json();
      setProjects([newProject, ...projects]);
      form.reset();
      alert("Project added!");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
    if (res.ok) setProjects(projects.filter((p: any) => p.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Manage Projects</h1>
      
      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          <input name="title" required type="text" placeholder="Project Title" className="p-3 rounded-md bg-background border border-border" />
          <textarea name="description" required placeholder="Description" rows={3} className="p-3 rounded-md bg-background border border-border resize-none" />
          <input name="tags" required type="text" placeholder="Tags (comma separated)" className="p-3 rounded-md bg-background border border-border" />
          <input name="link" type="url" placeholder="Live URL (optional)" className="p-3 rounded-md bg-background border border-border" />
          <input name="github" type="url" placeholder="GitHub URL (optional)" className="p-3 rounded-md bg-background border border-border" />
          <button type="submit" className="py-3 bg-primary text-primary-foreground font-bold rounded-md hover:opacity-90">Create Project</button>
        </form>
      </div>

      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Existing Projects</h2>
        <div className="flex flex-col gap-4">
          {Array.isArray(projects) ? projects.map((p: any) => (
            <div key={p.id} className="p-4 bg-background border border-border/50 rounded-lg flex justify-between items-start">
              <div>
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-2 flex gap-2 text-xs">
                  {p.tags.split(',').map((t: string) => <span key={t} className="bg-muted px-2 py-1 rounded">{t.trim()}</span>)}
                </div>
              </div>
              <button onClick={() => handleDelete(p.id)} className="bg-red-500/10 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition-colors">Delete</button>
            </div>
          )) : <p className="text-muted-foreground">Failed to load projects.</p>}
        </div>
      </div>
    </div>
  );
}
