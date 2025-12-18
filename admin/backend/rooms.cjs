const Room = require("./models/Room");

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    // Format for frontend if necessary, mapping _id to id
    const formattedRooms = rooms.map(room => ({
      id: room._id,
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      status: room.status
    }));
    res.json(formattedRooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

module.exports = { getAllRooms };