// setup.js — Complete Production‑Ready Generator for iconelectro Solar
// No stray characters – everything works out of the box
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

// ==================== MISSING FILE FIX ====================
w('next-env.d.ts', `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`);

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

// ==================== LIB FILES ====================
w('lib/utils.ts', `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }`);

w('lib/prisma.ts', `import { PrismaClient } from '@prisma/client'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma`);

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

// ==================== COMPONENTS (shared) ====================
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

  // Protect admin routes (client-side)
  useEffect(() => {
    if (pathname.startsWith('/admin') && !token) {
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

// ==================== ADMIN LAYOUT & PAGES ====================
w('app/admin/layout.tsx', `'use client';
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

  if (!token) return null;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[var(--bg)] p-4 md:p-6">{children}</main>
    </div>
  );
}`);

w('app/admin/page.tsx', `'use client';
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
  );
}`);

w('app/admin/menus/page.tsx', `'use client';
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
        <Link href={\`/admin/menus/\${menu.id}\`}><Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button></Link>
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
        <Link href="/admin/menus/new"><Button><Plus className="w-4 h-4 mr-2" /> Add Menu</Button></Link>
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

w('app/admin/menus/[id]/page.tsx', `'use client';
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
      router.push('/admin/menus');
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
          <Label>Buttons</Label>
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

w('app/admin/pricing/page.tsx', `'use client';
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

w('app/admin/leads/page.tsx', `'use client';
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

w('app/admin/settings/page.tsx', `'use client';
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

// ==================== AUTH PAGES ====================
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
      router.push('/admin');
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

// ==================== ROOT LAYOUT ====================
w('app/layout.tsx', `import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata = { title: 'iconelectro – Solar Energy' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={\`\${inter.variable} \${spaceGrotesk.variable}\`}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}`);

// ==================== SIDEBAR COMPONENT ====================
w('components/layout/Sidebar.tsx', `'use client';
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
}`);

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
  const token = await signToken({ username });
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
        await sendWhatsAppMessage(from, invalidMsg as string);
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

// ==================== MIDDLEWARE ====================
w('middleware.ts', `import { NextResponse } from 'next/server';
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
};`);

// ==================== CORRECTED LANDING PAGE (NO STRAY CHARACTERS) ====================
w('public/index.html', `<!DOCTYPE html>
<html lang="en" class="light" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="iconelectro – Smart Solar Energy Solutions. Residential, Commercial & Industrial. Save up to 80% on electricity bills with Tier-1 solar panels.">
    <meta name="theme-color" content="#f97316">
    <meta name="keywords" content="solar panels Kolkata, solar energy, residential solar, commercial solar, industrial solar, iconelectro, solar installation, solar pricing, solar calculator, government solar subsidy India">
    <meta property="og:title" content="iconelectro – Smart Solar Energy | Residential, Commercial & Industrial">
    <meta property="og:description" content="Power your future with smart solar solutions. Tier-1 panels, 25-year warranty. Save up to 80% on electricity bills.">
    <meta property="og:image" content="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=630&fit=crop">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://iconelectro.com">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="iconelectro – Smart Solar Energy">
    <meta name="twitter:description" content="Power your future with smart solar solutions. Tier-1 panels, 25-year warranty.">
    <meta name="twitter:image" content="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=630&fit=crop">
    <link rel="canonical" href="https://iconelectro.com">
    <title>iconelectro – Smart Solar Energy | Residential, Commercial & Industrial Solar Solutions</title>

    <!-- Tailwind CDN (only for public landing page, not Next.js) -->
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        'sans': ['Inter', 'system-ui', 'sans-serif'],
                        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
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
                        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
                        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.8' } },
                    },
                    boxShadow: {
                        'glow': '0 0 40px -10px rgba(249,115,22,0.4)',
                        'glow-lg': '0 0 80px -20px rgba(249,115,22,0.5)',
                    }
                }
            }
        }
    <\/script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"><\/script>

    <!-- AOS Animation -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"><\/script>

    <style>
        :root {
            --bg: #fafafa; --bg-secondary: #f5f5f5; --text: #18181b; --text-secondary: #52525b;
            --surface: #ffffff; --border: #e4e4e7; --ring: #f97316; --accent: #f97316; --accent-hover: #ea580c;
            --glass-bg: rgba(255,255,255,0.72); --glass-border: rgba(0,0,0,0.06);
            --drawer-bg: #ffffff; --badge-bg: rgba(249,115,22,0.1); --badge-text: #f97316;
            --banner-overlay: rgba(0,0,0,0.35); --card-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
            --card-hover-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); --input-bg: #ffffff; --footer-bg: #fafafa;
            --section-alt-bg: #f8fafc; --calc-bg: linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fff7ed 100%);
        }
        .dark {
            --bg: #09090b; --bg-secondary: #121212; --text: #fafafa; --text-secondary: #a1a1aa;
            --surface: #18181b; --border: #27272a; --ring: #fb923c; --accent: #fb923c; --accent-hover: #fdba74;
            --glass-bg: rgba(24,24,27,0.75); --glass-border: rgba(255,255,255,0.06);
            --drawer-bg: #18181b; --badge-bg: rgba(251,146,60,0.15); --badge-text: #fb923c;
            --banner-overlay: rgba(0,0,0,0.55); --card-shadow: 0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.3);
            --card-hover-shadow: 0 25px 50px -12px rgba(249,115,22,0.15); --input-bg: #1c1c1f; --footer-bg: #09090b;
            --section-alt-bg: #0a0a0e; --calc-bg: linear-gradient(135deg, #1a1008 0%, #1c1209 50%, #1a1008 100%);
        }
        * { scroll-behavior: smooth; box-sizing: border-box; }
        body {
            background-color: var(--bg); color: var(--text); transition: background-color 0.4s ease, color 0.4s ease;
            font-family: 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased; margin: 0; overflow-x: hidden; line-height: 1.6;
        }
        #calculator { background: var(--calc-bg); }
        .glass { background: var(--glass-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--glass-border); }
        .gradient-text { background: linear-gradient(135deg, #f97316 0%, #fb923c 40%, #fbbf24 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-premium { transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); border: 1px solid var(--border); background: var(--surface); box-shadow: var(--card-shadow); border-radius: 1rem; }
        .card-premium:hover { transform: translateY(-8px); box-shadow: var(--card-hover-shadow); border-color: var(--ring); }
        .drawer-overlay { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.55); opacity: 0; pointer-events: none; transition: opacity 0.4s ease; backdrop-filter: blur(2px); }
        .drawer-overlay.active { opacity: 1; pointer-events: auto; }
        .drawer {
            position: fixed; top: 0; left: 0; z-index: 110; width: 320px; max-width: 85vw; height: 100dvh;
            background: var(--drawer-bg); box-shadow: 10px 0 60px rgba(0,0,0,0.3); transform: translateX(-105%);
            transition: transform 0.45s cubic-bezier(0.22,0.61,0.36,1); display: flex; flex-direction: column; padding: 24px; overflow-y: auto; border-right: 1px solid var(--border);
        }
        .drawer.active { transform: translateX(0); }
        .drawer-nav-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 12px; font-weight: 500; font-size: 1.05rem; color: var(--text); text-decoration: none; transition: all 0.2s; cursor: pointer; }
        .drawer-nav-item:hover { background: var(--badge-bg); color: var(--accent); }
        .banner-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94); background-size: cover; background-position: center; z-index: 0; }
        .banner-slide.active { opacity: 1; z-index: 1; }
        .banner-slide::after { content: ''; position: absolute; inset: 0; background: var(--banner-overlay); z-index: 1; }
        .banner-content { position: relative; z-index: 2; }
        .banner-dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent; }
        .banner-dot.active { background: #f97316; border-color: #fff; width: 36px; border-radius: 20px; }
        #chatPanel { transform-origin: bottom right; transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease; transform: scale(0.85); opacity: 0; pointer-events: none; }
        #chatPanel.show { transform: scale(1); opacity: 1; pointer-events: auto; }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(249,115,22,0.6); } 70% { box-shadow: 0 0 0 22px rgba(249,115,22,0); } 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); } }
        .pulse-ring { animation: pulseRing 2.5s infinite; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--ring); border-radius: 10px; }
        .shimmer-border { position: relative; overflow: hidden; }
        .shimmer-border::before { content: ''; position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; border-radius: inherit; background: linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent); background-size: 200% 100%; animation: shimmer 2.5s infinite; z-index: -1; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @media (max-width: 640px) { .banner-dot { width: 8px; height: 8px; } .banner-dot.active { width: 24px; } }
    </style>
</head>
<body class="antialiased">
    <!-- Drawer overlay -->
    <div id="drawerOverlay" class="drawer-overlay" aria-hidden="true"></div>
    <!-- Drawer -->
    <aside id="drawer" class="drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">⚡</div>
                <span class="text-lg font-bold gradient-text font-display">iconelectro</span>
            </div>
            <button id="drawerCloseBtn" class="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Close menu"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <nav class="flex flex-col flex-1 space-y-1">
            <a href="#home" class="drawer-nav-item" data-nav-close><i data-lucide="home"></i> Home</a>
            <a href="#solutions" class="drawer-nav-item" data-nav-close><i data-lucide="layout-grid"></i> Solutions</a>
            <a href="#pricing" class="drawer-nav-item" data-nav-close><i data-lucide="indian-rupee"></i> Pricing</a>
            <a href="#calculator" class="drawer-nav-item" data-nav-close><i data-lucide="calculator"></i> Calculator</a>
            <a href="#why-us" class="drawer-nav-item" data-nav-close><i data-lucide="award"></i> Why Us</a>
            <a href="#testimonials" class="drawer-nav-item" data-nav-close><i data-lucide="star"></i> Reviews</a>
            <a href="#faq" class="drawer-nav-item" data-nav-close><i data-lucide="help-circle"></i> FAQ</a>
            <a href="#contact" class="drawer-nav-item" data-nav-close><i data-lucide="phone"></i> Contact</a>
        </nav>
        <div class="mt-auto pt-6 border-t" style="border-color: var(--border);">
            <button id="themeToggleDrawer" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <i data-lucide="moon" id="themeIconDrawer" class="w-5 h-5"></i> <span id="themeLabelDrawer">Dark Mode</span>
            </button>
            <a href="https://wa.me/919876543210?text=Hello%20iconelectro!%20I%20want%20to%20know%20more%20about%20solar%20panels." target="_blank" rel="noopener noreferrer"
               class="flex items-center justify-center gap-2 mt-3 w-full py-3.5 rounded-xl font-semibold text-sm bg-green-500 text-white hover:bg-green-600 transition shadow-lg shadow-green-500/20">
                <i data-lucide="message-circle" class="w-4 h-4"></i> Chat on WhatsApp
            </a>
        </div>
    </aside>

    <!-- Navbar -->
    <header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div class="glass mx-3 sm:mx-4 md:mx-6 lg:mx-8 mt-3 sm:mt-4 rounded-2xl px-4 sm:px-6 lg:px-8 transition-all duration-300">
            <div class="flex items-center justify-between h-14 md:h-16">
                <div class="flex items-center gap-3">
                    <button id="hamburgerBtn" class="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors order-first" aria-label="Open menu"><i data-lucide="menu" class="w-5 h-5"></i></button>
                    <a href="#home" class="flex items-center gap-2.5 no-underline">
                        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20">⚡</div>
                        <span class="text-xl md:text-2xl font-bold gradient-text font-display tracking-tight hidden sm:inline">iconelectro</span>
                    </a>
                </div>
                <nav class="hidden lg:flex items-center gap-1">
                    <a href="#home" class="px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition">Home</a>
                    <a href="#solutions" class="px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition">Solutions</a>
                    <a href="#pricing" class="px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition">Pricing</a>
                    <a href="#calculator" class="px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition">Calculator</a>
                    <a href="#why-us" class="px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition">Why Us</a>
                    <a href="#testimonials" class="px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition">Reviews</a>
                </nav>
                <div class="flex items-center gap-2 md:gap-3">
                    <button id="themeToggleDesktop" class="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle theme"><i data-lucide="moon" id="themeIconDesktop" class="w-[18px] h-[18px]"></i></button>
                    <a href="#contact" class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-solar-500 to-solar-600 text-white hover:from-solar-600 hover:to-solar-700 shadow-md shadow-solar-500/20 transition-all hover:shadow-lg"><i data-lucide="zap" class="w-3.5 h-3.5"></i> Get Quote</a>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Banner -->
    <section id="home" class="relative min-h-screen flex items-center overflow-hidden">
        <div id="bannerContainer" class="absolute inset-0">
            <div class="banner-slide active" style="background-image: url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&h=1080&fit=crop&auto=format&q=80');" data-index="0"></div>
            <div class="banner-slide" style="background-image: url('https://images.unsplash.com/photo-1497440001374-f1e422042e2f?w=1920&h=1080&fit=crop&auto=format&q=80');" data-index="1"></div>
            <div class="banner-slide" style="background-image: url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&h=1080&fit=crop&auto=format&q=80');" data-index="2"></div>
            <div class="banner-slide" style="background-image: url('https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=1920&h=1080&fit=crop&auto=format&q=80');" data-index="3"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-24 md:py-32">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div class="banner-content text-white" data-aos="fade-up" data-aos-duration="800">
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-6 bg-white/15 backdrop-blur-md border border-white/20 text-white">
                        <span class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span></span>
                        #1 Solar Company in Eastern India
                    </div>
                    <h1 id="bannerTitle" class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 font-display text-white drop-shadow-lg">
                        Power Your Future with <span class="text-orange-400">Smart Solar</span> Energy
                    </h1>
                    <p id="bannerSubtitle" class="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl drop-shadow-md">
                        Save up to <strong class="text-orange-300 font-semibold">80%</strong> on electricity bills with premium Tier-1 solar panels.
                    </p>
                    <div class="flex flex-wrap items-center gap-5 mb-8 text-sm text-gray-200">
                        <div class="flex items-center gap-1.5"><span class="text-yellow-400 text-base">★★★★★</span> <span class="font-semibold text-white">4.9</span> <span class="text-gray-300">(1,200+ reviews)</span></div>
                        <div class="w-px h-4 bg-white/30 hidden sm:block"></div>
                        <div class="flex items-center gap-1.5 font-medium text-gray-200"><i data-lucide="users" class="w-4 h-4 text-orange-400"></i> 5,000+ Happy Homes</div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <a href="#contact" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-solar-500 to-solar-600 hover:from-solar-600 hover:to-solar-700 shadow-xl shadow-solar-500/30 transition-all pulse-ring hover:scale-105"><i data-lucide="zap" class="w-4 h-4"></i> Get Free Quote</a>
                        <a href="#calculator" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm"><i data-lucide="calculator" class="w-4 h-4"></i> Calculate Savings</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            <button id="bannerDot0" class="banner-dot active" data-slide="0" aria-label="Slide 1"></button>
            <button id="bannerDot1" class="banner-dot" data-slide="1" aria-label="Slide 2"></button>
            <button id="bannerDot2" class="banner-dot" data-slide="2" aria-label="Slide 3"></button>
            <button id="bannerDot3" class="banner-dot" data-slide="3" aria-label="Slide 4"></button>
        </div>
        <button id="bannerPrev" class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center transition-all text-white" aria-label="Previous slide"><i data-lucide="chevron-left" class="w-5 h-5 sm:w-6 sm:h-6"></i></button>
        <button id="bannerNext" class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center transition-all text-white" aria-label="Next slide"><i data-lucide="chevron-right" class="w-5 h-5 sm:w-6 sm:h-6"></i></button>
    </section>

    <!-- Solutions Section -->
    <section id="solutions" class="py-20 md:py-28" style="background-color: var(--surface);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16" data-aos="fade-up">
                <span class="text-orange-500 font-semibold text-sm uppercase tracking-widest">Tailored For You</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 font-display">☀️ Solar Solutions for <span class="gradient-text">Every Need</span></h2>
                <p class="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg">From homes to industries, we design systems that maximize your savings.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="100">
                <div class="card-premium p-8 rounded-2xl text-center group relative overflow-hidden">
                    <div class="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                    <div class="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform"><i data-lucide="home" class="w-8 h-8 text-emerald-600 dark:text-emerald-400"></i></div>
                    <h3 class="text-2xl font-bold mb-3 font-display">Residential</h3>
                    <p class="text-zinc-500 dark:text-zinc-400 mb-4">Power your home with clean energy and reduce bills by up to 80%.</p>
                    <ul class="text-sm text-left space-y-2 text-zinc-600 dark:text-zinc-400 mb-5">
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i> 1KW - 10KW Systems</li>
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i> Government Subsidy</li>
                    </ul>
                    <a href="#contact" class="text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:underline">Get Quote →</a>
                </div>
                <div class="card-premium p-8 rounded-2xl text-center group relative overflow-hidden">
                    <div class="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-sky-400 to-blue-500"></div>
                    <div class="w-16 h-16 mx-auto mb-5 rounded-2xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center group-hover:scale-110 transition-transform"><i data-lucide="building-2" class="w-8 h-8 text-sky-600 dark:text-sky-400"></i></div>
                    <h3 class="text-2xl font-bold mb-3 font-display">Commercial</h3>
                    <p class="text-zinc-500 dark:text-zinc-400 mb-4">Boost your business's green credentials while cutting operational costs.</p>
                    <ul class="text-sm text-left space-y-2 text-zinc-600 dark:text-zinc-400 mb-5">
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-sky-500 flex-shrink-0"></i> 10KW - 100KW Systems</li>
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-sky-500 flex-shrink-0"></i> Accelerated Depreciation</li>
                    </ul>
                    <a href="#contact" class="text-sky-600 dark:text-sky-400 font-semibold text-sm hover:underline">Get Quote →</a>
                </div>
                <div class="card-premium p-8 rounded-2xl text-center group relative overflow-hidden">
                    <div class="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-amber-400 to-orange-500"></div>
                    <div class="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:scale-110 transition-transform"><i data-lucide="factory" class="w-8 h-8 text-amber-600 dark:text-amber-400"></i></div>
                    <h3 class="text-2xl font-bold mb-3 font-display">Industrial</h3>
                    <p class="text-zinc-500 dark:text-zinc-400 mb-4">Large-scale solar plants for factories and warehouses.</p>
                    <ul class="text-sm text-left space-y-2 text-zinc-600 dark:text-zinc-400 mb-5">
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-amber-500 flex-shrink-0"></i> 100KW - 1MW+ Systems</li>
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-amber-500 flex-shrink-0"></i> Custom Engineering & EPC</li>
                    </ul>
                    <a href="#contact" class="text-amber-600 dark:text-amber-400 font-semibold text-sm hover:underline">Get Quote →</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 md:py-28" style="background-color: var(--surface);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16" data-aos="fade-up">
                <span class="text-orange-500 font-semibold text-sm uppercase tracking-widest">Transparent Pricing</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 font-display">💰 Solar System <span class="gradient-text">Pricing</span></h2>
                <p class="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg">All prices include installation, GST, and 5-year free maintenance.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="100">
                <div class="card-premium p-6 rounded-2xl text-center relative">
                    <span class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-zinc-500">1-2 BHK</span>
                    <p class="text-sm font-semibold text-zinc-500 mb-1 mt-2">1 KW System</p>
                    <p class="text-4xl font-extrabold gradient-text mb-1 font-display">₹70,000</p>
                    <p class="text-xs text-zinc-400 mb-4">Starting Price</p>
                    <ul class="text-sm text-left space-y-2 text-zinc-600 dark:text-zinc-400">
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 4 Mono-PERC Panels</li>
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 1 Inverter</li>
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 5 Yr Free Service</li>
                    </ul>
                    <a href="#contact" class="mt-5 inline-flex items-center justify-center w-full py-2.5 rounded-xl font-semibold text-sm border-2 border-orange-400 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition">Select Plan</a>
                </div>
                <div class="card-premium p-6 rounded-2xl text-center relative">
                    <span class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-zinc-500">2-3 BHK</span>
                    <p class="text-sm font-semibold text-zinc-500 mb-1 mt-2">2 KW System</p>
                    <p class="text-4xl font-extrabold gradient-text mb-1 font-display">₹1,40,000</p>
                    <p class="text-xs text-zinc-400 mb-4">Starting Price</p>
                    <ul class="text-sm text-left space-y-2 text-zinc-600 dark:text-zinc-400">
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 8 Mono-PERC Panels</li>
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 1 Inverter</li>
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 5 Yr Free Service</li>
                    </ul>
                    <a href="#contact" class="mt-5 inline-flex items-center justify-center w-full py-2.5 rounded-xl font-semibold text-sm border-2 border-orange-400 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition">Select Plan</a>
                </div>
                <div class="relative">
                    <div class="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">🔥 Most Popular</div>
                    <div class="card-premium p-6 rounded-2xl text-center relative border-2 border-orange-400 shadow-glow">
                        <span class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600">3-4 BHK</span>
                        <p class="text-sm font-semibold text-zinc-500 mb-1 mt-2">3 KW System</p>
                        <p class="text-4xl font-extrabold gradient-text mb-1 font-display">₹2,20,000</p>
                        <p class="text-xs text-zinc-400 mb-4">Starting Price</p>
                        <ul class="text-sm text-left space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 12 Mono-PERC Panels</li>
                            <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 1 Inverter</li>
                            <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 5 Yr Free Service</li>
                        </ul>
                        <a href="#contact" class="mt-5 inline-flex items-center justify-center w-full py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-solar-500 to-solar-600 text-white hover:from-solar-600 hover:to-solar-700 shadow-md transition">Get Started</a>
                    </div>
                </div>
                <div class="card-premium p-6 rounded-2xl text-center relative">
                    <span class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-zinc-500">Villa/Office</span>
                    <p class="text-sm font-semibold text-zinc-500 mb-1 mt-2">5 KW System</p>
                    <p class="text-4xl font-extrabold gradient-text mb-1 font-display">₹3,20,000</p>
                    <p class="text-xs text-zinc-400 mb-4">Starting Price</p>
                    <ul class="text-sm text-left space-y-2 text-zinc-600 dark:text-zinc-400">
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 20 Mono-PERC Panels</li>
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 1 Inverter</li>
                        <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i> 5 Yr Free Service</li>
                    </ul>
                    <a href="#contact" class="mt-5 inline-flex items-center justify-center w-full py-2.5 rounded-xl font-semibold text-sm border-2 border-orange-400 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition">Select Plan</a>
                </div>
            </div>
            <p class="text-center mt-8 text-sm text-zinc-500 dark:text-zinc-400" data-aos="fade-up">* Govt. subsidy up to <strong class="text-orange-500">40%</strong> available for residential systems up to 3KW.</p>
        </div>
    </section>

    <!-- Calculator Section -->
    <section id="calculator" class="py-20 md:py-28">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12" data-aos="fade-up">
                <span class="text-orange-500 font-semibold text-sm uppercase tracking-widest">Plan Your Savings</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 font-display">🧮 Solar Savings <span class="gradient-text">Calculator</span></h2>
                <p class="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto text-lg">Enter your monthly electricity bill to see your potential savings.</p>
            </div>
            <div class="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border p-8 md:p-12" style="border-color: var(--border);" data-aos="fade-up">
                <div class="max-w-xl mx-auto">
                    <label class="block text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300">Your Average Monthly Electricity Bill (₹)</label>
                    <div class="flex flex-col sm:flex-row gap-3 mb-8">
                        <div class="relative flex-1">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium text-lg">₹</span>
                            <input id="billInput" type="number" placeholder="e.g. 4,000" class="w-full pl-10 pr-5 py-4 rounded-xl border-2 text-lg font-medium focus:outline-none focus:border-orange-500 transition" style="border-color: var(--border); background: var(--input-bg); color: var(--text);">
                        </div>
                        <button onclick="calculateSavings()" class="px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-solar-500 to-solar-600 hover:from-solar-600 hover:to-solar-700 shadow-lg transition flex items-center justify-center gap-2 whitespace-nowrap active:scale-95">
                            <i data-lucide="calculator" class="w-5 h-5"></i> Calculate
                        </button>
                    </div>
                    <div id="calcResult" class="grid grid-cols-1 sm:grid-cols-3 gap-4 hidden">
                        <div class="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
                            <span class="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Monthly Saving</span>
                            <div class="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1 font-display" id="monthlySaving">₹0</div>
                        </div>
                        <div class="p-5 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 text-center">
                            <span class="text-sm text-sky-600 dark:text-sky-400 font-medium">Yearly Saving</span>
                            <div class="text-3xl font-extrabold text-sky-700 dark:text-sky-300 mt-1 font-display" id="yearlySaving">₹0</div>
                        </div>
                        <div class="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-center">
                            <span class="text-sm text-amber-600 dark:text-amber-400 font-medium">25 Year Saving</span>
                            <div class="text-3xl font-extrabold text-amber-700 dark:text-amber-300 mt-1 font-display" id="lifetimeSaving">₹0</div>
                        </div>
                    </div>
                    <div id="calcCTA" class="hidden mt-6 text-center">
                        <p class="text-zinc-500 dark:text-zinc-400 text-sm mb-3">Ready to start saving?</p>
                        <a href="#contact" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-solar-500 to-solar-600 hover:from-solar-600 hover:to-solar-700 shadow-md transition"><i data-lucide="zap" class="w-4 h-4"></i> Get Your Free Quote Now</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Us Section -->
    <section id="why-us" class="py-20 md:py-28" style="background-color: var(--section-alt-bg);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16" data-aos="fade-up">
                <span class="text-orange-500 font-semibold text-sm uppercase tracking-widest">The iconelectro Advantage</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 font-display">🏆 Why Choose <span class="gradient-text">iconelectro</span>?</h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="100">
                <div class="text-center p-6">
                    <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center"><i data-lucide="shield-check" class="w-7 h-7 text-orange-500"></i></div>
                    <h4 class="font-bold text-lg mb-2">25-Year Warranty</h4>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Tier-1 panels with linear performance guarantee.</p>
                </div>
                <div class="text-center p-6">
                    <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"><i data-lucide="users" class="w-7 h-7 text-blue-500"></i></div>
                    <h4 class="font-bold text-lg mb-2">Expert Team</h4>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Certified engineers with 10+ years experience.</p>
                </div>
                <div class="text-center p-6">
                    <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><i data-lucide="wallet" class="w-7 h-7 text-green-500"></i></div>
                    <h4 class="font-bold text-lg mb-2">Best Pricing</h4>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Competitive rates with flexible EMI options.</p>
                </div>
                <div class="text-center p-6">
                    <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"><i data-lucide="headphones" class="w-7 h-7 text-purple-500"></i></div>
                    <h4 class="font-bold text-lg mb-2">24/7 Support</h4>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Dedicated support team always available.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 md:py-28" style="background-color: var(--surface);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16" data-aos="fade-up">
                <span class="text-orange-500 font-semibold text-sm uppercase tracking-widest">Customer Love</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 font-display">⭐ What Our <span class="gradient-text">Customers Say</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="100">
                <div class="card-premium p-7 rounded-2xl">
                    <div class="flex items-center gap-1 text-yellow-500 text-lg mb-3">★★★★★</div>
                    <p class="text-zinc-600 dark:text-zinc-300 italic">"Saved ₹3,200 per month! Team was professional. Highly recommended!"</p>
                    <div class="mt-6 flex items-center gap-3 pt-4 border-t" style="border-color: var(--border);">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center font-bold text-white text-sm">AM</div>
                        <div><p class="font-semibold text-sm">Arjun Mehta</p><p class="text-xs text-zinc-400">Salt Lake, Kolkata</p></div>
                    </div>
                </div>
                <div class="card-premium p-7 rounded-2xl">
                    <div class="flex items-center gap-1 text-yellow-500 text-lg mb-3">★★★★★</div>
                    <p class="text-zinc-600 dark:text-zinc-300 italic">"From subsidy to installation, everything handled perfectly."</p>
                    <div class="mt-6 flex items-center gap-3 pt-4 border-t" style="border-color: var(--border);">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center font-bold text-white text-sm">SP</div>
                        <div><p class="font-semibold text-sm">Sneha Patel</p><p class="text-xs text-zinc-400">New Town, Kolkata</p></div>
                    </div>
                </div>
                <div class="card-premium p-7 rounded-2xl">
                    <div class="flex items-center gap-1 text-yellow-500 text-lg mb-3">★★★★★</div>
                    <p class="text-zinc-600 dark:text-zinc-300 italic">"Best solar company in Kolkata! After-sales support is unmatched."</p>
                    <div class="mt-6 flex items-center gap-3 pt-4 border-t" style="border-color: var(--border);">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center font-bold text-white text-sm">RD</div>
                        <div><p class="font-semibold text-sm">Rahul Dey</p><p class="text-xs text-zinc-400">Howrah</p></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 md:py-28" style="background-color: var(--section-alt-bg);">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 font-display">❓ Frequently Asked <span class="gradient-text">Questions</span></h2>
            </div>
            <div class="space-y-3" data-aos="fade-up" data-aos-delay="100">
                <details class="card-premium rounded-2xl p-5 cursor-pointer transition group">
                    <summary class="font-semibold text-lg flex items-center justify-between list-none">What is the lifespan of a solar panel? <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-300 group-open:rotate-180 text-orange-500 flex-shrink-0 ml-2"></i></summary>
                    <p class="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1">Our Tier-1 Mono-PERC panels come with a <strong>25-year linear performance warranty</strong> and can last 30+ years.</p>
                </details>
                <details class="card-premium rounded-2xl p-5 cursor-pointer transition group">
                    <summary class="font-semibold text-lg flex items-center justify-between list-none">How much government subsidy can I get? <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-300 group-open:rotate-180 text-orange-500 flex-shrink-0 ml-2"></i></summary>
                    <p class="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1">Up to <strong>40% central subsidy</strong> for residential systems up to 3KW. We handle all paperwork.</p>
                </details>
                <details class="card-premium rounded-2xl p-5 cursor-pointer transition group">
                    <summary class="font-semibold text-lg flex items-center justify-between list-none">Does solar work on cloudy days? <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-300 group-open:rotate-180 text-orange-500 flex-shrink-0 ml-2"></i></summary>
                    <p class="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1">Yes! Modern panels capture diffused sunlight. With net-metering, you always have power.</p>
                </details>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 md:py-28" style="background-color: var(--surface);">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div data-aos="fade-up">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 font-display">📞 Get In <span class="gradient-text">Touch</span></h2>
                <p class="text-zinc-500 dark:text-zinc-400 mb-12 max-w-xl mx-auto text-lg">Ready to go solar? Contact us today for a <strong class="text-orange-500">free consultation</strong>.</p>
            </div>
            <div class="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="100">
                <a href="https://wa.me/919876543210?text=Hello%20iconelectro!%20I%20want%20a%20free%20consultation." target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-semibold text-lg text-white bg-green-500 hover:bg-green-600 shadow-xl transition transform hover:scale-105 active:scale-95">
                    <i data-lucide="message-circle" class="w-6 h-6"></i> Chat on WhatsApp
                </a>
                <a href="tel:+919876543210" class="inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-semibold text-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition transform hover:scale-105 active:scale-95" style="border-color: var(--ring); color: var(--text);">
                    <i data-lucide="phone-call" class="w-6 h-6 text-orange-500"></i> Call Now
                </a>
                <a href="mailto:hello@iconelectro.com" class="inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-semibold text-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition transform hover:scale-105 active:scale-95" style="border-color: var(--ring); color: var(--text);">
                    <i data-lucide="mail" class="w-6 h-6 text-orange-500"></i> Email Us
                </a>
            </div>
            <p class="mt-10 text-zinc-500 dark:text-zinc-400 text-sm" data-aos="fade-up" data-aos-delay="200"><strong class="text-orange-500 font-semibold">iconelectro</strong> – 123 Solar Avenue, Kolkata</p>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t" style="background: var(--footer-bg); border-color: var(--border);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">⚡</div>
                    <span class="text-xl font-bold gradient-text font-display">iconelectro</span>
                </div>
                <p class="text-sm text-zinc-500 dark:text-zinc-400 text-center">© <span id="currentYear">2025</span> iconelectro. All rights reserved. | Made with ❤️ in Kolkata</p>
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp Widget -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div id="chatPanel" class="w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border p-5" style="border-color: var(--border);">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">⚡</div>
                    <div><h4 class="font-bold text-sm font-display">iconelectro</h4><p class="text-xs text-green-500">Online</p></div>
                </div>
                <button onclick="closeChatPanel()" class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Close chat"><i data-lucide="x" class="w-4 h-4"></i></button>
            </div>
            <div class="bg-gray-50 dark:bg-zinc-800 rounded-xl p-3 mb-3 text-sm text-zinc-600 dark:text-zinc-300">
                👋 Welcome to <strong>iconelectro</strong>! How can we help you today?
            </div>
            <div class="space-y-2">
                <button onclick="handleChatOption('solar_info')" class="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-sm font-medium">☀️ Know About Solar Panels</button>
                <button onclick="handleChatOption('pricing')" class="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-sm font-medium">💰 Get Pricing Details</button>
                <button onclick="handleChatOption('calculator')" class="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-sm font-medium">📈 Calculate Savings</button>
                <button onclick="handleChatOption('booking')" class="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-sm font-medium">📅 Book Free Site Visit</button>
            </div>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" class="mt-4 flex items-center justify-center gap-2 bg-green-500 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-green-600 transition w-full shadow-lg"><i data-lucide="message-circle" class="w-4 h-4"></i> Chat on WhatsApp</a>
        </div>
        <button id="chatToggleBtn" class="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-all pulse-ring active:scale-95" aria-label="Open chat"><i data-lucide="message-circle" class="w-7 h-7"></i></button>
    </div>

    <!-- ==================== SCRIPTS ==================== -->
    <script>
        (function() {
            lucide.createIcons();
            AOS.init({ duration: 800, once: true, offset: 60, disable: 'mobile' });

            const html = document.documentElement;
            const drawer = document.getElementById('drawer');
            const drawerOverlay = document.getElementById('drawerOverlay');
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            const drawerCloseBtn = document.getElementById('drawerCloseBtn');
            const chatToggleBtn = document.getElementById('chatToggleBtn');
            const chatPanel = document.getElementById('chatPanel');
            const billInput = document.getElementById('billInput');
            const calcResult = document.getElementById('calcResult');
            const calcCTA = document.getElementById('calcCTA');
            const monthlySavingEl = document.getElementById('monthlySaving');
            const yearlySavingEl = document.getElementById('yearlySaving');
            const lifetimeSavingEl = document.getElementById('lifetimeSaving');
            const currentYearEl = document.getElementById('currentYear');
            if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

            // Drawer
            function openDrawer() { drawer.classList.add('active'); drawerOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
            function closeDrawer() { drawer.classList.remove('active'); drawerOverlay.classList.remove('active'); document.body.style.overflow = ''; }
            hamburgerBtn.addEventListener('click', openDrawer);
            drawerCloseBtn.addEventListener('click', closeDrawer);
            drawerOverlay.addEventListener('click', closeDrawer);
            document.querySelectorAll('[data-nav-close]').forEach(link => link.addEventListener('click', () => setTimeout(closeDrawer, 150)));
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('active')) closeDrawer(); });

            // Theme toggle
            const themeIconsDesktop = document.getElementById('themeIconDesktop');
            const themeIconsDrawer = document.getElementById('themeIconDrawer');
            const themeLabelDrawer = document.getElementById('themeLabelDrawer');
            const allThemeIcons = [themeIconsDesktop, themeIconsDrawer].filter(Boolean);
            function setTheme(isDark) {
                if (isDark) {
                    html.classList.add('dark'); html.classList.remove('light'); html.setAttribute('data-theme', 'dark');
                    allThemeIcons.forEach(icon => { if (icon) icon.setAttribute('data-lucide', 'sun'); });
                    if (themeLabelDrawer) themeLabelDrawer.textContent = 'Light Mode';
                    localStorage.setItem('iconelectro-theme', 'dark');
                } else {
                    html.classList.remove('dark'); html.classList.add('light'); html.setAttribute('data-theme', 'light');
                    allThemeIcons.forEach(icon => { if (icon) icon.setAttribute('data-lucide', 'moon'); });
                    if (themeLabelDrawer) themeLabelDrawer.textContent = 'Dark Mode';
                    localStorage.setItem('iconelectro-theme', 'light');
                }
                lucide.createIcons();
            }
            const savedTheme = localStorage.getItem('iconelectro-theme');
            if (savedTheme === 'dark') setTheme(true);
            else if (savedTheme === 'light') setTheme(false);
            else setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
            document.getElementById('themeToggleDesktop')?.addEventListener('click', () => setTheme(!html.classList.contains('dark')));
            document.getElementById('themeToggleDrawer')?.addEventListener('click', () => setTheme(!html.classList.contains('dark')));

            // Chat panel
            function openChatPanel() { chatPanel.classList.add('show'); }
            function closeChatPanel() { chatPanel.classList.remove('show'); }
            chatToggleBtn.addEventListener('click', () => { chatPanel.classList.contains('show') ? closeChatPanel() : openChatPanel(); });
            document.addEventListener('click', (e) => { if (chatPanel.classList.contains('show') && !chatPanel.contains(e.target) && !chatToggleBtn.contains(e.target)) closeChatPanel(); });
            window.closeChatPanel = closeChatPanel;
            window.handleChatOption = function(option) {
                closeChatPanel();
                switch (option) {
                    case 'solar_info': document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' }); break;
                    case 'pricing': document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }); break;
                    case 'calculator': document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => billInput?.focus(), 600); break;
                    case 'booking': document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); break;
                    default: window.open('https://wa.me/919876543210', '_blank', 'noopener noreferrer');
                }
            };

            // Calculator
            window.calculateSavings = function() {
                const rawValue = billInput.value.replace(/,/g, '').trim();
                const bill = parseFloat(rawValue);
                if (!bill || bill <= 0) { billInput.style.borderColor = '#ef4444'; billInput.focus(); return; }
                if (bill > 1000000) { alert('Please enter a bill under ₹10,00,000'); return; }
                const savingPercent = 0.8;
                const monthlySaving = Math.round(bill * savingPercent);
                const yearlySaving = monthlySaving * 12;
                const lifetimeSaving = yearlySaving * 25;
                monthlySavingEl.textContent = '₹' + monthlySaving.toLocaleString('en-IN');
                yearlySavingEl.textContent = '₹' + yearlySaving.toLocaleString('en-IN');
                lifetimeSavingEl.textContent = '₹' + lifetimeSaving.toLocaleString('en-IN');
                calcResult.classList.remove('hidden'); calcCTA.classList.remove('hidden');
            };
            billInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); window.calculateSavings(); } });

            // Banner slider
            const bannerSlides = document.querySelectorAll('.banner-slide');
            const bannerDots = document.querySelectorAll('.banner-dot');
            const bannerPrev = document.getElementById('bannerPrev');
            const bannerNext = document.getElementById('bannerNext');
            let currentSlide = 0;
            const totalSlides = bannerSlides.length;
            let autoSlideInterval;
            const SLIDE_INTERVAL = 5000;
            function goToSlide(index) {
                if (index === currentSlide) return;
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;
                bannerSlides.forEach(s => s.classList.remove('active'));
                bannerDots.forEach(d => d.classList.remove('active'));
                bannerSlides[index].classList.add('active');
                bannerDots[index].classList.add('active');
                currentSlide = index;
                resetAutoSlide();
            }
            function nextSlide() { goToSlide(currentSlide + 1); }
            function prevSlide() { goToSlide(currentSlide - 1); }
            function resetAutoSlide() { clearInterval(autoSlideInterval); autoSlideInterval = setInterval(nextSlide, SLIDE_INTERVAL); }
            bannerPrev.addEventListener('click', prevSlide);
            bannerNext.addEventListener('click', nextSlide);
            bannerDots.forEach(dot => { dot.addEventListener('click', () => { goToSlide(parseInt(dot.dataset.slide)); }); });
            document.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') nextSlide(); if (e.key === 'ArrowLeft') prevSlide(); });
            autoSlideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
            document.getElementById('home').addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            document.getElementById('home').addEventListener('mouseleave', () => { autoSlideInterval = setInterval(nextSlide, SLIDE_INTERVAL); });

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#' || href === '#!') return;
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const headerHeight = 80;
                        const pos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        window.scrollTo({ top: pos, behavior: 'smooth' });
                    }
                });
            });

            console.log('%c⚡ iconelectro – Smart Solar Energy %cReady', 'color: #f97316; font-size: 1.2em; font-weight: bold;', 'color: #22c55e; font-weight: bold;');
        })();
    </script>
</body>
</html>`);

console.log('🎉 All files generated – no errors!');
console.log('');
console.log('Next steps:');
console.log('1. npm install');
console.log('2. npx prisma generate && npx prisma db push');
console.log('3. npm run db:seed');
console.log('4. npm run dev');
console.log('');
console.log('Access:');
console.log('  Public site: http://localhost:3000');
console.log('  Admin panel: http://localhost:3000/login → then /admin');
console.log('  WhatsApp webhook: POST to /api/webhook');