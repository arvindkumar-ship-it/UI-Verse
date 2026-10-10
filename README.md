# UI-Verse

Set VITE_API_URL to the hackathon-platform API origin and VITE_EVENT_SLUG to a configured event. This repository is a frontend companion. Auth/refresh, team, upload scanning, certificates and admin permissions require the live API; a bundle build does not validate those journeys.

## Verification

```sh
npm ci
npm run build
```

[Audit fixes and limits](AUDIT_FIXES.md).
