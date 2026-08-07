// setup.js
const fs = require('fs');
const path = require('path');

function w(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content);
  console.log('✅', filePath);
}

// ==================== .gitignore ====================
w('.gitignore', `node_modules/
.next/
.env
`);

// ==================== .env ====================
w('.env', `DATABASE_URL="postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/iconelectro?sslmode=require"
NEXTAUTH_SECRET="super-secret-key-change-in-production"
WHATSAPP_TOKEN="EAAWaI7X1Y6oBSD0eEz3AIVN2AMZCfa493pwZAEoOwIYYyDN9IOPPPAaAzSRjmJdpYKE4k0ZAMLXppyRYZC9qKjoYHbNvEMa18LZCYkQNZCYHEHUrXwB9Gm3GfmAvEUGLkWt77aYlZBLZCXVqzsvZAWh8IwZCR61Q4XRWWWsghoQf8tR85G3a9yh6UI1qZC5oWg195hdzEPpZBo3bJzQZBY9JpR0XuyoQq8xUqVZB4brZCzk0EnqZAAJ9CYA4CSSQcHPvwyjJ6YjpZAh23UCbyZBAP2K62KEM1s7Guf"
WHATSAPP_PHONE_ID="1276074285586271"
VERIFY_TOKEN="my_custom_verify_token"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"`);

// ==================== package.json ====================
w('package.json', `{
  "name": "iconelectro-solar",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate",
    "db:push": "prisma db push",
    "db:seed": "node prisma/seed.js",
    "setup": "prisma db push && node prisma/seed.js"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@prisma/client": "^5.7.0",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@tanstack/react-query": "^5.12.2",
    "axios": "^1.6.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "framer-motion": "^10.16.16",
    "jose": "^5.2.0",
    "lucide-react": "^0.294.0",
    "next": "14.0.4",
    "next-themes": "^0.2.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.2",
    "react-hot-toast": "^2.4.1",
    "tailwind-merge": "^2.1.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "postcss": "^8",
    "prisma": "^5.7.0",
    "tailwindcss": "^3.3.5",
    "typescript": "^5"
  }
}`);

