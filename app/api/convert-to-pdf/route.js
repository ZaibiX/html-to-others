// app/api/convert-to-pdf/route.js

import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file || !file.name.endsWith('.html')) {
    return NextResponse.json({ error: 'Invalid file type. Only .html allowed.' }, { status: 400 });
  }

  const htmlContent = await file.text();

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="converted.pdf"`,
      },
    });
  } catch (err) {
    console.error('[PDF Conversion Error]', err);
    return NextResponse.json({ error: 'Failed to convert to PDF' }, { status: 500 });
  }
}
