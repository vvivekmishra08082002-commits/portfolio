const fs = require('fs');
const path = require('path');

const models = [
  { name: 'Education', fields: ['degree', 'university', 'year'] },
  { name: 'Certificate', fields: ['name', 'issuer', 'link'] },
  { name: 'Achievement', fields: ['title', 'date', 'description'] },
  { name: 'CodingProfile', fields: ['platform', 'username', 'link'] },
  { name: 'Blog', fields: ['title', 'snippet', 'url'] },
  { name: 'Testimonial', fields: ['name', 'role', 'quote'] },
  { name: 'Service', fields: ['title', 'description'] },
  { name: 'Gallery', fields: ['title', 'imageUrl'] }
];

models.forEach(model => {
  const modelNameLower = model.name.toLowerCase();
  const dir = path.join(__dirname, 'src', 'app', 'admin', modelNameLower);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const inputs = model.fields.map(f => 
    `          <input name="${f}" required type="text" placeholder="${f}" className="p-3 rounded-md bg-background border border-border" />`
  ).join('\\n');

  const content = `"use client";

import { useState, useEffect } from "react";

export default function Admin${model.name}() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/${modelNameLower}').then(res => res.json()).then(d => setData(d));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    
    const res = await fetch('/api/${modelNameLower}', {
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

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Manage ${model.name}</h1>
      
      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Add New ${model.name}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
${inputs}
          <button type="submit" className="py-3 bg-primary text-primary-foreground font-bold rounded-md hover:opacity-90">Add ${model.name}</button>
        </form>
      </div>

      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Existing ${model.name}s</h2>
        <div className="flex flex-col gap-4">
          {Array.isArray(data) ? data.map((item: any) => (
            <div key={item.id} className="p-4 bg-background border border-border/50 rounded-lg">
              <pre className="text-sm overflow-x-auto">{JSON.stringify(item, null, 2)}</pre>
            </div>
          )) : <p className="text-muted-foreground">Failed to load.</p>}
        </div>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

console.log('Admin pages generated successfully.');
