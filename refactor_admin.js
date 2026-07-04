const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'frontend', 'src', 'app', 'admin');

const newCardDesign = `
            <div key={item.id} className="bg-card p-5 rounded-xl border border-border flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
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

const oldCardString = `<div key={item.id} className="group relative glass p-6 rounded-2xl border border-border/40 flex flex-col gap-4 overflow-hidden shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/60 group-hover:bg-primary transition-colors"></div>
              <div className="flex justify-between items-start z-10 gap-6 pl-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  {Object.entries(item).filter(([k]) => k !== 'id' && k !== 'createdAt' && k !== 'updatedAt').map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest font-bold text-primary/70 mb-1">{key}</span>
                      <span className="text-sm font-semibold text-foreground/90 break-words">
                        {typeof val === 'string' && val.startsWith('data:image') 
                          ? <img src={val} alt={key} className="h-20 w-auto rounded-lg mt-1 object-contain border border-border/50 shadow-sm" />
                          : typeof val === 'string' && (val.startsWith('http') || val.startsWith('www'))
                          ? <a href={val} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate block">{val}</a>
                          : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleDelete(item.id)} className="shrink-0 p-3 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-xl transition-all shadow-sm border border-destructive/20 hover:shadow-destructive/30 hover:scale-105 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
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

    const oldInputStyle = 'className="w-full p-4 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"';
    const newInputStyle = 'className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm text-sm"';
    if (content.includes(oldInputStyle)) {
        content = content.split(oldInputStyle).join(newInputStyle);
        modified = true;
    }

    const oldBtnStyle = 'className="py-4 bg-primary text-primary-foreground font-black tracking-wider uppercase rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-primary/25"';
    const newBtnStyle = 'className="py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm text-sm"';
    if (content.includes(oldBtnStyle)) {
        content = content.split(oldBtnStyle).join(newBtnStyle);
        modified = true;
    }

    const oldFileStyle = 'className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"';
    const newFileStyle = 'className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80 cursor-pointer"';
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
