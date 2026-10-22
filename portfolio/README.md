# Prathmesh Nandawdekar — Portfolio (React + Express)

## Run locally
```bash
cd backend && cp .env.example .env && npm install && npm run dev     # http://localhost:5000
cd frontend && cp .env.example .env && npm install && npm run dev    # http://localhost:5173
```
Vite proxies `/api` to the backend in development.

## Edit content
Everything is in `frontend/src/data/content.js`. GitHub links on both projects currently point to your profile because the resume gives no repo URLs: replace them with the repo links.

## Resume download
`frontend/public/resume.docx` is your uploaded resume. For a PDF, drop `resume.pdf` into `frontend/public/` and set `resume: '/resume.pdf'` in `content.js`.

## Contact form
Without SMTP settings the API validates, logs the message to the server console, and replies `delivered:false`; the site then tells the visitor it was NOT sent. To send real email, fill `SMTP_*` and `CONTACT_TO` in `backend/.env` (Gmail: use an app password). Protection: honeypot field, 5 requests / 15 min / IP, 10 KB body limit, server-side validation, Helmet.

## Deploy
- Backend (Render/Railway): root `backend`, start `npm start`, set `CLIENT_ORIGIN` to your frontend URL plus SMTP vars.
- Frontend (Vercel/Netlify): root `frontend`, build `npm run build`, output `dist`, set `VITE_API_URL` to the backend URL.

## Troubleshooting
CORS error: `CLIENT_ORIGIN` must exactly match the frontend origin (no trailing slash). Form says "Could not reach the server": check `VITE_API_URL` and that the backend is running.
