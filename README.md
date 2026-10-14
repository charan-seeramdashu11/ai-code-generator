# AI Code Generator

A full-stack project that generates code from natural-language prompts.

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB (stores prompt history)
- **AI:** OpenAI Chat Completions API (swap for any provider you like)

## Project structure

```
ai-code-generator/
  backend/
    config/db.js
    controllers/generateController.js
    models/Generation.js
    routes/generate.js
    server.js
    package.json
    .env.example
  frontend/
    public/index.html
    src/
      components/CodeGeneratorForm.js
      components/CodeOutput.js
      components/HistoryList.js
      services/api.js
      App.js
      App.css
      index.js
      index.css
    package.json
```

## 1. Open the project in VS Code

Unzip the folder, then in VS Code: **File → Open Folder** and select `ai-code-generator`.

## 2. Set up MongoDB

Easiest options for an interview demo:
- **Local:** install MongoDB Community Server and run it (`mongod`), or
- **Cloud (recommended):** create a free cluster at MongoDB Atlas (https://www.mongodb.com/cloud/atlas), get your connection string.

## 3. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

Get an OpenAI key at https://platform.openai.com/api-keys (or swap the fetch call in
`controllers/generateController.js` for another provider — Anthropic, Gemini, etc. —
if you'd rather not use OpenAI).

Run the backend:
```bash
npm run dev
```
It starts on `http://localhost:5000`.

## 4. Frontend setup

Open a second terminal:
```bash
cd frontend
npm install
npm start
```
It starts on `http://localhost:3000` and calls the backend at `http://localhost:5000/api`
by default. To point at a different backend URL, create `frontend/.env` with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 5. How it works

1. You type a prompt ("write a function that reverses a linked list") and pick a language.
2. React sends it to `POST /api/generate`.
3. Express calls the OpenAI API, gets the generated code back.
4. The result is saved to MongoDB and returned to the UI.
5. Past generations show in the sidebar (`GET /api/generate/history`) and can be reopened
   or deleted.

## 6. Push to your GitHub

From the `ai-code-generator` root folder:
```bash
git init
git add .
git commit -m "Initial commit: AI Code Generator (MERN)"
```
Create an empty repo on GitHub (https://github.com/new — don't initialize it with a
README), then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

`.env` is already git-ignored so your API key won't be pushed.

## 7. Talking points for your interview

- **REST API design:** `/api/generate` (POST), `/api/generate/history` (GET), `/api/generate/:id` (DELETE)
- **MongoDB/Mongoose:** schema design, timestamps, indexing by `createdAt`
- **React:** hooks (`useState`, `useEffect`), component composition, controlled forms
- **Separation of concerns:** routes → controllers → models
- **Env-based config:** keeping secrets out of source control
- **Error handling:** both client-side (try/catch, user-facing errors) and server-side
  (status codes, JSON error bodies)
- Possible extensions to mention: user auth (JWT), streaming responses token-by-token,
  syntax highlighting (e.g. Prism.js), rate limiting, unit tests (Jest/Supertest)

## Deploying live (optional, if asked)

- **Frontend:** Vercel or Netlify — connect your GitHub repo, deploy `frontend/`.
- **Backend:** Render or Railway — connect your GitHub repo, deploy `backend/`, set the
  same environment variables there.
- **Database:** MongoDB Atlas free tier works for both local dev and production.
