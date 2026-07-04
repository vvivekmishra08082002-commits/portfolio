const fs = require('fs');
const path = require('path');

const models = ['Education', 'Certificate', 'Achievement', 'CodingProfile', 'Blog', 'Testimonial', 'Service', 'Gallery'];

models.forEach(model => {
  const modelNameLower = model.toLowerCase();
  const dir = path.join(__dirname, 'src', 'app', 'api', modelNameLower);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = `import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.${modelNameLower}.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ${modelNameLower}" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await prisma.${modelNameLower}.create({
      data: body,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create ${modelNameLower}" }, { status: 500 });
  }
}
`;

  fs.writeFileSync(path.join(dir, 'route.ts'), content);
});

console.log('API routes generated successfully.');
