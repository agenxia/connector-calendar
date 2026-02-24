export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const configured = !!(process.env.GCAL_CLIENT_ID && process.env.GCAL_CLIENT_SECRET && process.env.GCAL_REFRESH_TOKEN);
  res.status(200).json({
    success: true,
    data: { connector: 'google-calendar', status: configured ? 'running' : 'unconfigured', timestamp: new Date().toISOString() },
  });
}
