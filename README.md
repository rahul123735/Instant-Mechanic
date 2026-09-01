Project Overview

A live vehicle service operations dashboard for Instant Mechanic, built for the Full Stack Developer Internship assignment. It gives an operations team a real-time view of bookings, mechanics, customers, and revenue — with live status updates (pending → assigned → on the way → completed) reflected instantly without a page reload. Built to feel like a real production SaaS tool rather than a basic CRUD demo.

Tech Stack
Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, Recharts, lucide-react, Socket.IO client
Backend: Node.js, Express 5, Socket.IO
Database: SQLite via better-sqlite3 — a real relational database with SQL queries, joins, and indexes (not hardcoded frontend JSON)
Seed data: @faker-js/faker — 60 customers, 25 mechanics, 650 bookings across 8 service categories and 5 statuses
Infrastructure: Frontend deployed on Vercel, backend deployed on AWS EC2 (Free Tier)
Architecture
Frontend (Next.js)
      ↓  REST API calls + WebSocket connection
API (Express routes: /api/dashboard, /api/bookings, /api/mechanics, /api/customers)
      ↓  SQL queries via better-sqlite3
Backend (Node.js/Express server, Socket.IO live-update loop)
      ↓  reads/writes
Database (SQLite file: customers, mechanics, bookings tables with foreign keys + indexes)

The frontend never touches the database directly — it only calls the REST API and listens on a WebSocket for live updates. The backend owns all data access and runs a background loop that randomly advances a booking's status every few seconds and emits the change over Socket.IO.

Local Setup

Backend:

bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev      # http://localhost:4000

Frontend:

bash
cd frontend
cp .env.example .env.local
npm install
npm run dev      # http://localhost:3000
Environment Variables

Backend (.env): PORT (default 4000), CORS_ORIGIN (default http://localhost:3000), DB_PATH (default ./data/dashboard.db), LIVE_INTERVAL_MS (default 4000)
Frontend (.env.local): NEXT_PUBLIC_API_URL (default http://localhost:4000)

API Documentation
Method	Endpoint	Description
GET	/api/dashboard	KPI summary (totals, revenue, active mechanics, etc.)
GET	/api/dashboard/analytics	Bookings/revenue over time, status + category breakdowns
GET	/api/bookings	Paginated list — search, status, category, sortBy, sortDir, page, pageSize
GET	/api/bookings/:id	Single booking with full customer + mechanic details
GET	/api/mechanics	All mechanics with jobs completed, rating, last booking
GET	/api/mechanics/:id	Single mechanic with recent bookings
GET	/api/customers	Paginated customer list

WebSocket event booking:update pushes the updated booking object whenever the live simulation advances a status.

Deployment
Frontend: Deployed to Vercel, root directory set to frontend, with NEXT_PUBLIC_API_URL set to the live backend URL.
Backend: Deployed to an AWS EC2 (t2.micro, Free Tier) instance running Ubuntu, kept alive with pm2, with CORS_ORIGIN set to the Vercel URL.
AI Usage

Which AI tools you used  : Claude
What you used them for : scaffolding backend routes, database schema, frontend components.
What you personally tested, debugged, or modified :fixing the Windows better-sqlite3 build issue, deploying to Vercel/EC2, verifying every page against the running backend.
