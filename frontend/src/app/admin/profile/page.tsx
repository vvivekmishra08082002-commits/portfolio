"use client";
import { useState, useEffect } from "react";

export default function AdminProfile() {
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    fetch('/api/profile').then(res => res.json()).then(d => setProfile(d));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    
    const res = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (res.ok) {
      const newProfile = await res.json();
      setProfile(newProfile);
      alert("Profile updated successfully!");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Manage Profile</h1>

      <div className="glass p-6 rounded-xl border border-border/50">
        <h2 className="text-xl font-bold mb-4">Edit Public Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          <input name="name" defaultValue={profile.name} required type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" />
          <input name="headline" defaultValue={profile.headline} required type="text" placeholder="Headline (e.g. Software Engineer)" className="w-full p-4 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" />
          <textarea name="bio" defaultValue={profile.bio} required placeholder="Short Bio" rows={4} className="w-full p-4 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" />
          <input name="imageUrl" defaultValue={profile.imageUrl} type="url" placeholder="Profile Image URL (optional)" className="w-full p-4 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" />
          
          {profile.imageUrl && (
            <div className="mt-4">
              <p className="text-sm font-bold mb-2">Image Preview:</p>
              <img src={profile.imageUrl} alt="Profile preview" className="w-32 h-32 object-cover rounded-full border-4 border-primary/20" />
            </div>
          )}

          <button type="submit" className="py-4 bg-primary text-primary-foreground font-black tracking-wider uppercase rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-primary/25">Save Profile</button>
        </form>
      </div>
    </div>
  );
}
