import nodemailer from "nodemailer";
import { getOtpEmailTemplate } from "../utils/email.templates.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendOtpEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Getway Rides" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Getway Rides verification code",
      html: getOtpEmailTemplate(otp),
    });

    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Email error:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendBookingConfirmation = async (email, bookingDetails) => {
  try {
    await transporter.sendMail({
      from: `"Getway Rides" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Booking Confirmed — Getway Rides",
      html: `<h2>Booking Confirmed</h2>
             <p>Booking ref: ${bookingDetails.bookingRef}</p>
             <p>Amount: ₦${bookingDetails.price}</p>`,
    });

    console.log(`Booking confirmation sent to ${email}`);
  } catch (error) {
    console.error("Booking email error:", error);
    throw new Error("Failed to send confirmation email");
  }
};

export const sendCancellationEmail = async (email, bookingId) => {
  try {
    await transporter.sendMail({
      from: `"Getway Rides" <${process.env.EMAIL_USER}>`,
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

    console.log(`Cancellation email sent to ${email}`);
  } catch (error) {
    console.error("Cancellation email error:", error);
    throw new Error("Failed to send cancellation email");
  }
};