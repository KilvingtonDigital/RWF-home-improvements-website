import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "slide-in-from-bottom-4": {
                    "0%": { transform: "translateY(1rem)" },
                    "100%": { transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.5s ease-out",
                "in": "fade-in 0.5s ease-out", // shortcut
            },
        },
    },
    plugins: [],
};
export default config;
