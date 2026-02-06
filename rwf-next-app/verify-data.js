const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

function checkFile(filename, checks) {
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
        console.error(`[FAIL] ${filename} not found`);
        return;
    }

    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let allPass = true;
        checks.forEach(check => {
            const val = data[check.field];
            if (!val || (Array.isArray(val) && val.length === 0)) {
                console.error(`[FAIL] ${filename}: Missing or empty '${check.field}'`);
                allPass = false;
            } else {
                if (check.subField && Array.isArray(val)) {
                    const missingSub = val.find(item => !item[check.subField]);
                    if (missingSub) {
                        console.error(`[FAIL] ${filename}: Item in '${check.field}' missing '${check.subField}'`);
                        allPass = false;
                    } else {
                        console.log(`[PASS] ${filename}: Has '${check.field}' (${val.length} items, all have '${check.subField}')`);
                    }
                } else {
                    console.log(`[PASS] ${filename}: Has '${check.field}' (${Array.isArray(val) ? val.length + ' items' : 'present'})`);
                }
            }
        });
        if (allPass) console.log(`[OK] ${filename} PASS`);
    } catch (e) {
        console.error(`[ERROR] ${filename}: Invalid JSON - ${e.message}`);
    }
}

console.log("Starting Data Verification...\n");

checkFile('window-installation.json', [
    { field: 'benefits' },
    { field: 'serviceOptions', subField: 'link' },
    { field: 'processSteps' }
]);

checkFile('door-installation.json', [
    { field: 'processSteps' },
    { field: 'benefits' },
    { field: 'serviceOptions', subField: 'link' }
]);

checkFile('deck-installation.json', [
    { field: 'benefits' },
    { field: 'serviceOptions', subField: 'link' },
    { field: 'features' }
]);

checkFile('service-area.json', [
    { field: 'primaryAreas' },
    { field: 'surroundingAreas' }
]);
