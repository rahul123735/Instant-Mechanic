import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Car, 
  ChevronLeft, 
  ChevronRight, 
  DollarSign, 
  Calendar 
} from 'lucide-react';
import { Customer } from '../types';
import { api } from '../services/api';

export const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getCustomers(search, page, pageSize);
      setCustomers(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } finally {
      setIsLoading(false);
    }
  }, [search, page, pageSize]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Customer Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {total} Verified Clients
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Customer lifetime value, service histories, vehicle fleets, and satisfaction ratings
          </p>
        </div>
      </div>

      {/* Search Filter Card */}
      <div className="p-4 rounded-2xl bg-[#111111] border border-white/5 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search customer by name, email, phone, city..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-[#0d0d0d] text-xs sm:text-sm text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-3 py-16 text-center text-slate-400">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span>Loading customers...</span>
          </div>
        ) : customers.length === 0 ? (
          <div className="col-span-3 py-16 text-center text-slate-500">
            <Users className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="font-semibold text-slate-300">No customers found</p>
          </div>
        ) : (
          customers.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-[#111111] border border-white/5 shadow-xl space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-12 h-12 rounded-2xl bg-slate-800 object-cover border border-white/10 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-white">{c.name}</h3>
                      <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{c.rating.toFixed(2)}</span>
                        <span className="text-slate-500 font-mono text-[11px] font-normal">({c.id})</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold bg-[#0d0d0d] text-slate-300 px-2 py-1 rounded-md border border-white/10">
                    {c.city}
                  </span>
                </div>

                {/* Primary Vehicle */}
                <div className="p-2.5 rounded-xl bg-[#0d0d0d] border border-white/5 text-xs flex items-center space-x-2 text-slate-300">
                  <Car className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold truncate">{c.preferredVehicle}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#0d0d0d] border border-white/5">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Orders</span>
                    <span className="text-sm font-bold text-slate-200 font-mono">{c.totalBookings}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0d0d0d] border border-white/5">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Lifetime Value</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">${c.totalSpent.toLocaleString()}</span>
                  </div>
                </div>

                {/* Contacts */}
                <div className="space-y-1 text-xs text-slate-400 pt-1">
                  <p className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{c.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{c.phone}</span>
                  </p>
                  <p className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{c.address}, {c.city}, {c.state}</span>
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 text-[10px] text-slate-500 font-mono">
                Member since {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-between text-xs">
        <div className="text-slate-400">
          Showing <span className="font-bold text-slate-200 font-mono">{(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)}</span> of <span className="font-bold text-slate-200 font-mono">{total}</span> customers
        </div>
        <div className="flex items-center space-x-1">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 font-mono font-bold text-slate-300">
            {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
