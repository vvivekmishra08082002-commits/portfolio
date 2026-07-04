import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile || {});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const existing = await prisma.profile.findFirst();
    if (existing) {
      const updated = await prisma.profile.update({
        where: { id: existing.id },
        data: body
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.profile.create({ data: body });
      return NextResponse.json(created);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
