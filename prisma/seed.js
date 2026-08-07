const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.menu.createMany({
    data: [
      { menuId:'main', isMain:true, displayText:'👋 iconelectro সোলার এনার্জিতে আপনাকে স্বাগতম!\n\nআপনাকে কীভাবে সাহায্য করতে পারি?\n\n1️⃣ সোলার প্যানেল সম্পর্কে জানুন\n2️⃣ মূল্য তালিকা দেখুন\n3️⃣ আপনার সম্ভাব্য বিদ্যুৎ সাশ্রয় হিসাব করুন\n4️⃣ বিনামূল্যে সাইট ভিজিট বুক করুন\n5️⃣ বিশেষজ্ঞের সঙ্গে কথা বলুন\n6️⃣ আমাদের সম্পর্কে জানুন', buttons:['1','2','3','4','5','6'], nextAction:'show_menu', order:0 },
      { menuId:'solar_info', parentMenuId:'main', triggerText:'1', displayText:'☀️ সোলার প্যানেল সম্পর্কে\n\nসোলার প্যানেল ব্যবহারের প্রধান সুবিধাসমূহ\n\n✅ বিদ্যুৎ বিল উল্লেখযোগ্যভাবে কমে যায়\n✅ ২৫ বছরেরও বেশি কার্যক্ষমতা\n✅ পরিবেশবান্ধব প্রযুক্তি\n✅ কম রক্ষণাবেক্ষণ খরচ\n\n━━━━━━━━━━━━━━\n\n1️⃣ সোলারের ধরন\n2️⃣ সোলার কীভাবে কাজ করে\n3️⃣ মূল মেনুতে ফিরে যান', buttons:['1','2','3'], nextAction:'await_input', order:1 },
      { menuId:'solar_types', parentMenuId:'solar_info', triggerText:'1', displayText:'🔆 সোলার প্যানেলের ধরন\n\n১. মনোক্রিস্টালাইন\n২. পলিক্রিস্টালাইন\n৩. থিন-ফিল্ম\n\nআমরা মনোক্রিস্টালাইন প্যানেল ব্যবহার করি যা সবচেয়ে কার্যকরী।\n\n0️⃣ পূর্বের মেনু', buttons:['0'], nextAction:'await_input', order:2 },
      { menuId:'solar_how', parentMenuId:'solar_info', triggerText:'2', displayText:'⚙️ সোলার কীভাবে কাজ করে\n\n☀️ সূর্যের আলো → প্যানেল\n⚡ ডিসি বিদ্যুৎ → ইনভার্টার\n🔌 এসি বিদ্যুৎ → আপনার বাড়ি\n\nঅতিরিক্ত বিদ্যুৎ গ্রিডে জমা হয়!\n\n0️⃣ পূর্বের মেনু', buttons:['0'], nextAction:'await_input', order:3 },
      { menuId:'pricing', parentMenuId:'main', triggerText:'2', displayText:'💰 আনুমানিক মূল্য তালিকা\n\n🔹 1 kW — ₹70,000 থেকে\n🔹 2 kW — ₹1,40,000 থেকে\n🔹 3 kW — ₹2,20,000 থেকে\n🔹 5 kW — ₹3,20,000 থেকে\n\n━━━━━━━━━━━━━━\n\n1️⃣ নির্দিষ্ট কোটেশন নিন\n2️⃣ সরকারি ভর্তুকি সম্পর্কে জানুন\n0️⃣ মূল মেনুতে ফিরে যান', buttons:['1','2','0'], nextAction:'await_input', order:4 },
      { menuId:'quote', parentMenuId:'pricing', triggerText:'1', displayText:'📋 নির্দিষ্ট কোটেশন পেতে নিচের তথ্য দিন:\n\nআপনার নাম:\nমোবাইল নম্বর:\nঠিকানা:', nextAction:'save_lead_step1', order:5 },
      { menuId:'subsidy', parentMenuId:'pricing', triggerText:'2', displayText:'🏛️ সরকারি ভর্তুকি তথ্য\n\nআবাসিক ৩ কিলোয়াট পর্যন্ত সিস্টেমে ৪০% কেন্দ্রীয় ভর্তুকি পাওয়া যায়।\n\nআমরা বিনামূল্যে সব ডকুমেন্টেশনে সাহায্য করি।\n\n0️⃣ পূর্বের মেনু', buttons:['0'], nextAction:'await_input', order:6 },
      { menuId:'calculator', parentMenuId:'main', triggerText:'3', displayText:'📊 বিদ্যুৎ সাশ্রয় ক্যালকুলেটর\n\nঅনুগ্রহ করে আপনার মাসিক বিদ্যুৎ বিলের পরিমাণ (₹) লিখুন।\n\nউদাহরণ: 4000', nextAction:'collect_bill', order:7 },
      { menuId:'calc_result', parentMenuId:'calculator', triggerText:'', displayText:'📊 আপনার হিসাব\n\nমাসিক বিদ্যুৎ বিল\n₹{{bill}}\n\n━━━━━━━━━━━━━━\n\nসম্ভাব্য মাসিক সাশ্রয়\n₹{{saving}}\n\n━━━━━━━━━━━━━━\n\nসম্ভাব্য বার্ষিক সাশ্রয়\n₹{{yearly}}\n\n━━━━━━━━━━━━━━\n\n1️⃣ বিস্তারিত প্রস্তাব নিন\n2️⃣ বিনামূল্যে সাইট ভিজিট বুক করুন\n0️⃣ মূল মেনুতে ফিরে যান', buttons:['1','2','0'], nextAction:'await_input', order:8 },
      { menuId:'booking', parentMenuId:'main', triggerText:'4', displayText:'📅 বিনামূল্যে সাইট ভিজিট বুকিং\n\nঅনুগ্রহ করে নিচের তথ্যগুলো পাঠান।\n\n👤 আপনার নাম', nextAction:'save_lead_step1', order:9 },
      { menuId:'thanks', parentMenuId:null, triggerText:'', displayText:'✅ ধন্যবাদ!\n\nআপনার তথ্য সফলভাবে গ্রহণ করা হয়েছে।\n\nআমাদের প্রতিনিধি খুব শীঘ্রই আপনার সঙ্গে যোগাযোগ করবেন।\n\nআপনার মূল্যবান সময়ের জন্য ধন্যবাদ।', buttons:[], nextAction:'show_menu', order:99 }
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
      { key:'invalid_option', value:'❌ দুঃখিত!\n\nআপনার দেওয়া অপশনটি সঠিক নয়।\n\nঅনুগ্রহ করে নিচের তালিকা থেকে একটি সঠিক অপশন নির্বাচন করুন।' },
      { key:'logo_url', value:'/logo.svg' }
    ],
    skipDuplicates: true,
  });
  console.log('Seed completed');
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());