/**
 * api/export-epub.js
 * Vercel Serverless Function — generates a valid EPUB 3 file server-side
 * using epub-gen-memory (pure JS, no native binaries — works on Vercel).
 *
 * POST /api/export-epub
 * Body: { title, author, theme, chapters }
 * Response: application/epub+zip binary stream
 */

import lib from 'epub-gen-memory';
const epub = lib.default || lib;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      title    = 'My Book',
      author   = 'BookCraft',
      chapters = [],
      theme    = 'classic',
    } = req.body;

    if (!chapters || chapters.length === 0) {
      return res.status(400).json({ error: 'No chapters provided' });
    }

    // Options object — no content here
    const options = {
      title,
      author,
      publisher: 'BookCraft',
      lang: 'en',
      css: buildThemeCSS(theme),
      tocTitle: 'Table of Contents',
      appendChapterTitles: false,
    };

    // Content is the second argument, chapter HTML key is `content` (not `data`)
    const content = chapters.map((ch, i) => ({
      title:   ch.title || (i === 0 ? title : `Chapter ${i + 1}`),
      content: sanitiseHTML(ch.content || '<p></p>'),
    }));

    const epubBuffer = await epub(options, content);

    if (!epubBuffer || !epubBuffer.length) {
      throw new Error('epub-gen-memory returned an empty buffer');
    }

    const safeFilename = title
      .replace(/[^a-z0-9\s-]/gi, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase() || 'book';

    res.setHeader('Content-Type', 'application/epub+zip');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}.epub"`);
    res.setHeader('Content-Length', epubBuffer.length);
    res.setHeader('Cache-Control', 'no-store');

    return res.status(200).send(epubBuffer);

  } catch (err) {
    console.error('[export-epub] Error:', err);
    return res.status(500).json({
      error: 'EPUB generation failed',
      detail: err.message,
    });
  }
}

function sanitiseHTML(html) {
  return html
    .replace(/<br\s*\/?>/gi, '<br/>')
    .replace(/<hr\s*\/?>/gi, '<hr/>')
    .replace(/<img([^>]*?)(?:\s*\/)?>/gi, '<img$1/>')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\s+data-[a-z-]+=["'][^"']*["']/gi, '');
}

function buildThemeCSS(theme) {
  const base = `
    body { margin: 0; padding: 0; }
    p { margin: 0 0 0.85em; }
    img { max-width: 100%; height: auto; display: block; margin: 0.8em auto; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 0.82em; }
    code { font-family: monospace; font-size: 0.85em; }
    blockquote { margin: 1em 0; padding: 0.5em 1em; border-left: 3px solid #ccc; color: #555; }
    table { width: 100%; border-collapse: collapse; margin: 1em 0; }
    th { padding: 8px 12px; text-align: left; font-weight: 600; }
    td { padding: 7px 12px; border-bottom: 1px solid #e0e0e0; }
    hr { border: none; border-top: 1px solid #ccc; margin: 1.5em 0; }
    mark { background: #fff3b0; padding: 0 2px; border-radius: 2px; }
    ul, ol { margin: 0.5em 0 0.85em 1.5em; }
    li { margin: 0.25em 0; }
  `;

  const themes = {
    classic: `
      body { font-family: Georgia, 'Times New Roman', serif; font-size: 1em; line-height: 1.85; color: #1a1a1a; }
      h1 { font-family: Georgia, serif; font-size: 2em; font-weight: 400; color: #1a2744; border-bottom: 2px solid #b8860b; padding-bottom: 0.3em; margin: 0 0 0.5em; }
      h2 { font-family: Georgia, serif; font-size: 1.5em; font-weight: 400; color: #1a2744; border-bottom: 1px solid #d4b896; padding-bottom: 0.2em; margin: 1.5em 0 0.5em; }
      h3 { font-size: 1.2em; font-weight: 600; color: #3a3a3a; margin: 1.2em 0 0.4em; }
      p { text-align: justify; hyphens: auto; }
      blockquote { border-left-color: #b8860b; background: #faf8f3; font-style: italic; }
      th { background: #1a2744; color: #fff; }
      tr:nth-child(even) td { background: #faf8f3; }
    `,
    modern: `
      body { font-family: Arial, Helvetica, sans-serif; font-size: 0.95em; line-height: 1.75; color: #0f172a; }
      h1 { font-size: 2em; font-weight: 700; color: #1e40af; letter-spacing: -0.5px; margin: 0 0 0.5em; }
      h2 { font-size: 1.4em; font-weight: 700; color: #1e3a5f; border-left: 4px solid #3b82f6; padding-left: 10px; margin: 1.5em 0 0.5em; }
      h3 { font-size: 1.1em; font-weight: 600; color: #1e40af; margin: 1.2em 0 0.35em; }
      blockquote { border-left-color: #3b82f6; background: #eff6ff; color: #1e3a5f; }
      th { background: #1e40af; color: #fff; }
      tr:nth-child(even) td { background: #f8fafc; }
      mark { background: #dbeafe; color: #1e40af; }
    `,
    academic: `
      body { font-family: Palatino, 'Palatino Linotype', Georgia, serif; font-size: 0.95em; line-height: 1.9; color: #2c2018; }
      h1 { font-size: 2em; font-weight: 600; color: #3d2800; text-align: center; border-bottom: 1px solid #b8860b; padding-bottom: 0.4em; margin: 0 0 0.5em; }
      h2 { font-size: 1.4em; font-weight: 300; font-style: italic; color: #4a2c00; margin: 1.5em 0 0.5em; }
      h3 { font-size: 1.1em; font-weight: 700; color: #5a3810; margin: 1.2em 0 0.4em; }
      p { text-align: justify; hyphens: auto; }
      blockquote { border-left-color: #b8860b; background: rgba(184,134,11,0.06); font-style: italic; color: #5a4030; }
      th { background: #4a2c00; color: #fdf7ef; }
      tr:nth-child(even) td { background: rgba(184,134,11,0.05); }
    `,
    handwritten: `
      body { font-family: Georgia, serif; font-size: 1em; line-height: 1.9; color: #2d2520; }
      h1 { font-size: 2em; font-weight: 700; color: #3d2800; border-bottom: 2px solid #c8a96e; padding-bottom: 0.3em; margin: 0 0 0.5em; }
      h2 { font-size: 1.5em; font-weight: 700; color: #4a3520; border-bottom: 1px dashed #c8a96e; padding-bottom: 0.15em; margin: 1.5em 0 0.4em; }
      h3 { font-size: 1.2em; font-weight: 700; color: #5a4030; margin: 1.2em 0 0.35em; }
      blockquote { border-left-color: #c8a96e; background: rgba(200,169,110,0.1); font-style: italic; }
      th { background: #5a3820; color: #fefcf5; }
      tr:nth-child(even) td { background: rgba(200,169,110,0.07); }
    `,
  };

  return base + (themes[theme] || themes.classic);
}