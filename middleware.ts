// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const secret = new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET || 'fallback-secret'
  );

  try {
    await jwtVerify(token, secret);
  } catch {
    return new NextResponse(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/admin/:path*',
};