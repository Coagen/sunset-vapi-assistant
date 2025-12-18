const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  checkIn: Date,
  checkOut: Date,
  totalAmount: Number,
}, { timestamps: true });

// Explicitly mapping to collection 'bookings'
module.exports = mongoose.model("Booking", bookingSchema, "bookings");