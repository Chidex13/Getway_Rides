import SibApiV3Sdk from "sib-api-v3-sdk";
import { getOtpEmailTemplate } from "../utils/email.templates.js";
import dotenv from "dotenv";
dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// ✅ OTP EMAIL
export const sendOtpEmail = async (email, otp) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: "Getway-Rides",
      },
      to: [{ email }],
      subject: "Your Getway Rides verification code",
      htmlContent: getOtpEmailTemplate(otp),
    });

    console.log(`OTP sent to ${email}`);
  } catch (error) {
  console.error("FULL BREVO ERROR:", JSON.stringify(error, null, 2));
  throw error;
}
};

// ✅ BOOKING CONFIRMATION
export const sendBookingConfirmation = async (email, bookingDetails) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: "Getway Rides",
      },
      to: [{ email }],
      subject: "Booking Confirmed — Getway Rides",
      htmlContent: `
        <h2>Booking Confirmed</h2>
        <p>Booking ref: ${bookingDetails.bookingRef}</p>
        <p>Amount: ₦${bookingDetails.price}</p>
      `,
    });

    console.log(`Booking confirmation sent to ${email}`);
  } catch (error) {
    console.error("Brevo booking error:", error);
    throw new Error("Failed to send confirmation email");
  }
};

// ✅ CANCELLATION EMAIL
export const sendCancellationEmail = async (email, bookingId) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: "Getway Rides",
      },
      to: [{ email }],
      subject: "Booking Cancelled — Getway Rides",
      htmlContent: `
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
    console.error("Brevo cancellation error:", error);
    throw new Error("Failed to send cancellation email");
  }
};