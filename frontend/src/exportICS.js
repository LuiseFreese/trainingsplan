export const exportICS = async (startDate, fitnessLevel, targetTime) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ics?folder=500&startDate=${startDate.toISOString().split('T')[0]}&fitnessLevel=${fitnessLevel}&targetTime=${targetTime}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch ICS data');
      }
      const icsText = await response.text();
  
      // Create a blob for the ICS file
      const blob = new Blob([icsText], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
  
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'trainingplan.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export ICS error:', err);
    }
  };