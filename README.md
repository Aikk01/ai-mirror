# AI Mirror

AI Mirror is a Vite + React app that analyzes exported chat histories from Claude or ChatGPT and turns them into a personality profile, MBTI estimate, mood timeline, and topic summary.

## What it does

- Upload a `conversations.json` or `conversations.jsonl` export.
- Detect personality traits, MBTI type, dominant emotion, and asking style.
- Visualize mood trends and top conversation topics.
- Call the Anthropic API through the serverless `/api/analyze` route.

## Getting started

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal after the dev server starts.

## Environment

Create an `ANTHROPIC_API_KEY` environment variable before using the analysis feature. The API route forwards requests to Anthropic with that key.

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - build the app for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

## Deployment

The repo includes a Vercel rewrite so `/api/*` routes resolve to the serverless handler in `api/`.