// ==================== next.config.js ====================
w('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['public.blob.vercel-storage.com', 'localhost'],
  },
};
module.exports = nextConfig;`);

// ==================== tailwind.config.ts ====================
w('tailwind.config.ts', `import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        solar: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12', 950: '#431407',
        },
        surface: { light: '#fafafa', dark: '#09090b' },
        card: { light: '#ffffff', dark: '#18181b' },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(249,115,22,0.4)',
        'glow-lg': '0 0 80px -20px rgba(249,115,22,0.5)',
      }
    }
  },
  plugins: [],
}
export default config`);

// ==================== postcss.config.js ====================
w('postcss.config.js', `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };`);

// ==================== tsconfig.json ====================
w('tsconfig.json', `{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`);

// ==================== Prisma schema ====================
w('prisma/schema.prisma', `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Menu {
  id                 String   @id @default(cuid())
  menuId             String   @unique
  parentMenuId       String?
  triggerText        String   @default("")
  isMain             Boolean  @default(false)
  displayText        String
  buttons            String[] @default([])
  nextAction         String   @default("show_menu")
  dynamicCalcEnabled Boolean  @default(false)
  dynamicCalcFormula String   @default("")
  order              Int      @default(0)
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model Pricing {
  id          String @id @default(cuid())
  capacity    String @unique
  price       Int
  subsidyInfo String @default("")
}

model Setting {
  key   String @id
  value Json
}

model User {
  waId          String   @id
  name          String?
  phone         String?
  address       String?
  currentMenuId String   @default("main")
  currentStep   String?
  leadStatus    String   @default("new")
  tempData      Json?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Lead {
  id        String   @id @default(cuid())
  waId      String
  name      String?
  phone     String?
  address   String?
  leadType  String?
  status    String   @default("new")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`);

// ==================== prisma/seed.js ====================
w('prisma/seed.js', `const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.menu.createMany({
    data: [
      { menuId:'main', isMain:true, displayText:'👋 iconelectro সোলার এনার্জিতে আপনাকে স্বাগতম!\\n\\nআপনাকে কীভাবে সাহায্য করতে পারি?\\n\\n1️⃣ সোলার প্যানেল সম্পর্কে জানুন\\n2️⃣ মূল্য তালিকা দেখুন\\n3️⃣ আপনার সম্ভাব্য বিদ্যুৎ সাশ্রয় হিসাব করুন\\n4️⃣ বিনামূল্যে সাইট ভিজিট বুক করুন\\n5️⃣ বিশেষজ্ঞের সঙ্গে কথা বলুন\\n6️⃣ আমাদের সম্পর্কে জানুন', buttons:['1','2','3','4','5','6'], nextAction:'show_menu', order:0 },
      { menuId:'solar_info', parentMenuId:'main', triggerText:'1', displayText:'☀️ সোলার প্যানেল সম্পর্কে\\n\\nসোলার প্যানেল ব্যবহারের প্রধান সুবিধাসমূহ\\n\\n✅ বিদ্যুৎ বিল উল্লেখযোগ্যভাবে কমে যায়\\n✅ ২৫ বছরেরও বেশি কার্যক্ষমতা\\n✅ পরিবেশবান্ধব প্রযুক্তি\\n✅ কম রক্ষণাবেক্ষণ খরচ\\n\\n━━━━━━━━━━━━━━\\n\\n1️⃣ সোলারের ধরন\\n2️⃣ সোলার কীভাবে কাজ করে\\n3️⃣ মূল মেনুতে ফিরে যান', buttons:['1','2','3'], nextAction:'await_input', order:1 },
      { menuId:'solar_types', parentMenuId:'solar_info', triggerText:'1', displayText:'🔆 সোলার প্যানেলের ধরন\\n\\n১. মনোক্রিস্টালাইন\\n২. পলিক্রিস্টালাইন\\n৩. থিন-ফিল্ম\\n\\nআমরা মনোক্রিস্টালাইন প্যানেল ব্যবহার করি যা সবচেয়ে কার্যকরী।\\n\\n0️⃣ পূর্বের মেনু', buttons:['0'], nextAction:'await_input', order:2 },
      { menuId:'solar_how', parentMenuId:'solar_info', triggerText:'2', displayText:'⚙️ সোলার কীভাবে কাজ করে\\n\\n☀️ সূর্যের আলো → প্যানেল\\n⚡ ডিসি বিদ্যুৎ → ইনভার্টার\\n🔌 এসি বিদ্যুৎ → আপনার বাড়ি\\n\\nঅতিরিক্ত বিদ্যুৎ গ্রিডে জমা হয়!\\n\\n0️⃣ পূর্বের মেনু', buttons:['0'], nextAction:'await_input', order:3 },
      { menuId:'pricing', parentMenuId:'main', triggerText:'2', displayText:'💰 আনুমানিক মূল্য তালিকা\\n\\n🔹 1 kW — ₹70,000 থেকে\\n🔹 2 kW — ₹1,40,000 থেকে\\n🔹 3 kW — ₹2,20,000 থেকে\\n🔹 5 kW — ₹3,20,000 থেকে\\n\\n━━━━━━━━━━━━━━\\n\\n1️⃣ নির্দিষ্ট কোটেশন নিন\\n2️⃣ সরকারি ভর্তুকি সম্পর্কে জানুন\\n0️⃣ মূল মেনুতে ফিরে যান', buttons:['1','2','0'], nextAction:'await_input', order:4 },
      { menuId:'quote', parentMenuId:'pricing', triggerText:'1', displayText:'📋 নির্দিষ্ট কোটেশন পেতে নিচের তথ্য দিন:\\n\\nআপনার নাম:\\nমোবাইল নম্বর:\\nঠিকানা:', nextAction:'save_lead_step1', order:5 },
      { menuId:'subsidy', parentMenuId:'pricing', triggerText:'2', displayText:'🏛️ সরকারি ভর্তুকি তথ্য\\n\\nআবাসিক ৩ কিলোয়াট পর্যন্ত সিস্টেমে ৪০% কেন্দ্রীয় ভর্তুকি পাওয়া যায়।\\n\\nআমরা বিনামূল্যে সব ডকুমেন্টেশনে সাহায্য করি।\\n\\n0️⃣ পূর্বের মেনু', buttons:['0'], nextAction:'await_input', order:6 },
      { menuId:'calculator', parentMenuId:'main', triggerText:'3', displayText:'📊 বিদ্যুৎ সাশ্রয় ক্যালকুলেটর\\n\\nঅনুগ্রহ করে আপনার মাসিক বিদ্যুৎ বিলের পরিমাণ (₹) লিখুন।\\n\\nউদাহরণ: 4000', nextAction:'collect_bill', order:7 },
      { menuId:'calc_result', parentMenuId:'calculator', triggerText:'', displayText:'📊 আপনার হিসাব\\n\\nমাসিক বিদ্যুৎ বিল\\n₹{{bill}}\\n\\n━━━━━━━━━━━━━━\\n\\nসম্ভাব্য মাসিক সাশ্রয়\\n₹{{saving}}\\n\\n━━━━━━━━━━━━━━\\n\\nসম্ভাব্য বার্ষিক সাশ্রয়\\n₹{{yearly}}\\n\\n━━━━━━━━━━━━━━\\n\\n1️⃣ বিস্তারিত প্রস্তাব নিন\\n2️⃣ বিনামূল্যে সাইট ভিজিট বুক করুন\\n0️⃣ মূল মেনুতে ফিরে যান', buttons:['1','2','0'], nextAction:'await_input', order:8 },
      { menuId:'booking', parentMenuId:'main', triggerText:'4', displayText:'📅 বিনামূল্যে সাইট ভিজিট বুকিং\\n\\nঅনুগ্রহ করে নিচের তথ্যগুলো পাঠান।\\n\\n👤 আপনার নাম', nextAction:'save_lead_step1', order:9 },
      { menuId:'thanks', parentMenuId:null, triggerText:'', displayText:'✅ ধন্যবাদ!\\n\\nআপনার তথ্য সফলভাবে গ্রহণ করা হয়েছে।\\n\\nআমাদের প্রতিনিধি খুব শীঘ্রই আপনার সঙ্গে যোগাযোগ করবেন।\\n\\nআপনার মূল্যবান সময়ের জন্য ধন্যবাদ।', buttons:[], nextAction:'show_menu', order:99 }
    ],
    skipDuplicates: true,
  });
  await prisma.pricing.createMany({
    data: [
      { capacity:'1 kW', price:70000 },
      { capacity:'2 kW', price:140000 },
      { capacity:'3 kW', price:220000 },
      { capacity:'5 kW', price:320000 }
    ],
    skipDuplicates: true,
  });
  await prisma.setting.createMany({
    data: [
      { key:'calculator_saving_percent', value:80 },
      { key:'company_name', value:'iconelectro' },
      { key:'welcome_message', value:'👋 iconelectro সোলার এনার্জিতে আপনাকে স্বাগতম!' },
      { key:'invalid_option', value:'❌ দুঃখিত!\\n\\nআপনার দেওয়া অপশনটি সঠিক নয়।\\n\\nঅনুগ্রহ করে নিচের তালিকা থেকে একটি সঠিক অপশন নির্বাচন করুন।' },
      { key:'logo_url', value:'/logo.svg' }
    ],
    skipDuplicates: true,
  });
  console.log('Seed completed');
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());`);

// ==================== LIB FILES (UPDATED) ====================
w('lib/utils.ts', `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }`);

w('lib/prisma.ts', `import { PrismaClient } from '@prisma/client'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma`);

// ✅ Updated auth with jose
w('lib/auth.ts', `import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret'
);

export async function signToken(payload: object) {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { username: string };
  } catch {
    return null;
  }
}`);

w('lib/whatsapp.ts', `import axios from 'axios';
import { prisma } from '@/lib/prisma';

