import { google } from 'googleapis';

let cachedClient = null;

export async function getCalendarClient() {
  if (cachedClient) return cachedClient;

  const oauth2 = new google.auth.OAuth2(
    process.env.GCAL_CLIENT_ID,
    process.env.GCAL_CLIENT_SECRET,
  );
  oauth2.setCredentials({ refresh_token: process.env.GCAL_REFRESH_TOKEN });

  cachedClient = google.calendar({ version: 'v3', auth: oauth2 });
  return cachedClient;
}
