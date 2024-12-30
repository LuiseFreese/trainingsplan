const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const parseHTML = async (trainingPlanFolder) => {
    const weeks = [];
    const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

    for (let week = 1; week <= 16; week++) {
        const fileName = week === 16 ? '–RACE WEEK– — KRAFT Runners.html' : `–Woche ${week}– — KRAFT Runners.html`;
        const filePath = path.join(__dirname, `../../assets/${trainingPlanFolder}`, fileName);
        console.log(`Reading file: ${filePath}`);
        const html = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(html);

        const weekData = { weekNumber: week, weekKM: 0, days: [] };

        // Correct the weekdays array for the first week of the 5:00 training plan
        const currentWeekdays = (trainingPlanFolder === '500' && week === 1) ? ['Mo', 'Mi', 'Mi', 'Do', 'Fr', 'Sa', 'So'] : weekdays;

        currentWeekdays.forEach((day, index) => {
            // Handle the typo in the first week of the 5:00 training plan
            const correctedDay = (trainingPlanFolder === '500' && week === 1 && index === 1) ? 'Di' : day;
            const dayPanel = $(`div[aria-label="${correctedDay}"]`);
            const mainTitle = dayPanel.closest('.menu').find('.menu-section-title').first().text().trim();
            const title = `${mainTitle} - ${dayPanel.find('.menu-item-title').first().text().trim()}`;
            const description = dayPanel.find('.menu-item-description').first().text().trim().replace(/\n/g, ' ');
            let options = dayPanel.find('.menu-item-option').map((i, el) => {
                const optionText = $(el).text().trim().replace(/\n/g, ' ');
                const link = $(el).find('a').attr('href');
                return link ? `${optionText} ${link}` : optionText;
            }).get().filter(option => option !== ""); // Filter out empty options

            const prices = dayPanel.find('.menu-item-price-top').map((i, el) => $(el).text().trim().replace('$', '').trim()).get();
            const priceData = {};
            prices.forEach(price => {
                if (price.includes('Minuten')) {
                    priceData.duration = `${price.replace('Minuten', '').trim()} Minuten`;
                } else if (price.includes('km')) {
                    priceData.distance = `${price.replace('km', '').trim()} km`;
                    weekData.weekKM += parseFloat(price.replace('km', '').trim().replace(',', '.'));
                }
            });

            console.log(`Week ${week}, Day ${correctedDay}: MainTitle: ${mainTitle}, Title: ${title}, Description: ${description}, Options: ${JSON.stringify(options)}, Price Data: ${JSON.stringify(priceData)}`);
            if (!(trainingPlanFolder === '500' && week === 1 && index === 1)) {
                weekData.days.push({ day: correctedDay, title, description, options, ...priceData });
            }

            // Special case for the first week of the 5:00 training plan
            if (trainingPlanFolder === '500' && week === 1 && index === 1) {
                // Add the same data for "Di" (Tuesday) with the correct title and options
                weekData.days.push({ day: 'Di', title: "RUHETAG - Chillen", description: "Wir wollen die erste Woche nutzen, um in den Plan reinzukommen und den Körper an die Belastung der bevorstehenden Wochen zu gewöhnen. Der heutige Tag gibt euch die Möglichkeit euch zu entspannen.", options: [
                    "Sehr gerne könnt ihr diesen Tag auch für ein alternatives Training nutzen. Yoga, aktives Stretchen, Krafttraining zu Hause oder im Gym finden heute im Plan Platz.",
                    "Regelmäßiges Beweglichkeitstraining (sogenannten Lauf-ABC) vor und Stretching nach dem Laufen sowie Mobility Übungen an trainingsfreien Tagen helfen euch weiterhin gesund und verletzungsfrei zu laufen.",
                    "zu den Workouts https://kraftrunners.de/wiki-landingpage",
                    "zu den Videos https://kraftrunners.de/training/stretching-mobility"
                ] });
                // Add an empty entry for "Mi" (Wednesday)
                weekData.days.push({ day: 'Mi', title: "RUHETAG - Chillen", description: "", options: [] });
            }
        });

        // Round weekKM to one decimal place
        weekData.weekKM = parseFloat(weekData.weekKM.toFixed(1));

        console.log(`Week ${week} data:`, weekData);
        weeks.push(weekData);
    }

    return weeks;
};

module.exports = { parseHTML };