import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = Date.now() + '-' + file.name.replace(/\s/g, '-');
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const fs = require('fs');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  const url = '/uploads/' + filename;
  return NextResponse.json({ url });
}