
const { getPageData } = require('./lib/cms');

try {
    const data = getPageData('about-us');
    console.log('--- DATA DEBUG ---');
    console.log('Title:', data.title);
    console.log('Content Length:', data.content.length);
    console.log('First 100 chars of content:', data.content.substring(0, 100));
} catch (error) {
    console.error('Error fetching data:', error);
}
