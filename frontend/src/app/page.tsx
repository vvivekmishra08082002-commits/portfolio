"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { useState, useEffect } from "react";
import Image from "next/image";

function DynamicSkills() {
  const [skills, setSkills] = useState<{id: string, name: string, category: string, description?: string}[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<{id: string, name: string, description?: string} | null>(null);

  useEffect(() => {
    fetch('/api/skills').then(res => res.json()).then(data => setSkills(data));
  }, []);

  if (skills.length === 0) return <p className="text-muted-foreground animate-pulse">Loading skills...</p>;

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        {categories.map(category => (
          <div key={category} className="glass p-8 rounded-3xl border border-border/50 flex flex-col gap-6 shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group text-left">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-all z-0"></div>
            <h3 className="text-xl font-black uppercase tracking-widest text-primary border-b border-border/50 pb-4 z-10">{category}</h3>
            <div className="flex flex-wrap gap-3 z-10">
              {skills.filter(s => s.category === category).map(skill => (
                <button 
                  key={skill.id} 
                  onClick={() => setSelectedSkill(skill)}
                  className="px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg font-bold text-foreground/90 border border-border/50 shadow-sm hover:border-primary hover:bg-primary/10 hover:text-primary transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Pop-up Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedSkill(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg glass p-10 rounded-[2rem] border border-border/50 shadow-2xl flex flex-col gap-6 overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -z-10" />
              <button 
                onClick={() => setSelectedSkill(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-background/50 hover:bg-primary/20 hover:text-primary transition-colors border border-border/50 font-bold"
              >
                ✕
              </button>
              
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-primary">Tech Stack</span>
                <h3 className="text-4xl font-extrabold tracking-tight">{selectedSkill.name}</h3>
              </div>
              
              <div className="h-px w-full bg-border/50" />
              
              <p className="text-foreground/90 text-lg leading-relaxed font-medium">
                {selectedSkill.description || `I actively utilize ${selectedSkill.name} to engineer robust, scalable, and high-performance solutions. Ask me about my specific projects utilizing this technology!`}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function DynamicSectionRenderer({ endpoint }: { endpoint: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/${endpoint}`)
      .then(res => res.json())
      .then(d => {
        if (Array.isArray(d)) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <p className="text-muted-foreground animate-pulse">Loading...</p>;
  if (data.length === 0) return (
    <div className="glass w-full max-w-4xl h-32 rounded-3xl flex items-center justify-center border border-border/50">
      <span className="text-muted-foreground font-medium">Nothing here yet. Add content in the Admin Dashboard!</span>
    </div>
  );

  if (endpoint === 'gallery') {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item, i) => (
          <div key={i} className="group relative rounded-3xl overflow-hidden shadow-xl border border-border/50 aspect-square">
            <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <h3 className="text-white font-extrabold text-2xl tracking-tight">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (endpoint === 'testimonial') {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((item, i) => (
          <div key={i} className="glass p-8 md:p-10 rounded-3xl border border-border/50 flex flex-col gap-8 relative overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute -top-4 -right-2 text-primary/10 text-9xl font-serif leading-none italic select-none">"</div>
            <p className="text-foreground/90 text-lg md:text-xl relative z-10 italic font-medium leading-relaxed">"{item.quote}"</p>
            <div className="flex items-center gap-5 mt-auto">
              {item.imageUrl ? (
                <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-primary shadow-lg"><Image src={item.imageUrl} alt={item.name} fill className="object-cover" /></div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl shadow-lg">{item.name.charAt(0)}</div>
              )}
              <div>
                <p className="font-extrabold text-xl">{item.name}</p>
                <p className="text-sm text-primary font-bold uppercase tracking-wider">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (endpoint === 'education') {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((item, i) => (
          <div key={i} className="group relative glass p-10 rounded-3xl border border-border/50 flex flex-col gap-4 overflow-hidden shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="text-9xl">🎓</span>
            </div>
            <div className="absolute top-0 left-0 w-2 h-full bg-primary/80"></div>
            
            <h3 className="text-2xl font-black tracking-tight leading-tight mt-2 z-10">{item.degree}</h3>
            <p className="text-primary font-bold text-lg z-10">{item.institution}</p>
            
            <div className="flex items-center gap-3 mt-2 z-10">
              {item.duration && <span className="px-4 py-1.5 bg-background rounded-full text-xs font-bold tracking-widest uppercase border border-border/50">{item.duration}</span>}
              {item.score && <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase border border-primary/20">Grade: {item.score}</span>}
            </div>
            
            {item.description && <p className="text-foreground/80 leading-relaxed font-medium mt-4 z-10 border-t border-border/50 pt-4">{item.description}</p>}
          </div>
        ))}
      </div>
    );
  }

  if (endpoint === 'experience') {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((item, i) => (
          <div key={i} className="group relative glass p-10 rounded-3xl border border-border/50 flex flex-col gap-4 overflow-hidden shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="text-9xl">💼</span>
            </div>
            <div className="absolute top-0 left-0 w-2 h-full bg-primary/80"></div>
            
            <h3 className="text-2xl font-black tracking-tight leading-tight mt-2 z-10">{item.role || item.title}</h3>
            <p className="text-primary font-bold text-lg z-10">{item.company || item.organization}</p>
            
            <div className="flex items-center gap-3 mt-2 z-10">
              {item.duration && <span className="px-4 py-1.5 bg-background rounded-full text-xs font-bold tracking-widest uppercase border border-border/50">{item.duration}</span>}
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase border border-primary/20">Professional</span>
            </div>
            
            {item.description && <p className="text-foreground/80 leading-relaxed font-medium mt-4 z-10 border-t border-border/50 pt-4">{item.description}</p>}
          </div>
        ))}
      </div>
    );
  }

  if (endpoint === 'blog') {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, i) => (
          <div key={i} className="group glass p-8 rounded-3xl border border-border/50 flex flex-col gap-4 relative overflow-hidden shadow-xl hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <div className="flex items-center gap-3 text-sm text-primary font-bold tracking-widest uppercase mb-2">
              <span className="w-8 h-px bg-primary"></span>
              Article
            </div>
            <h3 className="text-2xl font-extrabold leading-tight">{item.title}</h3>
            {item.url && (
              <a href={item.url} target="_blank" className="mt-auto inline-flex items-center gap-2 text-primary font-bold hover:underline">
                Read Article &rarr;
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (endpoint === 'service') {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((item, i) => (
          <div key={i} className="group glass p-10 rounded-3xl border border-border/50 flex flex-col items-start text-left gap-6 shadow-xl hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -z-10 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-black shadow-inner border border-primary/20 group-hover:scale-110 transition-transform">
              {item.title.charAt(0)}
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight mt-2">{item.title}</h3>
            {item.description && <p className="text-foreground/80 leading-relaxed font-medium flex-grow">{item.description}</p>}
            <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase cursor-pointer group-hover:text-foreground transition-colors">
              Discover More <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (endpoint === 'certificate') {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((item, i) => (
          <div key={i} className="glass p-8 rounded-3xl border border-border/50 flex flex-col gap-6 shadow-xl hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
            <div className="flex justify-between items-start z-10">
              <div className="flex flex-col">
                <span className="text-primary font-black uppercase tracking-widest text-xs mb-2">Certification</span>
                <h3 className="text-2xl font-extrabold leading-tight mb-2">{item.title}</h3>
                <p className="text-foreground/80 font-bold">{item.issuer}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary text-xl">🎓</span>
              </div>
            </div>
            {item.issueDate && <div className="text-sm font-mono text-muted-foreground z-10 mt-auto">Issued: {item.issueDate}</div>}
            {item.credentialUrl && (
              <a href={item.credentialUrl} target="_blank" className="z-10 mt-2 inline-flex items-center gap-2 text-primary font-bold hover:underline">
                View Credential &rarr;
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (endpoint === 'codingprofile') {
    return (
      <div className="w-full flex flex-wrap justify-center gap-6">
        {data.map((item, i) => (
          <a key={i} href={item.url} target="_blank" className="glass px-8 py-5 rounded-full border border-border/50 flex items-center gap-4 hover:border-primary hover:bg-primary/5 transition-all shadow-lg hover:shadow-primary/20 hover:scale-105 duration-300">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-extrabold text-xl tracking-tight">{item.platform}</span>
            <span className="text-muted-foreground">&rarr;</span>
          </a>
        ))}
      </div>
    );
  }

  if (endpoint === 'achievement') {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, i) => (
          <div key={i} className="group relative glass p-8 rounded-3xl border border-border/50 flex flex-col gap-4 overflow-hidden shadow-xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity text-5xl">🏆</div>
            <span className="text-primary font-black uppercase tracking-widest text-xs z-10">{item.category || 'Achievement'}</span>
            <h3 className="text-xl font-extrabold leading-tight z-10">{item.title}</h3>
            {item.description && <p className="text-foreground/80 font-medium text-sm z-10">{item.description}</p>}
            {item.date && <div className="mt-auto text-xs font-bold text-muted-foreground z-10">{item.date}</div>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((item, i) => (
        <div key={i} className="glass p-8 rounded-3xl border border-border/50 flex flex-col gap-6 hover:border-primary/50 transition-colors shadow-xl hover:-translate-y-2 duration-300">
          {item.imageUrl && (
            <div className="w-full h-56 relative rounded-2xl overflow-hidden shadow-md"><Image src={item.imageUrl} alt="img" fill className="object-cover" /></div>
          )}
          <div className="flex flex-col gap-4">
            {Object.entries(item).filter(([k, v]) => k !== 'id' && k !== 'imageUrl' && v !== null && v !== "").map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-xs text-primary uppercase tracking-widest font-black mb-1">{key}</span>
                <p className="text-foreground/90 font-medium leading-relaxed">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7 }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[50%] bg-secondary/30 blur-[150px] rounded-full pointer-events-none -z-10" />

      <HeroSection />
      
      <motion.div {...fadeInUp} className="w-full">
        <AboutSection />
      </motion.div>
      
      <motion.div {...fadeInUp} className="w-full relative z-20">
        <ProjectsSection />
      </motion.div>
      
      {/* 4. Skills */}
      <motion.section {...fadeInUp} id="skills" className="w-full py-24 md:py-32 bg-muted/10 relative border-t border-border/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-4 shadow-sm border border-primary/20">Technical Arsenal</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">Skills & Tech Stack</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <DynamicSkills />
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeInUp} id="resume" className="w-full py-24 bg-background relative border-t border-border/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-4 shadow-sm border border-primary/20">Career & Qualifications</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Interactive Resume</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="/resume.pdf" target="_blank" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
              <span className="text-xl">📄</span> Download PDF
            </a>
            <a href="#experience" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-bold shadow-lg hover:bg-secondary/80 transition-all flex items-center gap-2 border border-border">
              <span className="text-xl">🌐</span> View Online Resume
            </a>
            <a href="/ats_resume.pdf" target="_blank" className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-full font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
              <span className="text-xl">🤖</span> ATS Resume
            </a>
          </div>
        </div>
      </motion.section>

      {/* Stylized sections for the rest of the content */}
      <div className="w-full flex flex-col">
        {[
          { id: "experience", api: "experience", title: "Professional Experience", desc: "My career history and roles." },
          { id: "education", api: "education", title: "Education", desc: "My academic background." },
          { id: "certificates", api: "certificate", title: "Certificates", desc: "View my professional certifications and continuous learning." },
          { id: "achievements", api: "achievement", title: "Achievements", desc: "Key milestones, awards, and hackathon wins." },
          { id: "coding-profiles", api: "codingprofile", title: "Coding Profiles", desc: "Check out my stats on GitHub, LeetCode, and HackerRank." },
          { id: "blogs", api: "blog", title: "Blogs", desc: "Read my latest thoughts on software engineering and architecture." },
          { id: "gallery", api: "gallery", title: "Gallery", desc: "A visual journey through my professional life." },
          { id: "testimonials", api: "testimonial", title: "Testimonials", desc: "What colleagues and clients have to say about my work." },
          { id: "services", api: "service", title: "Services", desc: "Consulting, freelance development, and technical writing." },
        ].map((section, index) => (
          <motion.section {...fadeInUp} key={section.id} id={section.id} className={`w-full py-32 px-6 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'} relative`}>
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
              <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{section.title}</h2>
              <p className="text-muted-foreground mb-16 text-lg max-w-2xl">{section.desc}</p>
              
              <DynamicSectionRenderer endpoint={section.api} />
            </div>
          </motion.section>
        ))}
      </div>

      {/* 15. Contact */}
      <motion.section {...fadeInUp} id="contact" className="w-full py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="flex flex-col text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 shadow-sm border border-primary/20 w-max">Get In Touch</div>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">Let's Connect.</h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-md leading-relaxed">Have a project in mind, looking for a developer, or just want to chat? Drop me a message and I'll get back to you as soon as possible.</p>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">📧</div>
                  <div>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Email</p>
                    <a href="mailto:vvivekmishra08082002@gmail.com" className="font-medium hover:text-primary transition-colors">vvivekmishra08082002@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">📱</div>
                  <div>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Phone</p>
                    <a href="tel:+918103791984" className="font-medium hover:text-primary transition-colors">+91 8103791984</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">📍</div>
                  <div>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Location</p>
                    <p className="font-medium">Bhopal, M.P. (INDIA)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <a href="https://www.linkedin.com/in/vivek-mishra-37241a229" target="_blank" className="w-12 h-12 rounded-full bg-blue-500/10 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center text-blue-500 text-xl shadow-sm border border-blue-500/20">
                    in
                  </a>
                  <a href="https://github.com/vvivekmishra08082002-commits" target="_blank" aria-label="GitHub Profile" className="w-12 h-12 rounded-full bg-zinc-500/10 hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black transition-colors flex items-center justify-center text-zinc-500 text-xl shadow-sm border border-zinc-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                  <a href="https://wa.me/918103791984" target="_blank" aria-label="WhatsApp Contact" className="w-12 h-12 rounded-full bg-green-500/10 hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center text-green-500 text-xl shadow-sm border border-green-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </a>
                </div>
                <div className="mt-6 w-full h-48 rounded-3xl overflow-hidden shadow-xl border border-border/50 opacity-90 hover:opacity-100 transition-opacity">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117300.91090401878!2d77.3323049079717!3d23.259926610057277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1703661146313!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    title="Google Maps Location"
                  ></iframe>
                </div>
              </div>
            </div>

            <form 
              className="flex flex-col gap-6 text-left glass p-10 md:p-12 rounded-[2.5rem] shadow-2xl border-border/50 relative group"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = {
                  name: (form.elements.namedItem('name') as HTMLInputElement).value,
                  email: (form.elements.namedItem('email') as HTMLInputElement).value,
                  message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
                };
                
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                  });
                  if (res.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                  } else {
                    alert('Failed to send message.');
                  }
                } catch (err) {
                  alert('An error occurred.');
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] -z-10"></div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold tracking-wide ml-2">Name</label>
                <input suppressHydrationWarning name="name" type="text" placeholder="John Doe" required className="w-full p-4 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all shadow-inner" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold tracking-wide ml-2">Email</label>
                <input suppressHydrationWarning name="email" type="email" placeholder="john@example.com" required className="w-full p-4 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all shadow-inner" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold tracking-wide ml-2">Message</label>
                <textarea suppressHydrationWarning name="message" placeholder="How can I help you?" required rows={4} className="w-full p-4 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none shadow-inner"></textarea>
              </div>
              <button suppressHydrationWarning type="submit" className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-extrabold text-lg mt-2 hover:opacity-90 hover:scale-[1.02] transition-all shadow-xl shadow-primary/20">Send Message &rarr;</button>
            </form>
            
          </div>
        </div>
      </motion.section>
      
    </div>
  );
}
