/**
 * Validate booking data
 */
export const validateBooking = (req, res, next) => {
  const { userId, tripId, passengerDetails } = req.body;

  if (!userId || !tripId || !passengerDetails) {
    return res.status(400).json({
      error: 'Missing required fields: userId, tripId, passengerDetails'
    });
  }

  next();
};

/**
 * Validate email format
 */
export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  next();
};

/**
 * Validate OTP
 */
export const validateOtp = (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  if (otp.length !== parseInt(process.env.OTP_LENGTH || 6)) {
    return res.status(400).json({ error: 'Invalid OTP length' });
  }

  next();
};

/**
 * Generic validation middleware factory
 */
export const validateRequired = (fields) => {
  return (req, res, next) => {
    const missingFields = fields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    next();
  };
};
