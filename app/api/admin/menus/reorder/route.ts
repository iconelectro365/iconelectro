import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function PUT(req: NextRequest) {
  const { orderedIds } = await req.json();
  for (let i = 0; i < orderedIds.length; i++) {
    await prisma.menu.update({ where: { id: orderedIds[i] }, data: { order: i } });
  }
  return NextResponse.json({ success: true });
}