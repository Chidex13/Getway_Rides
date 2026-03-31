import SibApiV3Sdk from 'sib-api-v3-sdk';
import { getOtpEmailTemplate } from '../utils/email.templates.js';
import dotenv from 'dotenv';

dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// ✅ OTP EMAIL
export const sendOtpEmail = async (email, otp) => {
  try {
    const result = await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: 'Getway Rides',
      },
      to: [{ email }],
      subject: 'Your Getway Rides verification code',
      htmlContent: getOtpEmailTemplate(otp),
    });

    console.log(`✓ OTP sent to ${email}`);
    return result;
  } catch (error) {
    console.error('BREVO OTP ERROR:', JSON.stringify(error, null, 2));
    throw new Error('Failed to send OTP email');
  }
};

// ✅ BOOKING CONFIRMATION
export const sendBookingConfirmation = async (email, bookingDetails) => {
  try {
    const result = await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: 'Getway Rides',
      },
      to: [{ email }],
      subject: 'Booking Confirmed — Getway Rides',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #007bff;">Booking Confirmed</h2>
          <p>Your booking has been confirmed!</p>
          <p><strong>Booking Reference:</strong> ${bookingDetails.bookingRef}</p>
          <p><strong>Amount:</strong> ₦${bookingDetails.price}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 14px;">Thank you for choosing Getway Rides!</p>
        </div>
      `,
    });

    console.log(`✓ Booking confirmation sent to ${email}`);
    return result;
  } catch (error) {
    console.error('BREVO BOOKING ERROR:', JSON.stringify(error, null, 2));
    throw new Error('Failed to send confirmation email');
  }
};

// ✅ CANCELLATION EMAIL
export const sendCancellationEmail = async (email, bookingId) => {
  try {
    const result = await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: 'Getway Rides',
      },
      to: [{ email }],
      subject: 'Booking Cancelled — Getway Rides',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc3545;">Booking Cancelled</h2>
          <p>Your booking <strong>${bookingId}</strong> has been cancelled.</p>
          <p style="margin-top: 20px;">For questions, contact us:</p>
          <p>
            <strong>Line 1:</strong> 07019624022<br>
            <strong>Line 2:</strong> 0704 774 9171
          </p>
          <p style="color: #666; margin-top: 20px;">We apologize for any inconvenience.</p>
        </div>
      `,
    });

    console.log(`✓ Cancellation email sent to ${email}`);
    return result;
  } catch (error) {
    console.error('BREVO CANCELLATION ERROR:', JSON.stringify(error, null, 2));
    throw new Error('Failed to send cancellation email');
  }
};