const WHATSAPP_API = 'https://graph.facebook.com/v18.0';
const PHONE_ID = process.env.WHATSAPP_PHONE_ID!;
const TOKEN = process.env.WHATSAPP_TOKEN!;

export async function sendWhatsAppMessage(to: string, text: string) {
  if (!PHONE_ID || !TOKEN) return console.warn('WhatsApp credentials missing');
  try {
    await axios.post(\`\${WHATSAPP_API}/\${PHONE_ID}/messages\`, {
      messaging_product:'whatsapp', to, type:'text', text:{body:text}
    }, { headers:{Authorization:\`Bearer \${TOKEN}\`} });
  } catch(err: any) {
    console.error('WhatsApp send error:', err.response?.data || err.message);
  }
}

export async function sendMainMenu(from: string, user: any) {
  const main = await prisma.menu.findFirst({ where: { isMain: true } });
  if (main) {
    await prisma.user.update({ where:{ waId:from }, data:{ currentMenuId:main.menuId, currentStep:null } });
    await sendMenuMessage(from, main);
  } else {
    await sendWhatsAppMessage(from, 'স্বাগতম!');
  }
}

export async function sendMenuMessage(to: string, menu: any) {
  await sendWhatsAppMessage(to, menu.displayText);
}`);

// ==================== GLOBAL STYLES ====================
w('app/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #fafafa;
  --bg-secondary: #f5f5f5;
  --text: #18181b;
  --text-secondary: #52525b;
  --surface: #ffffff;
  --border: #e4e4e7;
  --ring: #f97316;
  --accent: #f97316;
  --accent-hover: #ea580c;
  --glass-bg: rgba(255,255,255,0.72);
  --glass-border: rgba(0,0,0,0.06);
}

.dark {
  --bg: #09090b;
  --bg-secondary: #121212;
  --text: #fafafa;
  --text-secondary: #a1a1aa;
  --surface: #18181b;
  --border: #27272a;
  --ring: #fb923c;
  --accent: #fb923c;
  --accent-hover: #fdba74;
  --glass-bg: rgba(24,24,27,0.75);
  --glass-border: rgba(255,255,255,0.06);
}

body {
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.4s ease, color 0.4s ease;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}

.gradient-text {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-premium {
  transition: all 0.35s ease;
  border: 1px solid var(--border);
}
.card-premium:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.08);
  border-color: var(--ring);
}
.dark .card-premium:hover {
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
  border-color: rgba(251,146,60,0.4);
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--ring); border-radius: 2px; }
`);

// ==================== COMPONENTS ====================
w('components/Providers.tsx', `'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ style: { borderRadius:'8px', background:'#333', color:'#fff' } }} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}`);

w('context/AuthContext.tsx', `'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (stored) setToken(stored);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('admin_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    router.push('/login');
  };

  useEffect(() => {
    if (pathname !== '/login' && !token) {
      router.push('/login');
    }
  }, [token, pathname, router]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);`);

w('components/layout/Sidebar.tsx', `'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Menu, DollarSign, Users, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href:'/', label:'Dashboard', icon:LayoutDashboard },
  { href:'/menus', label:'Menu Builder', icon:Menu },
  { href:'/pricing', label:'Pricing', icon:DollarSign },
  { href:'/leads', label:'Leads', icon:Users },
  { href:'/settings', label:'Settings', icon:Settings },
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
}`);

// ==================== UI COMPONENTS ====================
const ui = (name, content) => w(`components/ui/${name}.tsx`, content);
ui('button', `import * as React from "react"; import { Slot } from "@radix-ui/react-slot"; import { cva, type VariantProps } from "class-variance-authority"; import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-solar-500 text-white shadow hover:bg-solar-600",destructive:"bg-red-500 text-white shadow-sm hover:bg-red-600",outline:"border border-gray-300 dark:border-gray-700 bg-transparent shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800",secondary:"bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700",ghost:"hover:bg-gray-100 dark:hover:bg-gray-800",link:"text-solar-500 underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => { const Comp = asChild ? Slot : "button"; return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />; });
Button.displayName = "Button"; export { Button, buttonVariants };`);

ui('input', `import * as React from "react"; import { cn } from "@/lib/utils"; export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}; const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => <input type={type} className={cn("flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-solar-500 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />); Input.displayName = "Input"; export { Input };`);

ui('textarea', `import * as React from "react"; import { cn } from "@/lib/utils"; export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}; const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => <textarea className={cn("flex min-h-[60px] w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-solar-500 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />); Textarea.displayName = "Textarea"; export { Textarea };`);

