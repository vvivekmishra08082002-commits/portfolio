"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export function HeroSection() {
  const [profile, setProfile] = useState<any>({
    name: "Software Engineer",
    headline: "Software Engineer",
    bio: "I build enterprise-grade, scalable, and beautifully designed web applications. Welcome to my digital portfolio.",
    imageUrl: ""
  });

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data && data.name) setProfile(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-12">
      
      {profile.imageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative shrink-0"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl relative z-10 bg-muted">
            <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full animate-pulse" />
        </motion.div>
      )}

      <div className="flex flex-col items-center md:items-start gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900 dark:from-zinc-100 dark:to-zinc-500">{profile.name}</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold mt-4 text-primary h-8 md:h-10">
            <TypeAnimation
              sequence={[
                profile.headline || 'Software Engineer',
                1000,
                'Python Developer',
                1000,
                'Backend Engineer',
                1000,
                'AI Enthusiast',
                1000,
                'Open Source Contributor',
                1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          {profile.bio}
        </motion.p>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6 md:mt-8 w-full md:w-auto"
      >
        <a
          href="#projects"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
        >
          View Projects
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors w-full sm:w-auto text-center"
        >
          Download Resume
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-border bg-transparent text-foreground rounded-full font-medium hover:bg-secondary transition-colors w-full sm:w-auto text-center"
        >
          Contact Me
        </a>
        <a
          href="#contact"
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 rounded-full font-bold hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
        >
          Hire Me
        </a>
      </motion.div>
      </div>
    </section>
  );
}
