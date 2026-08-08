import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET() { const menus = await prisma.menu.findMany({ orderBy: { order: 'asc' } }); return NextResponse.json(menus); }
export async function POST(req: NextRequest) { const data = await req.json(); const menu = await prisma.menu.create({ data }); return NextResponse.json(menu, { status: 201 }); }
// Reorder endpoint separate
