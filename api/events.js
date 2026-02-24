import { getCalendarClient } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // List upcoming events
    const { maxResults = 10, calendarId = 'primary' } = req.query;
    try {
      const calendar = await getCalendarClient();
      const result = await calendar.events.list({
        calendarId,
        timeMin: new Date().toISOString(),
        maxResults: parseInt(maxResults),
        singleEvents: true,
        orderBy: 'startTime',
      });
      const events = (result.data.items || []).map((e) => ({
        id: e.id,
        summary: e.summary,
        start: e.start?.dateTime || e.start?.date,
        end: e.end?.dateTime || e.end?.date,
        location: e.location,
        status: e.status,
      }));
      return res.status(200).json({ success: true, data: { events, total: events.length } });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to list events: ' + error.message });
    }
  }

  if (req.method === 'POST') {
    // Create event
    const { summary, description, start, end, location, calendarId = 'primary' } = req.body;
    if (!summary || !start || !end) {
      return res.status(400).json({ success: false, error: 'summary, start, and end are required' });
    }
    try {
      const calendar = await getCalendarClient();
      const result = await calendar.events.insert({
        calendarId,
        requestBody: {
          summary,
          description,
          location,
          start: { dateTime: start, timeZone: 'UTC' },
          end: { dateTime: end, timeZone: 'UTC' },
        },
      });
      return res.status(201).json({ success: true, data: { event_id: result.data.id, link: result.data.htmlLink } });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to create event: ' + error.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
