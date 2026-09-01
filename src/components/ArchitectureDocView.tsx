import React from 'react';
import { 
  FileText, 
  Layers, 
  Database, 
  Server, 
  Monitor, 
  Radio, 
  Cpu, 
  ShieldCheck, 
  GitBranch, 
  Sparkles, 
  CheckCircle2,
  Terminal,
  Code2
} from 'lucide-react';

export const ArchitectureDocView: React.FC = () => {
  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            System Documentation
          </span>
          <span className="text-xs text-slate-400">Instant Mechanic Live Operations Dashboard</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          System Architecture & Technical Documentation
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Comprehensive full-stack operational architecture, database data model, real-time SSE streaming mechanics, and engineering decisions for the Instant Mechanic dashboard.
        </p>
      </div>

      {/* Section 1: Project Overview */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-3">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Monitor className="w-5 h-5 text-emerald-400" /> 1. Project Overview & Problem Statement
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Instant Mechanic is a modern mobile vehicle service company. This platform serves as the mission control operations dashboard used by dispatchers and operations managers every day to monitor 500+ service bookings, dispatch 22 mobile mechanic vans across the San Francisco Bay Area, track real-time revenue KPIs, and handle live state transitions without requiring full-page reloads.
        </p>
      </div>

      {/* Section 2: Full Tech Stack */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" /> 2. Technology Stack Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-2">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
              <Monitor className="w-4 h-4" /> Frontend Layer
            </h3>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>React 19 & TypeScript 5.8:</strong> Modular component hierarchy, typed domain models, and strict zero-any contract.</li>
              <li>• <strong>Tailwind CSS 4:</strong> Utility-first responsive design matching the anti-slop high-contrast operational aesthetic.</li>
              <li>• <strong>Recharts 3:</strong> Interactive volume trends, revenue forecasting, status donut, and service category charts.</li>
              <li>• <strong>Lucide Icons & Motion:</strong> Micro-interactions and polished UI states.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-2">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
              <Server className="w-4 h-4" /> Backend & APIs
            </h3>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>Node.js & Express:</strong> High-performance RESTful router handling dashboard analytics, filtering, sorting, and dispatch mutations.</li>
              <li>• <strong>Server-Sent Events (SSE):</strong> Real-time streaming connection at <code className="text-emerald-400 bg-black px-1 rounded border border-white/10">/api/events</code> with automatic client reconnection and event broadcast bus.</li>
              <li>• <strong>CSV Stream Engine:</strong> Standard RFC 4180 export endpoint for business intelligence reports.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-2">
            <h3 className="font-bold text-sm text-purple-400 flex items-center gap-1.5">
              <Database className="w-4 h-4" /> Database & Data Engine
            </h3>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>540+ Realistic Seed Bookings:</strong> Spanning 6 months historical data, today's live jobs, and future appointments with realistic automotive services and prices ($45–$850).</li>
              <li>• <strong>60 Detailed Customers:</strong> Realistic vehicles (makes, models, VINs, plates) and purchase metrics.</li>
              <li>• <strong>22 Field Mechanics:</strong> Full GPS coordinates, ratings, specialties, and active workloads.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-2">
            <h3 className="font-bold text-sm text-cyan-400 flex items-center gap-1.5">
              <Radio className="w-4 h-4" /> Live Operations Engine
            </h3>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>Dynamic State Transitions:</strong> Pending → Assigned → Mechanic On The Way → In Progress → Completed.</li>
              <li>• <strong>Simulation Mode:</strong> Configurable timer (4s/8s/15s) and manual trigger button to generate live events on demand for instant review.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 3: Architecture Diagram */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-emerald-400" /> 3. High-Level Architecture Flow
        </h2>

        <div className="p-5 rounded-2xl bg-[#0d0d0d] border border-white/5 text-xs font-mono text-slate-300 space-y-3 overflow-x-auto">
          <div className="flex flex-col items-center space-y-2 py-2">
            <div className="px-4 py-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-bold text-center">
              React 19 Frontend Dashboard (Vite SPA + Recharts + OperationsContext)
            </div>
            <div className="text-slate-500">↕ (REST API Calls / HTTP JSON &amp; SSE Real-Time Stream)</div>
            <div className="px-4 py-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold text-center">
              Express Application Server (/api/dashboard, /api/bookings, /api/mechanics, /api/events)
            </div>
            <div className="text-slate-500">↕ (In-Memory Aggregator, Filters, Sorts, State Mutator)</div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-center">
              Operations Relational Data Engine (540+ Bookings, 60 Customers, 22 Mechanics, Audit Trail)
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: AI Usage Summary */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-3">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" /> 4. AI Usage Declaration
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          AI tools were leveraged as an <strong>engineering force-multiplier</strong> to:
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc pl-5">
          <li>Generate realistic vehicle datasets (540+ multi-status repair tickets, VIN formats, license plate distributions).</li>
          <li>Design mathematically sound SVG coordinate projection for the live SF Bay Area fleet map.</li>
          <li>Architect clean TypeScript domain models with strict type contracts between backend REST routes and frontend states.</li>
          <li>Implement custom SSE heartbeat broadcasting and debounce patterns for high-throughput live simulation.</li>
        </ul>
      </div>

      {/* Section 5: Highlights */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-3">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 5. Core Operational Strengths
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5 space-y-1">
            <span className="font-bold text-slate-200">1. Instant Live Experience</span>
            <p className="text-slate-400">Zero loading lag. The dashboard connects immediately via SSE, with built-in auto-simulation and manual event generation so anyone reviewing can see live state changes in seconds.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5 space-y-1">
            <span className="font-bold text-slate-200">2. Interactive Swagger Console</span>
            <p className="text-slate-400">Built-in API explorer where engineers can execute live HTTP requests directly against the Express backend and see response latency & schemas.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5 space-y-1">
            <span className="font-bold text-slate-200">3. Full Operational Depth</span>
            <p className="text-slate-400">Every single operational dimension is executed: 8 KPIs, 4 analytical charts, advanced multi-filter bookings table, mechanic dispatch drawer, audit trails, and CSV export.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5 space-y-1">
            <span className="font-bold text-slate-200">4. Elegant Dark Design System</span>
            <p className="text-slate-400">Role-based views, notification center, high-contrast dark aesthetic with emerald accents, and responsive layout across desktop and mobile devices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
