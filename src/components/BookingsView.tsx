import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  Car, 
  Clock, 
  User, 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  MoreVertical, 
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Booking, BookingStatus, PriorityLevel } from '../types';
import { api } from '../services/api';
import { useOperations } from '../context/OperationsContext';

export const BookingsView: React.FC = () => {
  const { 
    setSelectedBookingId, 
    setIsNewBookingModalOpen, 
    mechanics, 
    services,
    updateBookingStatus
  } = useOperations();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filter States
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [mechanicFilter, setMechanicFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [actionMenuBookingId, setActionMenuBookingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getBookings({
        page,
        pageSize,
        search,
        status: statusFilter,
        category: categoryFilter,
        mechanicId: mechanicFilter,
        priority: priorityFilter,
        sortBy,
        sortOrder
      });
      setBookings(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, search, statusFilter, categoryFilter, mechanicFilter, priorityFilter, sortBy, sortOrder]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
            In Progress
          </span>
        );
      case 'mechanic_on_the_way':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5 animate-pulse"></span>
            En Route
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-1.5"></span>
            Assigned
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-pink-500/15 text-pink-400 border border-pink-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-1.5 animate-ping"></span>
            Pending
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5"></span>
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'urgent':
        return <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/30 px-1.5 py-0.5 rounded">Urgent</span>;
      case 'high':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded">High</span>;
      case 'low':
        return <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Low</span>;
      default:
        return <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">Normal</span>;
    }
  };

  // Status Filter options
  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Assigned', value: 'assigned' },
    { label: 'En Route', value: 'mechanic_on_the_way' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  // Unique categories
  const categories = [
    'all',
    'Oil, Fluids & Filters',
    'Brakes & Suspension',
    'Diagnostics & Engine',
    'Battery & Electrical',
    'Heating & AC',
    'Tires & Wheels',
    'Inspections'
  ];

  return (
    <div className="space-y-5 pb-12">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Vehicle Service Bookings
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {total.toLocaleString()} Records
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Monitor, assign, filter, and dispatch live vehicle repair orders
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <a
            href={api.getExportCsvUrl()}
            download="instant_mechanic_bookings.csv"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/10 shadow-sm transition-all active:scale-95"
            title="Download full bookings database as CSV spreadsheet"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </a>

          <button
            onClick={() => setIsNewBookingModalOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black text-xs font-black shadow-md shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create Booking</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="p-4 rounded-2xl bg-[#111111] border border-white/5 shadow-lg space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by ID, customer name, vehicle, plate, service, city..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#0d0d0d] text-xs sm:text-sm text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 placeholder:text-slate-600"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  setPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-[#0d0d0d] text-xs sm:text-sm text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-2">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-[#0d0d0d] text-xs sm:text-sm text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Mechanic Filter */}
          <div className="md:col-span-2">
            <select
              value={mechanicFilter}
              onChange={(e) => {
                setMechanicFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-[#0d0d0d] text-xs sm:text-sm text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="all">All Mechanics</option>
              {mechanics.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Quick Filter Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs custom-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">Quick:</span>
          {statusOptions.map((opt) => {
            const isActive = statusFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setStatusFilter(opt.value);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookings Table Card */}
      <div className="rounded-2xl bg-[#111111] border border-white/5 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0d0d0d] text-slate-400 font-bold uppercase tracking-wider border-b border-white/5 text-[11px]">
              <tr>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('id')}>
                  <div className="flex items-center space-x-1">
                    <span>Booking ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('customer')}>
                  <div className="flex items-center space-x-1">
                    <span>Customer</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('vehicle')}>
                  <div className="flex items-center space-x-1">
                    <span>Vehicle</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Service Required</th>
                <th className="py-3.5 px-4">Mechanic</th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('status')}>
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('amount')}>
                  <div className="flex items-center space-x-1">
                    <span>Amount</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('createdAt')}>
                  <div className="flex items-center space-x-1">
                    <span>Date / Time</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading bookings...</span>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    <Car className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                    <p className="font-semibold text-sm text-slate-300">No bookings match the filters</p>
                    <p className="text-xs text-slate-500 mt-1">Try changing your search keywords or resetting filters</p>
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                    onClick={() => setSelectedBookingId(b.id)}
                  >
                    {/* Booking ID & Priority */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                      <div className="flex items-center space-x-2">
                        <span className="group-hover:text-emerald-400 transition-colors">{b.id}</span>
                        {getPriorityBadge(b.priority)}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={b.customerAvatar}
                          alt={b.customerName}
                          className="w-7 h-7 rounded-full bg-slate-800 object-cover border border-white/10 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-200 truncate">{b.customerName}</p>
                          <p className="text-[11px] text-slate-400">{b.customerPhone}</p>
                        </div>
                      </div>
                    </td>

                    {/* Vehicle */}
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-medium text-slate-200">
                          {b.vehicle.year} {b.vehicle.make} {b.vehicle.model}
                        </p>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                          <span className="font-mono bg-white/5 px-1 rounded text-slate-300 border border-white/5">{b.vehicle.licensePlate}</span>
                          <span>• {b.vehicle.color}</span>
                        </div>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4">
                      <div className="max-w-[200px]">
                        <p className="font-semibold text-slate-200 truncate">{b.serviceName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{b.serviceCategory}</p>
                      </div>
                    </td>

                    {/* Mechanic */}
                    <td className="py-3.5 px-4">
                      {b.mechanicName ? (
                        <div className="flex items-center space-x-2">
                          <img
                            src={b.mechanicAvatar || ''}
                            alt={b.mechanicName}
                            className="w-6 h-6 rounded-full object-cover border border-white/10 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-medium text-slate-200 truncate max-w-[120px]">{b.mechanicName}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] font-semibold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-md">
                          Unassigned
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(b.status)}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                      ${b.amount.toFixed(2)}
                    </td>

                    {/* Date/Time */}
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      <div className="text-slate-300 font-medium">
                        {new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedBookingId(b.id)}
                        className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-emerald-400 rounded-lg transition-colors"
                        title="View Full Booking Details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-white/5 bg-[#0d0d0d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-400">
            <span>Showing</span>
            <span className="font-bold text-slate-200 font-mono">
              {total > 0 ? (page - 1) * pageSize + 1 : 0} - {Math.min(page * pageSize, total)}
            </span>
            <span>of</span>
            <span className="font-bold text-slate-200 font-mono">{total}</span>
            <span>bookings</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400">Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-[#181818] border border-white/10 text-slate-200 rounded px-2 py-1 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center space-x-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 rounded bg-[#181818] border border-white/5 font-mono font-bold text-slate-300">
                {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
