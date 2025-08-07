// app/api/convert-to-docx/route.js

import { NextResponse } from 'next/server';
import HTMLtoDOCX from 'html-to-docx';
import { Readable } from 'stream';

export const POST = async (req) => {
  try {
    // Get the form data
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !file.name.endsWith('.html')) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
    }

    const htmlText = await file.text(); // read file content as string

    const docxBuffer = await HTMLtoDOCX(htmlText, null, {
      orientation: 'portrait',
      margins: {
        top: 1440, // 1 inch
        right: 1440,
        bottom: 1440,
        left: 1440,
      },
      footer: false,
      header: false,
      title: file.name.replace('.html', ''),
    });

    const stream = Readable.from(docxBuffer);

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=converted.docx',
      },
    });
  } catch (error) {
    console.error('[DOCX CONVERT ERROR]', error);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
};
