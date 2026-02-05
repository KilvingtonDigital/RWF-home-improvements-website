
import fs from 'fs';
import path from 'path';

export function getGalleryImages() {
    const imagesDir = path.join(process.cwd(), 'public/images/gallery');

    if (!fs.existsSync(imagesDir)) return [];

    const files = fs.readdirSync(imagesDir);
    return files
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .filter(file => !file.startsWith('icon') && !file.startsWith('logo')) // Basic filtering
        .map(file => `/images/gallery/${file}`);
}
