import { 
  AnalyticsData, 
  Booking, 
  Customer, 
  DashboardMetrics, 
  LiveOperationEvent, 
  Mechanic, 
  PaginatedResponse, 
  ServiceItem 
} from '../types';

const API_BASE = '/api';

export const api = {
  async getDashboard(): Promise<{
    metrics: DashboardMetrics;
    analytics: AnalyticsData;
    recentBookings: Booking[];
    mechanicSummary: {
      total: number;
      available: number;
      onTheWay: number;
      inProgress: number;
      offDuty: number;
    };
    liveEvents: LiveOperationEvent[];
  }> {
    const res = await fetch(`${API_BASE}/dashboard`);
    if (!res.ok) throw new Error('Failed to fetch dashboard data');
    const json = await res.json();
    return json.data;
  },

  async getBookings(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
    category?: string;
    mechanicId?: string;
    priority?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<PaginatedResponse<Booking>> {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page.toString());
    if (params.pageSize) query.set('pageSize', params.pageSize.toString());
    if (params.search) query.set('search', params.search);
    if (params.status && params.status !== 'all') query.set('status', params.status);
    if (params.category && params.category !== 'all') query.set('category', params.category);
    if (params.mechanicId && params.mechanicId !== 'all') query.set('mechanicId', params.mechanicId);
    if (params.priority && params.priority !== 'all') query.set('priority', params.priority);
    if (params.sortBy) query.set('sortBy', params.sortBy);
    if (params.sortOrder) query.set('sortOrder', params.sortOrder);

    const res = await fetch(`${API_BASE}/bookings?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  async getBookingById(id: string): Promise<Booking> {
    const res = await fetch(`${API_BASE}/bookings/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch booking ${id}`);
    const json = await res.json();
    return json.data;
  },

  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error('Failed to create booking');
    const json = await res.json();
    return json.data;
  },

  async updateBookingStatus(id: string, status: string, note?: string, actor?: string): Promise<Booking> {
    const res = await fetch(`${API_BASE}/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note, actor })
    });
    if (!res.ok) throw new Error(`Failed to update booking ${id}`);
    const json = await res.json();
    return json.data;
  },

  async assignMechanic(bookingId: string, mechanicId: string, actor?: string): Promise<Booking> {
    const res = await fetch(`${API_BASE}/bookings/${bookingId}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mechanicId, actor })
    });
    if (!res.ok) throw new Error(`Failed to assign mechanic to booking ${bookingId}`);
    const json = await res.json();
    return json.data;
  },

  async cancelBooking(bookingId: string, reason?: string): Promise<Booking> {
    const res = await fetch(`${API_BASE}/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    if (!res.ok) throw new Error(`Failed to cancel booking ${bookingId}`);
    const json = await res.json();
    return json.data;
  },

  async getMechanics(): Promise<Mechanic[]> {
    const res = await fetch(`${API_BASE}/mechanics`);
    if (!res.ok) throw new Error('Failed to fetch mechanics');
    const json = await res.json();
    return json.data;
  },

  async getMechanicById(id: string): Promise<Mechanic & { recentBookings?: Booking[] }> {
    const res = await fetch(`${API_BASE}/mechanics/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch mechanic ${id}`);
    const json = await res.json();
    return json.data;
  },

  async updateMechanic(id: string, updates: Partial<Mechanic>): Promise<Mechanic> {
    const res = await fetch(`${API_BASE}/mechanics/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error(`Failed to update mechanic ${id}`);
    const json = await res.json();
    return json.data;
  },

  async getCustomers(search?: string, page = 1, pageSize = 20): Promise<PaginatedResponse<Customer>> {
    const query = new URLSearchParams();
    if (search) query.set('search', search);
    query.set('page', page.toString());
    query.set('pageSize', pageSize.toString());

    const res = await fetch(`${API_BASE}/customers?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch customers');
    return res.json();
  },

  async getCustomerById(id: string): Promise<Customer> {
    const res = await fetch(`${API_BASE}/customers/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch customer ${id}`);
    const json = await res.json();
    return json.data;
  },

  async getServices(): Promise<ServiceItem[]> {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    const json = await res.json();
    return json.data;
  },

  async simulateLiveEvent(): Promise<LiveOperationEvent> {
    const res = await fetch(`${API_BASE}/simulate-event`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to simulate live event');
    const json = await res.json();
    return json.event;
  },

  getExportCsvUrl(): string {
    return `${API_BASE}/export/bookings.csv`;
  }
};
