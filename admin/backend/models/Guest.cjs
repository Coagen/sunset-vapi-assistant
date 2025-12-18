const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
}, { timestamps: true });

// Explicitly mapping to collection 'guest' as requested
module.exports = mongoose.model("Guest", guestSchema, "guest");