import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  Star, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Car, 
  Activity, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Mechanic, MechanicStatus } from '../types';
import { useOperations } from '../context/OperationsContext';
import { api } from '../services/api';

export const MechanicsView: React.FC = () => {
  const { mechanics, refreshMechanics, setSelectedBookingId } = useOperations();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (mechanicId: string, newStatus: MechanicStatus) => {
    try {
      setUpdatingId(mechanicId);
      await api.updateMechanic(mechanicId, { status: newStatus });
      await refreshMechanics();
    } catch (err) {
      console.error('Failed to update mechanic status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = mechanics.filter(m => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.specialty.toLowerCase().includes(q) ||
        m.location.city?.toLowerCase().includes(q) ||
        m.phone.includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: MechanicStatus) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
            Available
          </span>
        );
      case 'on_the_way':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5 animate-pulse"></span>
            En Route
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
            Working on Job
          </span>
        );
      case 'off_duty':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-1.5"></span>
            Off Duty
          </span>
        );
      default:
        return null;
    }
  };

  const statusCounts = {
    all: mechanics.length,
    available: mechanics.filter(m => m.status === 'available').length,
    on_the_way: mechanics.filter(m => m.status === 'on_the_way').length,
    in_progress: mechanics.filter(m => m.status === 'in_progress').length,
    off_duty: mechanics.filter(m => m.status === 'off_duty').length
  };

  return (
    <div className="space-y-5 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Mechanics Fleet Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {mechanics.length} Mobile Vans
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Monitor real-time technician readiness, assigned jobs, ratings, and field dispatches
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#111111] border border-white/5 shadow-lg space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search technician by name, specialty, service zone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0d0d0d] text-xs sm:text-sm text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-[#0d0d0d] text-xs sm:text-sm text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="all">All Availability ({statusCounts.all})</option>
              <option value="available">Available ({statusCounts.available})</option>
              <option value="on_the_way">En Route ({statusCounts.on_the_way})</option>
              <option value="in_progress">Working ({statusCounts.in_progress})</option>
              <option value="off_duty">Off Duty ({statusCounts.off_duty})</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Status Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 text-xs custom-scrollbar">
          {[
            { id: 'all', label: 'All Fleet', count: statusCounts.all },
            { id: 'available', label: 'Available', count: statusCounts.available },
            { id: 'on_the_way', label: 'En Route', count: statusCounts.on_the_way },
            { id: 'in_progress', label: 'Working', count: statusCounts.in_progress },
            { id: 'off_duty', label: 'Off Duty', count: statusCounts.off_duty }
          ].map((pill) => {
            const isActive = statusFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setStatusFilter(pill.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{pill.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-black text-emerald-400' : 'bg-[#181818] text-slate-300'}`}>
                  {pill.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mechanics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-xl space-y-4 hover:border-white/20 transition-all group flex flex-col justify-between"
          >
            {/* Top Row: Avatar & Bio */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-white/10 bg-slate-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#111111] ${
                      m.status === 'available'
                        ? 'bg-emerald-500'
                        : m.status === 'off_duty'
                        ? 'bg-slate-600'
                        : 'bg-amber-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                      {m.name}
                    </h3>
                    <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-bold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{m.rating.toFixed(2)}</span>
                      <span className="text-slate-500 font-normal">({m.jobsCompleted} completed)</span>
                    </div>
                  </div>
                </div>

                {getStatusBadge(m.status)}
              </div>

              {/* Specialty & Location */}
              <div className="space-y-1 text-xs">
                <p className="font-medium text-slate-300 bg-[#0d0d0d] px-2.5 py-1 rounded-lg border border-white/5 truncate">
                  🔧 {m.specialty}
                </p>
                <p className="text-slate-400 flex items-center gap-1 px-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{m.location.address || m.location.city}</span>
                </p>
              </div>

              {/* Current/Last Booking Callout */}
              <div className="p-3 rounded-xl bg-[#0d0d0d] border border-white/5 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <span>Current / Last Booking</span>
                  {m.currentBookingId && (
                    <span className="text-emerald-400 font-mono">{m.currentBookingId}</span>
                  )}
                </div>
                <p className="font-medium text-slate-200 line-clamp-1">
                  {m.currentBookingSummary || 'No active service dispatch'}
                </p>
                {m.currentBookingId && (
                  <button
                    onClick={() => setSelectedBookingId(m.currentBookingId!)}
                    className="text-[11px] text-emerald-400 hover:underline font-bold pt-1 flex items-center gap-1"
                  >
                    <span>Inspect Active Ticket</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Row: Status Dropdown & Contacts */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <a href={`tel:${m.phone}`} className="p-1.5 hover:bg-white/10 rounded-lg hover:text-slate-200" title={m.phone}>
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a href={`mailto:${m.email}`} className="p-1.5 hover:bg-white/10 rounded-lg hover:text-slate-200" title={m.email}>
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center space-x-1.5">
                <select
                  value={m.status}
                  disabled={updatingId === m.id}
                  onChange={(e) => handleStatusChange(m.id, e.target.value as MechanicStatus)}
                  className="bg-[#0d0d0d] text-slate-200 text-xs rounded-lg border border-white/10 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="available">Set Available</option>
                  <option value="on_the_way">Set En Route</option>
                  <option value="in_progress">Set Working</option>
                  <option value="off_duty">Set Off Duty</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