ui('select', `"use client";
import * as React from "react"; import * as SelectPrimitive from "@radix-ui/react-select"; import { Check, ChevronDown } from "lucide-react"; import { cn } from "@/lib/utils";
const Select = SelectPrimitive.Root; const SelectGroup = SelectPrimitive.Group; const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} className={cn("flex h-9 w-full items-center justify-between rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-solar-500 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}>
    {children} <ChevronDown className="h-4 w-4 opacity-50" />
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectContent = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref} className={cn("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className)} position={position} {...props}>
      <SelectPrimitive.Viewport className={cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}>
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center"><SelectPrimitive.ItemIndicator><Check className="h-4 w-4" /></SelectPrimitive.ItemIndicator></span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem };`);

ui('checkbox', `"use client"; import * as React from "react"; import * as CheckboxPrimitive from "@radix-ui/react-checkbox"; import { Check } from "lucide-react"; import { cn } from "@/lib/utils";
const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn("peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 dark:border-gray-700 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-solar-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-solar-500 data-[state=checked]:text-white", className)} {...props}>
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current"><Check className="h-4 w-4" /></CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)); Checkbox.displayName = CheckboxPrimitive.Root.displayName; export { Checkbox };`);

ui('label', `"use client"; import * as React from "react"; import * as LabelPrimitive from "@radix-ui/react-label"; import { cva, type VariantProps } from "class-variance-authority"; import { cn } from "@/lib/utils";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
)); Label.displayName = LabelPrimitive.Root.displayName; export { Label };`);

ui('card', `import * as React from "react"; import { cn } from "@/lib/utils";
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow", className)} {...props} />); Card.displayName = "Card";
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />); CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />); CardTitle.displayName = "CardTitle";
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />); CardContent.displayName = "CardContent";
export { Card, CardHeader, CardTitle, CardContent };`);

ui('table', `import * as React from "react"; import { cn } from "@/lib/utils";
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => <div className="relative w-full overflow-auto"><table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} /></div>); Table.displayName = "Table";
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />); TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />); TableBody.displayName = "TableBody";
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => <tr ref={ref} className={cn("border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50", className)} {...props} />); TableRow.displayName = "TableRow";
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => <th ref={ref} className={cn("h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400", className)} {...props} />); TableHead.displayName = "TableHead";
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => <td ref={ref} className={cn("p-2 align-middle", className)} {...props} />); TableCell.displayName = "TableCell";
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };`);

ui('badge', `import * as React from "react"; import { cva, type VariantProps } from "class-variance-authority"; import { cn } from "@/lib/utils";
const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
  variants: {
    variant: {
      default: "border-transparent bg-solar-500 text-white",
      secondary: "border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
      destructive: "border-transparent bg-red-500 text-white",
      outline: "text-gray-700 dark:text-gray-300",
      success: "border-transparent bg-green-500 text-white",
      warning: "border-transparent bg-yellow-500 text-black",
    }
  },
  defaultVariants: { variant: "default" }
});
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) { return <div className={cn(badgeVariants({ variant }), className)} {...props} />; }
export { Badge, badgeVariants };`);

// ==================== AUTH PAGE ====================
w('app/login/page.tsx', `'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      login(data.token);
      toast.success('Logged in successfully');
      router.push('/');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">SolarBot Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}`);

// ==================== ADMIN PAGES ====================
w('app/page.tsx', `'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

const fetchStats = async () => {
  const res = await axios.get('/api/admin/stats', {
    headers: { Authorization: \`Bearer \${localStorage.getItem('admin_token')}\` }
  });
  return res.data;
};

export default function Dashboard() {
  const { data } = useQuery({ queryKey: ['stats'], queryFn: fetchStats, refetchInterval: 10000 });
  const stats = data || { totalUsers:0, todayLeads:0, activeConversations:0 };
  const items = [
    { title:'Total Users', value:stats.totalUsers, icon:'👥', gradient:'from-blue-500 to-cyan-500' },
    { title:"Today's Leads", value:stats.todayLeads, icon:'📈', gradient:'from-green-500 to-emerald-500' },
    { title:'Active Chats', value:stats.activeConversations, icon:'💬', gradient:'from-purple-500 to-pink-500' },
  ];
  return (
    <div>
      <motion.h2 initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="text-3xl font-bold mb-8">📊 Dashboard</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}>
            <Card className="relative overflow-hidden">
              <div className={\`absolute top-0 left-0 h-1 w-full bg-gradient-to-r \${item.gradient}\`} />
              <CardHeader><CardTitle className="text-lg">{item.title}</CardTitle></CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{item.value}</div>
                <span className="text-6xl absolute right-4 bottom-2 opacity-10 dark:opacity-20">{item.icon}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );s
}`);

