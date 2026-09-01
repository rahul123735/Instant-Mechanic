import React from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck2, 
  Wrench, 
  Compass, 
  Users, 
  Code2, 
  FileText, 
  Car, 
  Activity,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { useOperations } from '../context/OperationsContext';

export type ActiveTab = 'overview' | 'bookings' | 'mechanics' | 'map' | 'customers' | 'apidocs' | 'architecture';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile
}) => {
  const { metrics, mechanics } = useOperations();

  const navItems = [
    {
      id: 'overview' as ActiveTab,
      label: 'Overview & KPIs',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'bookings' as ActiveTab,
      label: 'Live Bookings',
      icon: CalendarCheck2,
      badge: metrics ? metrics.inProgressBookings + metrics.pendingBookings : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'mechanics' as ActiveTab,
      label: 'Mechanics & Fleet',
      icon: Wrench,
      badge: metrics ? `${metrics.activeMechanics}/${metrics.totalMechanics}` : null,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'map' as ActiveTab,
      label: 'Live Operations Map',
      icon: Compass,
      badge: 'Live',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    {
      id: 'customers' as ActiveTab,
      label: 'Customer Directory',
      icon: Users,
      badge: metrics?.totalCustomers ? `${metrics.totalCustomers}` : null,
      badgeColor: 'bg-slate-800 text-slate-400'
    },
    {
      id: 'apidocs' as ActiveTab,
      label: 'REST API & Swagger',
      icon: Code2,
      badge: 'Interactive',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
      id: 'architecture' as ActiveTab,
      label: 'Architecture & Guide',
      icon: FileText,
      badge: 'Task Doc',
      badgeColor: 'bg-slate-800 text-slate-300'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0d0d0d] border-r border-white/5 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center px-5 border-b border-white/5 gap-3 bg-[#0d0d0d]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-black font-black">
            <Car className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">INSTANT</span>
              <span className="font-black text-sm tracking-tight text-emerald-400">MECHANIC</span>
            </div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Live Operations Hub</p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Operations Console
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpenMobile(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-white/5 text-slate-300 border-white/10'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Real-time Telemetry Summary Footer */}
        <div className="p-3 m-3 rounded-xl bg-[#111111] border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              Live Fleet Load
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-400">
              {metrics ? `${metrics.growthRates.activeMechanicsPercent}% Active` : '91%'}
            </span>
          </div>

          <div className="w-full bg-[#1e1e1e] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics?.growthRates.activeMechanicsPercent || 85}%` }}
            />
          </div>

          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>Today's Rev:</span>
            <span className="font-bold text-slate-200 font-mono">
              ${metrics?.todayRevenue.toLocaleString() || '0'}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
