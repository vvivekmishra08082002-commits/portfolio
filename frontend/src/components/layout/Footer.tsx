export function Footer() {
  return (
    <footer className="w-full py-8 text-center text-sm text-muted-foreground">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-lg font-black tracking-tighter mb-4 md:mb-0">VIVEK MISHRA<span className="text-primary">.</span></span>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Vivek Mishra. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://github.com/vvivekmishra08082002-commits" target="_blank" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/vivek-mishra-37241a229" target="_blank" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="mailto:vvivekmishra08082002@gmail.com" className="hover:text-foreground transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
