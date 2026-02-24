# Google Calendar Connector

Create events, list upcoming schedule, and check availability.

## Endpoints

- `GET /api/events` — List upcoming events
- `POST /api/events` — Create an event
- `POST /api/availability` — Check free/busy
- `GET /api/status` — Connector health

## Environment Variables

| Variable | Description |
|----------|-------------|
| GCAL_CLIENT_ID | Google OAuth2 client ID |
| GCAL_CLIENT_SECRET | Google OAuth2 client secret |
| GCAL_REFRESH_TOKEN | OAuth2 refresh token |
