import { saveAs } from 'file-saver';
import { DateTime } from 'luxon';

export const exportICS = (startDate, fitnessLevel, targetTime, plan) => {
  let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Organization//Your Product//EN\n';

  Object.keys(plan).forEach((phase) => {
    plan[phase].forEach((week) => {
      week.days.forEach((day) => {
        const eventDate = DateTime.fromJSDate(startDate).plus({ weeks: week.weekNumber - 1, days: day.day });
        const start = eventDate.toFormat('yyyyMMdd');
        let summary = `Week ${week.weekNumber} - ${day.title}`;
        if (day.distance > 0) {
          summary += ` - ${day.distance} km`;
        }
        let description = day.description;

        // Add options to description
        if (day.options && day.options.length > 0) {
          description += `\n\nAdditional Information:\n${day.options.map(option => `• ${option}`).join('\n')}`;
        }

        console.log('Event Description:', description);

        const event = `
BEGIN:VEVENT
DTSTART;VALUE=DATE:${start}
SUMMARY:${summary}
DESCRIPTION:${description}
END:VEVENT
`;
        icsContent += event;
      });
    });
  });

  icsContent += 'END:VCALENDAR';

  console.log('ICS content:', icsContent);

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  saveAs(blob, 'training-plan.ics');
};