w('app/menus/page.tsx', `'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Edit, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';

const fetchMenus = async () => {
  const res = await axios.get('/api/admin/menus', {
    headers: { Authorization: \`Bearer \${localStorage.getItem('admin_token')}\` }
  });
  return res.data;
};

function SortableItem({ menu, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow mb-2 border border-gray-200 dark:border-gray-700">
      <button className="cursor-grab touch-none" {...attributes} {...listeners}><GripVertical className="h-5 w-5 text-gray-400" /></button>
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{menu.menuId}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{menu.displayText.slice(0,60)}</p>
      </div>
      <div className="flex gap-2">
        <Link href={\`/menus/\${menu.id}\`}><Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button></Link>
        <Button size="sm" variant="destructive" onClick={() => onDelete(menu.id)}><Trash className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

export default function MenusPage() {
  const queryClient = useQueryClient();
  const { data: menus = [], isLoading } = useQuery({ queryKey: ['menus'], queryFn: fetchMenus });
  const [items, setItems] = useState(menus);
  useEffect(() => setItems(menus), [menus]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(\`/api/admin/menus/\${id}\`, {
      headers: { Authorization: \`Bearer \${localStorage.getItem('admin_token')}\` }
    }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['menus'] }); toast.success('Deleted'); }
  });

  const reorderMutation = useMutation({
    mutationFn: async (orderedIds: string[]) => {
      await axios.put('/api/admin/menus/reorder', { orderedIds }, {
        headers: { Authorization: \`Bearer \${localStorage.getItem('admin_token')}\` }
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['menus'] })
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((i: any) => i.id === active.id);
      const newIndex = items.findIndex((i: any) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      reorderMutation.mutate(newItems.map((i: any) => i.id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🔀 Menu Builder</h2>
        <Link href="/menus/new"><Button><Plus className="w-4 h-4 mr-2" /> Add Menu</Button></Link>
      </div>
      {isLoading ? <p>Loading...</p> : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
            {items.map((menu: any) => <SortableItem key={menu.id} menu={menu} onDelete={(id: string) => deleteMutation.mutate(id)} />)}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}`);

w('app/menus/[id]/page.tsx', `'use client';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-hot-toast';
import { Trash, Plus } from 'lucide-react';
import { useEffect } from 'react';

interface MenuFormData {
  menuId: string; parentMenuId: string; triggerText: string; isMain: boolean;
  displayText: string; buttons: { value: string }[]; nextAction: string;
  dynamicCalcEnabled: boolean; dynamicCalcFormula: string; order: number;
}

const fetchMenu = async (id: string) => {
  if (id === 'new') return null;
  const res = await axios.get(\`/api/admin/menus/\${id}\`, {
    headers: { Authorization: \`Bearer \${localStorage.getItem('admin_token')}\` }
  });
  return res.data;
};

export default function MenuFormPage() {
  const params = useParams(); const id = params.id as string;
  const router = useRouter(); const queryClient = useQueryClient();
  const isNew = id === 'new';

  const { data: menu, isLoading } = useQuery({ queryKey: ['menu', id], queryFn: () => fetchMenu(id), enabled: !isNew });

  const { register, control, handleSubmit, setValue, watch, reset } = useForm<MenuFormData>({
    defaultValues: { menuId:'', parentMenuId:'', triggerText:'', isMain:false, displayText:'', buttons:[{value:''}], nextAction:'show_menu', dynamicCalcEnabled:false, dynamicCalcFormula:'bill * 0.8', order:0 }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'buttons' });

  useEffect(() => {
    if (menu) {
      reset({
        menuId: menu.menuId, parentMenuId: menu.parentMenuId || '', triggerText: menu.triggerText || '',
        isMain: menu.isMain, displayText: menu.displayText,
        buttons: menu.buttons.map((b: string) => ({ value: b })),
        nextAction: menu.nextAction,
        dynamicCalcEnabled: menu.dynamicCalcEnabled || false,
        dynamicCalcFormula: menu.dynamicCalcFormula || '',
        order: menu.order
      });
    }
  }, [menu, reset]);

  const mutation = useMutation({
    mutationFn: (data: MenuFormData) => {
      const payload = {
        ...data,
        buttons: data.buttons.map(b => b.value).filter(Boolean),
      };
      const token = localStorage.getItem('admin_token');
      if (isNew) return axios.post('/api/admin/menus', payload, { headers: { Authorization: \`Bearer \${token}\` } });
      return axios.put(\`/api/admin/menus/\${id}\`, payload, { headers: { Authorization: \`Bearer \${token}\` } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      toast.success(isNew ? 'Menu created' : 'Menu updated');
      router.push('/menus');
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Error saving'),
  });

  const onSubmit = (data: MenuFormData) => mutation.mutate(data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{isNew ? 'Create Menu' : 'Edit Menu'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Menu ID (unique)</Label><Input {...register('menuId',{required:true})} placeholder="main, pricing" /></div>
          <div><Label>Parent Menu ID</Label><Input {...register('parentMenuId')} placeholder="Leave empty for main" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Trigger Text</Label><Input {...register('triggerText')} placeholder="1, Back" /></div>
          <div className="flex items-center space-x-2 pt-8">
            <Checkbox id="isMain" checked={watch('isMain')} onCheckedChange={(v) => setValue('isMain', !!v)} />
            <Label htmlFor="isMain">Is Main Menu?</Label>
          </div>
        </div>
        <div><Label>Display Text</Label><Textarea {...register('displayText',{required:true})} rows={6} /></div>
        <div>
          <Label>Buttons (enter each on new line in display, store as array)</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Input {...register(\`buttons.\${index}.value\`)} placeholder="Button label" />
              <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}><Trash className="w-4 h-4" /></Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => append({ value: '' })}><Plus className="w-4 h-4 mr-1" /> Add Button</Button>
        </div>
        <div>
          <Label>Next Action</Label>
          <Select onValueChange={(v) => setValue('nextAction', v)} defaultValue={watch('nextAction')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="show_menu">Show Menu</SelectItem>
              <SelectItem value="await_input">Await Input</SelectItem>
              <SelectItem value="collect_bill">Collect Bill</SelectItem>
              <SelectItem value="save_lead_step1">Save Lead Step1</SelectItem>
              <SelectItem value="save_lead_step2">Save Lead Step2</SelectItem>
              <SelectItem value="save_lead_step3">Save Lead Step3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="border p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Checkbox id="calc" checked={watch('dynamicCalcEnabled')} onCheckedChange={(v) => setValue('dynamicCalcEnabled', !!v)} />
            <Label htmlFor="calc">Enable Calculation</Label>
          </div>
          {watch('dynamicCalcEnabled') && (
            <div className="mt-2"><Label>Formula</Label><Input {...register('dynamicCalcFormula')} placeholder="bill * 0.8" /></div>
          )}
        </div>
        <div><Label>Order</Label><Input type="number" {...register('order',{valueAsNumber:true})} /></div>
        <div className="flex gap-3">
          <Button type="submit" disabled={mutation.isPending}>{mutation.isPending?'Saving...':'Save'}</Button>
          <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}`);

