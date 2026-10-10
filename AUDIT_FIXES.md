# Companion frontend setup

Repair branch: `fix/internship-audit-20261010`. Changes are scoped to audit findings; no deployment or live provider action is included.

## Changed

Replaced the generic scaffold README with the actual API/environment requirements and feature scope. Added a safe Vite environment example and reproducible build CI.

## Verification

`npm ci; npm run build`

Commands are entry points, not a claim that every live integration was executed. See the repair bundle for actual results.

## Setup and remaining evidence

Set VITE_API_URL to the hackathon-platform API origin and VITE_EVENT_SLUG to a configured event. This repository is a frontend companion. Auth/refresh, team, upload scanning, certificates and admin permissions require the live API; a bundle build does not validate those journeys.
