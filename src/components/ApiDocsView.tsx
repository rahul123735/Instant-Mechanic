import React, { useState } from 'react';
import { 
  Code2, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Terminal, 
  Radio, 
  CheckCircle2, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

interface EndpointDoc {
  id: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  title: string;
  description: string;
  queryParams?: Array<{ name: string; type: string; description: string; default?: string }>;
  requestBody?: any;
  sampleResponse: any;
}

export const ApiDocsView: React.FC = () => {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>('get-dashboard');
  const [liveResponse, setLiveResponse] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseLatency, setResponseLatency] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const endpoints: EndpointDoc[] = [
    {
      id: 'get-dashboard',
      method: 'GET',
      path: '/api/dashboard',
      title: 'Aggregated Operations Dashboard',
      description: 'Returns top-level KPIs, 14-day booking volume, monthly revenue trends, status breakdown, active mechanics summary, and real-time live events feed.',
      sampleResponse: {
        success: true,
        data: {
          metrics: {
            totalBookings: 540,
            todayBookings: 24,
            completedBookings: 472,
            pendingBookings: 18,
            inProgressBookings: 32,
            cancelledBookings: 18,
            totalRevenue: 124800,
            todayRevenue: 4950,
            activeMechanics: 20,
            totalMechanics: 22
          }
        }
      }
    },
    {
      id: 'get-bookings',
      method: 'GET',
      path: '/api/bookings',
      title: 'List Bookings (Paginated & Filtered)',
      description: 'Retrieves paginated vehicle service bookings with full-text search, status filtering, category filtering, mechanic ID filter, and dynamic sorting.',
      queryParams: [
        { name: 'page', type: 'number', description: 'Page number (starts at 1)', default: '1' },
        { name: 'pageSize', type: 'number', description: 'Items per page (max 100)', default: '10' },
        { name: 'search', type: 'string', description: 'Keyword search across customer, vehicle, ID, etc.' },
        { name: 'status', type: 'string', description: 'pending | assigned | mechanic_on_the_way | in_progress | completed | cancelled' },
        { name: 'category', type: 'string', description: 'Filter by service category' },
        { name: 'mechanicId', type: 'string', description: 'Filter by assigned mechanic ID' },
        { name: 'sortBy', type: 'string', description: 'createdAt | amount | customer | vehicle | status', default: 'createdAt' },
        { name: 'sortOrder', type: 'string', description: 'asc | desc', default: 'desc' }
      ],
      sampleResponse: {
        success: true,
        data: [
          {
            id: 'BK-8540',
            customerId: 'CUST-1042',
            customerName: 'Elena Rodriguez',
            serviceName: 'Full Synthetic Oil Change & Filter',
            amount: 89.99,
            status: 'in_progress',
            vehicle: { make: 'Toyota', model: 'RAV4', year: 2022, licensePlate: '7ABC890' }
          }
        ],
        total: 540,
        page: 1,
        pageSize: 10,
        totalPages: 54
      }
    },
    {
      id: 'get-booking-id',
      method: 'GET',
      path: '/api/bookings/BK-8539',
      title: 'Get Single Booking Details',
      description: 'Retrieves complete metadata for a specific booking, including vehicle VIN and complete chronological audit timeline.',
      sampleResponse: {
        success: true,
        data: {
          id: 'BK-8539',
          customerName: 'Marcus Vance',
          serviceName: 'Ceramic Brake Pads & Rotor Resurface',
          amount: 289.50,
          status: 'assigned',
          timeline: [
            { id: 'TL-1', status: 'pending', title: 'Service Requested', timestamp: '2026-09-01T10:00:00Z' },
            { id: 'TL-2', status: 'assigned', title: 'Mechanic Assigned', timestamp: '2026-09-01T10:10:00Z' }
          ]
        }
      }
    },
    {
      id: 'post-bookings',
      method: 'POST',
      path: '/api/bookings',
      title: 'Create New Booking Order',
      description: 'Registers a new vehicle service booking, automatically generates audit trail, and broadcasts an SSE live event to connected dashboards.',
      requestBody: {
        customerId: 'CUST-1002',
        serviceId: 'srv-1',
        serviceAddress: '120 Market St, San Francisco, CA',
        priority: 'urgent',
        notes: 'Customer car is parked in rear driveway.'
      },
      sampleResponse: {
        success: true,
        data: {
          id: 'BK-8541',
          status: 'pending',
          amount: 89.99,
          createdAt: '2026-09-01T10:30:00Z'
        }
      }
    },
    {
      id: 'patch-booking-status',
      method: 'PATCH',
      path: '/api/bookings/BK-8538',
      title: 'Update Booking Status',
      description: 'Transitions a booking status (e.g. pending → assigned → mechanic_on_the_way → in_progress → completed) with audit actor and note.',
      requestBody: {
        status: 'in_progress',
        note: 'Mechanic arrived on site and began rotor replacement.',
        actor: 'Operations Lead'
      },
      sampleResponse: {
        success: true,
        data: {
          id: 'BK-8538',
          status: 'in_progress',
          updatedAt: '2026-09-01T10:32:00Z'
        }
      }
    },
    {
      id: 'post-assign-mechanic',
      method: 'POST',
      path: '/api/bookings/BK-8538/assign',
      title: 'Assign Field Mechanic',
      description: 'Dispatches an available mechanic van to an active booking and updates mechanic workload state.',
      requestBody: {
        mechanicId: 'MEC-101',
        actor: 'Dispatcher'
      },
      sampleResponse: {
        success: true,
        data: {
          id: 'BK-8538',
          mechanicId: 'MEC-101',
          mechanicName: 'Alex Rivera',
          status: 'assigned'
        }
      }
    },
    {
      id: 'get-mechanics',
      method: 'GET',
      path: '/api/mechanics',
      title: 'List All Fleet Mechanics',
      description: 'Returns all 22 mobile mechanics with their real-time status (available, on_the_way, in_progress, off_duty), coordinates, rating, and specialties.',
      sampleResponse: {
        success: true,
        count: 22,
        data: [
          {
            id: 'MEC-101',
            name: 'Alex Rivera',
            specialty: 'Diagnostics & Engine Specialist',
            status: 'available',
            rating: 4.95,
            jobsCompleted: 142
          }
        ]
      }
    },
    {
      id: 'get-customers',
      method: 'GET',
      path: '/api/customers',
      title: 'List Customers Directory',
      description: 'Returns customer profiles, contact information, lifetime spend, total bookings, and preferred vehicle makes.',
      sampleResponse: {
        success: true,
        total: 60,
        page: 1,
        pageSize: 20,
        data: [
          {
            id: 'CUST-1001',
            name: 'Elena Rodriguez',
            email: 'elena.rodriguez@example.com',
            totalSpent: 1840,
            totalBookings: 8
          }
        ]
      }
    },
    {
      id: 'get-events-sse',
      method: 'GET',
      path: '/api/events',
      title: 'Server-Sent Events (SSE) Stream',
      description: 'Persistent HTTP streaming connection broadcasting real-time dispatch updates, new bookings, and GPS telemetry events to clients.',
      sampleResponse: {
        comment: 'Streaming response: text/event-stream with automatic reconnect keep-alive ping'
      }
    },
    {
      id: 'post-simulate',
      method: 'POST',
      path: '/api/simulate-event',
      title: 'Trigger Simulation Event',
      description: 'Randomly mutates an active booking or generates a new real-time customer repair order, broadcasting it immediately across all connected SSE clients.',
      sampleResponse: {
        success: true,
        event: {
          id: 'EV-1725189000',
          type: 'status_changed',
          title: '🔄 Status Updated → in progress',
          description: 'Booking BK-8537 progressed to in_progress'
        }
      }
    }
  ];

  const currentEndpoint = endpoints.find(e => e.id === selectedEndpointId) || endpoints[0];

  const handleTestEndpoint = async () => {
    setIsLoading(true);
    setLiveResponse(null);
    setResponseStatus(null);
    const start = performance.now();

    try {
      let res: Response;
      if (currentEndpoint.method === 'GET') {
        res = await fetch(currentEndpoint.path);
      } else if (currentEndpoint.method === 'POST') {
        res = await fetch(currentEndpoint.path, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: currentEndpoint.requestBody ? JSON.stringify(currentEndpoint.requestBody) : undefined
        });
      } else if (currentEndpoint.method === 'PATCH') {
        res = await fetch(currentEndpoint.path, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: currentEndpoint.requestBody ? JSON.stringify(currentEndpoint.requestBody) : undefined
        });
      } else {
        res = await fetch(currentEndpoint.path);
      }

      const elapsed = Math.round(performance.now() - start);
      setResponseLatency(elapsed);
      setResponseStatus(res.status);

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setLiveResponse(data);
      } else {
        const text = await res.text();
        setLiveResponse(text);
      }
    } catch (err: any) {
      setResponseStatus(500);
      setLiveResponse({ error: err.message || 'Request failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const copyCurl = () => {
    let curl = `curl -X ${currentEndpoint.method} "https://instantmechanic.app${currentEndpoint.path}"`;
    if (currentEndpoint.requestBody) {
      curl += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(currentEndpoint.requestBody)}'`;
    }
    navigator.clipboard.writeText(curl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Backend REST API & OpenAPI Console
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Interactive Swagger Explorer
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Test live operational endpoints directly against the running Express backend with sub-millisecond response validation
          </p>
        </div>
      </div>

      {/* Main Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Endpoints List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 rounded-2xl bg-[#111111] border border-white/5 text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Operational Endpoints</span>
            <span className="font-mono text-emerald-400">{endpoints.length} Active</span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto custom-scrollbar">
            {endpoints.map((ep) => {
              const isSelected = ep.id === selectedEndpointId;
              const methodColor = 
                ep.method === 'GET' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                ep.method === 'POST' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' :
                'text-amber-400 bg-amber-500/10 border-amber-500/20';

              return (
                <button
                  key={ep.id}
                  onClick={() => {
                    setSelectedEndpointId(ep.id);
                    setLiveResponse(null);
                    setResponseStatus(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex flex-col space-y-1 ${
                    isSelected
                      ? 'bg-[#181818] border-emerald-500/40 shadow-md shadow-emerald-500/5 text-white'
                      : 'bg-[#111111] border-white/5 hover:bg-[#161616] text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] border ${methodColor}`}>
                      {ep.method}
                    </span>
                    <span className={`font-mono font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{ep.title}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Live Request Runner & Response Viewer (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Endpoint Details Card */}
          <div className="p-5 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded-lg font-mono font-black text-xs border ${
                  currentEndpoint.method === 'GET' ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' :
                  currentEndpoint.method === 'POST' ? 'text-blue-400 bg-blue-500/15 border-blue-500/30' :
                  'text-amber-400 bg-amber-500/15 border-amber-500/30'
                }`}>
                  {currentEndpoint.method}
                </span>
                <span className="font-mono text-sm sm:text-base font-black text-white">{currentEndpoint.path}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={copyCurl}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
                  title="Copy cURL Command"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'cURL'}</span>
                </button>

                <button
                  onClick={handleTestEndpoint}
                  disabled={isLoading}
                  className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black shadow-md shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 stroke-[2.5] ${isLoading ? 'animate-bounce' : ''}`} />
                  <span>Send Request</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-200">{currentEndpoint.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{currentEndpoint.description}</p>
            </div>

            {/* Query Parameters Table */}
            {currentEndpoint.queryParams && (
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Query Parameters</h4>
                <div className="rounded-xl border border-white/5 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0d0d0d] text-slate-400 font-mono text-[10px] uppercase border-b border-white/5">
                      <tr>
                        <th className="p-2.5">Param</th>
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Default</th>
                        <th className="p-2.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#0e0e0e]">
                      {currentEndpoint.queryParams.map((p) => (
                        <tr key={p.name} className="hover:bg-white/5">
                          <td className="p-2.5 font-mono font-bold text-emerald-400">{p.name}</td>
                          <td className="p-2.5 font-mono text-slate-400">{p.type}</td>
                          <td className="p-2.5 font-mono text-slate-500">{p.default || '-'}</td>
                          <td className="p-2.5 text-slate-300">{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Request Body JSON */}
            {currentEndpoint.requestBody && (
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Request Payload (JSON)</h4>
                <pre className="p-3 rounded-xl bg-[#0a0a0a] border border-white/5 text-xs font-mono text-emerald-300 overflow-x-auto">
                  {JSON.stringify(currentEndpoint.requestBody, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Live Response Card */}
          <div className="p-5 rounded-3xl bg-[#111111] border border-white/5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {liveResponse ? 'Live Server Response' : 'Sample Response Schema'}
                </h3>
              </div>

              {responseStatus !== null && (
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className={`px-2 py-0.5 rounded-full font-bold ${
                    responseStatus >= 200 && responseStatus < 300
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    HTTP {responseStatus}
                  </span>
                  {responseLatency !== null && (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {responseLatency}ms
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <pre className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/5 text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed custom-scrollbar">
                {JSON.stringify(liveResponse || currentEndpoint.sampleResponse, null, 2)}
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
