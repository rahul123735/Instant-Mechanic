import React, { useState } from 'react';
import { OperationsProvider, useOperations } from './context/OperationsContext';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { OverviewView } from './components/OverviewView';
import { BookingsView } from './components/BookingsView';
import { MechanicsView } from './components/MechanicsView';
import { LiveMapView } from './components/LiveMapView';
import { CustomersView } from './components/CustomersView';
import { ApiDocsView } from './components/ApiDocsView';
import { ArchitectureDocView } from './components/ArchitectureDocView';
import { BookingDetailModal } from './components/BookingDetailModal';
import { NewBookingModal } from './components/NewBookingModal';
import { Menu, Car } from 'lucide-react';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const { isLoading, error } = useOperations();

  const renderView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView setActiveTab={setActiveTab} />;
      case 'bookings':
        return <BookingsView />;
      case 'mechanics':
        return <MechanicsView />;
      case 'map':
        return <LiveMapView />;
      case 'customers':
        return <CustomersView />;
      case 'apidocs':
        return <ApiDocsView />;
      case 'architecture':
        return <ArchitectureDocView />;
      default:
        return <OverviewView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col antialiased">
      {/* Mobile Top App Bar with hamburger */}
      <div className="lg:hidden h-14 bg-[#0d0d0d] border-b border-white/5 px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsOpenMobile(true)}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Car className="w-5 h-5 text-emerald-400" />
            <span className="font-extrabold text-sm text-slate-100 tracking-tight">INSTANT MECHANIC</span>
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpenMobile={isOpenMobile}
          setIsOpenMobile={setIsOpenMobile}
        />

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          {/* Header */}
          <Header />

          {/* View Container */}
          <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {error}
              </div>
            )}
            {renderView()}
          </main>
        </div>
      </div>

      {/* Modals & Drawers */}
      <BookingDetailModal />
      <NewBookingModal />
    </div>
  );
}

export default function App() {
  return (
    <OperationsProvider>
      <DashboardContent />
    </OperationsProvider>
  );
}
