
const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content');
const mdPath = path.join(contentDir, 'about-us.md');

console.log('Reading file:', mdPath);

if (fs.existsSync(mdPath)) {
    let content = fs.readFileSync(mdPath, 'utf8');
    console.log('Original Content Length:', content.length);

    const lines = content.split('\n');
    console.log('Total Lines:', lines.length);
    console.log('Line 0 Start:', lines[0].substring(0, 50));

    // Apply logic
    if (lines.length > 0 && lines[0].trim().startsWith('var bodyCacheable')) {
        console.log('Removing Line 0 (var bodyCacheable match)');
        lines.shift();
    } else {
        console.log('Line 0 did NOT match "var bodyCacheable"');
    }

    while (lines.length > 0 && (lines[0].trim() === '' || lines[0].trim().startsWith('var '))) {
        console.log('Removing whitespace/var line');
        lines.shift();
    }

    content = lines.join('\n');
    console.log('Final Content Length:', content.length);
    console.log('First 200 chars of final content:\n', content.substring(0, 200));
} else {
    console.error('File not found');
}
