import { Router, Request, Response } from 'express';
import { db, SERVICES_CATALOG } from './db';

export const apiRouter = Router();

// 1. Health check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Instant Mechanic Operations Backend API',
    version: '1.0.0'
  });
});

// 2. Dashboard Aggregations (KPIs, Charts, Real-time snapshot)
apiRouter.get('/dashboard', (req: Request, res: Response) => {
  try {
    const metrics = db.getDashboardMetrics();
    const analytics = db.getAnalyticsData();
    const recentBookings = db.getBookings({ page: 1, pageSize: 8, sortBy: 'createdAt', sortOrder: 'desc' });
    const mechanics = db.getMechanics();
    const liveEvents = db.getLiveEvents();

    res.json({
      success: true,
      data: {
        metrics,
        analytics,
        recentBookings: recentBookings.data,
        mechanicSummary: {
          total: mechanics.length,
          available: mechanics.filter(m => m.status === 'available').length,
          onTheWay: mechanics.filter(m => m.status === 'on_the_way').length,
          inProgress: mechanics.filter(m => m.status === 'in_progress').length,
          offDuty: mechanics.filter(m => m.status === 'off_duty').length
        },
        liveEvents
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Analytics deep dive
apiRouter.get('/analytics', (req: Request, res: Response) => {
  try {
    const analytics = db.getAnalyticsData();
    res.json({ success: true, data: analytics });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Bookings API
apiRouter.get('/bookings', (req: Request, res: Response) => {
  try {
    const { page, pageSize, search, status, category, mechanicId, priority, sortBy, sortOrder } = req.query;
    const result = db.getBookings({
      page: page ? parseInt(page as string, 10) : 1,
      pageSize: pageSize ? parseInt(pageSize as string, 10) : 10,
      search: search as string,
      status: status as string,
      category: category as string,
      mechanicId: mechanicId as string,
      priority: priority as string,
      sortBy: sortBy as string,
      sortOrder: (sortOrder as 'asc' | 'desc') || 'desc'
    });

    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get('/bookings/:id', (req: Request, res: Response) => {
  try {
    const booking = db.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: `Booking ${req.params.id} not found` });
    }
    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post('/bookings', (req: Request, res: Response) => {
  try {
    const newBooking = db.createBooking(req.body);
    res.status(201).json({ success: true, data: newBooking });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

apiRouter.patch('/bookings/:id', (req: Request, res: Response) => {
  try {
    const { status, note, actor } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const updated = db.updateBookingStatus(req.params.id, status, note, actor || 'Operations Lead');
    if (!updated) {
      return res.status(404).json({ success: false, message: `Booking ${req.params.id} not found` });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post('/bookings/:id/assign', (req: Request, res: Response) => {
  try {
    const { mechanicId, actor } = req.body;
    if (!mechanicId) {
      return res.status(400).json({ success: false, message: 'mechanicId is required' });
    }
    const updated = db.assignMechanic(req.params.id, mechanicId, actor || 'Dispatcher');
    if (!updated) {
      return res.status(404).json({ success: false, message: `Booking or Mechanic not found` });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post('/bookings/:id/cancel', (req: Request, res: Response) => {
  try {
    const { reason, actor } = req.body;
    const updated = db.updateBookingStatus(req.params.id, 'cancelled', reason || 'Operations Cancellation', actor || 'Customer Support');
    if (!updated) {
      return res.status(404).json({ success: false, message: `Booking ${req.params.id} not found` });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Mechanics API
apiRouter.get('/mechanics', (req: Request, res: Response) => {
  try {
    const mechanics = db.getMechanics();
    res.json({ success: true, count: mechanics.length, data: mechanics });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get('/mechanics/:id', (req: Request, res: Response) => {
  try {
    const mechanic = db.getMechanicById(req.params.id);
    if (!mechanic) {
      return res.status(404).json({ success: false, message: `Mechanic ${req.params.id} not found` });
    }
    // Also include active bookings for this mechanic
    const bookings = db.getBookings({ mechanicId: mechanic.id, pageSize: 20 });
    res.json({ success: true, data: { ...mechanic, recentBookings: bookings.data } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.patch('/mechanics/:id', (req: Request, res: Response) => {
  try {
    const updated = db.updateMechanic(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: `Mechanic ${req.params.id} not found` });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Customers API
apiRouter.get('/customers', (req: Request, res: Response) => {
  try {
    const { search, page, pageSize } = req.query;
    const result = db.getCustomers(
      search as string,
      page ? parseInt(page as string, 10) : 1,
      pageSize ? parseInt(pageSize as string, 10) : 20
    );
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get('/customers/:id', (req: Request, res: Response) => {
  try {
    const customer = db.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: `Customer ${req.params.id} not found` });
    }
    res.json({ success: true, data: customer });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Services catalog
apiRouter.get('/services', (req: Request, res: Response) => {
  res.json({ success: true, data: SERVICES_CATALOG });
});

// 8. Server-Sent Events (SSE) Real-Time Stream
apiRouter.get('/events', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  // Send initial ping
  res.write(`data: ${JSON.stringify({ type: 'connected', message: 'SSE Live Stream connected to Instant Mechanic operations engine' })}\n\n`);

  const removeListener = db.addSSEListener((event) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  });

  const keepAliveInterval = setInterval(() => {
    res.write(': keepalive\n\n');
  }, 15000);

  req.on('close', () => {
    clearInterval(keepAliveInterval);
    removeListener();
    res.end();
  });
});

// 9. Simulation trigger endpoint
apiRouter.post('/simulate-event', (req: Request, res: Response) => {
  try {
    const event = db.simulateRandomLiveEvent();
    res.json({ success: true, event });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 10. CSV Export endpoint
apiRouter.get('/export/bookings.csv', (req: Request, res: Response) => {
  try {
    const csvData = db.generateCSV();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="instant_mechanic_bookings.csv"');
    res.status(200).send(csvData);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
