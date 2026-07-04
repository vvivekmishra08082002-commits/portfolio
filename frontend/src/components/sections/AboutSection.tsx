import { BookOpen, Target, Clock, User } from "lucide-react";

export function AboutSection() {
  const timeline = [
    { year: "2023 - Present", title: "Software Engineer", desc: "Building scalable enterprise applications and contributing to open source." },
    { year: "2022", title: "Graduation", desc: "Completed B.Tech in Computer Science with distinction." },
    { year: "2021", title: "Internship", desc: "First professional experience as a full-stack developer intern." },
    { year: "2019", title: "Hello World", desc: "Wrote my very first line of code and discovered a lifelong passion." }
  ];

  return (
    <section id="about" className="w-full bg-background py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 shadow-sm border border-primary/20">Get to know me</div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">About My Journey</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Story & Objective */}
          <div className="flex flex-col gap-8">
            <div className="glass p-8 rounded-3xl border border-border/50 shadow-xl hover:shadow-primary/5 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <h3 className="text-2xl font-bold">Personal Story</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                My journey into software development started with a simple curiosity about how the web works. Over the years, that curiosity transformed into a deep-seated passion for solving complex problems through code. I specialize in backend architecture, particularly with Python and Node.js, while maintaining a strong eye for frontend design.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl border border-border/50 shadow-xl hover:shadow-primary/5 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-bold">Career Objective</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To build high-performance, accessible, and user-centric digital products that positively impact people's lives. I am constantly striving to master new architectural patterns, improve system scalability, and lead technical initiatives that drive innovation.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl border border-border/50 shadow-xl hover:shadow-primary/5 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-2xl font-bold">Current Learning</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I am currently diving deep into distributed systems, advanced cloud infrastructure (AWS/Azure), and integrating AI/Machine Learning models into traditional SaaS products to create smarter, predictive applications.
              </p>
            </div>
          </div>
          
          {/* Right Column: Timeline */}
          <div className="glass p-8 md:p-10 rounded-3xl border border-border/50 shadow-xl h-fit">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock size={24} />
              </div>
              <h3 className="text-2xl font-bold">Timeline</h3>
            </div>
            
            <div className="flex flex-col gap-0 pl-4 relative">
              <div className="absolute left-6 top-2 bottom-4 w-0.5 bg-border/50" />
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6 relative py-4 group">
                  <div className="w-5 h-5 rounded-full bg-background border-4 border-primary z-10 shrink-0 mt-1 shadow-md group-hover:scale-125 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-primary tracking-widest uppercase mb-1">{item.year}</span>
                    <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
