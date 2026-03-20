import nodemailer from 'nodemailer';
import { getOtpEmailTemplate } from '../utils/email.templates.js';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send OTP email
 */
export const sendOtpEmail = async (email, otp) => {
  try {
    const htmlContent = getOtpEmailTemplate(otp);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Gateway Rides',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

/**
 * Send booking confirmation email
 */
export const sendBookingConfirmation = async (email, bookingDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmation - Gateway Rides',
      html: `<h2>Booking Confirmed</h2><p>Your booking details: ${JSON.stringify(bookingDetails)}</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    throw error;
  }
};

/**
 * Send cancellation email
 */
export const sendCancellationEmail = async (email, bookingId) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Cancelled - Gateway Rides',
      html: `<h2>Booking Cancelled</h2><p>Your booking ${bookingId} has been cancelled.</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    throw error;
  }
};
