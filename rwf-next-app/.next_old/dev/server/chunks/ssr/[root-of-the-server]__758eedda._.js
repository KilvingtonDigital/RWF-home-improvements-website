module.exports = [
"[project]/downloads/rwfhomeimprovements/rwf-next-app/app/favicon.ico.mjs { IMAGE => \"[project]/downloads/rwfhomeimprovements/rwf-next-app/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/app/favicon.ico.mjs { IMAGE => \"[project]/downloads/rwfhomeimprovements/rwf-next-app/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/lib/cms.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPageData",
    ()=>getPageData,
    "getPageSlugs",
    ()=>getPageSlugs
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), '../data');
const contentDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), '../content');
function getPageSlugs() {
    const files = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(dataDir);
    return files.filter((file)=>file.endsWith('.json') && file !== 'home.json').map((file)=>file.replace('.json', ''));
}
function getPageData(slug) {
    const jsonPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, `${slug}.json`);
    const mdPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(contentDir, `${slug}.md`);
    let data = {};
    let content = '';
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(jsonPath)) {
        const fileContents = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(jsonPath, 'utf8');
        data = JSON.parse(fileContents);
    }
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(mdPath)) {
        content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(mdPath, 'utf8');
        const lines = content.split('\n');
        const cleanLines = [];
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
        for(let i = 0; i < lines.length; i++){
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
                    const isLinkArtifact = line.startsWith('*') || line.startsWith('[') || line === ']' || line === ')' || line.startsWith('](');
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
        content
    };
}
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs) <export default as minpath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minpath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs) <export default as minproc>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minproc",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:process [external] (node:process, cjs)");
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs) <export fileURLToPath as urlToPath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "urlToPath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "content": "page-module__0IdpMG__content",
  "pageHeader": "page-module__0IdpMG__pageHeader",
});
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "content": "HeroSection-module__F3QDOG__content",
  "ctaGroup": "HeroSection-module__F3QDOG__ctaGroup",
  "hero": "HeroSection-module__F3QDOG__hero",
  "overlay": "HeroSection-module__F3QDOG__overlay",
  "quickLink": "HeroSection-module__F3QDOG__quickLink",
  "quickLinks": "HeroSection-module__F3QDOG__quickLinks",
  "serviceQuickLinks": "HeroSection-module__F3QDOG__serviceQuickLinks",
  "title": "HeroSection-module__F3QDOG__title",
});
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.module.css [app-rsc] (css module)");
;
;
;
function HeroSection({ backgroundImage, title, subtitle, ctaLink, ctaText, overlayImage, hideSecondaryLinks }) {
    // Static "Power Hero" strategy for best performance and stability.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].hero,
        style: {
            '--hero-bg': `url(${backgroundImage})`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].overlay,
                style: overlayImage ? {
                    background: `url(${overlayImage}) center/cover no-repeat`
                } : undefined
            }, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].content,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].title,
                            dangerouslySetInnerHTML: {
                                __html: title
                            }
                        }, void 0, false, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, this),
                        subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].subtitle,
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                            lineNumber: 29,
                            columnNumber: 34
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].ctaGroup,
                            children: [
                                ctaLink && ctaText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: ctaLink,
                                    className: "btn btn-primary",
                                    children: ctaText
                                }, void 0, false, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                                    lineNumber: 33,
                                    columnNumber: 29
                                }, this),
                                !hideSecondaryLinks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].serviceQuickLinks,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Looking for something else?"
                                        }, void 0, false, {
                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                                            lineNumber: 40,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].quickLinks,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/window-installation",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].quickLink,
                                                    children: "Windows"
                                                }, void 0, false, {
                                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                                                    lineNumber: 42,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/deck-installation",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].quickLink,
                                                    children: "Decks"
                                                }, void 0, false, {
                                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                                                    lineNumber: 43,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/door-installation",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].quickLink,
                                                    children: "Doors"
                                                }, void 0, false, {
                                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                                            lineNumber: 41,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                                    lineNumber: 39,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                            lineNumber: 31,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                    lineNumber: 27,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "columnHeading": "ServiceAreas-module__pNgroa__columnHeading",
  "contentWrapper": "ServiceAreas-module__pNgroa__contentWrapper",
  "description": "ServiceAreas-module__pNgroa__description",
  "heading": "ServiceAreas-module__pNgroa__heading",
  "link": "ServiceAreas-module__pNgroa__link",
  "list": "ServiceAreas-module__pNgroa__list",
  "listItem": "ServiceAreas-module__pNgroa__listItem",
  "listsContainer": "ServiceAreas-module__pNgroa__listsContainer",
  "mapFrame": "ServiceAreas-module__pNgroa__mapFrame",
  "mapWrapper": "ServiceAreas-module__pNgroa__mapWrapper",
  "marker": "ServiceAreas-module__pNgroa__marker",
  "section": "ServiceAreas-module__pNgroa__section",
  "textContent": "ServiceAreas-module__pNgroa__textContent",
});
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServiceAreas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.module.css [app-rsc] (css module)");
;
;
;
function ServiceAreas() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].heading,
                    children: "Proudly Serving Fayetteville, Sanford, Lillington & Surrounding Areas"
                }, void 0, false, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                    lineNumber: 8,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].contentWrapper,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].textContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].description,
                                    children: "From Anderson Creek to Pinehurst and everywhere in between, RWF Home Improvements brings quality craftsmanship and reliable service to homeowners across the region. Our experienced team is here to make your home improvement projects a reality, no matter where you are in our service area."
                                }, void 0, false, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                    lineNumber: 12,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].listsContainer,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].columnHeading,
                                                    children: "Primary Areas"
                                                }, void 0, false, {
                                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                    lineNumber: 19,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].list,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].listItem,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/fayetteville-nc",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].link,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].marker,
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "currentColor",
                                                                        width: "20",
                                                                        height: "20",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                                            lineNumber: 24,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                                        lineNumber: 23,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    " Fayetteville"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                                lineNumber: 22,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                            lineNumber: 21,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].listItem,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/sanford-fencing",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].link,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].marker,
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "currentColor",
                                                                        width: "20",
                                                                        height: "20",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                                            lineNumber: 31,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                                        lineNumber: 30,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    " Sanford"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                                lineNumber: 29,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                            lineNumber: 28,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].listItem,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/lillington-fencing",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].link,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].marker,
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "currentColor",
                                                                        width: "20",
                                                                        height: "20",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                                            lineNumber: 38,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                                        lineNumber: 37,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    " Lillington"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                                lineNumber: 36,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                            lineNumber: 35,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                    lineNumber: 20,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                            lineNumber: 18,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].columnHeading,
                                                    children: "Surrounding Areas"
                                                }, void 0, false, {
                                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].list,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].listItem,
                                                            children: "Spring Lake, Rockfish, Hope Mills, Raeford"
                                                        }, void 0, false, {
                                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                            lineNumber: 49,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].listItem,
                                                            children: "Cameron, Vass, Southern Pines, Pinehurst"
                                                        }, void 0, false, {
                                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                            lineNumber: 50,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].listItem,
                                                            children: "Broadway, Buies Creek, Angier, Dunn, and more."
                                                        }, void 0, false, {
                                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                            lineNumber: 51,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                                    lineNumber: 48,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                            lineNumber: 46,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                    lineNumber: 16,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                            lineNumber: 11,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].mapWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].mapFrame,
                                src: "https://maps.google.com/maps?q=RWF+Home+Improvements+Fayetteville+NC&t=&z=9&ie=UTF8&iwloc=&output=embed",
                                loading: "lazy",
                                allowFullScreen: true,
                                referrerPolicy: "no-referrer-when-downgrade",
                                title: "RWF Service Area Map"
                            }, void 0, false, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                                lineNumber: 58,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                            lineNumber: 57,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
                    lineNumber: 10,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
            lineNumber: 7,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx",
        lineNumber: 6,
        columnNumber: 9
    }, this);
}
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "ctaButton": "CTA-module__EhaNtW__ctaButton",
  "ctaContentCol": "CTA-module__EhaNtW__ctaContentCol",
  "ctaImageCol": "CTA-module__EhaNtW__ctaImageCol",
  "ctaOwnerImage": "CTA-module__EhaNtW__ctaOwnerImage",
  "ctaSection": "CTA-module__EhaNtW__ctaSection",
});
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CTA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$CTA$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.module.css [app-rsc] (css module)");
;
;
;
function CTA() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "container",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$CTA$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].ctaSection,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$CTA$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].ctaImageCol,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/rwf-home-improvements-team-richard-wilkes-fayetteville-nc.jpeg",
                        alt: "Richard Wilkes, Owner of RWF Home Improvements",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$CTA$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].ctaOwnerImage
                    }, void 0, false, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
                        lineNumber: 10,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
                    lineNumber: 9,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$CTA$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].ctaContentCol,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Ready to Transform Your Home?"
                        }, void 0, false, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
                            lineNumber: 17,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Elevate your home's curb appeal and functionality with RWF Home Improvements. From ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "custom fencing solutions"
                                }, void 0, false, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
                                    lineNumber: 19,
                                    columnNumber: 108
                                }, this),
                                " that provide privacy and security to ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "stunning decks"
                                }, void 0, false, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
                                    lineNumber: 19,
                                    columnNumber: 187
                                }, this),
                                " for outdoor entertaining, and ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "energy-efficient windows and doors"
                                }, void 0, false, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
                                    lineNumber: 19,
                                    columnNumber: 249
                                }, this),
                                " that save you money, we deliver craftsmanship you can trust. Let's start your project today!"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
                            lineNumber: 18,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact-us",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$CTA$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].ctaButton,
                            children: "Call now"
                        }, void 0, false, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
                            lineNumber: 21,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
                    lineNumber: 16,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
            lineNumber: 8,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx",
        lineNumber: 7,
        columnNumber: 9
    }, this);
}
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "SetsApart-module__uCtGjW__card",
  "cardImage": "SetsApart-module__uCtGjW__cardImage",
  "cardText": "SetsApart-module__uCtGjW__cardText",
  "cardTitle": "SetsApart-module__uCtGjW__cardTitle",
  "content": "SetsApart-module__uCtGjW__content",
  "grid": "SetsApart-module__uCtGjW__grid",
  "header": "SetsApart-module__uCtGjW__header",
  "overlay": "SetsApart-module__uCtGjW__overlay",
  "section": "SetsApart-module__uCtGjW__section",
  "starIcon": "SetsApart-module__uCtGjW__starIcon",
  "title": "SetsApart-module__uCtGjW__title",
});
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SetsApart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.module.css [app-rsc] (css module)");
;
;
;
const defaultItems = [
    {
        title: "Family Owned",
        text: "Local experts who understand the needs of our communities.",
        image: "/images/Happy_20RWF_20Customers.jpg"
    },
    {
        title: "Lifetime Wood Gate Warranty",
        text: "Enjoy peace of mind with our durable wood gates.",
        image: "/images/home/custom-wooden-gate-fencing.jpg"
    },
    {
        title: "Instant Online Quote",
        text: "Get a no-obligation quote fast with our online estimate tool.",
        image: "/images/low-interest-fence-loans-nc.jpg"
    },
    {
        title: "100% Satisfaction Guarantee",
        text: "We're committed to excellence in every project.",
        image: "/images/Bill.jpg"
    },
    {
        title: "Financing Available",
        text: "Make your dream home a reality with flexible financing options.",
        image: "/images/flexible-financing-options-fayetteville.jpg"
    }
];
function SetsApart({ title = "What Sets us apart?", items = defaultItems }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].section,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].starIcon,
                        viewBox: "0 0 24 24",
                        fill: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
                        }, void 0, false, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                            lineNumber: 48,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].title,
                        dangerouslySetInnerHTML: {
                            __html: title
                        }
                    }, void 0, false, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                        lineNumber: 50,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].grid,
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                src: item.image,
                                alt: item.title,
                                fill: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].cardImage,
                                style: {
                                    objectFit: 'cover'
                                }
                            }, void 0, false, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                                lineNumber: 56,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].overlay
                            }, void 0, false, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                                lineNumber: 63,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].content,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].cardTitle,
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                                        lineNumber: 65,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].cardText,
                                        children: item.text
                                    }, void 0, false, {
                                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                                        lineNumber: 66,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                                lineNumber: 64,
                                columnNumber: 25
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                        lineNumber: 55,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx",
        lineNumber: 45,
        columnNumber: 9
    }, this);
}
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "ServiceGrid-module__KjFa3a__card",
  "content": "ServiceGrid-module__KjFa3a__content",
  "desc": "ServiceGrid-module__KjFa3a__desc",
  "grid": "ServiceGrid-module__KjFa3a__grid",
  "imageWrapper": "ServiceGrid-module__KjFa3a__imageWrapper",
  "title": "ServiceGrid-module__KjFa3a__title",
});
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServiceGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceGrid$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.module.css [app-rsc] (css module)");
;
;
;
;
function ServiceGrid({ services }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceGrid$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].grid,
        children: services.map((service, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceGrid$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceGrid$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].imageWrapper,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            src: service.image,
                            alt: service.title,
                            width: 400,
                            height: 300,
                            className: "w-full h-full object-cover",
                            style: service.imageStyle
                        }, void 0, false, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
                            lineNumber: 20,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
                        lineNumber: 19,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceGrid$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].content,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceGrid$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].title,
                                children: service.title
                            }, void 0, false, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
                                lineNumber: 30,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceGrid$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].desc,
                                children: service.description
                            }, void 0, false, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
                                lineNumber: 31,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '0.5rem',
                                    flexDirection: 'column',
                                    marginTop: 'auto'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: service.link,
                                        className: "btn btn-outline",
                                        style: {
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--text-primary)',
                                            width: '100%'
                                        },
                                        children: "Learn More"
                                    }, void 0, false, {
                                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
                                        lineNumber: 33,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://docs.google.com/forms/d/e/1FAIpQLSdLt2w5zOci_Px3bk4Da5hT23PIiQQixsTjoDjon3fdcMsPQw/viewform",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "btn btn-primary",
                                        style: {
                                            width: '100%'
                                        },
                                        children: "Apply for Financing"
                                    }, void 0, false, {
                                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
                                        lineNumber: 36,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
                                lineNumber: 32,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
                        lineNumber: 29,
                        columnNumber: 21
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
                lineNumber: 18,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "imageContainer": "ProcessSteps-module___lRrTG__imageContainer",
  "numberBadge": "ProcessSteps-module___lRrTG__numberBadge",
  "section": "ProcessSteps-module___lRrTG__section",
  "stepCard": "ProcessSteps-module___lRrTG__stepCard",
  "stepText": "ProcessSteps-module___lRrTG__stepText",
  "stepTitle": "ProcessSteps-module___lRrTG__stepTitle",
  "stepsGrid": "ProcessSteps-module___lRrTG__stepsGrid",
  "title": "ProcessSteps-module___lRrTG__title",
});
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProcessSteps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.module.css [app-rsc] (css module)");
;
;
;
function ProcessSteps({ title = "Our Process", steps }) {
    if (!steps || steps.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].section,
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].title,
                children: title
            }, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx",
                lineNumber: 20,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].stepsGrid,
                children: steps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].stepCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].numberBadge,
                                children: index + 1
                            }, void 0, false, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx",
                                lineNumber: 24,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].imageContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    src: step.image,
                                    alt: step.title,
                                    fill: true,
                                    style: {
                                        objectFit: 'cover'
                                    },
                                    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                }, void 0, false, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx",
                                    lineNumber: 26,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx",
                                lineNumber: 25,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].stepTitle,
                                children: step.title
                            }, void 0, false, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx",
                                lineNumber: 34,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].stepText,
                                children: step.description
                            }, void 0, false, {
                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx",
                                lineNumber: 35,
                                columnNumber: 25
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx",
                        lineNumber: 23,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DynamicPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$lib$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/lib/cms.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/react-markdown/lib/index.js [app-rsc] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/remark-gfm/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$rehype$2d$raw$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/rehype-raw/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$app$2f5b2e2e2e$slug$5d2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.module.css [app-rsc] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/HeroSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceAreas.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$CTA$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/CTA.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/SetsApart.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ServiceGrid.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/ProcessSteps.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
async function generateStaticParams() {
    const slugs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$lib$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPageSlugs"])();
    return slugs.map((slug)=>({
            slug: [
                slug
            ]
        }));
}
async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.join('/');
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$lib$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPageData"])(slug);
    if (!data) return {};
    return {
        title: data.title,
        description: data.description || `RWF Home Improvements - ${data.headings?.[0]?.text}`
    };
}
async function DynamicPage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.join('/');
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$lib$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPageData"])(slug);
    if (!data || !data.content) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    // Find H1
    const h1 = data.headings?.find((h)=>h.tag === 'h1')?.text || data.title;
    // Determine Image: heroImage > ogImage > Default
    const defaultHero = "/images/expert-fence-installation-fayetteville-nc.png";
    let heroBg = data.heroImage;
    if (!heroBg && data.ogImage && !data.ogImage.includes('wixstatic')) {
        // Use ogImage if it's local, otherwise prefer default high-quality hero over random low-res wix scrape
        heroBg = data.ogImage;
    }
    if (!heroBg) {
        heroBg = defaultHero;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$HeroSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                backgroundImage: heroBg,
                title: h1,
                subtitle: "Trusted Quality & Craftsmanship",
                ctaLink: "/contact-us",
                ctaText: "Get a Quote"
            }, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$app$2f5b2e2e2e$slug$5d2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].content,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                        remarkPlugins: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
                        ],
                        rehypePlugins: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$rehype$2d$raw$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
                        ],
                        components: {
                            img: ({ node, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    ...props
                                }, void 0, false, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                                    lineNumber: 82,
                                    columnNumber: 33
                                }, void 0)
                        },
                        children: data.content
                    }, void 0, false, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                        lineNumber: 77,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            data.features && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$SetsApart$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                title: data.featuresTitle,
                items: data.features
            }, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                lineNumber: 92,
                columnNumber: 17
            }, this),
            data.financingOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "container py-5",
                style: {
                    textAlign: "center",
                    paddingBottom: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: "2.5rem",
                            fontWeight: "800",
                            marginBottom: "3rem",
                            color: "#333"
                        },
                        children: "Financing Options That Work for You"
                    }, void 0, false, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                        lineNumber: 100,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        services: data.financingOptions
                    }, void 0, false, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                        lineNumber: 108,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                lineNumber: 99,
                columnNumber: 17
            }, this),
            data.processSteps && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ProcessSteps$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                title: data.processTitle || "Our Fencing Installation Process",
                steps: data.processSteps
            }, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                lineNumber: 113,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$ServiceAreas$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                lineNumber: 119,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$CTA$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
                lineNumber: 121,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx",
        lineNumber: 66,
        columnNumber: 9
    }, this);
}
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/app/[...slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__758eedda._.js.map