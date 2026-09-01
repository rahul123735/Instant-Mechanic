import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Radio, 
  Play, 
  Pause, 
  Sparkles, 
  Sun, 
  Moon, 
  ShieldCheck, 
  CheckCheck, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  X,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useOperations, UserRole } from '../context/OperationsContext';

export const Header: React.FC = () => {
  const {
    isConnectedSSE,
    isSimulating,
    simulationIntervalSec,
    setSimulationIntervalSec,
    toggleSimulation,
    triggerManualSimulation,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    userRole,
    setUserRole,
    isDarkMode,
    toggleDarkMode,
    setSelectedBookingId,
    setIsNewBookingModalOpen,
    refreshDashboard
  } = useOperations();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isSimulatingAction, setIsSimulatingAction] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleManualSimulate = async () => {
    setIsSimulatingAction(true);
    await triggerManualSimulation();
    setTimeout(() => setIsSimulatingAction(false), 500);
  };

  const roles: UserRole[] = ['Operations Manager', 'Lead Dispatcher', 'Executive Admin'];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-[#0d0d0d]/90 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile Title & Live Status Indicator */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            {isConnectedSSE && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnectedSSE ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </span>
          <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
            <Radio className={`w-3.5 h-3.5 ${isConnectedSSE ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
            {isConnectedSSE ? 'SSE Live Stream Active' : 'Connecting to Stream...'}
          </span>
        </div>

        {/* Live Simulation Controls */}
        <div className="hidden sm:flex items-center space-x-2 bg-[#111111] border border-white/5 rounded-lg p-1">
          <button
            onClick={toggleSimulation}
            className={`flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              isSimulating
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
            title="Automatically generates new customer bookings and progresses statuses"
          >
            {isSimulating ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Simulating ({simulationIntervalSec}s)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-Simulate</span>
              </>
            )}
          </button>

          {isSimulating && (
            <select
              value={simulationIntervalSec}
              onChange={(e) => setSimulationIntervalSec(Number(e.target.value))}
              className="bg-[#181818] text-slate-300 text-xs rounded border border-white/10 px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value={4}>4s (Fast)</option>
              <option value={8}>8s (Normal)</option>
              <option value={15}>15s (Slow)</option>
            </select>
          )}

          <button
            onClick={handleManualSimulate}
            disabled={isSimulatingAction}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white rounded-md transition-all active:scale-95 disabled:opacity-50"
            title="Generate a single simulated event right now"
          >
            <Sparkles className={`w-3.5 h-3.5 text-emerald-400 ${isSimulatingAction ? 'animate-spin' : ''}`} />
            <span>Simulate Event</span>
          </button>
        </div>
      </div>

      {/* Right: Actions, Notifications, Role, New Booking */}
      <div className="flex items-center space-x-3">
        {/* New Booking Button */}
        <button
          onClick={() => setIsNewBookingModalOpen(true)}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">New Booking</span>
        </button>

        {/* Manual Refresh */}
        <button
          onClick={() => refreshDashboard()}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
          title="Refresh All Operational Metrics"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
            title="Operations Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black shadow-sm animate-bounce">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Notification Menu Panel */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#111111] border border-white/10 shadow-2xl z-50 overflow-hidden text-slate-200 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-sm">Live Activity Feed</span>
                  {unreadNotificationCount > 0 && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                      {unreadNotificationCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Read all</span>
                  </button>
                  <button
                    onClick={clearNotifications}
                    className="text-slate-400 hover:text-red-400 transition-colors p-1"
                    title="Clear notifications"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-xs">
                    No new activity alerts.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.bookingId) {
                          setSelectedBookingId(n.bookingId);
                          setIsNotifOpen(false);
                        }
                      }}
                      className={`p-3 text-xs hover:bg-white/[0.04] cursor-pointer transition-colors flex items-start space-x-3 ${
                        !n.read ? 'bg-emerald-500/[0.03]' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : n.type === 'warning' ? (
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        ) : n.type === 'critical' ? (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        ) : (
                          <Info className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-semibold text-slate-200 truncate">{n.title}</p>
                          <span className="text-[10px] text-slate-500 shrink-0">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                        {n.bookingId && (
                          <span className="inline-block mt-1 text-[10px] text-emerald-400 hover:underline">
                            View {n.bookingId} →
                          </span>
                        )}
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 self-center"></span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setIsRoleOpen(!isRoleOpen)}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">{userRole}</span>
          </button>

          {isRoleOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#111111] border border-white/10 shadow-2xl z-50 overflow-hidden text-slate-200 text-xs animate-in fade-in duration-100">
              <div className="px-3 py-2 border-b border-white/5 bg-[#0d0d0d] text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                Switch Operational View
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setUserRole(r);
                    setIsRoleOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-white/5 transition-colors flex items-center justify-between ${
                    userRole === r ? 'bg-emerald-500/10 text-emerald-400 font-bold' : ''
                  }`}
                >
                  <span>{r}</span>
                  {userRole === r && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