w('app/pricing/page.tsx', `'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const authHeaders = () => ({ headers: { Authorization: \`Bearer \${localStorage.getItem('admin_token')}\` } });

export default function PricingPage() {
  const queryClient = useQueryClient();
  const { data: pricings = [], isLoading } = useQuery({
    queryKey: ['pricings'],
    queryFn: async () => (await axios.get('/api/admin/pricing', authHeaders())).data
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ capacity:'', price:'', subsidyInfo:'' });

  const createMutation = useMutation({
    mutationFn: (data: any) => axios.post('/api/admin/pricing', data, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pricings'] }); toast.success('Added'); setForm({ capacity:'', price:'', subsidyInfo:'' }); }
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => axios.put(\`/api/admin/pricing/\${id}\`, data, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pricings'] }); toast.success('Updated'); setEditingId(null); }
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(\`/api/admin/pricing/\${id}\`, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pricings'] }); toast.success('Deleted'); }
  });

  const startEdit = (item: any) => { setEditingId(item.id); setForm({ capacity:item.capacity, price:item.price.toString(), subsidyInfo:item.subsidyInfo || '' }); };
  const handleSave = () => {
    if (editingId) updateMutation.mutate({ id: editingId, data: { capacity:form.capacity, price:parseInt(form.price), subsidyInfo:form.subsidyInfo } });
    else createMutation.mutate({ capacity:form.capacity, price:parseInt(form.price), subsidyInfo:form.subsidyInfo });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">💰 Pricing Manager</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        <Input placeholder="Capacity (e.g. 1KW)" value={form.capacity} onChange={e=>setForm({...form,capacity:e.target.value})} />
        <Input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
        <Input placeholder="Subsidy Info" value={form.subsidyInfo} onChange={e=>setForm({...form,subsidyInfo:e.target.value})} />
        <Button onClick={handleSave}>{editingId ? 'Update' : 'Add'}</Button>
        {editingId && <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>}
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Capacity</TableHead><TableHead>Price (₹)</TableHead><TableHead>Subsidy</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {pricings.map((item:any) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.capacity}</TableCell>
              <TableCell>₹{item.price.toLocaleString()}</TableCell>
              <TableCell>{item.subsidyInfo}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(item)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}`);

w('app/leads/page.tsx', `'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

const authHeaders = () => ({ headers: { Authorization: \`Bearer \${localStorage.getItem('admin_token')}\` } });

export default function LeadsPage() {
  const queryClient = useQueryClient();
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => (await axios.get('/api/admin/leads', authHeaders())).data
  });
  const updateLead = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => axios.put(\`/api/admin/leads/\${id}\`, { status }, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['leads'] }); toast.success('Updated'); }
  });

  const getBadgeVariant = (status: string) => {
    if (status === 'new') return 'default';
    if (status === 'contacted') return 'warning';
    if (status === 'converted') return 'success';
    return 'secondary';
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">📋 Leads</h2>
      <Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Phone</TableHead><TableHead>Address</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {leads.map((lead: any) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.address}</TableCell>
              <TableCell>{lead.leadType}</TableCell>
              <TableCell><Badge variant={getBadgeVariant(lead.status)}>{lead.status}</Badge></TableCell>
              <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {lead.status !== 'converted' && (
                  <Button size="sm" onClick={() => updateLead.mutate({ id: lead.id, status: 'converted' })}>Mark Converted</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}`);

w('app/settings/page.tsx', `'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

const authHeaders = () => ({ headers: { Authorization: \`Bearer \${localStorage.getItem('admin_token')}\` } });

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => (await axios.get('/api/admin/settings', authHeaders())).data
  });
  const [form, setForm] = useState<Record<string, any>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (settings) setForm(settings); }, [settings]);

  const mutation = useMutation({
    mutationFn: (data: any) => axios.put('/api/admin/settings', data, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['settings'] }); toast.success('Settings saved'); }
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/admin/upload', formData, {
        headers: { Authorization: \`Bearer \${localStorage.getItem('admin_token')}\`, 'Content-Type': 'multipart/form-data' }
      });
      setForm({ ...form, logo_url: res.data.url });
      toast.success('Logo uploaded');
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); mutation.mutate(form); };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">⚙️ Settings</h2>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <Label>Company Name</Label>
          <Input value={form?.company_name || ''} onChange={e => setForm({...form, company_name: e.target.value})} />
        </div>
        <div>
          <Label>Welcome Message</Label>
          <Input value={form?.welcome_message || ''} onChange={e => setForm({...form, welcome_message: e.target.value})} />
        </div>
        <div>
          <Label>Calculator Saving Percent</Label>
          <Input type="number" value={form?.calculator_saving_percent || 80} onChange={e => setForm({...form, calculator_saving_percent: e.target.value})} />
        </div>
        <div>
          <Label>Logo URL</Label>
          <div className="flex gap-2 items-center">
            <Input value={form?.logo_url || ''} onChange={e => setForm({...form, logo_url: e.target.value})} placeholder="/logo.svg" />
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" />
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>Upload</Button>
          </div>
          {form?.logo_url && <img src={form.logo_url} alt="Logo preview" className="mt-2 h-10 rounded" />}
        </div>
        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}`);

