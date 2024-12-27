const { createEvents } = require('ics');
const { parseHTML } = require('./htmlService');

const generateICS = async () => {
    const weeks = await parseHTML();
    const events = [];

    weeks.forEach((week, weekIndex) => {
        week.forEach((day, dayIndex) => {
            const { title, description, price } = day;
            const date = new Date(2024, 11, 9 + weekIndex * 7 + dayIndex); // Adjust the start date as needed
            events.push({
                start: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
                duration: { days: 1 },
                title: title,
                description: description,
                location: '',
            });
        });
    });

    console.log('Events:', events);

    return new Promise((resolve, reject) => {
        createEvents(events, (error, value) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
};

module.exports = { generateICS };