import { supabase } from "../services/supabase.service.js";
import { uploadReceipt } from "../services/storage.service.js";

const generateBookingId = () => {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const random = Array.from({ length: 4 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `GW-${year}-${random}`;
};

const isValidFullName = (fullName) => {
  const trimmed = fullName?.trim() ?? "";
  if (trimmed.length <= 6) return false;
  return /^[a-zA-Z\s]+$/.test(trimmed);
};

const isValidPhone = (p) =>
  /^(\+234|0)[789][01]\d{8}$/.test(p?.trim() ?? "");

const PRICES = {
  public: { main: 13000, iperu: 10000, "off-campus": 13000 },
  private: { main: 18000, iperu: 15000, "off-campus": 18000 },
};

export const createBooking = async (req, res) => {
  const {
    fullName, phone, rideType, tripDirection,
    hostel, campus, date, time, passengers,
  } = req.body;

  // Validate required fields
  const missing = ["fullName", "phone", "rideType", "tripDirection", "hostel", "campus", "date", "time"]
    .filter((f) => !req.body[f]);
  if (missing.length)
    return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });

  if (!isValidFullName(fullName))
    return res.status(400).json({ error: "Invalid full name. Must be greater than 6 characters and contain only letters." });

  if (!isValidPhone(phone))
    return res.status(400).json({ error: "Invalid phone number" });

  const price = (PRICES?.[rideType]?.[campus] ?? null) *
    (parseInt(passengers) || 1);
  if (!price || isNaN(price))
    return res.status(400).json({ error: "Invalid ride type or campus" });

  // Upload receipt to Supabase Storage if provided
  let receiptUrl = null;
  if (req.file) {
    try {
      receiptUrl = await uploadReceipt(req.file, fullName);
    } catch (err) {
      console.error("Receipt upload error:", err);
      return res.status(500).json({ error: "Error please try again." });
    }
  }
  const bookingId = generateBookingId();
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      full_name: fullName.trim(),
      phone: phone.trim(),
      ride_type: rideType,
      trip_direction: tripDirection,
      hostel,
      campus,
      date,
      time,
      passengers: parseInt(passengers) || 1,
      price,
      receipt_url: receiptUrl,
      status: "pending",
      booking_ref: bookingId,
    })
    .select()
    .single();

  if (error) {
    console.error("Booking insert error:", error);
    return res.status(500).json({ error: "Failed to create booking" });
  }

  res.status(201).json({ success: true, bookingId: data.booking_ref, booking: data });
};

export const getBooking = async (req, res) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("booking_ref", req.params.id)
    .single();

  if (error || !data)
    return res.status(404).json({ error: "Booking not found" });

  res.json(data);
};

export const getBookingStatus = async (req, res) => {
  const { data, error } = await supabase
    .from("booking_status")
    .select("is_open")
    .eq("id", 1)
    .single();

  if (error || !data)
    return res.status(500).json({ error: "Could not fetch booking status" });

  res.json({ isOpen: data.is_open });
};