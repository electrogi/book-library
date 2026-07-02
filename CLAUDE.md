@AGENTS.md
# Book Library Project

## Tech Stack
- Next.js 16.2.9 with App Router (Turbopack)
- Neon Serverless PostgreSQL
- Drizzle ORM
- Tailwind CSS v4
- JWT Authentication (jose + bcryptjs)

## Project Structure
- `/app` - Next.js pages (login, dashboard)
- `/actions` - Server actions (auth, books CRUD)
- `/db` - Database schema and client
- `/lib` - Auth utilities (JWT, cookies)
- `/components` - React components

## Key Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npx drizzle-kit push` - Push schema to database
- `npm run db:seed` - Seed admin account

## Environment Variables
- DATABASE_URL (Neon PostgreSQL)
- JWT_SECRET
- ADMIN_USERNAME
- ADMIN_PASSWORD

## Current Issues
- Cookies API needed to use `await cookies()` in Next.js 16
- Middleware deprecated, should use `proxy.ts` instead
- Need to verify all pages render correctly