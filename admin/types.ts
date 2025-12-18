export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Room {
  id: string;
  roomNumber: number;
  type: string;
  price: number;
  status: 'available' | 'booked' | 'maintenance';
}

export interface Booking {
  id: string;
  guestId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalAmount: number;
}

export interface DashboardStats {
  totalGuests: number;
  totalBookings: number;
  totalRooms: number;
  revenue: number;
  occupancyRate: number;
}
