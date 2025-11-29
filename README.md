<h1 align="center">InsightHub – AI Powered Analytics Dashboard</h1>

Modern data workspace built with **Next.js 14 (App Router)**, **Tailwind CSS v4**, **Prisma + PostgreSQL**, **NextAuth**, **OpenAI**, **Recharts**, **Framer Motion**, and **ShadCN-inspired components** (JavaScript only).

## ✨ Highlights

- Role-based authentication (credentials + Google) with protected routes via middleware.
- Drag-and-drop dashboard widgets, live chart components, activity feed, and responsive layout with dark/light modes.
- AI insights page with CSV upload/paste, server-side parsing, OpenAI generation, and history log.
- Data upload tooling with filters, preview grid, and server actions.
- Rich reports workspace (line, bar, pie, heatmap), export to PDF/CSV, filters, pagination.
- Settings & profile management, theme toggle, notifications, and API token placeholder.

## 🧱 Project Structure

```
src/app
  (auth)/auth/login & register
  (dashboard)/dashboard, insights, upload, reports, profile, settings
  api/auth/[...nextauth], api/insights, api/upload, api/reports
  actions (auth, dashboard, upload, insights server actions)
src/components
  dashboard/*, auth, insights, upload, reports, settings, ui/*
src/lib (auth + prisma)
src/utils (password + ui helpers)
prisma/schema.prisma
```

## 🚀 Getting Started

```bash
npm install
npx prisma generate
cp .env.example .env # create the file with env vars listed below
npm run dev
```

Visit `http://localhost:3000` for the marketing page or `/auth/login` to sign in.

## ⚙️ Environment Variables

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-..."
GOOGLE_CLIENT_ID="optional"
GOOGLE_CLIENT_SECRET="optional"
```

## 🗄️ Database

Prisma models: `User`, `UploadedData`, `WidgetConfig`, `ActivityLog`, `AIInsightHistory`, plus NextAuth tables. Run migrations with `npx prisma migrate dev`.

## ✅ Testing checklist

- `npm run dev` – verify landing + dashboards render.
- Ensure PostgreSQL reachable and `DATABASE_URL` set.
- Create user via `/auth/register`, sign in, navigate all dashboard routes.
- Use Data Upload + AI Insights flows, validate Prisma tables populate.

## 📦 Deployment

Deploy to Vercel, Railway, or any Node host. Ensure Prisma migrations run and environment variables are configured. Use `npm run build && npm run start` in production.
