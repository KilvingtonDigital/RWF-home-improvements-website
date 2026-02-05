const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const APP_DIR = path.join(__dirname, 'app');

// 1. Build a Set of Valid Routes
const validRoutes = new Set();

// Add explicitly known static routes (based on file structure inspection)
validRoutes.add('/');
validRoutes.add('/contact-us');
validRoutes.add('/about-us');
validRoutes.add('/finance');
validRoutes.add('/home-improvement-project-gallery');
validRoutes.add('/testimonial');
validRoutes.add('/post');
validRoutes.add('/services');

// Add dynamic routes from data files
const dataFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
dataFiles.forEach(file => {
    const slug = file.replace('.json', '');
    validRoutes.add(`/${slug}`);

    // Support correct /post/slug routes for blog posts
    if (slug.startsWith('post-') && slug !== 'post') {
        validRoutes.add('/' + slug.replace('post-', 'post/'));
    }
});

console.log(`Found ${validRoutes.size} valid internal routes.`);

// 2. Scan for Links
const brokenLinks = [];
const checkedLinks = new Set();

function checkLink(sourceFile, href) {
    if (!href) return;

    // Normalize string
    let link = href.trim();

    // Ignore externals, phones, emails, anchors
    if (link.startsWith('http') || link.startsWith('tel:') || link.startsWith('mailto:') || link.startsWith('#')) {
        // Optional: Check if absolute URL points to localhost or the production domain and treat as internal
        if (link.includes('rwfhomeimprovements.com')) {
            try {
                const url = new URL(link);
                link = url.pathname;
                // fall through to internal check
            } catch (e) {
                return;
            }
        } else {
            return;
        }
    }

    // Strip trailing slash for consistency (unless root)
    if (link.length > 1 && link.endsWith('/')) {
        link = link.slice(0, -1);
    }

    // Check if it exists in validRoutes
    if (!validRoutes.has(link)) {
        brokenLinks.push({ source: sourceFile, link: link });
    }
}

// 3. Process Data Files
dataFiles.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Recursive search for "href" or "link" keys
    function traverse(obj) {
        if (!obj || typeof obj !== 'object') return;

        if (Array.isArray(obj)) {
            obj.forEach(traverse);
            return;
        }

        // Check specifically for common link keys
        if (obj.href) checkLink(file, obj.href);
        if (obj.link) checkLink(file, obj.link);

        // Traverse all values
        Object.values(obj).forEach(traverse);
    }

    traverse(content);
});

// 4. Report
console.log('\n--- BROKEN LINK REPORT ---\n');
if (brokenLinks.length === 0) {
    console.log('✅ No broken internal links found!');
} else {
    console.log(`❌ Found ${brokenLinks.length} potentially broken links:`);
    brokenLinks.forEach(item => {
        console.log(`- In ${item.source}: Link "${item.link}" not found in valid routes.`);
    });
}
