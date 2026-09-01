import { 
  Booking, 
  BookingStatus, 
  Customer, 
  DashboardMetrics, 
  LiveOperationEvent, 
  Mechanic, 
  MechanicStatus, 
  PriorityLevel, 
  ServiceItem,
  AnalyticsData,
  PaginatedResponse 
} from '../src/types';

export const SERVICES_CATALOG: ServiceItem[] = [
  { id: 'srv-1', name: 'Full Synthetic Oil Change & Filter', category: 'Oil, Fluids & Filters', estimatedMinutes: 45, price: 89.99, description: 'Premium full synthetic oil up to 5 qts, OEM filter replacement, and multi-point visual inspection.' },
  { id: 'srv-2', name: 'Ceramic Brake Pads & Rotor Resurface', category: 'Brakes & Suspension', estimatedMinutes: 90, price: 289.50, description: 'Front or rear premium ceramic pad installation, rotor resurfacing/inspection, and brake fluid top-up.' },
  { id: 'srv-3', name: 'Computer OBD-II Engine Diagnostics', category: 'Diagnostics & Engine', estimatedMinutes: 60, price: 129.00, description: 'Complete system scan, ECU fault code analysis, live sensor readings, and written mechanic diagnostic report.' },
  { id: 'srv-4', name: 'Heavy-Duty Battery Test & Replacement', category: 'Battery & Electrical', estimatedMinutes: 40, price: 199.99, description: 'Digital load test, terminal cleaning, anti-corrosion treatment, and AGM/Lead-acid battery install with 3-yr warranty.' },
  { id: 'srv-5', name: 'AC Refrigerant Recharge & Leak Check', category: 'Heating & AC', estimatedMinutes: 75, price: 179.00, description: 'System evacuation, UV dye leak detection test, and R134a/R1234yf refrigerant recharge to OEM specs.' },
  { id: 'srv-6', name: 'Tire Rotation, Balancing & TPMS Reset', category: 'Tires & Wheels', estimatedMinutes: 50, price: 69.95, description: '4-wheel cross rotation, dynamic balancing, tire pressure optimization, and TPMS calibration.' },
  { id: 'srv-7', name: 'Alternator & Charging System Overhaul', category: 'Battery & Electrical', estimatedMinutes: 120, price: 449.00, description: 'High-output alternator replacement, serpentine belt inspection, and charging voltage test.' },
  { id: 'srv-8', name: 'Complete 150-Point Pre-Purchase Inspection', category: 'Inspections', estimatedMinutes: 110, price: 159.00, description: 'Comprehensive bumper-to-bumper mobile inspection with high-res photos, paint gauge check, and test drive.' },
  { id: 'srv-9', name: 'Spark Plugs & Ignition Coil Pack Service', category: 'Diagnostics & Engine', estimatedMinutes: 90, price: 310.00, description: 'Iridium long-life spark plugs, coil boot dielectric grease application, and cylinder misfire verification.' },
  { id: 'srv-10', name: 'Coolant Radiator Flush & Thermostat', category: 'Oil, Fluids & Filters', estimatedMinutes: 80, price: 215.00, description: 'Chemical cooling system flush, OEM thermostat replacement, and high-temp vacuum fill.' },
  { id: 'srv-11', name: 'Starter Motor Replacement', category: 'Battery & Electrical', estimatedMinutes: 100, price: 380.00, description: 'OEM starter motor installation, solenoid test, and starter relay electrical circuit verification.' },
  { id: 'srv-12', name: 'Struts & Shock Absorbers Replacement', category: 'Brakes & Suspension', estimatedMinutes: 150, price: 620.00, description: 'Dual front or rear strut assembly replacement with alignment check and bump stop installation.' }
];

const FIRST_NAMES = [
  'Marcus', 'Elena', 'David', 'Sophia', 'James', 'Aaliyah', 'Carlos', 'Chloe', 'Liam', 'Olivia',
  'Ethan', 'Isabella', 'Noah', 'Mia', 'Lucas', 'Harper', 'Alexander', 'Evelyn', 'Benjamin', 'Amelia',
  'Mason', 'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Sofia', 'Henry', 'Avery',
  'Jackson', 'Ella', 'Sebastian', 'Scarlett', 'Aiden', 'Grace', 'Owen', 'Chloe', 'Samuel', 'Camila',
  'Joseph', 'Penelope', 'John', 'Riley', 'David', 'Layla', 'Wyatt', 'Zoey', 'Carter', 'Nora',
  'Julian', 'Lily', 'Luke', 'Eleanor', 'Grayson', 'Hannah', 'Isaac', 'Lillian', 'Jayden', 'Addison'
];

const LAST_NAMES = [
  'Vance', 'Chen', 'Rodriguez', 'Kim', 'Miller', 'Johnson', 'Patel', 'Smith', 'Williams', 'Brown',
  'Jones', 'Garcia', 'Martinez', 'Davis', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris',
  'Martin', 'Thompson', 'Moore', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen',
  'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards'
];

const VEHICLE_MAKES = [
  { make: 'Toyota', models: ['Camry', 'RAV4', 'Corolla', 'Highlander', 'Tacoma', 'Prius'] },
  { make: 'Honda', models: ['Civic', 'CR-V', 'Accord', 'Pilot', 'HR-V'] },
  { make: 'Ford', models: ['F-150', 'Explorer', 'Escape', 'Mustang', 'Bronco'] },
  { make: 'BMW', models: ['330i', 'X5', 'M340i', 'X3', '540i'] },
  { make: 'Tesla', models: ['Model 3', 'Model Y', 'Model S', 'Model X'] },
  { make: 'Chevrolet', models: ['Silverado 1500', 'Equinox', 'Tahoe', 'Malibu'] },
  { make: 'Hyundai', models: ['Tucson', 'Elantra', 'Santa Fe', 'Sonata', 'Ioniq 5'] },
  { make: 'Subaru', models: ['Outback', 'Forester', 'Crosstrek', 'Impreza'] },
  { make: 'Audi', models: ['A4', 'Q5', 'Q7', 'A6', 'e-tron'] },
  { make: 'Mercedes-Benz', models: ['C-Class', 'GLC 300', 'E-Class', 'GLE 350'] }
];

