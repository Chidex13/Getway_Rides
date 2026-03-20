import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../services/supabase.service.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const { data, error } = await supabase
    .from("admin_users")
    .select("id, email, name, password_hash")
    .eq("email", email.trim().toLowerCase())
    .single();

  if (error || !data)
    return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, data.password_hash);
  if (!valid)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: data.id, email: data.email, name: data.name },
    process.env.JWT_SECRET,
    { expiresIn: "6h" }
  );

  res.json({ success: true, token, admin: { name: data.name, email: data.email } });
};

export const getAllBookings = async (req, res) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: "Failed to fetch bookings" });

  res.json({ count: data.length, bookings: data });
};

export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "confirmed", "cancelled"];

  if (!allowed.includes(status))
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(", ")}` });

  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error || !data)
    return res.status(404).json({ error: "Booking not found" });

  res.json({ success: true, booking: data });
};