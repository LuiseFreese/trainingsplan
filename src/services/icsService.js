const xlsx = require('xlsx');
const { createEvents } = require('ics');
const path = require('path');

const generateICS = async () => {
    try {
        const filePath = path.join(__dirname, '../assets/trainingsplan_test.xlsx');
        console.log(`Reading file from: ${filePath}`);
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        console.log('Excel data:', data);

        const headers = data[0];
        const rows = data.slice(1);

        const events = [];

        headers.forEach((header, index) => {
            rows.forEach((row) => {
                const description = row[index];
                if (!description) return; // Skip if description is empty

                const dateParts = header.split('.');
                const day = parseInt(dateParts[0], 10);
                const month = parseInt(dateParts[1], 10);
                const year = parseInt(dateParts[2], 10);

                const title = description.split('\n')[0];

                events.push({
                    start: [year, month, day],
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