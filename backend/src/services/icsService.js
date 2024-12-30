const fs = require('fs');
const path = require('path');
const { createEvents } = require('ics');
const { parseHTML } = require('./htmlService');

const generateICS = async (trainingPlanFolder, startDate) => {
    try {
        const weeks = await parseHTML(trainingPlanFolder);
        const events = [];

        weeks.forEach((week) => {
            week.days.forEach((day) => {
                const { title, description, options } = day;
                const date = new Date(startDate);
                date.setDate(date.getDate() + (week.weekNumber - 1) * 7 + ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].indexOf(day.day));
                let eventDescription = `${description}\n\n${options.join('\n\n')}`;
                const soundcloudLink = options.find(option => option.includes('https://soundcloud.com/'));
                if (soundcloudLink) {
                    eventDescription = eventDescription.replace(`Set Empfehlung ${soundcloudLink}`, '').trim(); 
                }
                events.push({
                    start: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
                    duration: { days: 1 },
                    title: `Week ${week.weekNumber} - ${title}`, 
                    description: eventDescription,
                    location: '',
                    status: 'CONFIRMED',
                    busyStatus: 'FREE', 
                });
            });
        });

        console.log('Events:', events);

        return new Promise((resolve, reject) => {
            createEvents(events, (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    const outputDir = path.join(__dirname, `../../assets/output`);
                    if (!fs.existsSync(outputDir)) {
                        fs.mkdirSync(outputDir, { recursive: true });
                    }
                    const outputFilePath = path.join(outputDir, `trainingplan-M-${trainingPlanFolder}.ics`);
                    fs.writeFileSync(outputFilePath, value);
                    console.log(`ICS file written to: ${outputFilePath}`);
                    resolve(value);
                }
            });
        });
    } catch (error) {
        console.error('Error generating ICS:', error);
        throw error;
    }
};

module.exports = { generateICS };