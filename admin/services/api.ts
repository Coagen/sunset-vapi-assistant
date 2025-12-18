import { DashboardStats, Room } from '../types';

// Mock Data for Fallback (keeps preview working)
const MOCK_STATS: DashboardStats = {
  totalGuests: 1240,
  totalBookings: 85,
  totalRooms: 150,
  revenue: 125000,
  occupancyRate: 78
};

const MOCK_ROOMS: Room[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `room-${i}`,
  roomNumber: 101 + i,
  type: i % 3 === 0 ? 'Suite' : i % 2 === 0 ? 'Deluxe' : 'Standard',
  price: i % 3 === 0 ? 450 : i % 2 === 0 ? 250 : 150,
  status: Math.random() > 0.3 ? 'booked' : 'available' as const
}));

const API_BASE_URL = 'http://localhost:5000/api/admin';

// Helper to handle API calls with fallback
const fetchWithFallback = async <T>(endpoint: string, fallback: T): Promise<T> => {
  try {
    // Attempt to fetch from local backend with a short timeout
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1000);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: controller.signal
    });
    clearTimeout(id);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.warn(`Backend connection failed (${endpoint}), using mock data.`);
    // Simulate network delay for realistic mock feel
    await new Promise(resolve => setTimeout(resolve, 600));
    return fallback;
  }
};

export const fetchAdminStats = async (): Promise<DashboardStats> => {
  return fetchWithFallback<DashboardStats>('/dashboard', MOCK_STATS);
};

export const fetchRooms = async (): Promise<Room[]> => {
  return fetchWithFallback<Room[]>('/rooms', MOCK_ROOMS);
};

export const fetchBookingTrends = async () => {
  // Keeping trends as mock for now as it wasn't specified in the backend guide
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { name: 'Jan', bookings: 40 },
    { name: 'Feb', bookings: 30 },
    { name: 'Mar', bookings: 55 },
    { name: 'Apr', bookings: 80 },
    { name: 'May', bookings: 65 },
    { name: 'Jun', bookings: 95 },
  ];
};