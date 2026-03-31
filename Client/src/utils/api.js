const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const getBookingStatus = () => 
  request("GET", "/api/bookings/status");

async function request(method, path, body, isFormData = false) {
  const options = {
    method,
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  };

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  }

  return data;
}

export const getPrice = (rideType, campus) =>
  request("GET", `/api/pricing?rideType=${rideType}&campus=${campus}`);

export async function createBooking(booking, receiptFile) {
  const form = new FormData();
  Object.entries(booking).forEach(([k, v]) => {
    if (v !== null && v !== undefined) form.append(k, v);
  });
  if (receiptFile) form.append("receipt", receiptFile);
  return request("POST", "/api/bookings", form, true);
}

export const getBooking = (id) => request("GET", `/api/bookings/${id}`);
export const getAllBookings = () => request("GET", "/api/admin/bookings");
export const updateBookingStatus = (id, status) => request("PATCH", `/api/admin/bookings/${id}`, { status });