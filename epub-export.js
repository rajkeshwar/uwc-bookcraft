import lib from 'epub-gen-memory';
import { writeFileSync } from 'fs';

const epub = lib.default || lib;

const options = {
    title: "ESM Test eBook",
    author: "Jane Doe",
    publisher: "Open Source Publishing",
    description: "Testing epub-gen-memory with ESM syntax.",
    tocTitle: "Table of Contents",
};

const content = [
    {
        title: "ESM Integration",
        author: "Jane Doe",
        content: `
            <h1>Success!</h1>
            <p>This EPUB was generated using <b>import</b> statements instead of <b>require</b>.</p>
        `
    },
    {
        title: "Technical Note",
        content: `
            <p>The <i>epub-gen-memory</i> library provides a clean Promise-based API that fits well with modern async/await patterns.</p>
        `
    }
];

async function generate() {
    try {
        const buffer = await epub(options, content);
        writeFileSync('./test-esm-ebook.epub', buffer);
        console.log('✅ EPUB successfully created using ESM: ./test-esm-ebook.epub');
    } catch (err) {
        console.error('❌ Error generating EPUB:', err);
    }
}

generate();