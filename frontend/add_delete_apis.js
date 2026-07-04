const fs = require('fs');
const path = require('path');

const models = {
  projects: 'project',
  skills: 'skill',
  experience: 'experience',
  education: 'education',
  certificate: 'certificate',
  achievement: 'achievement',
  codingprofile: 'codingProfile',
  blog: 'blog',
  testimonial: 'testimonial',
  service: 'service',
  gallery: 'gallery'
};

Object.entries(models).forEach(([folder, modelName]) => {
  const filePath = path.join(__dirname, 'src', 'app', 'api', folder, 'route.ts');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('export async function DELETE')) {
      const deleteBlock = `\n
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    
    await prisma.${modelName}.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}\n`;
      content += deleteBlock;
      fs.writeFileSync(filePath, content);
      console.log(`Added DELETE to ${folder}`);
    }
  }
});
