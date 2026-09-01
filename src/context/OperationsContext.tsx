import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  AnalyticsData, 
  Booking, 
  BookingStatus, 
  Customer, 
  DashboardMetrics, 
  LiveOperationEvent, 
  Mechanic, 
  ServiceItem 
} from '../types';
import { api } from '../services/api';

export type UserRole = 'Operations Manager' | 'Lead Dispatcher' | 'Executive Admin';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'critical';
  read: boolean;
  bookingId?: string;
}

interface OperationsContextType {
  metrics: DashboardMetrics | null;
  analytics: AnalyticsData | null;
  mechanics: Mechanic[];
  services: ServiceItem[];
  liveEvents: LiveOperationEvent[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  
  // Real-time SSE State
  isConnectedSSE: boolean;
  isSimulating: boolean;
  simulationIntervalSec: number;
  setSimulationIntervalSec: (sec: number) => void;
  toggleSimulation: () => void;
  triggerManualSimulation: () => Promise<void>;
  
  // User & UI Preferences
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Selected items & drawers
  selectedBookingId: string | null;
  setSelectedBookingId: (id: string | null) => void;
  isNewBookingModalOpen: boolean;
  setIsNewBookingModalOpen: (open: boolean) => void;
  
  // Refresh triggers
  refreshDashboard: () => Promise<void>;
  refreshMechanics: () => Promise<void>;
  updateBookingStatus: (id: string, status: BookingStatus, note?: string) => Promise<void>;
  assignMechanicToBooking: (bookingId: string, mechanicId: string) => Promise<void>;
  
  // Loading & error
  isLoading: boolean;
  error: string | null;
}

const OperationsContext = createContext<OperationsContextType | undefined>(undefined);

export const OperationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveOperationEvent[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  
  const [isConnectedSSE, setIsConnectedSSE] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationIntervalSec, setSimulationIntervalSec] = useState<number>(8);
  
  const [userRole, setUserRole] = useState<UserRole>('Operations Manager');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState<boolean>(false);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [dashData, mechs, srvs] = await Promise.all([
        api.getDashboard(),
        api.getMechanics(),
        api.getServices()
      ]);
      setMetrics(dashData.metrics);
      setAnalytics(dashData.analytics);
      setMechanics(mechs);
      setServices(srvs);
      setLiveEvents(dashData.liveEvents);
      
      // Initialize some notifications from recent events
      const initialNotifs: NotificationItem[] = dashData.liveEvents.slice(0, 6).map(e => ({
        id: e.id,
        title: e.title,
        message: e.description,
        timestamp: e.timestamp,
        type: e.severity,
        read: false,
        bookingId: e.bookingId
      }));
      setNotifications(initialNotifs);
      setError(null);
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message || 'Failed to connect to backend server');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshDashboard = useCallback(async () => {
    try {
      const [dashData, mechs] = await Promise.all([
        api.getDashboard(),
        api.getMechanics()
      ]);
      setMetrics(dashData.metrics);
      setAnalytics(dashData.analytics);
      setMechanics(mechs);
      setLiveEvents(dashData.liveEvents);
    } catch (err) {
      console.error('Failed to refresh dashboard:', err);
    }
  }, []);

  const refreshMechanics = useCallback(async () => {
    try {
      const mechs = await api.getMechanics();
      setMechanics(mechs);
    } catch (err) {
      console.error('Failed to refresh mechanics:', err);
    }
  }, []);

  // Set up real-time Server-Sent Events (SSE)
  useEffect(() => {
    fetchInitialData();

    let eventSource: EventSource | null = null;
    let reconnectTimeout: any = null;

    const connectSSE = () => {
      try {
        eventSource = new EventSource('/api/events');

        eventSource.onopen = () => {
          setIsConnectedSSE(true);
        };

        eventSource.onmessage = (event) => {
          try {
            const data: LiveOperationEvent = JSON.parse(event.data);
            if (data.type) {
              setLiveEvents(prev => [data, ...prev.slice(0, 49)]);
              
              // Push to notification center
              setNotifications(prev => [
                {
                  id: `notif-${Date.now()}-${Math.random()}`,
                  title: data.title,
                  message: data.description,
                  timestamp: data.timestamp || new Date().toISOString(),
                  type: data.severity || 'info',
                  read: false,
                  bookingId: data.bookingId
                },
                ...prev.slice(0, 25)
              ]);

              // Trigger background data sync when state changes
              refreshDashboard();
            }
          } catch (e) {
            // ping or heartbeat
          }
        };

        eventSource.onerror = () => {
          setIsConnectedSSE(false);
          eventSource?.close();
          // Attempt reconnect in 4 seconds
          reconnectTimeout = setTimeout(connectSSE, 4000);
        };
      } catch (err) {
        setIsConnectedSSE(false);
      }
    };

    connectSSE();

    return () => {
      if (eventSource) eventSource.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [fetchInitialData, refreshDashboard]);

  // Simulation Interval Handler
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(async () => {
      try {
        await api.simulateLiveEvent();
      } catch (err) {
        console.error('Simulation error:', err);
      }
    }, simulationIntervalSec * 1000);

    return () => clearInterval(interval);
  }, [isSimulating, simulationIntervalSec]);

  const toggleSimulation = () => {
    setIsSimulating(prev => !prev);
  };

  const triggerManualSimulation = async () => {
    try {
      await api.simulateLiveEvent();
    } catch (err) {
      console.error('Manual simulation error:', err);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const updateBookingStatus = async (id: string, status: BookingStatus, note?: string) => {
    await api.updateBookingStatus(id, status, note, userRole);
    await refreshDashboard();
  };

  const assignMechanicToBooking = async (bookingId: string, mechanicId: string) => {
    await api.assignMechanic(bookingId, mechanicId, userRole);
    await refreshDashboard();
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <OperationsContext.Provider
      value={{
        metrics,
        analytics,
        mechanics,
        services,
        liveEvents,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        isConnectedSSE,
        isSimulating,
        simulationIntervalSec,
        setSimulationIntervalSec,
        toggleSimulation,
        triggerManualSimulation,
        userRole,
        setUserRole,
        isDarkMode,
        toggleDarkMode,
        selectedBookingId,
        setSelectedBookingId,
        isNewBookingModalOpen,
        setIsNewBookingModalOpen,
        refreshDashboard,
        refreshMechanics,
        updateBookingStatus,
        assignMechanicToBooking,
        isLoading,
        error
      }}
    >
      {children}
    </OperationsContext.Provider>
  );
};

export const useOperations = () => {
  const context = useContext(OperationsContext);
  if (!context) {
    throw new Error('useOperations must be used within an OperationsProvider');
  }
  return context;
};
