import express from "express";
import { getAllBookings, updateBookingStatus, login } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/admin/login — no auth needed
router.post("/login", login);

// GET  /api/admin/bookings
router.get("/bookings", requireAdmin, getAllBookings);

// PATCH /api/admin/bookings/:id
router.patch("/bookings/:id", requireAdmin, updateBookingStatus);

export default router;