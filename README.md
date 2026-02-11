# rivermarkgroup-site
Astro + Tailwind site for rivermarkgroup.org.

## Development
- Install dependencies: `npm install`
- Run locally: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Content
- Work case studies: `src/content/work`
- Insights posts: `src/content/insights`

## Assets
Static assets live in `public/`.

## Decap CMS
- Admin URL: `https://rivermarkgroup.org/admin`
- Admin files:
  - `public/admin/index.html`
  - `public/admin/config.yml`

### Configure `public/admin/config.yml`
Update these placeholders before using CMS auth:
- `backend.repo`: set to `<OWNER>/<REPO>` (example: `rivermarkgroup/rivermarkgroup-site`)
- `backend.base_url`: set to your deployed OAuth helper URL (`https://<your-oauth-host>`)
- `backend.auth_endpoint`: set to `auth` (already configured for the provided OAuth helper)

### OAuth helper deployment (Vercel)
An OAuth helper app is provided in `oauth/`.

1. Create a GitHub OAuth App:
   - Homepage URL: `https://rivermarkgroup.org`
   - Authorization callback URL: `https://<your-oauth-host>/auth/callback`
2. Deploy `oauth/` as a Vercel project.
3. Set environment variables in Vercel:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `ORIGIN=https://rivermarkgroup.org`
4. Copy the Vercel URL into `public/admin/config.yml` as `backend.base_url`.

See `oauth/README.md` for route details.

### Editorial Workflow
- `publish_mode: editorial_workflow` is enabled.
- New/edited entries can be saved as unpublished changes first.
- Publishing in Decap merges the editorial branch/PR flow back into `main`.
- Site deploy stays on GitHub Pages; pushes to `main` continue to trigger the existing workflow.

### Media Uploads
- Decap uploads files into `public/uploads`.
- Public URLs resolve from `/uploads/...`.
