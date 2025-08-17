# Todo Job — Job Applications Tracker (MERN + Vite + TypeScript)

A full‑stack application for tracking job applications (roles, companies, statuses, notes, and timelines). The project is organized as a monorepo with `frontend/` (Vite + React + TS + Tailwind) and `backend/` (Node.js + Express + TypeScript + MongoDB).

> Live Demo (Frontend): **[https://job-tracker-two-blond.vercel.app](https://job-tracker-two-blond.vercel.app)**

---

## ✨ Features

* **Authentication**: Sign up, Sign in, Sign out (express-session based).
* **Jobs CRUD**: Create, Read, Update, Delete job entries.
* **Filtering & Search**: Filter by status, type, and date ranges (e.g., Applied / Interview / Rejected).
* **Sorting & Pagination** for longer lists.
* **Responsive UI** built with TailwindCSS.
* **Production proxying**: Frontend `/api/*` requests are proxied to the deployed backend (Vercel/Netlify rewrites).


---

## 🧱 Tech Stack

**Frontend**

* React, TypeScript, Vite
* TailwindCSS

**Backend**

* Node.js, Express, TypeScript
* MongoDB (+ Mongoose)
* JWT for auth, bcrypt for password hashing

**DevOps / Deployment**

* Vercel
* Render

---

## 📁 Monorepo Structure

```
Todo_Job/
├── frontend/            # Vite + React + TS + Tailwind app
│   ├── src/
│   ├── index.html
│   ├── vite.config.ts
│   └── ...
└── backend/             # Express + TS API server
    ├── src/
    │   ├── index.ts     # app bootstrap
    │   ├── routes/      # /api routes (auth, jobs)
    │   ├── controllers/
    │   ├── models/
    │   └── middleware/
    ├── tsconfig.json
    └── ...
```

*Exact filenames may differ—use as a high‑level guide.*

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```bash
# Server
PORT=3000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# Auth
JWT_SECRET=<your-strong-secret>
JWT_EXPIRES_IN=7d

# CORS
ORIGIN=https://your-frontend-domain.vercel.app
```

### Frontend (`frontend/.env`)

If you prefer **direct calls** (no platform proxy):

```bash
VITE_API_URL=https://your-backend.onrender.com/api
```

Then call APIs using `import.meta.env.VITE_API_URL`.

If you prefer **proxying** everywhere (recommended), keep calls as `fetch('/api/...')` and configure **rewrites** on your hosting platform (see Deployment below).

---

## 🧪 Local Development

### 1) Clone and install

```bash
# in your workspace
git clone https://github.com/Adrijchakraborty/Todo_Job.git
cd Todo_Job

# frontend
cd frontend
npm install

# backend (open another terminal)
cd ../backend
npm install
```

### 2) Configure environment

* Create `backend/.env` with all required vars (see above).
* Optionally create `frontend/.env` if you’re not using proxy locally.

### 3) Run locally

**Backend** (TypeScript):

```bash
# from /backend
npm run dev        # ts-node-dev / nodemon (watch mode)
# or
npm run build && npm start   # transpile to /dist then run Node
```

**Frontend**:

```bash
# from /frontend
npm run dev        # starts Vite dev server
```

### 4) Dev proxy (Vite)

Configure `vite.config.ts`:

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // backend PORT
    }
  }
});
```

Now `fetch('/api/...')` will hit the backend during local development.

---

## 🚀 Build & Deployment

### Frontend (Vercel)

Create `vercel.json` in the repo root (or frontend root if deploying that folder):

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://your-backend.onrender.com/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

* Proxies **all** `/api/*` requests to the backend (so your code can `fetch('/api/...')`).
* SPA fallback so direct reloads on routes like `/auth` work.

If your repo is a monorepo, set the project root to `frontend/` in Vercel, and build command/output accordingly (e.g., `npm run build`, output `dist`).

### Frontend (Netlify)

Create `public/_redirects` in `frontend/`:

```
# Proxy API
/api/*  https://your-backend.onrender.com/api/:splat  200

# SPA fallback
/*      /index.html   200
```

Ensure **Publish directory** is `frontend/dist` after building.

### Backend (Render)

* Create a new **Web Service** on Render.
* Set **Build Command** to `npm install && npm run build`.
* Set **Start Command** to `node dist/index.js` (adjust path if different).
* Add Environment Variables from the Backend section.
* (Optional) Turn on **Auto Deploy** from the `main` branch.

---

## 🔌 API Overview

Base URL

```
# local (vite proxy)
http://localhost:5173/api -> http://localhost:3000/api

# production (rewrites)
https://your-frontend.vercel.app/api -> https://your-backend.onrender.com/api
```

### Auth

**POST** `/api/auth/register`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "strongpassword"
}
```

**POST** `/api/auth/login`

```json
{
  "email": "jane@example.com",
  "password": "strongpassword"
}
```

*Response*

```json
{
  "token": "<jwt>",
  "user": { "_id": "...", "name": "Jane Doe", "email": "jane@example.com" }
}
```

### Jobs

**GET** `/api/jobs`
**POST** `/api/jobs`

```json
{
  "position": "Frontend Developer",
  "company": "Acme Inc",
  "status": "applied",     // applied | interview | rejected | offer
  "type": "full-time",     // full-time | part-time | contract | internship
  "location": "Remote",
  "notes": "Referred by Alice"
}
```

**PATCH** `/api/jobs/:id`
**DELETE** `/api/jobs/:id`

> *Secured routes* require `Authorization: Bearer <jwt>` header.

---

## 🔐 Security & Best Practices

* Store secrets only in `.env` (never commit them).
* Use HTTPS everywhere in production.
* Set `SameSite` and `Secure` flags if you switch to cookie‑based auth.
* Validate inputs on both client & server.
* Implement rate limiting on auth routes (e.g., `/auth/login`).

---

## 🧰 Useful Scripts (suggested)

**Frontend**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Backend**

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/index.js"
  }
}
```

*Adjust these to match your package.json files.*

---

## 🪲 Troubleshooting

* **Frontend shows `{ "error": { "code": 404, ... } }`** after deploy → Your `/api` calls are not proxied. Add the Vercel/Netlify rewrites above.
* **CORS errors** in browser console → Ensure `ORIGIN` (frontend URL) is allowed in backend `cors()` config.
* **`process` or types errors in TS** → Add `@types/node` and ensure `tsconfig.json` has the correct `lib` and `types`.
* **Render cold starts** → First API call after idling may be slow; consider Render Pro or keep‑alive pings.

---

## 📸 Screenshots

*Add screenshots or GIFs of the dashboard, job form, and filters here.*

```
frontend/public/
  ├── screenshot-dashboard.png
  └── screenshot-job-form.png
```

Embed in README:

```md
![Dashboard](./frontend/public/screenshot-dashboard.png)
```

---

## 🗺️ Roadmap / TODO

* Job timelines & reminders
* CSV import/export
* Advanced analytics (per company, response rates)
* Role‑based access or shared boards
* E2E tests (Playwright / Cypress)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss major changes, and feel free to submit a PR.

---

## 📝 License

This project is licensed under the **MIT License**. See `LICENSE` for details.

---

## 🙌 Acknowledgements

* Vite, React, TailwindCSS
* Express, Mongoose
* Vercel, Render (free tiers)

---

### Maintainer

**Adrij Chakraborty**
Feel free to reach out for suggestions or improvements.
