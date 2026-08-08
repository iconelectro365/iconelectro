'use client';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token && pathname.startsWith('/admin')) {
      router.push('/login');
    }
  }, [token, pathname, router]);

  if (!token) return null; // while redirecting

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[var(--bg)] p-4 md:p-6">{children}</main>
    </div>
  );
}