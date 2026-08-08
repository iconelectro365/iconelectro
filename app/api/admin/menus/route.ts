import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET() { const menus = await prisma.menu.findMany({ orderBy: { order: 'asc' } }); return NextResponse.json(menus); }
export async function POST(req: NextRequest) { const data = await req.json(); const menu = await prisma.menu.create({ data }); return NextResponse.json(menu, { status: 201 }); }
export async function PUT(req: NextRequest) { const { orderedIds } = await req.json(); for (let i=0; i<orderedIds.length; i++) await prisma.menu.update({ where:{ id:orderedIds[i] }, data:{ order:i } }); return NextResponse.json({ success:true }); }