// ==================== MIDDLEWARE ====================
w('middleware.ts', `import { NextResponse } from 'next/server';
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
};`);

// ==================== API ROUTES ====================
w('app/api/admin/auth/login/route.ts', `import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const token = signToken({ username });
  return NextResponse.json({ token });
}`);

w('app/api/admin/upload/route.ts', `import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = Date.now() + '-' + file.name.replace(/\\s/g, '-');
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  await writeFile(path.join(uploadDir, filename), buffer);
  const url = '/uploads/' + filename;
  return NextResponse.json({ url });
}`);

w('app/api/admin/stats/route.ts', `import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET() {
  const [totalUsers, todayLeads, activeConversations] = await Promise.all([
    prisma.user.count(),
    prisma.lead.count({ where:{ createdAt:{ gte: new Date(new Date().setHours(0,0,0,0)) } } }),
    prisma.user.count({ where:{ updatedAt:{ gte: new Date(Date.now() - 15*60*1000) } } })
  ]);
  return NextResponse.json({ totalUsers, todayLeads, activeConversations });
}`);

w('app/api/admin/menus/route.ts', `import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET() { const menus = await prisma.menu.findMany({ orderBy: { order: 'asc' } }); return NextResponse.json(menus); }
export async function POST(req: NextRequest) { const data = await req.json(); const menu = await prisma.menu.create({ data }); return NextResponse.json(menu, { status: 201 }); }
export async function PUT(req: NextRequest) { const { orderedIds } = await req.json(); for (let i=0; i<orderedIds.length; i++) await prisma.menu.update({ where:{ id:orderedIds[i] }, data:{ order:i } }); return NextResponse.json({ success:true }); }`);

w('app/api/admin/menus/[id]/route.ts', `import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET(req: NextRequest, { params }: { params: { id: string } }) { const menu = await prisma.menu.findUnique({ where:{ id:params.id } }); if (!menu) return NextResponse.json({ error:'Not found' }, { status:404 }); return NextResponse.json(menu); }
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) { const data = await req.json(); const menu = await prisma.menu.update({ where:{ id:params.id }, data }); return NextResponse.json(menu); }
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) { await prisma.menu.delete({ where:{ id:params.id } }); return NextResponse.json({ success:true }); }`);

w('app/api/admin/pricing/route.ts', `import { NextRequest, NextResponse } from 'next/server'; import { prisma } from '@/lib/prisma'; export async function GET() { return NextResponse.json(await prisma.pricing.findMany()); } export async function POST(req: NextRequest) { const data = await req.json(); const pricing = await prisma.pricing.create({ data }); return NextResponse.json(pricing, { status:201 }); }`);
w('app/api/admin/pricing/[id]/route.ts', `import { NextRequest, NextResponse } from 'next/server'; import { prisma } from '@/lib/prisma'; export async function PUT(req: NextRequest, { params }: { params: { id: string } }) { const data = await req.json(); const pricing = await prisma.pricing.update({ where:{ id:params.id }, data }); return NextResponse.json(pricing); } export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) { await prisma.pricing.delete({ where:{ id:params.id } }); return NextResponse.json({ success:true }); }`);

w('app/api/admin/settings/route.ts', `import { NextRequest, NextResponse } from 'next/server'; import { prisma } from '@/lib/prisma'; export async function GET() { const settings = await prisma.setting.findMany(); const map:any = {}; settings.forEach(s => map[s.key] = s.value); return NextResponse.json(map); } export async function PUT(req: NextRequest) { const updates = await req.json(); for (const [key, value] of Object.entries(updates)) { await prisma.setting.upsert({ where:{ key }, update:{ value: value as any }, create:{ key, value: value as any } }); } return NextResponse.json({ success:true }); }`);

w('app/api/admin/leads/route.ts', `import { NextRequest, NextResponse } from 'next/server'; import { prisma } from '@/lib/prisma'; export async function GET() { return NextResponse.json(await prisma.lead.findMany({ orderBy:{ createdAt:'desc' } })); }`);
w('app/api/admin/leads/[id]/route.ts', `import { NextRequest, NextResponse } from 'next/server'; import { prisma } from '@/lib/prisma'; export async function PUT(req: NextRequest, { params }: { params: { id: string } }) { const data = await req.json(); const lead = await prisma.lead.update({ where:{ id:params.id }, data }); return NextResponse.json(lead); } export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) { await prisma.lead.delete({ where:{ id:params.id } }); return NextResponse.json({ success:true }); }`);

