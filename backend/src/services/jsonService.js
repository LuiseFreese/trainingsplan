const fs = require('fs');
const path = require('path');
const { parseHTML } = require('./htmlService');

const generateJSON = async (trainingPlanFolder) => {
    try {
        console.log('Starting JSON generation...');
        const weeks = await parseHTML(trainingPlanFolder);
        console.log('HTML parsing completed. Data:', JSON.stringify(weeks, null, 2));

        const outputDir = path.join(__dirname, `../../../frontend/output`);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputFilePath = path.join(outputDir, `trainingplan-M-${trainingPlanFolder}.json`);
        fs.writeFileSync(outputFilePath, JSON.stringify(weeks, null, 2));
        console.log(`Training plan data written to: ${outputFilePath}`);

        return weeks;
    } catch (error) {
        console.error('Error generating JSON:', error);
        throw error;
    }
};

module.exports = { generateJSON };