require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const adminRoutes = require("./routes/adminRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});