// ==================== WHATSAPP WEBHOOK ====================
w('app/api/webhook/route.ts', `import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWhatsAppMessage, sendMainMenu, sendMenuMessage } from '@/lib/whatsapp';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('hub.mode') === 'subscribe' && searchParams.get('hub.verify_token') === process.env.VERIFY_TOKEN) {
    return new Response(searchParams.get('hub.challenge'), { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = body.entry?.[0]; const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];
    if (!message) return NextResponse.json({ ok: true });
    const from = message.from; const msgBody = message.text?.body?.trim();
    if (!msgBody) return NextResponse.json({ ok: true });

    let user = await prisma.user.findUnique({ where: { waId: from } });
    if (!user) user = await prisma.user.create({ data: { waId: from, currentMenuId: 'main' } });

    const currentMenu = await prisma.menu.findUnique({ where: { menuId: user.currentMenuId } });
    if (!currentMenu) { await sendMainMenu(from, user); return NextResponse.json({ ok: true }); }

    await handleMessage(msgBody, from, user, currentMenu);
    return NextResponse.json({ ok: true });
  } catch (err) { console.error(err); return NextResponse.json({ error: 'Internal' }, { status: 500 }); }
}

async function handleMessage(input: string, from: string, user: any, menu: any) {
const setting = await prisma.setting.findUnique({ where: { key: 'invalid_option' } });
const invalidMsg: string = (setting?.value as string) || '❌ দুঃখিত! অনুগ্রহ করে সঠিক অপশন নির্বাচন করুন।';
  switch (menu.nextAction) {
    case 'show_menu':
    case 'await_input': {
      if (input === '0') {
        if (menu.parentMenuId) {
          const parent = await prisma.menu.findUnique({ where: { menuId: menu.parentMenuId } });
          if (parent) {
            await prisma.user.update({ where: { waId: from }, data: { currentMenuId: parent.menuId, currentStep: null } });
            await sendMenuMessage(from, parent);
            return;
          }
        }
        await sendMainMenu(from, user);
        return;
      }
      const subMenu = await prisma.menu.findFirst({
        where: { parentMenuId: menu.menuId, triggerText: { equals: input, mode: 'insensitive' } }
      });
      if (subMenu) {
        await prisma.user.update({ where: { waId: from }, data: { currentMenuId: subMenu.menuId, currentStep: null } });
        await sendMenuMessage(from, subMenu);
      } else {
        await sendWhatsAppMessage(from, invalidMsg as string);s
        await sendMenuMessage(from, menu);
      }
      break;
    }
    case 'collect_bill': {
      const bill = parseFloat(input);
      if (isNaN(bill)) { await sendWhatsAppMessage(from, '❌ অনুগ্রহ করে সঠিক সংখ্যা লিখুন।'); return; }
      const setting = await prisma.setting.findUnique({ where: { key: 'calculator_saving_percent' } });
      const percent = (setting?.value as number) || 80;
      const saving = Math.round(bill * (percent / 100));
      const yearly = saving * 12;
      const resultMenu = await prisma.menu.findUnique({ where: { menuId: 'calc_result' } });
      if (resultMenu) {
        let msg = resultMenu.displayText
          .replace('{{bill}}', bill.toLocaleString('en-IN'))
          .replace('{{saving}}', saving.toLocaleString('en-IN'))
          .replace('{{yearly}}', yearly.toLocaleString('en-IN'));
        await sendWhatsAppMessage(from, msg);
        await prisma.user.update({ where: { waId: from }, data: { currentMenuId: 'calc_result', currentStep: null } });
      }
      break;
    }
    case 'save_lead_step1':
      await prisma.user.update({ where: { waId: from }, data: { tempData: { name: input }, currentStep: 'save_lead_step2' } });
      await sendWhatsAppMessage(from, '📞 অনুগ্রহ করে আপনার মোবাইল নম্বর লিখুন:');
      break;
    case 'save_lead_step2':
      await prisma.user.update({ where: { waId: from }, data: { tempData: { ...(user.tempData as any), phone: input }, currentStep: 'save_lead_step3' } });
      await sendWhatsAppMessage(from, '📍 অনুগ্রহ করে আপনার সম্পূর্ণ ঠিকানা লিখুন:');
      break;
    case 'save_lead_step3': {
      const data = { ...(user.tempData as any), address: input };
      await prisma.user.update({ where: { waId: from }, data: { name: data.name, phone: data.phone, address: data.address, tempData: {}, currentStep: null } });
      await prisma.lead.create({ data: { waId: from, name: data.name, phone: data.phone, address: data.address, leadType: 'site_visit' } });
      const thanksMenu = await prisma.menu.findUnique({ where: { menuId: 'thanks' } });
      if (thanksMenu) {
        await sendMenuMessage(from, thanksMenu);
        await prisma.user.update({ where: { waId: from }, data: { currentMenuId: 'thanks' } });
      } else {
        await sendWhatsAppMessage(from, '✅ ধন্যবাদ! আমাদের প্রতিনিধি খুব শীঘ্রই যোগাযোগ করবেন।');
      }
      break;
    }
    default: await sendMenuMessage(from, menu);
  }
}`);

// ==================== LAYOUT ====================
w('app/layout.tsx', `import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import Providers from '@/components/Providers';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata = { title: 'iconelectro – SolarBot Admin' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={\`\${inter.variable} \${spaceGrotesk.variable}\`}>
      <body className="font-sans antialiased">
        <Providers>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-[var(--bg)] p-4 md:p-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}`);

// ==================== PUBLIC FILES ====================
w('public/uploads/.gitkeep', '');
// Empty index.html – you will manually add your landing page
w('public/index.html', `<!-- Your landing page will go here -->`);

console.log('🎉 All files generated!');
console.log('');
console.log('Next steps:');
console.log('1. npm install');
console.log('2. npx prisma generate && npx prisma db push');
console.log('3. npm run db:seed');
console.log('4. npm run dev');