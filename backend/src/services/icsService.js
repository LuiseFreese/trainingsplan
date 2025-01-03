const fs = require('fs');
const path = require('path');
const { createEvents } = require('ics');

const generateICS = async (trainingPlanFolder, startDate) => {
    try {
        // Adjust the path to correctly reference the JSON file
        const filePath = path.join(__dirname, `../../../assets/output/gen-trainingplan-M-${trainingPlanFolder}.json`);
        console.log(`Reading file from: ${filePath}`);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log('JSON data:', jsonData);

        const events = [];
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        Object.keys(jsonData).forEach(phase => {
            jsonData[phase].forEach(week => {
                week.days.forEach(day => {
                    const { title, description, options, distance } = day;
                    const eventDate = new Date(startDate);
                    eventDate.setDate(eventDate.getDate() + (week.weekNumber - 1) * 7 + daysOfWeek.indexOf(day.label));

                    const eventDescription = `${description}\n\n${options.join('\n')}\n\nDistance: ${distance} km`;

                    events.push({
                        start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate()],
                        duration: { days: 1 },
                        title: `Week ${week.weekNumber} - ${title}`,
                        description: eventDescription,
                        location: '',
                        status: 'CONFIRMED',
                        busyStatus: 'FREE',
                    });
                });
            });
        });

        console.log('Events:', events);

        return new Promise((resolve, reject) => {
            createEvents(events, (error, value) => {
                if (error) {
                    console.error('Error creating events:', error);
                    reject(error);
                } else {
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