import { NextResponse } from 'next/server';
import { writeFile, readFile, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import axios from "axios";
import { JSDOM } from 'jsdom';

const execAsync = promisify(exec);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    // 1️⃣ Validation
    if (!file || !file.name.endsWith('.html')) {
      return NextResponse.json({ error: 'Invalid file. Upload a .html file.' }, { status: 400 });
    }

    // 2️⃣ Read HTML content
    let html = await file.text();

    // 3️⃣ Inline remote images into Base64
    const dom = new JSDOM(html);
    const imgEls = dom.window.document.querySelectorAll('img');
    await Promise.all(
      Array.from(imgEls).map(async (img) => {
        const src = img.src;
        if (src.startsWith('http')) {
          try {
            const res = await axios.get(src, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(res.data, 'binary');
            const mime = res.headers['content-type'] || 'image/png';
            const base64 = buffer.toString('base64');
            img.src = `data:${mime};base64,${base64}`;
          } catch (error) {
            console.error(`Failed to fetch image ${src}:`, error.message);
          }
        }
      })
    );
    html = dom.serialize();

    // 4️⃣ Prepare temp file paths
    const id = crypto.randomUUID();
    const inputPath = path.join(os.tmpdir(), `${id}.html`);
    const outputDir = os.tmpdir();
    const outputPath = path.join(outputDir, `${id}.docx`);

    // 5️⃣ Write inlined HTML to temp file
    await writeFile(inputPath, html, 'utf8');

    // 6️⃣ Run Pandoc CLI to convert HTML to DOCX (replace LibreOffice)
    await execAsync(
      `pandoc "${inputPath}" -o "${outputPath}"`
    );

    // 7️⃣ Read generated DOCX
    const docxBuffer = await readFile(outputPath);

    // 8️⃣ Cleanup temp files
    await unlink(inputPath);
    await unlink(outputPath);

    // 9️⃣ Return DOCX
    return new Response(docxBuffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="converted.docx"',
      },
    });
  } catch (err) {
    console.error('[Pandoc DOCX Error]', err);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}