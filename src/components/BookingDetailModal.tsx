import React, { useState, useEffect } from 'react';
import { 
  X, 
  Car, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  ShieldCheck, 
  Send, 
  DollarSign, 
  FileText, 
  Trash2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Booking, BookingStatus } from '../types';
import { api } from '../services/api';
import { useOperations } from '../context/OperationsContext';

export const BookingDetailModal: React.FC = () => {
  const { 
    selectedBookingId, 
    setSelectedBookingId, 
    mechanics, 
    updateBookingStatus, 
    assignMechanicToBooking 
  } = useOperations();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMechanicId, setSelectedMechanicId] = useState<string>('');
  const [statusNote, setStatusNote] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!selectedBookingId) {
      setBooking(null);
      return;
    }

    const loadBooking = async () => {
      try {
        setIsLoading(true);
        const data = await api.getBookingById(selectedBookingId);
        setBooking(data);
        if (data.mechanicId) {
          setSelectedMechanicId(data.mechanicId);
        }
      } catch (err) {
        console.error('Failed to load booking details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooking();
  }, [selectedBookingId]);

  if (!selectedBookingId) return null;

  const handleStatusChange = async (newStatus: BookingStatus) => {
    if (!booking) return;
    try {
      setIsUpdating(true);
      await updateBookingStatus(booking.id, newStatus, statusNote || undefined);
      const updated = await api.getBookingById(booking.id);
      setBooking(updated);
      setStatusNote('');
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssign = async () => {
    if (!booking || !selectedMechanicId) return;
    try {
      setIsUpdating(true);
      await assignMechanicToBooking(booking.id, selectedMechanicId);
      const updated = await api.getBookingById(booking.id);
      setBooking(updated);
    } catch (err) {
      console.error('Failed to assign mechanic:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = async () => {
    if (!booking) return;
    if (confirm('Are you sure you want to cancel this booking and issue a customer refund?')) {
      try {
        setIsUpdating(true);
        await api.cancelBooking(booking.id, 'Cancelled by operations operator');
        const updated = await api.getBookingById(booking.id);
        setBooking(updated);
      } catch (err) {
        console.error('Failed to cancel booking:', err);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const steps: BookingStatus[] = ['pending', 'assigned', 'mechanic_on_the_way', 'in_progress', 'completed'];

  const getStepIndex = (status: BookingStatus) => {
    if (status === 'cancelled') return -1;
    return steps.indexOf(status);
  };

  const currentStepIdx = booking ? getStepIndex(booking.status) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[#111111] border border-white/10 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading || !booking ? (
          <div className="py-24 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <span>Fetching operational telemetry for {selectedBookingId}...</span>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="p-5 border-b border-white/5 bg-[#0d0d0d] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-black text-white font-mono tracking-tight">{booking.id}</h2>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      booking.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : booking.status === 'cancelled'
                        ? 'bg-red-500/20 text-red-300 border-red-500/40'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {booking.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Created {new Date(booking.createdAt).toLocaleString()} • Priority: <strong className="text-slate-200 uppercase font-mono">{booking.priority}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBookingId(null)}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lifecycle Progression Tracker */}
            {booking.status !== 'cancelled' && (
              <div className="p-5 border-b border-white/5 bg-[#0e0e0e]">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Live Dispatch State Progression
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {steps.map((st, idx) => {
                    const isDone = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    const labels = ['Pending', 'Assigned', 'En Route', 'In Progress', 'Completed'];
                    return (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st)}
                        disabled={isUpdating}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          isCurrent
                            ? 'bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-md scale-102'
                            : isDone
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold'
                            : 'bg-[#0a0a0a] text-slate-500 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-mono">{idx + 1}</div>
                        <div className="text-xs truncate">{labels[idx]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Modal Body Grid */}
            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-5 custom-scrollbar">
              
              {/* Customer & Vehicle Info Dual Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Customer Details */}
                <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-400" /> Customer Information
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <img
                      src={booking.customerAvatar}
                      alt={booking.customerName}
                      className="w-12 h-12 rounded-full border border-white/10 bg-slate-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white">{booking.customerName}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-500" /> {booking.customerPhone}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                        <Mail className="w-3 h-3 text-slate-500" /> {booking.customerEmail}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 pt-2 border-t border-white/5 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{booking.serviceAddress}</span>
                  </div>
                </div>

                {/* Vehicle Specs */}
                <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-emerald-400" /> Vehicle Specification
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-sm text-white">
                      {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Color: <span className="text-slate-200">{booking.vehicle.color}</span> • Mileage: <span className="font-mono text-slate-200">{booking.vehicle.mileage.toLocaleString()} mi</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">License Plate</span>
                      <span className="font-mono font-bold text-emerald-400 bg-black/40 px-1.5 py-0.5 rounded border border-white/10">
                        {booking.vehicle.licensePlate}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">VIN Number</span>
                      <span className="font-mono text-[11px] text-slate-300 truncate block">
                        {booking.vehicle.vin}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Service & Mechanic Assignment Section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Service Details */}
                <div className="md:col-span-6 p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Service Package</span>
                    <span className="font-mono font-black text-sm text-emerald-400">${booking.amount.toFixed(2)}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{booking.serviceName}</h4>
                  <p className="text-xs text-slate-400">{booking.serviceCategory}</p>
                  <div className="pt-2 text-xs flex items-center justify-between text-slate-400 border-t border-white/5">
                    <span>Payment Status:</span>
                    <span className="font-bold uppercase font-mono text-slate-200">{booking.paymentStatus}</span>
                  </div>
                </div>

                {/* Mechanic Dispatch */}
                <div className="md:col-span-6 p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Assigned Technician</span>
                    {booking.mechanicName && (
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active Dispatch</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedMechanicId}
                      onChange={(e) => setSelectedMechanicId(e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#181818] text-xs text-slate-200 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">-- Choose Field Mechanic --</option>
                      {mechanics.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.status.toUpperCase()}) - {m.specialty}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={handleAssign}
                      disabled={isUpdating || !selectedMechanicId || selectedMechanicId === booking.mechanicId}
                      className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-bold transition-all disabled:opacity-40"
                    >
                      Dispatch
                    </button>
                  </div>

                  {booking.mechanicName && (
                    <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
                      <img src={booking.mechanicAvatar || ''} alt="" className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <span>Currently: <strong className="text-slate-200">{booking.mechanicName}</strong></span>
                    </div>
                  )}
                </div>

              </div>

              {/* Audit Timeline */}
              <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> Operational Audit Trail & Event History
                </h4>

                <div className="space-y-3 pl-2 relative border-l-2 border-white/5 ml-2">
                  {booking.timeline.map((tl) => (
                    <div key={tl.id} className="relative pl-5 space-y-0.5">
                      <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#111111]"></div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200">{tl.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(tl.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{tl.note}</p>
                      <span className="text-[10px] text-slate-500 italic block">By: {tl.actor}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-white/5 bg-[#0d0d0d] flex items-center justify-between">
              {booking.status !== 'cancelled' && booking.status !== 'completed' ? (
                <button
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Cancel & Refund Booking</span>
                </button>
              ) : <div />}

              <button
                onClick={() => setSelectedBookingId(null)}
                className="px-5 py-2 bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl text-xs font-bold transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
