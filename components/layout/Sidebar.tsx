'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Menu, DollarSign, Users, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href:'/admin', label:'Dashboard', icon:LayoutDashboard },
  { href:'/admin/menus', label:'Menu Builder', icon:Menu },
  { href:'/admin/pricing', label:'Pricing', icon:DollarSign },
  { href:'/admin/leads', label:'Leads', icon:Users },
  { href:'/admin/settings', label:'Settings', icon:Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <aside className="w-64 h-screen flex flex-col border-r glass">
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">⚡</div>
        <h1 className="text-xl font-bold gradient-text font-display">SolarBot Pro</h1>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(item => (
          <Link key={item.href} href={item.href}>
            <Button variant={pathname === item.href ? 'secondary' : 'ghost'} className="w-full justify-start gap-3 rounded-xl">
              <item.icon className="w-4 h-4" /> {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-[var(--border)] flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-xl">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={logout} className="rounded-xl"><LogOut className="h-4 w-4" /></Button>
      </div>
    </aside>
  );
}