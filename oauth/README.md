# Decap CMS GitHub OAuth Helper (Vercel)

This directory contains a minimal OAuth helper for Decap CMS using the GitHub backend.

## Routes

- `GET /auth` starts GitHub OAuth.
- `GET /auth/callback` completes OAuth and returns the Decap auth message.

`vercel.json` rewrites `/auth` and `/auth/callback` to the serverless API handlers.

## Required Environment Variables

- `GITHUB_CLIENT_ID`: GitHub OAuth App client ID.
- `GITHUB_CLIENT_SECRET`: GitHub OAuth App client secret.
- `ORIGIN`: Your CMS site origin, for example `https://rivermarkgroup.org`.

## GitHub OAuth App Setup

1. In GitHub, create an OAuth App.
2. Set Homepage URL to `https://rivermarkgroup.org`.
3. Set Authorization callback URL to `https://<your-oauth-host>/auth/callback`.
4. Copy the generated client ID and client secret.

## Deploy to Vercel (Free)

1. Create a new Vercel project and point it to this `oauth/` directory.
2. Add env vars:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `ORIGIN=https://rivermarkgroup.org`
3. Deploy.
4. Note the deployment host, then set Decap `base_url` to `https://<your-oauth-host>` and `auth_endpoint` to `auth`.
