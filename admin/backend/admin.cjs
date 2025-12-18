const Guest = require("./models/Guest");
const Booking = require("./models/Booking");
const Room = require("./models/Room");

const getAdminStats = async (req, res) => {
  try {
    const totalGuests = await Guest.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalRooms = await Room.countDocuments();

    // Simple aggregation for revenue and occupancy to match frontend interface
    const bookings = await Booking.find();
    const revenue = bookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    
    const occupancyRate = totalRooms > 0 ? Math.round((totalBookings / totalRooms) * 100) : 0;

    res.json({
      totalGuests,
      totalBookings,
      totalRooms,
      revenue,
      occupancyRate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Dashboard data error" });
  }
};

module.exports = { getAdminStats };