const { getPageData } = require('./lib/cms');

const filesToCheck = ['window-installation', 'door-installation', 'service-area', 'deck-installation'];

filesToCheck.forEach(slug => {
    try {
        console.log(`\n--- DEBUGGING: ${slug} ---`);
        const data = getPageData(slug);
        console.log('Title found:', !!data.title, data.title);
        console.log('Content length:', data.content ? data.content.length : 0);
        console.log('Has benefits:', !!data.benefits, data.benefits?.length);
        console.log('Has features:', !!data.features, data.features?.length);
        console.log('Has serviceOptions:', !!data.serviceOptions, data.serviceOptions?.length);
        console.log('Has processSteps:', !!data.processSteps, data.processSteps?.length);
        console.log('Has primaryAreas:', !!data.primaryAreas);
    } catch (error) {
        console.error(`Error fetching ${slug}:`, error);
    }
});
