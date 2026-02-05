const fs = require('fs');
const path = require('path');

const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');
const outputDir = path.join(process.cwd(), 'data');
const outputFile = path.join(outputDir, 'gallery-images.json');

// Create data dir if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Generating gallery manifest...');

if (fs.existsSync(galleryDir)) {
    const files = fs.readdirSync(galleryDir)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .filter(file => !file.startsWith('icon') && !file.startsWith('logo'));

    const imagePaths = files.map(file => `/images/gallery/${file}`);

    fs.writeFileSync(outputFile, JSON.stringify(imagePaths, null, 2));
    console.log(`Generated manifest with ${imagePaths.length} images at ${outputFile}`);
} else {
    console.log('Gallery directory not found, creating empty manifest.');
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
}
