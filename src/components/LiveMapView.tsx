import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Wrench, 
  Car, 
  Radio, 
  ShieldCheck, 
  Maximize2, 
  Zap,
  CheckCircle2,
  Navigation,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { useOperations } from '../context/OperationsContext';

export const LiveMapView: React.FC = () => {
  const { mechanics, liveEvents, setSelectedBookingId, triggerManualSimulation } = useOperations();
  const [selectedMechanicId, setSelectedMechanicId] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState<'all' | 'active' | 'available'>('all');

  const activeMechanics = mechanics.filter(m => {
    if (mapLayer === 'active') return ['on_the_way', 'in_progress'].includes(m.status);
    if (mapLayer === 'available') return m.status === 'available';
    return true;
  });

  const selectedMechanic = mechanics.find(m => m.id === selectedMechanicId);

  // Geographic bounds for SF Bay Area projection
  // Lat: 37.30 (San Jose) to 37.90 (Berkeley)
  // Lng: -122.50 (Ocean/SF) to -121.80 (East San Jose)
  const minLat = 37.30;
  const maxLat = 37.92;
  const minLng = -122.52;
  const maxLng = -121.80;

  const projectCoords = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y))
    };
  };

  const bayAreaZones = [
    { name: 'San Francisco Metro', x: 22, y: 25, activeJobs: 6 },
    { name: 'Oakland & East Bay', x: 42, y: 22, activeJobs: 4 },
    { name: 'Berkeley & North', x: 44, y: 12, activeJobs: 2 },
    { name: 'San Mateo & Peninsula', x: 35, y: 55, activeJobs: 3 },
    { name: 'Palo Alto & Stanford', x: 50, y: 70, activeJobs: 5 },
    { name: 'San Jose & Silicon Valley', x: 80, y: 88, activeJobs: 8 }
  ];

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Live Fleet & Operations Map
            </h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Live GPS Feed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time geospatial tracking of mobile mechanic vans and in-progress customer service calls
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => triggerManualSimulation()}
            className="flex items-center space-x-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold rounded-xl border border-white/10 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Simulate Fleet Movement</span>
          </button>
        </div>
      </div>

      {/* Map Card & Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Interactive Map Visualizer Canvas (8 cols) */}
        <div className="lg:col-span-8 p-4 rounded-3xl bg-[#111111] border border-white/5 shadow-2xl flex flex-col space-y-3">
          
          {/* Map Controls Toolbar */}
          <div className="flex items-center justify-between px-2 text-xs">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-slate-400" />
              <span className="font-bold text-slate-300">Filter Layer:</span>
              <div className="flex bg-[#0d0d0d] p-0.5 rounded-lg border border-white/5">
                {(['all', 'active', 'available'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setMapLayer(l)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
                      mapLayer === l ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Available
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> En Route
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> In Progress
              </span>
            </div>
          </div>

          {/* Styled Vector Map Container */}
          <div className="relative w-full h-[520px] rounded-2xl bg-[#080808] border border-white/5 overflow-hidden select-none">
            
            {/* Grid Coordinates Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

            {/* Stylized Bay Area Shoreline & Water SVG Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <path
                d="M 50,0 Q 200,150 250,300 T 500,500"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle cx="25%" cy="30%" r="90" fill="#10b981" opacity="0.05" />
              <circle cx="65%" cy="75%" r="120" fill="#10b981" opacity="0.05" />
            </svg>

            {/* Service Zones Labels */}
            {bayAreaZones.map((zone) => (
              <div
                key={zone.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              >
                <div className="px-2 py-0.5 rounded bg-[#111111]/80 border border-white/10 text-[10px] font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap shadow-sm backdrop-blur-xs">
                  {zone.name} • {zone.activeJobs} jobs
                </div>
              </div>
            ))}

            {/* Mechanics Telemetry Markers */}
            {activeMechanics.map((m) => {
              const pos = projectCoords(m.location.lat, m.location.lng);
              const isSelected = m.id === selectedMechanicId;
              const isEnRoute = m.status === 'on_the_way';
              const isInProgress = m.status === 'in_progress';
              const isAvailable = m.status === 'available';

              const markerColor = isAvailable 
                ? 'bg-emerald-500 text-black ring-emerald-400' 
                : isEnRoute 
                ? 'bg-blue-500 text-white ring-blue-400' 
                : 'bg-amber-500 text-black ring-amber-400';

              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMechanicId(m.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  {/* Pulsing ring for active dispatch */}
                  {(isEnRoute || isInProgress) && (
                    <span className="absolute -inset-1.5 rounded-full animate-ping opacity-60 bg-emerald-400 pointer-events-none" />
                  )}

                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-xl shadow-xl font-bold text-xs ring-2 ${markerColor} transition-transform`}>
                    <Wrench className="w-4 h-4 stroke-[2.5]" />
                  </div>

                  {/* Tooltip Hover Pill */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-40 whitespace-nowrap">
                    <div className="px-2.5 py-1 rounded-lg bg-[#111111] border border-white/10 text-slate-100 text-xs font-semibold shadow-2xl space-y-0.5">
                      <p className="font-bold text-emerald-400">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.specialty}</p>
                      <p className="text-[10px] font-mono text-emerald-400 uppercase">{m.status.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Radar Scan Sweep Line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse absolute top-1/2" />
            </div>

            {/* Live GPS Stamp Overlay */}
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-[#0d0d0d]/90 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center space-x-2 backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>SF BAY AREA TELEMETRY GRID: 37.77° N, 122.41° W</span>
            </div>
          </div>
        </div>

        {/* Selected Fleet Inspector & Dispatch Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Selected Mechanic Inspector */}
          <div className="p-5 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-emerald-400" /> Van Telemetry Inspector
              </h3>
              {selectedMechanic && (
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {selectedMechanic.id}
                </span>
              )}
            </div>

            {selectedMechanic ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedMechanic.avatar}
                    alt={selectedMechanic.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-white/10 bg-slate-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-extrabold text-base text-white">{selectedMechanic.name}</h4>
                    <p className="text-xs text-emerald-400 font-semibold">{selectedMechanic.specialty}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Rating: <strong className="text-slate-200">{selectedMechanic.rating.toFixed(2)} ★</strong> ({selectedMechanic.jobsCompleted} jobs)</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0d0d0d] border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Current Status:</span>
                    <span className="font-bold uppercase font-mono text-emerald-400">{selectedMechanic.status.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>GPS Coordinates:</span>
                    <span className="font-mono text-slate-300">{selectedMechanic.location.lat}, {selectedMechanic.location.lng}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Zone:</span>
                    <span className="font-medium text-slate-200">{selectedMechanic.location.city}</span>
                  </div>
                </div>

                {selectedMechanic.currentBookingId && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">Active Service Ticket</span>
                    <p className="font-bold text-slate-200">{selectedMechanic.currentBookingSummary}</p>
                    <button
                      onClick={() => setSelectedBookingId(selectedMechanic.currentBookingId!)}
                      className="text-xs text-emerald-400 hover:underline font-bold pt-1 block"
                    >
                      Open Ticket {selectedMechanic.currentBookingId} →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">
                <Compass className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                <p className="font-semibold text-slate-300">Click any van icon on the map</p>
                <p className="text-slate-500 mt-1">View technician live coordinates and active job routing</p>
              </div>
            )}
          </div>

          {/* Quick Active Dispatches Feed */}
          <div className="p-5 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Field Dispatches ({mechanics.filter(m => m.status !== 'available' && m.status !== 'off_duty').length})
              </h3>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
              {mechanics
                .filter(m => m.currentBookingId)
                .map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMechanicId(m.id);
                      if (m.currentBookingId) setSelectedBookingId(m.currentBookingId);
                    }}
                    className="p-2.5 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/15 cursor-pointer text-xs flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                      <div className="truncate">
                        <p className="font-bold text-slate-200 truncate">{m.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{m.currentBookingSummary}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                      {m.currentBookingId}
                    </span>
                  </div>
                ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
