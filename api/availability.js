import { getCalendarClient } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { timeMin, timeMax, calendarId = 'primary' } = req.body;
  if (!timeMin || !timeMax) {
    return res.status(400).json({ success: false, error: 'timeMin and timeMax are required' });
  }

  try {
    const calendar = await getCalendarClient();
    const result = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
      },
    });
    const busy = result.data.calendars[calendarId]?.busy || [];
    res.status(200).json({
      success: true,
      data: { busy, free: busy.length === 0, checked: { timeMin, timeMax } },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to check availability: ' + error.message });
  }
}
