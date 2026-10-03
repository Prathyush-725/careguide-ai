# CareGuide AI

CareGuide AI is an AI-assisted patient education and appointment-preparation app. People can enter a health topic, symptom, diagnosis, test, medication, or visit concern and receive a plain-language explanation plus questions to take to a clinician.

**Educational information only.** CareGuide AI does not diagnose, treat, prescribe, or replace professional medical advice. If you have an emergency, use local emergency services.

## Local educational mode and public demo — not for real patient data

This project is for class demonstration. The REST API is **not authenticated**. Anyone who can reach the service can read and change the profile and history store.

**This application is not suitable for real patients, medical records, or PHI.** A production healthcare product would still need authentication, authorization, HTTPS sessions, and a secured database.

### Local development

`npm run dev` in `backend` binds to `127.0.0.1:4000` by default. Local profile and history live in `backend/data/store.json` (gitignored). Do not commit that file.

### Public demo mode (production / App Runner)

`npm start` sets `NODE_ENV=production`. That enables **demo mode**:

- Binds to `0.0.0.0` and `process.env.PORT` (8080 if PORT is unset)
- Serves the Vite production build and `/api` from one origin
- Uses `backend/data/demo-store.json`, never your local `store.json`
- Starts with a generic “Alex Morgan” profile, empty email, and empty history
- Treats storage as temporary educational sample data that can reset at any time

Do not type real names, emails, or personal health information into a public demo URL.

## Features

- Dashboard with saved-item counts and shortcuts
- Health topic and medical-term explainer
- Appointment preparation assistant
- Provider question generator
- Saved history (local JSON file)
- User profile and preferences
- Form validation, loading states, and error handling
- Mobile-responsive healthcare-style interface
- Persistent medical safety disclaimer

Unmatched topics stay clearly educational. CareGuide will not invent a diagnosis when a phrase is not in the sample library.

Appointment-prep reminders are a **saved preference only**. The app does not send email, text, or calendar notifications.

## Project structure

```text
backend/                  Express REST API
  src/config/             Environment configuration
  src/controllers/        Route handlers
  src/data/               Local store + knowledge base
  src/middleware/         Validation and errors
  src/models/             Shared data shapes
  src/routes/             REST routes
  src/services/           AI service layer (mock by default)
frontend/                 React + Vite client
  src/components/         Reusable UI
  src/hooks/              Form and request helpers
  src/models/             Display labels
  src/pages/              Feature screens
  src/services/           API client
```

## Requirements

- Node.js 18 or newer
- npm

## Quick start

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

In a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Environment variables

See `backend/.env.example` and `frontend/.env.example`.

| Variable | Where | Purpose |
| --- | --- | --- |
| `HOST` | backend | Bind address (`127.0.0.1` locally, `0.0.0.0` in production) |
| `PORT` | backend | Listen port (`4000` locally, App Runner injects this; production default `8080`) |
| `NODE_ENV` | backend | `production` enables demo mode and static frontend hosting |
| `DEMO_MODE` | backend | Force demo store even outside production |
| `CLIENT_ORIGIN` | backend | Allowed Vite origin in local development only |
| `AI_PROVIDER` | backend | `mock` (default) |
| `OPENAI_API_KEY` | backend | Optional future live-model key; never send to the browser |
| `DATABASE_URL` | backend | Reserved for PostgreSQL |
| `DATA_FILE` | backend | Local JSON file name inside `backend/data/` only (ignored in demo mode) |
| `VITE_API_URL` | frontend | REST base URL. Production build uses `/api` |

## API overview

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Service check |
| GET | `/api/dashboard` | Greeting, stats, shortcuts |
| POST | `/api/explain` | Plain-language explanation |
| GET | `/api/explain/topics` | Knowledge catalog |
| POST | `/api/appointments` | Visit preparation plan |
| POST | `/api/questions` | Provider question list |
| GET | `/api/history` | Saved items |
| GET | `/api/history/:id` | Saved item detail |
| DELETE | `/api/history/:id` | Remove a saved item |
| GET | `/api/profile` | Local user profile |
| PUT | `/api/profile` | Update profile |

## Single-service production (AWS App Runner)

One process, one public URL. Express serves `/api/*` and the React app.

From the repository root:

```bash
npm run build
npm start
```

- `npm run build` installs frontend and backend dependencies and builds the Vite app into `frontend/dist`
- `npm start` runs `NODE_ENV=production node backend/src/index.js`

The production client calls relative URLs such as `/api/dashboard`. It does not hardcode `localhost:4000`.

Local production check:

```bash
npm run build
PORT=8080 npm start
```

Then open [http://127.0.0.1:8080](http://127.0.0.1:8080). Refresh `/explain`, `/appointment`, `/questions`, `/history`, and `/profile` to confirm SPA fallback.

### App Runner settings

| Setting | Value |
| --- | --- |
| Source | this repository root |
| Build command | `npm run build` |
| Start command | `npm start` |
| Port | `8080` (or the `PORT` value App Runner provides) |
| Environment | `NODE_ENV=production` is set by `npm start` |

Do not upload `.env`, `backend/data/store.json`, or personal history. Those paths are gitignored.

`apprunner.yaml` encodes the same build/start/port values.

## Local security controls

- Helmet HTTP headers on the API (stricter CSP in production)
- CORS limited to `CLIENT_ORIGIN` in local development; production is same-origin and does not enable open CORS
- JSON body size cap (100kb)
- JSON-only write requests
- Server-side validation and input sanitization
- Safe error messages (no stack traces)
- Data file path confined to `backend/data/`
- `.env` and `store.json` gitignored

## License

For local demonstration and education use.
