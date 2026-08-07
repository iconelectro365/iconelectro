import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    return new NextResponse(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/admin/:path*',
};