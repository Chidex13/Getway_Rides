/**
 * OTP Email Template
 */
export const getOtpEmailTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .content {
          padding: 40px 30px;
          text-align: center;
        }
        .content p {
          font-size: 16px;
          color: #333;
          margin: 10px 0;
        }
        .otp-box {
          background-color: #f0f0f0;
          border: 2px solid #667eea;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
          font-size: 32px;
          font-weight: bold;
          color: #667eea;
          letter-spacing: 5px;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #999;
        }
        .warning {
          color: #d9534f;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Gateway Rides</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) for Gateway Rides is:</p>
          <div class="otp-box">${otp}</div>
          <p>This OTP will expire in 5 minutes.</p>
          <p><span class="warning">Do not share this OTP with anyone.</span></p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>Gateway Rides © 2024. All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Booking Confirmation Email Template
 */
export const getBookingConfirmationTemplate = (bookingDetails) => {
  const { bookingId, tripDate, pickupLocation, dropoffLocation, amount, passengerName } = bookingDetails;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
        }
        .content {
          padding: 30px;
        }
        .booking-details {
          background-color: #f9f9f9;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          font-size: 14px;
        }
        .detail-label {
          font-weight: bold;
          color: #333;
        }
        .amount {
          font-size: 24px;
          color: #667eea;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmation</h1>
        </div>
        <div class="content">
          <p>Hi ${passengerName},</p>
          <p>Your booking has been confirmed! Here are your details:</p>
          <div class="booking-details">
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span>${bookingId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Trip Date:</span>
              <span>${tripDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Pickup Location:</span>
              <span>${pickupLocation}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Dropoff Location:</span>
              <span>${dropoffLocation}</span>
            </div>
          </div>
          <div class="amount">Amount: ${amount}</div>
          <p>Thank you for booking with Gateway Rides!</p>
        </div>
        <div class="footer">
          <p>Gateway Rides © 2024. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Cancellation Email Template
 */
export const getCancellationTemplate = (bookingId) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Cancelled</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; padding: 30px;">
        <h2>Booking Cancelled</h2>
        <p>Your booking ${bookingId} has been cancelled.</p>
        <p>If you have any questions, please contact our support team.</p>
      </div>
    </body>
    </html>
  `;
};
