import { Resend } from "resend";
import { getOtpEmailTemplate } from "../utils/email.templates.js";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email, otp) => {
  const { error } = await resend.emails.send({
    from: "Getway Rides <onboarding@resend.dev>",
    to: email,
    subject: "Your Getway Rides verification code",
    html: getOtpEmailTemplate(otp),
  });
  if (error) {
    console.error("Resend error:", error);
    throw new Error("Failed to send verification email");
  }
  console.log(`OTP sent to ${email}`);
};

export const sendBookingConfirmation = async (email, bookingDetails) => {
  const { error } = await resend.emails.send({
    from: "Getway Rides <onboarding@resend.dev>",
    to: email,
    subject: "Booking Confirmed — Getway Rides",
    html: `<h2>Booking Confirmed</h2><p>Booking ref: ${bookingDetails.bookingRef}</p><p>Amount: ₦${bookingDetails.price}</p>`,
  });
  if (error) {
    console.error("Resend booking confirmation error:", error);
    throw new Error("Failed to send confirmation email");
  }
  console.log(`Booking confirmation sent to ${email}`);
};

export const sendCancellationEmail = async (email, bookingId) => {
  const { error } = await resend.emails.send({
    from: "Getway Rides <onboarding@resend.dev>",
    to: email,
    subject: "Booking Cancelled — Getway Rides",
    html: `
      <h2>Booking Cancelled</h2>
      <p>Your booking <strong>${bookingId}</strong> has been cancelled.</p>
      <p>For questions contact us:</p>
      <p>Line 1: 07019624022</p>
      <p>Line 2: 0704 774 9171</p>
      <p>We apologise for any inconvenience.</p>
    `,
  });
  if (error) {
    console.error("Resend cancellation error:", error);
    throw new Error("Failed to send cancellation email");
  }
  console.log(`Cancellation email sent to ${email}`);
};