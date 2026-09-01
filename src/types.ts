export type BookingStatus = 
  | 'pending'
  | 'assigned'
  | 'mechanic_on_the_way'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type MechanicStatus = 
  | 'available'
  | 'on_the_way'
  | 'in_progress'
  | 'off_duty';

export type PriorityLevel = 'low' | 'normal' | 'high' | 'urgent';

export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  rating: number;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
  preferredVehicle?: string;
}

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  color: string;
  mileage: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  color: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  estimatedMinutes: number;
  price: number;
  description: string;
}

export interface Mechanic {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  status: MechanicStatus;
  jobsCompleted: number;
  currentBookingId?: string | null;
  currentBookingSummary?: string | null;
  location: LocationCoordinates;
  joinedAt: string;
}

export interface BookingTimelineEvent {
  id: string;
  status: BookingStatus;
  timestamp: string;
  title: string;
  note: string;
  actor: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAvatar: string;
  vehicle: Vehicle;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  mechanicId?: string | null;
  mechanicName?: string | null;
  mechanicAvatar?: string | null;
  status: BookingStatus;
  amount: number;
  createdAt: string;
  scheduledFor: string;
  updatedAt: string;
  completedAt?: string | null;
  priority: PriorityLevel;
  paymentStatus: PaymentStatus;
  serviceAddress: string;
  city: string;
  coordinates: LocationCoordinates;
  notes?: string;
  timeline: BookingTimelineEvent[];
}

export interface DashboardMetrics {
  totalBookings: number;
  todayBookings: number;
  completedBookings: number;
  pendingBookings: number;
  inProgressBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  todayRevenue: number;
  activeMechanics: number;
  totalMechanics: number;
  totalCustomers: number;
  newCustomersThisMonth: number;
  averageBookingValue: number;
  completionRatePercentage: number;
  growthRates: {
    bookingsWeekOverWeek: number;
    revenueMonthOverMonth: number;
    activeMechanicsPercent: number;
  };
}

export interface AnalyticsData {
  bookingsOverTime: Array<{ date: string; bookings: number; completed: number; revenue: number }>;
  revenueOverTime: Array<{ month: string; revenue: number; target: number; profit: number }>;
  bookingStatusDistribution: Array<{ name: string; value: number; color: string }>;
  serviceCategoryBreakdown: Array<{ category: string; count: number; revenue: number; percentage: number }>;
  hourlyVolumeToday: Array<{ hour: string; bookings: number }>;
}

export interface LiveOperationEvent {
  id: string;
  timestamp: string;
  type: 'booking_created' | 'status_changed' | 'mechanic_assigned' | 'mechanic_status' | 'emergency_alert';
  title: string;
  description: string;
  bookingId?: string;
  mechanicId?: string;
  severity: 'info' | 'success' | 'warning' | 'critical';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
