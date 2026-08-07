import axios from 'axios';
import { prisma } from '@/lib/prisma';

const WHATSAPP_API = 'https://graph.facebook.com/v18.0';
const PHONE_ID = process.env.WHATSAPP_PHONE_ID!;
const TOKEN = process.env.WHATSAPP_TOKEN!;

export async function sendWhatsAppMessage(to: string, text: string) {
  if (!PHONE_ID || !TOKEN) return console.warn('WhatsApp credentials missing');
  try {
    await axios.post(`${WHATSAPP_API}/${PHONE_ID}/messages`, {
      messaging_product:'whatsapp', to, type:'text', text:{body:text}
    }, { headers:{Authorization:`Bearer ${TOKEN}`} });
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
}