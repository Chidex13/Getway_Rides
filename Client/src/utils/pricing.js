const PRICES = {
  public: { main: 13000, iperu: 10000 },
  private: { main: 18000, iperu: 15000 },
};

export const getPrice = (rideType, campus, passengers = 1) =>
  (PRICES?.[rideType]?.[campus] ?? null) * passengers;

export const getPricePerSeat = (rideType, campus) =>
  PRICES?.[rideType]?.[campus] ?? null;

export const formatPrice = (amount) =>
  `₦${Number(amount).toLocaleString("en-NG")}`;