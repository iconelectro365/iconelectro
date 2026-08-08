'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Menu, DollarSign, Users, Settings, Sun, Moon, LogOut, MenuIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-[var(--surface)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">⚡</div>
          <h1 className="text-lg font-bold gradient-text font-display">SolarBot Pro</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} className="rounded-xl">
          {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 flex flex-col border-r glass transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-2 px-4 py-5">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">⚡</div>
          <h1 className="text-xl font-bold gradient-text font-display">SolarBot Pro</h1>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
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
    </>
  );
}