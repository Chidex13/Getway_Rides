import express from "express";
import multer  from "multer";
import { createBooking, getBooking } from "../controllers/booking.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/bookings  — multipart with optional receipt file
router.post("/", upload.single("receipt"), createBooking);

// GET  /api/bookings/:id
router.get("/:id", getBooking);

// GET  /api/pricing?rideType=&campus=
router.get("/", (req, res) => {
  const { rideType, campus } = req.query;
  if (!rideType || !campus) {
    return res.status(400).json({ error: "rideType and campus are required" });
  }
  const PRICES = {
    public:  { main: 3500,  iperu: 4000  },
    private: { main: 18000, iperu: 20000 },
  };
  const price = PRICES?.[rideType]?.[campus];
  if (!price) return res.status(400).json({ error: "Invalid rideType or campus" });
  res.json({ price, formatted: `₦${price.toLocaleString()}` });
});

export default router;