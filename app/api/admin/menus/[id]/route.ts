import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET(req: NextRequest, { params }: { params: { id: string } }) { const menu = await prisma.menu.findUnique({ where:{ id:params.id } }); if (!menu) return NextResponse.json({ error:'Not found' }, { status:404 }); return NextResponse.json(menu); }
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) { const data = await req.json(); const menu = await prisma.menu.update({ where:{ id:params.id }, data }); return NextResponse.json(menu); }
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) { await prisma.menu.delete({ where:{ id:params.id } }); return NextResponse.json({ success:true }); }