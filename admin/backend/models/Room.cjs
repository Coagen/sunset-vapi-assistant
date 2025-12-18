const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: Number,
  type: String,
  price: Number,
  status: String, // available / booked
}, { timestamps: true });

// Explicitly mapping to collection 'rooms'
module.exports = mongoose.model("Room", roomSchema, "rooms");