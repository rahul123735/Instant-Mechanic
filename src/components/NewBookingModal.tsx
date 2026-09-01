import React, { useState } from 'react';
import { 
  X, 
  Car, 
  User, 
  Wrench, 
  DollarSign, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  Check, 
  Sparkles,
  Plus
} from 'lucide-react';
import { useOperations } from '../context/OperationsContext';
import { api } from '../services/api';
import { PriorityLevel } from '../types';

export const NewBookingModal: React.FC = () => {
  const { 
    isNewBookingModalOpen, 
    setIsNewBookingModalOpen, 
    mechanics, 
    services, 
    refreshDashboard,
    setSelectedBookingId
  } = useOperations();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  
  const [vehicleMake, setVehicleMake] = useState('Toyota');
  const [vehicleModel, setVehicleModel] = useState('Camry');
  const [vehicleYear, setVehicleYear] = useState('2022');
  const [licensePlate, setLicensePlate] = useState('8KTM492');
  const [vehicleColor, setVehicleColor] = useState('Pearl White');
  
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || 'srv-1');
  const [serviceAddress, setServiceAddress] = useState('450 Post St, San Francisco, CA');
  const [mechanicId, setMechanicId] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('normal');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isNewBookingModalOpen) return null;

  const currentService = services.find(s => s.id === selectedServiceId) || services[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError('Please provide customer name');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const created = await api.createBooking({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim() || '+1 (415) 555-0199',
        customerEmail: customerEmail.trim() || `${customerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        vehicle: {
          make: vehicleMake,
          model: vehicleModel,
          year: parseInt(vehicleYear, 10) || 2022,
          licensePlate: licensePlate.toUpperCase().trim() || '8XYZ999',
          vin: `1HGCR2F8${Math.floor(100000000 + Math.random() * 900000000)}`,
          color: vehicleColor,
          mileage: 35000
        },
        serviceId: currentService?.id || 'srv-1',
        serviceAddress: serviceAddress.trim(),
        mechanicId: mechanicId || undefined,
        priority,
        amount: currentService?.price || 99.00,
        notes: notes.trim() || undefined
      });

      await refreshDashboard();
      setIsNewBookingModalOpen(false);
      setSelectedBookingId(created.id);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#111111] border border-white/10 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/5 bg-[#0d0d0d] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">Create Service Booking</h2>
              <p className="text-xs text-slate-400">Register new customer service call and auto-dispatch technician</p>
            </div>
          </div>

          <button
            onClick={() => setIsNewBookingModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border-b border-red-500/30 text-red-400 text-xs flex items-center gap-2 px-5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Customer Details */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" /> Customer Information
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                required
                placeholder="Full Name (e.g. Liam Chen)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="tel"
                placeholder="Phone (e.g. +1 415-555-0199)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="email"
                placeholder="Email address"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Vehicle Specifications */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-emerald-400" /> Vehicle Details
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <input
                type="text"
                placeholder="Make (e.g. Honda)"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                className="px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="Model (e.g. Civic)"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="number"
                placeholder="Year"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                className="px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="License Plate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                className="px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-emerald-400" /> Service Required
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (${s.price.toFixed(2)}) — {s.estimatedMinutes} mins
                </option>
              ))}
            </select>
          </div>

          {/* Service Address & Location */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Service Location
            </label>
            <input
              type="text"
              required
              placeholder="Full Address (e.g. 120 Market St, San Francisco, CA)"
              value={serviceAddress}
              onChange={(e) => setServiceAddress(e.target.value)}
              className="w-full px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Priority & Assign Mechanic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none"
              >
                <option value="normal">Normal</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent / Roadside</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assign Field Mechanic (Optional)</label>
              <select
                value={mechanicId}
                onChange={(e) => setMechanicId(e.target.value)}
                className="w-full px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none"
              >
                <option value="">Auto-Assign Best Available</option>
                {mechanics.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.status.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Dispatch Notes</label>
            <textarea
              rows={2}
              placeholder="Any customer notes or special vehicle instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-[#0d0d0d] text-xs text-slate-200 rounded-xl border border-white/5 focus:outline-none"
            />
          </div>

          {/* Price Summary & Submit */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Total</span>
              <span className="text-xl font-black font-mono text-emerald-400">${currentService?.price.toFixed(2) || '99.00'}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsNewBookingModalOpen(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-black shadow-md shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Booking...' : 'Confirm & Dispatch'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
