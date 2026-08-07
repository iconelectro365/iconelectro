import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET() {
  const [totalUsers, todayLeads, activeConversations] = await Promise.all([
    prisma.user.count(),
    prisma.lead.count({ where:{ createdAt:{ gte: new Date(new Date().setHours(0,0,0,0)) } } }),
    prisma.user.count({ where:{ updatedAt:{ gte: new Date(Date.now() - 15*60*1000) } } })
  ]);
  return NextResponse.json({ totalUsers, todayLeads, activeConversations });
}