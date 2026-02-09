
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const contentDir = path.join(process.cwd(), 'content');

export function getPageSlugs() {
    const files = fs.readdirSync(dataDir);
    return files
        .filter(file => file.endsWith('.json') && file !== 'home.json' && file !== 'gallery-images.json' && file !== 'pricing.json' && file !== 'leads.json')
        .map(file => {
            const name = file.replace('.json', '');
            // Convert post-slug.json to post/slug route
            if (name.startsWith('post-') && name !== 'post') {
                return name.replace('post-', 'post/');
            }
            return name;
        });
}

export function getPageData(slug: string): any {
    // 1. Try direct match (e.g. about-us)
    let jsonPath = path.join(dataDir, `${slug}.json`);
    let mdPath = path.join(contentDir, `${slug}.md`);

    // 2. Try mapping post/slug -> post-slug
    if (!fs.existsSync(jsonPath) && slug.startsWith('post/')) {
        const fileSlug = slug.replace('post/', 'post-');
        jsonPath = path.join(dataDir, `${fileSlug}.json`);
        mdPath = path.join(contentDir, `${fileSlug}.md`);
    }

    let data = {};
    let content = '';

    if (fs.existsSync(jsonPath)) {
        const fileContents = fs.readFileSync(jsonPath, 'utf8');
        data = JSON.parse(fileContents);
    }

    if (fs.existsSync(mdPath)) {
        content = fs.readFileSync(mdPath, 'utf8');

        const lines = content.split('\n');
        const cleanLines: string[] = [];
        let inContentBody = false;

        // Heuristic:
        // We want to skip the "Link Soup" at the start of the file.
        // Link Soup consists of:
        // - Lines starting with `*` (list items)
        // - Lines composed of `[` or `]` or `]()` or `(` or `)` or `*` or whitespace
        // - Lines that are part of a multi-line link definition (e.g. `    Link Text`)
        // 
        // We STOP skipping when we hit:
        // - A Header (starts with `#`)
        // - An Image (starts with `![`)
        // - A line that looks like real text and not a link artifact (lengthy, doesn't start with `*` or `[`)

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // ALWAYS SKIP: Script variables / Wix artifacts
            if (line.startsWith('var bodyCacheable') || line.startsWith('var ssrInfo') || line.includes('wixFirstPaint')) continue;
            if (/^(top of page|skip to main content|menu|close|bottom of page)$/i.test(line)) continue;
            if (line.includes('{"data":{"site":')) continue; // JSON dump at end
            if (line.includes('window.fedops')) continue; // Script at end

            if (!inContentBody) {
                // DETECT START OF CONTENT

                // 1. Image
                if (line.startsWith('![')) {
                    inContentBody = true;
                    cleanLines.push(lines[i]); // Keep the first image? Maybe. Let's keep it for now.
                    continue;
                }

                // 2. Headings
                if (line.startsWith('#')) {
                    inContentBody = true;
                    cleanLines.push(lines[i]);
                    continue;
                }

                // 3. Plain Text Paragraphs (Not links/lists/empty)
                // If line is non-empty
                if (line.length > 0) {
                    // Check if it's junk
                    const isLinkArtifact =
                        line.startsWith('*') ||
                        line.startsWith('[') ||
                        line === ']' ||
                        line === ')' ||
                        line.startsWith('](');

                    // Specific check for the split link text "    Link Name"
                    // If it is indented and short, it's likely a link text in a list
                    // But if it is a long sentence, it is content.
                    const isIndentedLinkText = lines[i].startsWith('    ') && line.length < 50;

                    if (!isLinkArtifact && !isIndentedLinkText) {
                        // It's likely real content!
                        inContentBody = true;
                        cleanLines.push(lines[i]);
                    }
                }
            } else {
                // WE ARE IN CONTENT
                // We still want to strip the specific FOOTER LINK BLOCK.
                // It usually starts with something like "### RWF Home Improvements" followed by a huge list.
                // Or "Our Service Areas" followed by a massive list.

                // Heuristic: If we see a huge block of links again (e.g. 5+ lines starting with `* [`) we might be in footer.
                // But simplified: Just strip the specific "RWF Home Improvements" footer block marker if known.
                if (line.includes('### RWF Home Improvements') || line === '### [RWF Home Improvements]()') {
                    // Stop reading content, the rest is footer junk
                    break;
                }
                // Additional Footer Pattern seen in fayetteville-fence: "*   [Instant Quote]"
                if (line.includes('*   [Instant Quote]')) {
                    break;
                }

                cleanLines.push(lines[i]);
            }
        }

        content = cleanLines.join('\n');
    }

    return {
        slug,
        ...data,
        content,
    };
}
