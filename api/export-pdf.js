import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let browser = null;

  try {
    const {
      html     = '',
      title    = 'book',
      margin   = '2.4cm',
    } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'No HTML content provided' });
    }

    // Launch serverless Chromium
    browser = await puppeteer.launch({
      args:            chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath:  await chromium.executablePath(),
      headless:        chromium.headless,
    });

    const page = await browser.newPage();

    // Set full self-contained HTML (fonts, styles, content all inline)
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 25000 });

    // Wait for web fonts to load
    await page.evaluateHandle('document.fonts.ready');

    const pdfBuffer = await page.pdf({
      format:             'A4',
      printBackground:    true,   // renders background colours and gradients
      margin: {
        top:    margin,
        bottom: margin,
        left:   margin,
        right:  margin,
      },
      displayHeaderFooter: false,
    });

    const safeFilename = title
      .replace(/[^a-z0-9\s-]/gi, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase() || 'book';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(pdfBuffer);

  } catch (err) {
    console.error('[export-pdf] Error:', err);
    return res.status(500).json({
      error: 'PDF generation failed',
      detail: err.message,
    });
  } finally {
    if (browser) await browser.close();
  }
}