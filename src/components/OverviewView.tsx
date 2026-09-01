import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  DollarSign, 
  Wrench, 
  Users, 
  TrendingUp, 
  Zap, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Car
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useOperations } from '../context/OperationsContext';
import { ActiveTab } from './Sidebar';

interface OverviewViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ setActiveTab }) => {
  const { 
    metrics, 
    analytics, 
    liveEvents, 
    setSelectedBookingId, 
    triggerManualSimulation,
    isSimulating,
    toggleSimulation
  } = useOperations();

  if (!metrics || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm font-medium">Aggregating live operations telemetry...</p>
        </div>
      </div>
    );
  }

  const kpiCards = [
    {
      id: 'kpi-total-bookings',
      title: 'Total Bookings',
      value: metrics.totalBookings.toLocaleString(),
      subtext: `+${metrics.growthRates.bookingsWeekOverWeek}% vs last month`,
      isPositive: true,
      icon: Calendar,
      accent: 'border-white/5 text-emerald-400'
    },
    {
      id: 'kpi-today-bookings',
      title: "Today's Bookings",
      value: metrics.todayBookings.toString(),
      subtext: `${metrics.inProgressBookings} in progress / en route`,
      isPositive: true,
      icon: Clock,
      accent: 'border-white/5 text-amber-400'
    },
    {
      id: 'kpi-completed-bookings',
      title: 'Completed Bookings',
      value: metrics.completedBookings.toLocaleString(),
      subtext: `${metrics.completionRatePercentage}% completion rate`,
      isPositive: true,
      icon: CheckCircle2,
      accent: 'border-white/5 text-emerald-400'
    },
    {
      id: 'kpi-pending-bookings',
      title: 'Pending Dispatch',
      value: metrics.pendingBookings.toString(),
      subtext: 'Awaiting mechanic assignment',
      isPositive: false,
      icon: Activity,
      accent: 'border-white/5 text-pink-400'
    },
    {
      id: 'kpi-cancelled-bookings',
      title: 'Cancelled Bookings',
      value: metrics.cancelledBookings.toString(),
      subtext: 'Refunded / Rescheduled',
      isPositive: false,
      icon: XCircle,
      accent: 'border-white/5 text-red-400'
    },
    {
      id: 'kpi-total-revenue',
      title: 'Total Revenue',
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      subtext: `+$${metrics.todayRevenue.toLocaleString()} booked today`,
      isPositive: true,
      icon: DollarSign,
      accent: 'border-white/5 text-emerald-400'
    },
    {
      id: 'kpi-active-mechanics',
      title: 'Active Mechanics',
      value: `${metrics.activeMechanics} / ${metrics.totalMechanics}`,
      subtext: `${metrics.growthRates.activeMechanicsPercent}% fleet on duty`,
      isPositive: true,
      icon: Wrench,
      accent: 'border-white/5 text-teal-400'
    },
    {
      id: 'kpi-new-customers',
      title: 'New Customers',
      value: metrics.totalCustomers.toString(),
      subtext: `+${metrics.newCustomersThisMonth} acquired this month`,
      isPositive: true,
      icon: Users,
      accent: 'border-white/5 text-cyan-400'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Mission Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Operations Control
            </span>
            <span className="text-xs text-slate-400">Bay Area Metropolitan Fleet</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Instant Mechanic Operations Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Live operational telemetry monitoring 500+ service bookings, 22 mobile mechanic vans, and customer dispatches across San Francisco, Oakland, San Jose & Silicon Valley.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('bookings')}
            className="flex items-center space-x-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl text-xs font-bold border border-white/10 transition-all shadow-sm"
          >
            <span>View All Bookings</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-black transition-all shadow-md shadow-emerald-500/20"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Live Dispatch Map</span>
          </button>
        </div>
      </div>

      {/* 8 Primary KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className={`p-4 rounded-2xl bg-[#111111] border ${kpi.accent} shadow-lg transition-all hover:scale-[1.01] hover:border-white/20`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{kpi.title}</span>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 shadow-inner">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                  {kpi.value}
                </span>
              </div>
              <div className="mt-2 flex items-center text-[11px] text-slate-400 font-medium">
                {kpi.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mr-1 shrink-0" />
                ) : (
                  <Activity className="w-3.5 h-3.5 text-amber-400 mr-1 shrink-0" />
                )}
                <span className="truncate">{kpi.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Analytics Section: 4 Rich Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Bookings & Completed Jobs Over Time (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Bookings Volume Trend</h3>
              <p className="text-xs text-slate-400">Daily service volume & completed repairs (14-day history)</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Bookings
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.bookingsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" opacity={0.8} />
                <XAxis dataKey="date" stroke="#666666" fontSize={11} tickLine={false} />
                <YAxis stroke="#666666" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d0d0d', borderColor: '#222222', borderRadius: '0.75rem', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorBookings)" />
                <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Booking Status Distribution Donut (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Booking Status Breakdown</h3>
              <p className="text-xs text-slate-400">Current distribution across all active states</p>
            </div>
            <span className="text-[10px] font-bold bg-white/5 text-slate-300 px-2 py-1 rounded-md border border-white/10">
              {metrics.totalBookings} Total
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.bookingStatusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {analytics.bookingStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#111111" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d0d0d', borderColor: '#222222', borderRadius: '0.75rem', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/5">
            {analytics.bookingStatusDistribution.map((item) => (
              <div key={item.name} className="flex items-center space-x-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400 truncate">{item.name}:</span>
                <span className="font-bold text-slate-200 font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Monthly Revenue & Target Trends (6 cols) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Revenue & Profit Trajectory</h3>
              <p className="text-xs text-slate-400">Monthly realized revenue vs operating target</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Revenue ($)
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span> Target ($)
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.revenueOverTime} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" opacity={0.8} />
                <XAxis dataKey="month" stroke="#666666" fontSize={11} tickLine={false} />
                <YAxis stroke="#666666" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d0d0d', borderColor: '#222222', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Bar dataKey="target" fill="#333333" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Service Category Breakdown (6 cols) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Service Category Breakdown</h3>
              <p className="text-xs text-slate-400">Demand distribution across vehicle repair categories</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              Avg Ticket: ${metrics.averageBookingValue}
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {analytics.serviceCategoryBreakdown.slice(0, 5).map((cat, idx) => {
              const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-teal-500'];
              const colorClass = colors[idx % colors.length];
              return (
                <div key={cat.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300">{cat.category}</span>
                    <div className="flex items-center space-x-2 font-mono text-[11px]">
                      <span className="text-slate-400">{cat.count} jobs</span>
                      <span className="font-bold text-slate-200">${cat.revenue.toLocaleString()}</span>
                      <span className="text-slate-400 font-semibold">({cat.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-2 rounded-full overflow-hidden">
                    <div
                      className={`${colorClass} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max(8, cat.percentage * 2.5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Live Operations Activity Ticker */}
      <div className="p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                Live Operations Dispatch Feed
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </h3>
              <p className="text-xs text-slate-400">Real-time telemetry and dispatch state transitions streaming via SSE</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerManualSimulation()}
              className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold rounded-lg border border-white/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trigger Test Event</span>
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className="text-xs text-emerald-400 hover:underline font-bold px-2 py-1"
            >
              View Full History →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {liveEvents.slice(0, 4).map((evt) => (
            <div
              key={evt.id}
              onClick={() => {
                if (evt.bookingId) setSelectedBookingId(evt.bookingId);
              }}
              className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/20 cursor-pointer transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span className="font-mono">{evt.id}</span>
                <span>{new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
              <p className="font-bold text-xs text-slate-200 group-hover:text-emerald-400 transition-colors truncate">
                {evt.title}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {evt.description}
              </p>
              {evt.bookingId && (
                <div className="mt-2 text-[10px] font-semibold text-emerald-400/80 group-hover:text-emerald-300 flex items-center gap-1">
                  <span>Inspect {evt.bookingId}</span>
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
