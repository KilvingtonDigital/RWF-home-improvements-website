
const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content');

if (!fs.existsSync(contentDir)) {
    console.error(`Content directory not found at ${contentDir}`);
    process.exit(1);
}

const filesToClean = [
    'aluminum-fencing-for-sanford-and-fayetteville.md',
    'chain-link-fencing-for-sanford-and-fayetteville.md',
    'deck-design.md',
    'deck-installation.md',
    'door-installation.md',
    'energy-efficient-window-installations.md',
    'exterior-and-interior-door-installation.md',
    'farm-and-ranch-fencing-for-sanford-and-fayetteville.md',
    'fayetteville-wood-fencing.md',
    'lillington-fencing.md',
    'sanford-fencing.md',
    'vinyl-fencing-for-sanford-and-fayetteville.md',
    'window-installation.md'
];

console.log(`Cleaning ${filesToClean.length} service page markdown files...`);

filesToClean.forEach(file => {
    const filePath = path.join(contentDir, file);
    if (fs.existsSync(filePath)) {
        const originalContent = fs.readFileSync(filePath, 'utf8');
        const originalLength = originalContent.length;

        // Write the standard placeholder
        const newContent = '<!-- Content managed via JSON data components. Markdown content removed to prevent duplication. -->';

        fs.writeFileSync(filePath, newContent);
        console.log(`Cleaned ${file}: ${originalLength} -> ${newContent.length} bytes`);
    } else {
        console.log(`Warning: File not found ${file}`);
    }
});

console.log('Done.');
