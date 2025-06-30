/**
 * @param {object} project
 * @param {string} accessToken
 */
export async function addProjectToGoogleCalendar(project, accessToken) {
  if (!accessToken) {
    console.error("Access Token Google Calendar tidak tersedia.");
    return;
  }

  const event = {
    summary: `Deadline: ${project.name}`,
    description: project.description,
    start: {
      date: project.deadline,
      timeZone: 'Asia/Jakarta',
    },
    end: {
      date: project.deadline,
      timeZone: 'Asia/Jakarta',
    },
  };

  console.log("Mengirim event ke Google Calendar:", event);
  await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(event)
  });
  
  return { success: true, message: `Placeholder: Proyek ${project.name} ditambahkan ke kalender.` };
}