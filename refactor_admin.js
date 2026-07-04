const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'frontend', 'src', 'app', 'admin');

const newCardDesign = `
            <div key={item.id} className="group relative bg-background/40 backdrop-blur-3xl p-6 rounded-3xl border border-white/10 flex flex-col gap-4 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(var(--primary),0.3)] transition-all duration-500 hover:-translate-y-2 hover:bg-background/60">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              <div className="flex justify-between items-start gap-4 relative z-10">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                  {Object.entries(item).filter(([k]) => k !== 'id' && k !== 'createdAt' && k !== 'updatedAt').map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1.5 opacity-80">{key}</span>
                      <span className="text-sm font-semibold text-foreground break-words drop-shadow-md">
                        {typeof val === 'string' && val.startsWith('data:image') 
                          ? <img src={val} alt={key} className="h-24 w-auto rounded-xl border border-white/20 mt-2 object-contain shadow-lg group-hover:scale-105 transition-transform duration-500" />
                          : typeof val === 'string' && (val.startsWith('http') || val.startsWith('www'))
                          ? <a href={val} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors hover:underline truncate block">{val}</a>
                          : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleDelete(item.id)} className="shrink-0 p-3 text-destructive/70 hover:bg-destructive hover:text-white rounded-2xl transition-all duration-300 shadow-sm border border-destructive/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:-translate-y-1 hover:scale-110 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>`;

const oldCardString = `<div key={item.id} className="bg-card p-5 rounded-xl border border-border flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
                  {Object.entries(item).filter(([k]) => k !== 'id' && k !== 'createdAt' && k !== 'updatedAt').map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{key}</span>
                      <span className="text-sm font-medium text-foreground break-words">
                        {typeof val === 'string' && val.startsWith('data:image') 
                          ? <img src={val} alt={key} className="h-16 w-auto rounded border border-border mt-1 object-contain bg-muted/20" />
                          : typeof val === 'string' && (val.startsWith('http') || val.startsWith('www'))
                          ? <a href={val} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate block">{val}</a>
                          : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleDelete(item.id)} className="shrink-0 p-2 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors border border-transparent hover:border-destructive/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>`;

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(filePath));
        } else if (file === 'page.tsx') {
            results.push(filePath);
        }
    });
    return results;
}

const files = walkDir(adminDir);

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    if (content.includes(oldCardString)) {
        content = content.split(oldCardString).join(newCardDesign.trim());
        modified = true;
    }

    const oldInputStyle = 'className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm text-sm"';
    const newInputStyle = 'className="w-full p-4 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] hover:bg-background/60 text-sm"';
    if (content.includes(oldInputStyle)) {
        content = content.split(oldInputStyle).join(newInputStyle);
        modified = true;
    }

    const oldBtnStyle = 'className="py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm text-sm"';
    const newBtnStyle = 'className="group relative py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-black tracking-widest uppercase rounded-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_10px_20px_rgba(var(--primary),0.3)] hover:shadow-[0_15px_30px_rgba(var(--primary),0.5)] overflow-hidden"';
    if (content.includes(oldBtnStyle)) {
        content = content.split(oldBtnStyle).join(newBtnStyle);
        modified = true;
    }

    const oldFileStyle = 'className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80 cursor-pointer"';
    const newFileStyle = 'className="w-full p-3 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] hover:bg-background/60 text-sm file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer file:shadow-[0_4px_10px_rgba(var(--primary),0.3)]"';
    if (content.includes(oldFileStyle)) {
        content = content.split(oldFileStyle).join(newFileStyle);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Refactored " + filePath);
    }
});

console.log("Refactoring complete.");
