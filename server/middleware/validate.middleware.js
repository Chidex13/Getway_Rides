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
 * Validate full name format
 */
export const validateFullName = (req, res, next) => {
  const { fullName } = req.body;
  
  if (!fullName) {
    return res.status(400).json({ error: 'Full name is required' });
  }

  const trimmed = fullName.trim();
  if (trimmed.length <= 6) {
    return res.status(400).json({ error: 'Full name must be greater than 6 characters' });
  }

  if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
    return res.status(400).json({ error: 'Full name must contain only letters and spaces' });
  }

  next();
};

/**
 * Validate phone format
 */
export const validatePhone = (req, res, next) => {
  const { phone } = req.body;
  
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  if (!/^(\+234|0)[789][01]\d{8}$/.test(phone.trim())) {
    return res.status(400).json({ error: 'Invalid phone number format' });
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