const COLORS = ['Midnight Black', 'Pearl White', 'Gunmetal Gray', 'Deep Blue', 'Silver Metallic', 'Radiant Red', 'Forest Green'];

const CITIES = [
  { city: 'San Francisco', state: 'CA', baseLat: 37.7749, baseLng: -122.4194 },
  { city: 'Oakland', state: 'CA', baseLat: 37.8044, baseLng: -122.2712 },
  { city: 'San Jose', state: 'CA', baseLat: 37.3382, baseLng: -121.8863 },
  { city: 'Berkeley', state: 'CA', baseLat: 37.8715, baseLng: -122.2730 },
  { city: 'Palo Alto', state: 'CA', baseLat: 37.4419, baseLng: -122.1430 },
  { city: 'Fremont', state: 'CA', baseLat: 37.5485, baseLng: -121.9886 },
  { city: 'San Mateo', state: 'CA', baseLat: 37.5630, baseLng: -122.3255 }
];

const MECHANIC_PRESETS = [
  { name: 'Alex Rivera', specialty: 'Diagnostics & Engine Specialist', exp: 9, rating: 4.95, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { name: 'Marcus Vance', specialty: 'Master Brake & Suspension Tech', exp: 12, rating: 4.98, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { name: 'Derrick Hall', specialty: 'EV & Hybrid Electrical Systems', exp: 7, rating: 4.92, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { name: 'Sofia Rodriguez', specialty: 'Engine Tune & Performance', exp: 8, rating: 4.96, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
  { name: 'Tariq Al-Mansoor', specialty: 'Climate Control & Thermal Systems', exp: 10, rating: 4.88, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
  { name: 'Jessica Miller', specialty: 'Brakes & Advanced Safety Calibrations', exp: 6, rating: 4.91, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
  { name: 'Carlos Mendez', specialty: 'Fleet Maintenance & Heavy Drivelines', exp: 14, rating: 4.97, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
  { name: 'Nathaniel Wright', specialty: 'European Imports (BMW/Audi/Mercedes)', exp: 11, rating: 4.94, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
  { name: 'Chloe Davenport', specialty: 'Pre-Purchase & Comprehensive Inspector', exp: 5, rating: 4.89, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
  { name: 'Jamal Washington', specialty: 'Battery, Starters & Alternators', exp: 9, rating: 4.93, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
  { name: 'Vikram Sharma', specialty: 'Transmissions & Drivetrain Hydraulics', exp: 13, rating: 4.90, avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80' },
  { name: 'Liam O’Connor', specialty: 'Fast Lubes & Rapid Diagnostics', exp: 4, rating: 4.86, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
  { name: 'Kenji Takahashi', specialty: 'Japanese Domestic & Precision Tuning', exp: 15, rating: 4.99, avatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=150&auto=format&fit=crop&q=80' },
  { name: 'Emily Thorne', specialty: 'Suspension, Steering & Struts', exp: 7, rating: 4.91, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { name: 'Andre Dubois', specialty: 'OBD-II & Sensor Wiring Architect', exp: 10, rating: 4.87, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' },
  { name: 'Maya Lin', specialty: 'Hybrid Battery Regenerative Tech', exp: 6, rating: 4.94, avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80' },
  { name: 'Raymond Cruz', specialty: 'Brakes, Lines & ABS Modules', exp: 8, rating: 4.92, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
  { name: 'Hannah Abbott', specialty: 'General Mobile Service Master', exp: 5, rating: 4.88, avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80' },
  { name: 'Lucas Rossi', specialty: 'Exhaust, Intake & Emission Systems', exp: 11, rating: 4.93, avatar: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=150&auto=format&fit=crop&q=80' },
  { name: 'Zackary Bell', specialty: 'Heavy Duty 4x4 & Offroad Suspensions', exp: 9, rating: 4.85, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
  { name: 'Priya Narang', specialty: 'Fuel Delivery & Injector Systems', exp: 8, rating: 4.95, avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80' },
  { name: 'Daniel Cho', specialty: 'Electrical Parasitic Draw Diagnostics', exp: 10, rating: 4.96, avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80' }
];

class OperationsDatabase {
  private customers: Customer[] = [];
  private mechanics: Mechanic[] = [];
  private bookings: Booking[] = [];
  private liveEvents: LiveOperationEvent[] = [];
  private sseListeners: Array<(event: LiveOperationEvent) => void> = [];
  private initialized = false;

  constructor() {
    this.seed();
  }

  public seed() {
    if (this.initialized) return;

    // 1. Seed 60 Customers
    this.customers = [];
    for (let i = 1; i <= 60; i++) {
      const fn = FIRST_NAMES[i % FIRST_NAMES.length];
      const ln = LAST_NAMES[(i * 3) % LAST_NAMES.length];
      const cityObj = CITIES[i % CITIES.length];
      const createdDaysAgo = Math.floor(Math.random() * 180) + 5;
      const createdDate = new Date(Date.now() - createdDaysAgo * 86400000);
      
      const vMakeObj = VEHICLE_MAKES[i % VEHICLE_MAKES.length];
      const vModel = vMakeObj.models[i % vMakeObj.models.length];

      this.customers.push({
        id: `CUST-${1000 + i}`,
        name: `${fn} ${ln}`,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
        phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fn}${ln}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
        address: `${100 + i * 14} ${['Market St', 'Mission St', 'El Camino Real', 'University Ave', 'Telegraph Ave', 'Shattuck Ave', 'Grand Ave'][i % 7]}`,
        city: cityObj.city,
        state: cityObj.state,
        zip: `94${Math.floor(100 + Math.random() * 899)}`,
        rating: +(4.5 + Math.random() * 0.5).toFixed(2),
        totalBookings: 0,
        totalSpent: 0,
        createdAt: createdDate.toISOString(),
        preferredVehicle: `${2015 + (i % 9)} ${vMakeObj.make} ${vModel}`
      });
    }

    // 2. Seed 22 Mechanics
    this.mechanics = [];
    const statuses: MechanicStatus[] = ['available', 'on_the_way', 'in_progress', 'available', 'available', 'off_duty'];
    
    MECHANIC_PRESETS.forEach((preset, idx) => {
      const cityObj = CITIES[idx % CITIES.length];
      const status = statuses[idx % statuses.length];
      const latOffset = (Math.random() - 0.5) * 0.08;
      const lngOffset = (Math.random() - 0.5) * 0.08;

      this.mechanics.push({
        id: `MEC-${101 + idx}`,
        name: preset.name,
        email: `${preset.name.toLowerCase().replace(/[^a-z]/g, '.')}@instantmechanic.com`,
        phone: `+1 (415) 555-${Math.floor(1000 + Math.random() * 9000)}`,
        avatar: preset.avatar,
        specialty: preset.specialty,
        experienceYears: preset.exp,
        rating: preset.rating,
        status: status,
        jobsCompleted: 40 + Math.floor(Math.random() * 190),
        currentBookingId: null,
        currentBookingSummary: null,
        location: {
          lat: +(cityObj.baseLat + latOffset).toFixed(5),
          lng: +(cityObj.baseLng + lngOffset).toFixed(5),
          city: cityObj.city,
          address: `${cityObj.city} Service Zone ${idx + 1}`
        },
        joinedAt: new Date(Date.now() - (365 * 86400000) - (idx * 30 * 86400000)).toISOString()
      });
    });

    // 3. Seed 540 Bookings
    this.bookings = [];
    const now = new Date();
    const priorities: PriorityLevel[] = ['normal', 'normal', 'low', 'high', 'urgent'];

    // Generate bookings spanning past 6 months up to today and next few days
    for (let i = 1; i <= 540; i++) {
      const customer = this.customers[i % this.customers.length];
      const service = SERVICES_CATALOG[i % SERVICES_CATALOG.length];
      const makeObj = VEHICLE_MAKES[(i * 2) % VEHICLE_MAKES.length];
      const model = makeObj.models[(i * 3) % makeObj.models.length];
      const year = 2014 + (i % 11);
      const color = COLORS[i % COLORS.length];
      const cityObj = CITIES[i % CITIES.length];

      // Time distribution:
      // Last 30 bookings are for TODAY / THIS HOUR
      // Next 10 are FUTURE SCHEDULED
      // The remaining 500 spread across the last 150 days
      let bookingDate: Date;
      let status: BookingStatus;
      let mechanic: Mechanic | null = null;

      if (i > 520) {
        // TODAY'S LIVE ACTIVE / RECENT BOOKINGS
        const minutesAgo = (540 - i) * 15 + Math.floor(Math.random() * 10);
        bookingDate = new Date(now.getTime() - minutesAgo * 60 * 1000);
        
        if (i % 6 === 0) status = 'pending';
        else if (i % 6 === 1) status = 'assigned';
        else if (i % 6 === 2) status = 'mechanic_on_the_way';
        else if (i % 6 === 3) status = 'in_progress';
        else if (i % 6 === 4) status = 'completed';
        else status = 'cancelled';
      } else if (i > 500) {
        // UPCOMING SCHEDULED BOOKINGS
        const hoursAhead = (i - 500) * 4;
        bookingDate = new Date(now.getTime() + hoursAhead * 3600 * 1000);
        status = i % 2 === 0 ? 'assigned' : 'pending';
      } else {
        // HISTORICAL BOOKINGS
        const daysAgo = Math.floor((500 - i) / 3.4) + 1;
        const randomHour = 8 + Math.floor(Math.random() * 10);
        const randomMinute = Math.floor(Math.random() * 60);
        bookingDate = new Date(now.getTime() - (daysAgo * 86400000));
        bookingDate.setHours(randomHour, randomMinute, 0, 0);

        // mostly completed, some cancelled
        status = Math.random() < 0.9 ? 'completed' : 'cancelled';
      }

      if (status !== 'pending') {
        mechanic = this.mechanics[i % this.mechanics.length];
        if (['mechanic_on_the_way', 'in_progress'].includes(status)) {
          mechanic.status = status === 'in_progress' ? 'in_progress' : 'on_the_way';
          mechanic.currentBookingId = `BK-${8000 + i}`;
          mechanic.currentBookingSummary = `${service.name} for ${customer.name}`;
        }
      }

      const priority = priorities[i % priorities.length];
      const amount = +(service.price + (i % 3 === 0 ? 35 : 0) + (priority === 'urgent' ? 49 : 0)).toFixed(2);
      const isCompleted = status === 'completed';
      const isCancelled = status === 'cancelled';

      const bookingId = `BK-${8000 + i}`;
      const latOffset = (Math.random() - 0.5) * 0.06;
      const lngOffset = (Math.random() - 0.5) * 0.06;

      // Build realistic timeline
      const timeline = [
        {
          id: `TL-${i}-1`,
          status: 'pending' as BookingStatus,
          timestamp: bookingDate.toISOString(),
          title: 'Service Requested',
          note: `Customer booked ${service.name} online via Instant Mechanic app.`,
          actor: customer.name
        }
      ];

      if (status !== 'pending') {
        const assignedTime = new Date(bookingDate.getTime() + 10 * 60 * 1000);
        timeline.push({
          id: `TL-${i}-2`,
          status: 'assigned' as BookingStatus,
          timestamp: assignedTime.toISOString(),
          title: 'Mechanic Assigned',
          note: `${mechanic?.name || 'Assigned tech'} dispatched to service location.`,
          actor: 'Operations AI Dispatcher'
        });
      }

      if (['mechanic_on_the_way', 'in_progress', 'completed'].includes(status)) {
        const onWayTime = new Date(bookingDate.getTime() + 25 * 60 * 1000);
        timeline.push({
          id: `TL-${i}-3`,
          status: 'mechanic_on_the_way' as BookingStatus,
          timestamp: onWayTime.toISOString(),
          title: 'Mechanic On The Way',
          note: `${mechanic?.name} en route with full mobile tooling van.`,
          actor: mechanic?.name || 'Mechanic'
        });
      }

      if (['in_progress', 'completed'].includes(status)) {
        const inProgTime = new Date(bookingDate.getTime() + 45 * 60 * 1000);
        timeline.push({
          id: `TL-${i}-4`,
          status: 'in_progress' as BookingStatus,
          timestamp: inProgTime.toISOString(),
          title: 'Work In Progress',
          note: 'Vehicle safety check started; replacement parts prepped.',
          actor: mechanic?.name || 'Mechanic'
        });
      }

      if (isCompleted) {
        const compTime = new Date(bookingDate.getTime() + (45 + service.estimatedMinutes) * 60 * 1000);
        timeline.push({
          id: `TL-${i}-5`,
          status: 'completed' as BookingStatus,
          timestamp: compTime.toISOString(),
          title: 'Job Completed & Verified',
          note: 'Service inspection passed 100%. Digital invoice settled.',
          actor: mechanic?.name || 'Operations Lead'
        });
      }

      if (isCancelled) {
        timeline.push({
          id: `TL-${i}-cancel`,
          status: 'cancelled' as BookingStatus,
          timestamp: new Date(bookingDate.getTime() + 15 * 60 * 1000).toISOString(),
          title: 'Booking Cancelled',
          note: 'Customer requested reschedule or cancelled due to conflict.',
          actor: 'Customer'
        });
      }

      const booking: Booking = {
        id: bookingId,
        customerId: customer.id,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        customerAvatar: customer.avatar,
        vehicle: {
          make: makeObj.make,
          model: model,
          year: year,
          licensePlate: `${Math.floor(1 + Math.random() * 8)}${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i * 3) % 26))}${String.fromCharCode(65 + ((i * 7) % 26))}${Math.floor(100 + Math.random() * 899)}`,
          vin: `1HGCR2F8${(100000 + i).toString().padStart(9, '0')}`,
          color: color,
          mileage: 18000 + Math.floor(Math.random() * 110000)
        },
        serviceId: service.id,
        serviceName: service.name,
        serviceCategory: service.category,
        mechanicId: mechanic ? mechanic.id : null,
        mechanicName: mechanic ? mechanic.name : null,
        mechanicAvatar: mechanic ? mechanic.avatar : null,
        status: status,
        amount: amount,
        createdAt: bookingDate.toISOString(),
        scheduledFor: new Date(bookingDate.getTime() + 30 * 60 * 1000).toISOString(),
        updatedAt: timeline[timeline.length - 1].timestamp,
        completedAt: isCompleted ? timeline[timeline.length - 1].timestamp : null,
        priority: priority,
        paymentStatus: isCancelled ? 'refunded' : isCompleted ? 'paid' : 'pending',
        serviceAddress: `${customer.address}, ${cityObj.city}`,
        city: cityObj.city,
        coordinates: {
          lat: +(cityObj.baseLat + latOffset).toFixed(5),
          lng: +(cityObj.baseLng + lngOffset).toFixed(5),
          city: cityObj.city,
          address: customer.address
        },
        notes: i % 4 === 0 ? 'Customer requested phone call 10 mins prior to arrival.' : undefined,
        timeline: timeline
      };

      this.bookings.push(booking);

      // update customer counters
      customer.totalBookings += 1;
      if (isCompleted) {
        customer.totalSpent += amount;
      }
    }

    // 4. Initial live operation events
    this.liveEvents = [
      {
        id: 'EV-01',
        timestamp: new Date(now.getTime() - 2 * 60 * 1000).toISOString(),
        type: 'booking_created',
        title: 'New Booking Received',
        description: 'Elena Rodriguez requested OBD-II Engine Diagnostics in San Francisco',
        bookingId: 'BK-8539',
        severity: 'info'
      },
      {
        id: 'EV-02',
        timestamp: new Date(now.getTime() - 6 * 60 * 1000).toISOString(),
        type: 'mechanic_assigned',
        title: 'Auto-Dispatch Confirmed',
        description: 'Marcus Vance assigned to Ceramic Brake Pads replacement',
        bookingId: 'BK-8538',
        mechanicId: 'MEC-102',
        severity: 'success'
      },
      {
        id: 'EV-03',
        timestamp: new Date(now.getTime() - 14 * 60 * 1000).toISOString(),
        type: 'status_changed',
        title: 'Mechanic En Route',
        description: 'Sofia Rodriguez is on the way to 240 University Ave, Palo Alto',
        bookingId: 'BK-8537',
        mechanicId: 'MEC-104',
        severity: 'info'
      },
      {
        id: 'EV-04',
        timestamp: new Date(now.getTime() - 25 * 60 * 1000).toISOString(),
        type: 'status_changed',
        title: 'Job Completed & Signed',
        description: 'Battery & Alternator Overhaul completed for Ford F-150 ($449.00)',
        bookingId: 'BK-8536',
        severity: 'success'
      }
    ];

    this.initialized = true;
  }

  // --- CRUD & Queries ---

  public getDashboardMetrics(): DashboardMetrics {
    const totalBookings = this.bookings.length;
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    let todayBookings = 0;
    let completedBookings = 0;
    let pendingBookings = 0;
    let inProgressBookings = 0;
    let cancelledBookings = 0;
    let totalRevenue = 0;
    let todayRevenue = 0;

    for (const b of this.bookings) {
      const bTime = new Date(b.createdAt).getTime();
      const isToday = bTime >= todayStart;

      if (isToday) {
        todayBookings++;
        if (b.status === 'completed' || b.paymentStatus === 'paid') {
          todayRevenue += b.amount;
        }
      }

      if (b.status === 'completed') {
        completedBookings++;
        totalRevenue += b.amount;
      } else if (b.status === 'pending') {
        pendingBookings++;
      } else if (b.status === 'in_progress' || b.status === 'mechanic_on_the_way' || b.status === 'assigned') {
        inProgressBookings++;
      } else if (b.status === 'cancelled') {
        cancelledBookings++;
      }
    }

    const activeMechanics = this.mechanics.filter(m => m.status !== 'off_duty').length;
    const totalMechanics = this.mechanics.length;
    const totalCustomers = this.customers.length;
    const completionRatePercentage = totalBookings > 0 
      ? +((completedBookings / (totalBookings - pendingBookings || 1)) * 100).toFixed(1) 
      : 0;

    return {
      totalBookings,
      todayBookings,
      completedBookings,
      pendingBookings,
      inProgressBookings,
      cancelledBookings,
      totalRevenue: Math.round(totalRevenue),
      todayRevenue: Math.round(todayRevenue),
      activeMechanics,
      totalMechanics,
      totalCustomers,
      newCustomersThisMonth: 18,
      averageBookingValue: Math.round(totalRevenue / (completedBookings || 1)),
      completionRatePercentage,
      growthRates: {
        bookingsWeekOverWeek: 14.8,
        revenueMonthOverMonth: 22.4,
        activeMechanicsPercent: Math.round((activeMechanics / totalMechanics) * 100)
      }
    };
  }

  public getAnalyticsData(): AnalyticsData {
    // 1. Group Bookings Over Time (Last 14 days)
    const bookingsByDay: { [dateKey: string]: { date: string; bookings: number; completed: number; revenue: number } } = {};
    const now = new Date();

    for (let d = 13; d >= 0; d--) {
      const targetDate = new Date(now.getTime() - d * 86400000);
      const dateKey = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      bookingsByDay[dateKey] = { date: dateKey, bookings: 0, completed: 0, revenue: 0 };
    }

    // 2. Status Distribution
    const statusCounts: Record<string, number> = {
      Pending: 0,
      Assigned: 0,
      'En Route': 0,
      'In Progress': 0,
      Completed: 0,
      Cancelled: 0
    };

    // 3. Category Breakdown
    const catMap: Record<string, { count: number; revenue: number }> = {};

    for (const b of this.bookings) {
      // time bucket
      const bDate = new Date(b.createdAt);
      const dateKey = bDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (bookingsByDay[dateKey]) {
        bookingsByDay[dateKey].bookings += 1;
        if (b.status === 'completed') {
          bookingsByDay[dateKey].completed += 1;
          bookingsByDay[dateKey].revenue += b.amount;
        }
      }

      // status
      if (b.status === 'pending') statusCounts.Pending++;
      else if (b.status === 'assigned') statusCounts.Assigned++;
      else if (b.status === 'mechanic_on_the_way') statusCounts['En Route']++;
      else if (b.status === 'in_progress') statusCounts['In Progress']++;
      else if (b.status === 'completed') statusCounts.Completed++;
      else if (b.status === 'cancelled') statusCounts.Cancelled++;

      // category
      const cat = b.serviceCategory || 'General Service';
      if (!catMap[cat]) catMap[cat] = { count: 0, revenue: 0 };
      catMap[cat].count++;
      if (b.status === 'completed') {
        catMap[cat].revenue += b.amount;
      }
    }

    const bookingStatusDistribution = [
      { name: 'Completed', value: statusCounts.Completed, color: '#10b981' },
      { name: 'In Progress', value: statusCounts['In Progress'], color: '#f59e0b' },
      { name: 'En Route', value: statusCounts['En Route'], color: '#3b82f6' },
      { name: 'Assigned', value: statusCounts.Assigned, color: '#8b5cf6' },
      { name: 'Pending', value: statusCounts.Pending, color: '#ec4899' },
      { name: 'Cancelled', value: statusCounts.Cancelled, color: '#ef4444' }
    ];

    const totalCatCount = Object.values(catMap).reduce((acc, curr) => acc + curr.count, 0) || 1;
    const serviceCategoryBreakdown = Object.entries(catMap).map(([category, info]) => ({
      category,
      count: info.count,
      revenue: Math.round(info.revenue),
      percentage: +((info.count / totalCatCount) * 100).toFixed(1)
    })).sort((a, b) => b.count - a.count);

    const revenueOverTime = [
      { month: 'Apr', revenue: 24200, target: 22000, profit: 9680 },
      { month: 'May', revenue: 28900, target: 26000, profit: 11560 },
      { month: 'Jun', revenue: 34100, target: 31000, profit: 13640 },
      { month: 'Jul', revenue: 41800, target: 38000, profit: 16720 },
      { month: 'Aug', revenue: 49500, target: 45000, profit: 19800 },
      { month: 'Sep', revenue: 58200, target: 52000, profit: 23280 }
    ];

    const hourlyVolumeToday = [
      { hour: '07:00', bookings: 4 },
      { hour: '08:00', bookings: 9 },
      { hour: '09:00', bookings: 16 },
      { hour: '10:00', bookings: 22 },
      { hour: '11:00', bookings: 19 },
      { hour: '12:00', bookings: 14 },
      { hour: '13:00', bookings: 18 },
      { hour: '14:00', bookings: 25 },
      { hour: '15:00', bookings: 21 },
      { hour: '16:00', bookings: 17 },
      { hour: '17:00', bookings: 12 },
      { hour: '18:00', bookings: 7 }
    ];

    return {
      bookingsOverTime: Object.values(bookingsByDay),
      revenueOverTime,
      bookingStatusDistribution,
      serviceCategoryBreakdown,
      hourlyVolumeToday
    };
  }

  public getBookings(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
    category?: string;
    mechanicId?: string;
    priority?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): PaginatedResponse<Booking> {
    const page = Math.max(1, +(params.page || 1));
    const pageSize = Math.max(1, Math.min(100, +(params.pageSize || 10)));
    const search = (params.search || '').trim().toLowerCase();
    const status = params.status || 'all';
    const category = params.category || 'all';
    const mechanicId = params.mechanicId || 'all';
    const priority = params.priority || 'all';
    const sortBy = params.sortBy || 'createdAt';
    const sortOrder = params.sortOrder || 'desc';

    let filtered = this.bookings.filter(b => {
      if (status !== 'all' && b.status !== status) return false;
      if (category !== 'all' && b.serviceCategory !== category) return false;
      if (mechanicId !== 'all' && b.mechanicId !== mechanicId) return false;
      if (priority !== 'all' && b.priority !== priority) return false;

      if (search) {
        const matchesSearch = 
          b.id.toLowerCase().includes(search) ||
          b.customerName.toLowerCase().includes(search) ||
          b.serviceName.toLowerCase().includes(search) ||
          (b.mechanicName && b.mechanicName.toLowerCase().includes(search)) ||
          b.vehicle.make.toLowerCase().includes(search) ||
          b.vehicle.model.toLowerCase().includes(search) ||
          b.vehicle.licensePlate.toLowerCase().includes(search) ||
          b.city.toLowerCase().includes(search);
        if (!matchesSearch) return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      let valA: any = (a as any)[sortBy];
      let valB: any = (b as any)[sortBy];

      if (sortBy === 'customer') {
        valA = a.customerName;
        valB = b.customerName;
      } else if (sortBy === 'vehicle') {
        valA = `${a.vehicle.make} ${a.vehicle.model}`;
        valB = `${b.vehicle.make} ${b.vehicle.model}`;
      } else if (sortBy === 'date' || sortBy === 'createdAt') {
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
      } else if (sortBy === 'amount') {
        valA = a.amount;
        valB = b.amount;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

    return {
      data: paginatedData,
      total,
      page,
      pageSize,
      totalPages
    };
  }

  public getBookingById(id: string): Booking | undefined {
    return this.bookings.find(b => b.id.toLowerCase() === id.toLowerCase());
  }

  public createBooking(data: Partial<Booking>): Booking {
    const id = `BK-${8000 + this.bookings.length + 1}`;
    const now = new Date();
    
    // find or assign customer
    let customer = this.customers.find(c => c.id === data.customerId);
    if (!customer) {
      customer = this.customers[Math.floor(Math.random() * this.customers.length)];
    }

    const service = SERVICES_CATALOG.find(s => s.id === data.serviceId) || SERVICES_CATALOG[0];
    const mechanic = data.mechanicId ? this.mechanics.find(m => m.id === data.mechanicId) : null;
    const status = data.status || (mechanic ? 'assigned' : 'pending');

    const newBooking: Booking = {
      id,
      customerId: customer.id,
      customerName: data.customerName || customer.name,
      customerPhone: data.customerPhone || customer.phone,
      customerEmail: data.customerEmail || customer.email,
      customerAvatar: customer.avatar,
      vehicle: data.vehicle || {
        make: 'Honda',
        model: 'Accord',
        year: 2022,
        licensePlate: '8XYZ991',
        vin: '1HGCR2F812390199',
        color: 'Midnight Blue',
        mileage: 32000
      },
      serviceId: service.id,
      serviceName: service.name,
      serviceCategory: service.category,
      mechanicId: mechanic ? mechanic.id : null,
      mechanicName: mechanic ? mechanic.name : null,
      mechanicAvatar: mechanic ? mechanic.avatar : null,
      status: status,
      amount: data.amount || service.price,
      createdAt: now.toISOString(),
      scheduledFor: data.scheduledFor || new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
      updatedAt: now.toISOString(),
      completedAt: null,
      priority: data.priority || 'normal',
      paymentStatus: 'pending',
      serviceAddress: data.serviceAddress || `${customer.address}, ${customer.city}`,
      city: customer.city,
      coordinates: data.coordinates || {
        lat: 37.7749 + (Math.random() - 0.5) * 0.05,
        lng: -122.4194 + (Math.random() - 0.5) * 0.05,
        city: customer.city,
        address: customer.address
      },
      notes: data.notes,
      timeline: [
        {
          id: `TL-${id}-1`,
          status: 'pending',
          timestamp: now.toISOString(),
          title: 'Booking Created',
          note: `New service request created for ${service.name}`,
          actor: data.customerName || 'Dispatcher'
        }
      ]
    };

    if (mechanic) {
      newBooking.timeline.push({
        id: `TL-${id}-2`,
        status: 'assigned',
        timestamp: now.toISOString(),
        title: 'Mechanic Assigned',
        note: `Assigned to ${mechanic.name}`,
        actor: 'Dispatcher'
      });
    }

    this.bookings.unshift(newBooking);
    customer.totalBookings++;

    const event: LiveOperationEvent = {
      id: `EV-${Date.now()}`,
      timestamp: now.toISOString(),
      type: 'booking_created',
      title: 'New Service Request Created',
      description: `${newBooking.customerName} booked ${newBooking.serviceName} (${newBooking.id})`,
      bookingId: newBooking.id,
      severity: 'info'
    };
    this.broadcastEvent(event);

    return newBooking;
  }

  public updateBookingStatus(
    id: string, 
    newStatus: BookingStatus, 
    note?: string, 
    actor: string = 'Operations Lead'
  ): Booking | null {
    const booking = this.bookings.find(b => b.id.toLowerCase() === id.toLowerCase());
    if (!booking) return null;

    const prevStatus = booking.status;
    booking.status = newStatus;
    const now = new Date().toISOString();
    booking.updatedAt = now;

    if (newStatus === 'completed') {
      booking.completedAt = now;
      booking.paymentStatus = 'paid';
      if (booking.mechanicId) {
        const mech = this.mechanics.find(m => m.id === booking.mechanicId);
        if (mech) {
          mech.jobsCompleted++;
          mech.status = 'available';
          mech.currentBookingId = null;
          mech.currentBookingSummary = null;
        }
      }
    } else if (newStatus === 'in_progress' && booking.mechanicId) {
      const mech = this.mechanics.find(m => m.id === booking.mechanicId);
      if (mech) mech.status = 'in_progress';
    } else if (newStatus === 'mechanic_on_the_way' && booking.mechanicId) {
      const mech = this.mechanics.find(m => m.id === booking.mechanicId);
      if (mech) mech.status = 'on_the_way';
    } else if (newStatus === 'cancelled') {
      booking.paymentStatus = 'refunded';
      if (booking.mechanicId) {
        const mech = this.mechanics.find(m => m.id === booking.mechanicId);
        if (mech && mech.currentBookingId === booking.id) {
          mech.status = 'available';
          mech.currentBookingId = null;
          mech.currentBookingSummary = null;
        }
      }
    }

    booking.timeline.push({
      id: `TL-${booking.id}-${booking.timeline.length + 1}`,
      status: newStatus,
      timestamp: now,
      title: `Status Changed: ${newStatus.replace(/_/g, ' ').toUpperCase()}`,
      note: note || `Booking status progressed from ${prevStatus} to ${newStatus}`,
      actor
    });

    const event: LiveOperationEvent = {
      id: `EV-${Date.now()}`,
      timestamp: now,
      type: 'status_changed',
      title: `Booking ${booking.id} Updated`,
      description: `Status changed to ${newStatus.replace(/_/g, ' ')} for ${booking.customerName}`,
      bookingId: booking.id,
      severity: newStatus === 'completed' ? 'success' : newStatus === 'cancelled' ? 'warning' : 'info'
    };
    this.broadcastEvent(event);

    return booking;
  }

  public assignMechanic(bookingId: string, mechanicId: string, actor: string = 'Dispatcher'): Booking | null {
    const booking = this.bookings.find(b => b.id.toLowerCase() === bookingId.toLowerCase());
    const mechanic = this.mechanics.find(m => m.id.toLowerCase() === mechanicId.toLowerCase());
    if (!booking || !mechanic) return null;

    booking.mechanicId = mechanic.id;
    booking.mechanicName = mechanic.name;
    booking.mechanicAvatar = mechanic.avatar;
    if (booking.status === 'pending') {
      booking.status = 'assigned';
    }
    const now = new Date().toISOString();
    booking.updatedAt = now;

    mechanic.status = 'on_the_way';
    mechanic.currentBookingId = booking.id;
    mechanic.currentBookingSummary = `${booking.serviceName} for ${booking.customerName}`;

    booking.timeline.push({
      id: `TL-${booking.id}-${booking.timeline.length + 1}`,
      status: booking.status,
      timestamp: now,
      title: 'Mechanic Assigned',
      note: `Assigned to ${mechanic.name} (${mechanic.specialty})`,
      actor
    });

    const event: LiveOperationEvent = {
      id: `EV-${Date.now()}`,
      timestamp: now,
      type: 'mechanic_assigned',
      title: 'Mechanic Dispatched',
      description: `${mechanic.name} assigned to ${booking.id} (${booking.vehicle.make} ${booking.vehicle.model})`,
      bookingId: booking.id,
      mechanicId: mechanic.id,
      severity: 'info'
    };
    this.broadcastEvent(event);

    return booking;
  }

  public getMechanics(): Mechanic[] {
    return this.mechanics;
  }

  public getMechanicById(id: string): Mechanic | undefined {
    return this.mechanics.find(m => m.id.toLowerCase() === id.toLowerCase());
  }

  public updateMechanic(id: string, updates: Partial<Mechanic>): Mechanic | null {
    const mechanic = this.mechanics.find(m => m.id.toLowerCase() === id.toLowerCase());
    if (!mechanic) return null;
    Object.assign(mechanic, updates);

    const event: LiveOperationEvent = {
      id: `EV-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'mechanic_status',
      title: 'Mechanic Profile Updated',
      description: `${mechanic.name} status updated to ${mechanic.status}`,
      mechanicId: mechanic.id,
      severity: 'info'
    };
    this.broadcastEvent(event);
    return mechanic;
  }

  public getCustomers(search?: string, page = 1, pageSize = 20): PaginatedResponse<Customer> {
    let filtered = this.customers;
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.email.toLowerCase().includes(q) || 
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const start = (page - 1) * pageSize;
    return {
      data: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages
    };
  }

  public getCustomerById(id: string): Customer | undefined {
    return this.customers.find(c => c.id.toLowerCase() === id.toLowerCase());
  }

  public getLiveEvents(): LiveOperationEvent[] {
    return this.liveEvents.slice(0, 50);
  }

  // --- Real-Time Simulation Engine ---

  public simulateRandomLiveEvent(): LiveOperationEvent {
    const actions = ['advance_status', 'new_booking', 'mechanic_movement'];
    const action = actions[Math.floor(Math.random() * actions.length)];

    if (action === 'new_booking') {
      const customer = this.customers[Math.floor(Math.random() * this.customers.length)];
      const service = SERVICES_CATALOG[Math.floor(Math.random() * SERVICES_CATALOG.length)];
      const created = this.createBooking({
        customerId: customer.id,
        serviceId: service.id,
        priority: Math.random() < 0.25 ? 'urgent' : 'normal'
      });
      return {
        id: `EV-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'booking_created',
        title: '🔴 Live Inbound Booking',
        description: `${created.customerName} just booked ${created.serviceName} (${created.id})`,
        bookingId: created.id,
        severity: 'info'
      };
    } else if (action === 'advance_status') {
      // Find a pending, assigned, or in_progress booking to transition
      const activeBookings = this.bookings.filter(b => ['pending', 'assigned', 'mechanic_on_the_way', 'in_progress'].includes(b.status));
      if (activeBookings.length > 0) {
        const target = activeBookings[Math.floor(Math.random() * activeBookings.length)];
        let nextStatus: BookingStatus = 'completed';
        if (target.status === 'pending') {
          const availMech = this.mechanics.find(m => m.status === 'available') || this.mechanics[0];
          this.assignMechanic(target.id, availMech.id, 'Auto-Dispatch Engine');
          return {
            id: `EV-${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: 'mechanic_assigned',
            title: '⚡ Auto-Assigned Driver',
            description: `${availMech.name} dispatched to ${target.id}`,
            bookingId: target.id,
            mechanicId: availMech.id,
            severity: 'success'
          };
        } else if (target.status === 'assigned') {
          nextStatus = 'mechanic_on_the_way';
        } else if (target.status === 'mechanic_on_the_way') {
          nextStatus = 'in_progress';
        } else if (target.status === 'in_progress') {
          nextStatus = 'completed';
        }

        this.updateBookingStatus(target.id, nextStatus, 'Real-time telemetry event triggered', 'Mobile App Sync');
        return {
          id: `EV-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'status_changed',
          title: `🔄 Status Updated → ${nextStatus.replace(/_/g, ' ')}`,
          description: `Booking ${target.id} progressed to ${nextStatus}`,
          bookingId: target.id,
          severity: nextStatus === 'completed' ? 'success' : 'info'
        };
      }
    }

    // Default event: Mechanic telemetry ping
    const mech = this.mechanics[Math.floor(Math.random() * this.mechanics.length)];
    mech.location.lat += (Math.random() - 0.5) * 0.005;
    mech.location.lng += (Math.random() - 0.5) * 0.005;
    const event: LiveOperationEvent = {
      id: `EV-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'mechanic_status',
      title: '🛰️ GPS Telemetry Ping',
      description: `${mech.name} updated coordinates near ${mech.location.city}`,
      mechanicId: mech.id,
      severity: 'info'
    };
    this.broadcastEvent(event);
    return event;
  }

  // --- SSE broadcasting ---

  public addSSEListener(listener: (event: LiveOperationEvent) => void) {
    this.sseListeners.push(listener);
    return () => {
      this.sseListeners = this.sseListeners.filter(l => l !== listener);
    };
  }

  private broadcastEvent(event: LiveOperationEvent) {
    this.liveEvents.unshift(event);
    if (this.liveEvents.length > 100) this.liveEvents.pop();
    this.sseListeners.forEach(fn => {
      try {
        fn(event);
      } catch (err) {
        console.error('Error broadcasting SSE event:', err);
      }
    });
  }

  // --- Export CSV ---
  public generateCSV(): string {
    const headers = [
      'Booking ID',
      'Created Date',
      'Scheduled For',
      'Status',
      'Priority',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Vehicle Make',
      'Vehicle Model',
      'Vehicle Year',
      'License Plate',
      'Service Name',
      'Service Category',
      'Mechanic Name',
      'Amount',
      'Payment Status',
      'Address',
      'City'
    ];

    const escape = (str: any) => {
      if (str === null || str === undefined) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = this.bookings.map(b => [
      escape(b.id),
      escape(b.createdAt),
      escape(b.scheduledFor),
      escape(b.status),
      escape(b.priority),
      escape(b.customerName),
      escape(b.customerEmail),
      escape(b.customerPhone),
      escape(b.vehicle.make),
      escape(b.vehicle.model),
      escape(b.vehicle.year),
      escape(b.vehicle.licensePlate),
      escape(b.serviceName),
      escape(b.serviceCategory),
      escape(b.mechanicName || 'Unassigned'),
      escape(b.amount.toFixed(2)),
      escape(b.paymentStatus),
      escape(b.serviceAddress),
      escape(b.city)
    ].join(','));

    return [headers.join(','), ...rows].join('\n');
  }
}

export const db = new OperationsDatabase();
