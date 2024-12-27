const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const parseHTML = async () => {
    const weeks = [];
    const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

    for (let week = 2; week <= 16; week++) {
        const fileName = week === 16 ? '–RACE WEEK– — KRAFT Runners.html' : `–Woche ${week}– — KRAFT Runners.html`;
        const filePath = path.join(__dirname, '../assets', fileName);
        console.log(`Reading file: ${filePath}`);
        const html = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(html);

        const weekData = [];
        weekdays.forEach((day) => {
            const dayPanel = $(`div[aria-label="${day}"]`);
            const title = dayPanel.find('.menu-item-title').first().text().trim();
            let description = dayPanel.find('.menu-item-description').first().text().trim().substring(0, 20);
            let options = dayPanel.find('.menu-item-option').map((i, el) => {
                const optionText = $(el).text().trim();
                const link = $(el).find('a').attr('href');
                return link ? `${optionText} ${link}` : optionText;
            }).get().join('\n');
            description += '\n' + options;
            const price = dayPanel.find('.menu-item-price-top').text().trim() || dayPanel.find('.menu-item-price-bottom').text().trim();
            console.log(`Week ${week}, Day ${day}: Title: ${title}, Description: ${description}, Price: ${price}`);
            weekData.push({ title, description, price });
        });

        console.log(`Week ${week} data:`, weekData);
        weeks.push(weekData);
    }

    return weeks;
};

module.exports = { parseHTML };