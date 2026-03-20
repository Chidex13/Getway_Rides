import express  from "express";
import cors     from "cors";
import dotenv   from "dotenv";
import multer   from "multer";

import otpRoutes     from "./routes/otp.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import adminRoutes   from "./routes/admin.routes.js";

dotenv.config();

const app    = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_, res) =>
  res.json({ status: "ok", env: process.env.NODE_ENV })
);

app.use("/api/otp",      otpRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin",    adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚗 Getway Rides server running on http://localhost:${PORT}`)
);