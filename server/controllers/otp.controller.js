import bcrypt from "bcryptjs";
import { supabase } from "../services/supabase.service.js";
import { sendOtpEmail } from "../services/email.service.js";

const isValidBabcockEmail = (email) =>
  /^[a-zA-Z0-9._%+\-]+@student\.babcock\.edu\.ng$/.test(email?.trim() ?? "");

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });
  if (!isValidBabcockEmail(email))
    return res.status(400).json({ error: "Must be a valid @student.babcock.edu.ng email" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const key = email.trim().toLowerCase();

  // Upsert — replaces any existing OTP for this email
  const { error } = await supabase
    .from("otp_codes")
    .upsert({ email: key, hash, expires_at: expiresAt }, { onConflict: "email" });

  if (error) {
    console.error("OTP store error:", error);
    return res.status(500).json({ error: "Failed to store OTP" });
  }

  try {
    await sendOtpEmail(key, code);
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Could not send verification code. Please try again." });
  }

  res.json({ success: true, message: "Code sent to email" });
};

export const verifyOtp = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: "Email and code are required" });

  const key = email.trim().toLowerCase();
  const { data, error } = await supabase
    .from("otp_codes")
    .select("hash, expires_at")
    .eq("email", key)
    .single();

  if (error || !data)
    return res.status(400).json({ error: "No code found for this email. Request a new one." });

  if (new Date() > new Date(data.expires_at)) {
    await supabase.from("otp_codes").delete().eq("email", key);
    return res.status(400).json({ error: "Code has expired. Request a new one." });
  }

  const valid = await bcrypt.compare(code.trim(), data.hash);
  if (!valid) return res.status(400).json({ error: "Incorrect code. Please try again." });

  await supabase.from("otp_codes").delete().eq("email", key);
  res.json({ success: true });
};