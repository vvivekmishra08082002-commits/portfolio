"use client";
import { useState, useEffect } from "react";

export function ProjectsSection() {
  const [projectsData, setProjectsData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(data => setProjectsData(data));
  }, []);

  return (
    <section id="projects" className="w-full min-h-[50vh] py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
        
        {projectsData.length === 0 ? (
          <p className="text-center text-muted-foreground animate-pulse">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div key={index} className="group glass p-8 rounded-3xl border border-border/50 flex flex-col h-full relative overflow-hidden shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
                <h3 className="text-2xl font-extrabold mb-3 leading-tight tracking-tight relative z-10">{project.title}</h3>
                <p className="text-foreground/80 mb-8 flex-grow leading-relaxed font-medium relative z-10">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {project.tags.split(',').map((tag: string, tagIndex: number) => (
                    <span key={tagIndex} className="px-4 py-1.5 bg-primary/10 text-primary text-xs rounded-full font-bold uppercase tracking-widest border border-primary/20 shadow-sm">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 mt-auto relative z-10">
                  {project.link && (
                    <a href={project.link} className="inline-flex items-center gap-2 text-sm font-black text-primary hover:text-foreground transition-colors uppercase tracking-wider">
                      Live Demo &rarr;
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} className="inline-flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
                      Code &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
