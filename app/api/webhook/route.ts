import { NextRequest, NextResponse } from 'next/server';
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
}