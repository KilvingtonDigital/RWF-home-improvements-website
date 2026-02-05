const { chromium } = require('playwright');

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await chromium.launch();
        const page = await browser.newPage();

        console.log('Navigating to page...');
        await page.goto('http://localhost:3001/finance', { waitUntil: 'networkidle' });

        // Force a viewport size to ensure responsive layout (desktop)
        await page.setViewportSize({ width: 1400, height: 1200 });

        console.log('Taking screenshot...');
        await page.screenshot({ path: 'finance_verification.png', fullPage: true });

        await browser.close();
        console.log('Screenshot saved to finance_verification.png');
    } catch (error) {
        console.error('Error taking screenshot:', error);
        process.exit(1);
    }
})();
