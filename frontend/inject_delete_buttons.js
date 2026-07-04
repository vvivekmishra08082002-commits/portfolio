const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, 'src', 'app', 'admin');
const dirs = fs.readdirSync(adminPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

dirs.forEach(dir => {
  const file = path.join(adminPath, dir, 'page.tsx');
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('handleDelete')) return; // Already added

  // Figure out the state variable name
  const stateMatch = content.match(/const \[([a-zA-Z]+), set([a-zA-Z]+)\] = useState/);
  if (!stateMatch) return;
  const stateVar = stateMatch[1];
  const setVar = 'set' + stateMatch[2];
  
  // Figure out endpoint
  const endpointMatch = content.match(/fetch\('\/api\/([a-zA-Z]+)'/);
  if (!endpointMatch) return;
  const endpoint = endpointMatch[1];

  // Insert handleDelete function before return (
  const deleteFunc = `
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this?")) return;
    const res = await fetch(\`/api/${endpoint}?id=\${id}\`, { method: 'DELETE' });
    if (res.ok) ${setVar}(${stateVar}.filter((item: any) => item.id !== id));
  }

  return (`;
  
  content = content.replace('  return (', deleteFunc);

  // Insert Delete button
  content = content.replace(
    /className="p-4 bg-background border border-border\/50 rounded-lg"/g,
    'className="p-4 bg-background border border-border/50 rounded-lg flex justify-between items-start"'
  );

  content = content.replace(
    /<pre className="text-sm overflow-x-auto">\{JSON\.stringify\(([^,]+), null, 2\)\}<\/pre>\s*<\/div>/g,
    `<div className="flex-1 overflow-hidden"><pre className="text-sm overflow-x-auto">{JSON.stringify($1, null, 2)}</pre></div>
              <button onClick={() => handleDelete($1.id)} className="bg-red-500/10 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition-colors ml-4 shrink-0">Delete</button>
            </div>`
  );
  
  if (file.includes('skills')) {
    content = content.replace(
      /<span key=\{s\.id\} className="bg-background border border-border px-3 py-1 rounded-full font-medium">\s*\{s\.name\} <span className="text-muted-foreground text-xs ml-1">\(\{s\.category\}\)<\/span>\s*<\/span>/g,
      `<div key={s.id} className="bg-background border border-border pl-3 pr-1 py-1 rounded-full font-medium flex items-center gap-2">
              {s.name} <span className="text-muted-foreground text-xs">({s.category})</span>
              <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">&times;</button>
            </div>`
    );
  }

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
