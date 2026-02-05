module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "btn": "Navbar-module__78Lpia__btn",
  "cta": "Navbar-module__78Lpia__cta",
  "dropdown": "Navbar-module__78Lpia__dropdown",
  "dropdownLink": "Navbar-module__78Lpia__dropdownLink",
  "dropdownOpen": "Navbar-module__78Lpia__dropdownOpen",
  "header": "Navbar-module__78Lpia__header",
  "link": "Navbar-module__78Lpia__link",
  "linkWrapper": "Navbar-module__78Lpia__linkWrapper",
  "links": "Navbar-module__78Lpia__links",
  "logo": "Navbar-module__78Lpia__logo",
  "mobileCta": "Navbar-module__78Lpia__mobileCta",
  "navArrow": "Navbar-module__78Lpia__navArrow",
  "navContainer": "Navbar-module__78Lpia__navContainer",
  "navItem": "Navbar-module__78Lpia__navItem",
  "open": "Navbar-module__78Lpia__open",
  "toggle": "Navbar-module__78Lpia__toggle",
});
}),
"[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
const navItems = [
    {
        label: 'Fencing',
        href: '/fayetteville-fence',
        children: [
            {
                label: 'Privacy Fencing',
                href: '/privacy-fencing'
            },
            {
                label: 'Wood Fencing',
                href: '/fayetteville-wood-fencing'
            },
            {
                label: 'Vinyl Fencing',
                href: '/vinyl-fencing-for-sanford-and-fayetteville'
            },
            {
                label: 'Aluminum Fencing',
                href: '/aluminum-fencing-for-sanford-and-fayetteville'
            },
            {
                label: 'Chain Link Fencing',
                href: '/chain-link-fencing-for-sanford-and-fayetteville'
            },
            {
                label: 'Farm and Ranch Fencing',
                href: '/farm-and-ranch-fencing-for-sanford-and-fayetteville'
            }
        ]
    },
    {
        label: 'Decks',
        href: '/deck-installation'
    },
    {
        label: 'Windows',
        href: '/window-installation'
    },
    {
        label: 'Doors',
        href: '/door-installation'
    },
    {
        label: 'About',
        href: '/about-us',
        children: [
            {
                label: 'Gallery',
                href: '/home-improvement-project-gallery'
            },
            {
                label: 'Testimonials',
                href: '/testimonial'
            },
            {
                label: 'Blog',
                href: '/post'
            }
        ]
    },
    {
        label: 'Service Areas',
        href: '/service-area',
        children: [
            {
                label: 'Fayetteville Fencing',
                href: '/fayetteville-nc'
            },
            {
                label: 'Sanford Fencing',
                href: '/sanford-fencing'
            },
            {
                label: 'Lillington Fencing',
                href: '/lillington-fencing'
            }
        ]
    },
    {
        label: 'Finance',
        href: '/finance'
    },
    {
        label: 'Contact',
        href: '/contact-us'
    }
];
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openDropdown, setOpenDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Auto-expand Fencing on mobile for better visibility
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleResize = ()=>{
            if (window.innerWidth < 1100) {
                // If nothing is open, open Fencing by default
                setOpenDropdown((prev)=>prev || 'Fencing');
            } else {
                setOpenDropdown(null);
            }
        };
        // Run on mount
        handleResize();
        window.addEventListener('resize', handleResize);
        return ()=>window.removeEventListener('resize', handleResize);
    }, []);
    const toggleMenu = ()=>setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = (label)=>{
        if (openDropdown === label) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(label);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `container ${__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navContainer}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logo,
                    onClick: ()=>setIsMenuOpen(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/rwf-home-improvements-logo-fayetteville.png",
                        alt: "RWF Home Improvements"
                    }, void 0, false, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                        lineNumber: 87,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                    lineNumber: 86,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].links} ${isMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].open : ''}`,
                    children: navItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItem} ${openDropdown === item.label ? __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownOpen : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].linkWrapper,
                                    children: item.external ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: item.href,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].link,
                                        onClick: ()=>setIsMenuOpen(false),
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                                        lineNumber: 96,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].link,
                                        onClick: (e)=>{
                                            if (item.children) {
                                                // Prevent navigation if clicking parent on mobile to toggle dropdown
                                                if (window.innerWidth < 1100) {
                                                    e.preventDefault();
                                                    toggleDropdown(item.label);
                                                } else {
                                                    setIsMenuOpen(false);
                                                }
                                            } else {
                                                setIsMenuOpen(false);
                                            }
                                        },
                                        children: [
                                            item.label,
                                            item.children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navArrow,
                                                children: " ▼"
                                            }, void 0, false, {
                                                fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                                                lineNumber: 124,
                                                columnNumber: 59
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                                        lineNumber: 106,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                                    lineNumber: 94,
                                    columnNumber: 29
                                }, this),
                                item.children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdown,
                                    children: item.children.map((child, cIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: child.href,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownLink,
                                            onClick: ()=>setIsMenuOpen(false),
                                            children: child.label
                                        }, cIndex, false, {
                                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                                            lineNumber: 132,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                                    lineNumber: 130,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                            lineNumber: 93,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                    lineNumber: 91,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cta,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/contact-us",
                        className: "btn btn-primary",
                        children: "Get Instant Quote"
                    }, void 0, false, {
                        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                        lineNumber: 150,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                    lineNumber: 149,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$downloads$2f$rwfhomeimprovements$2f$rwf$2d$next$2d$app$2f$components$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].toggle,
                    "aria-label": "Menu",
                    onClick: toggleMenu,
                    children: isMenuOpen ? '✕' : '☰'
                }, void 0, false, {
                    fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
                    lineNumber: 156,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
            lineNumber: 85,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/downloads/rwfhomeimprovements/rwf-next-app/components/Navbar.tsx",
        lineNumber: 84,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7577430f._.js.map