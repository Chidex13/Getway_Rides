export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const formatTime = (timeStr) => {
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;
  return `${display}:${m} ${ampm}`;
};

export const generateBookingId = () =>
  "GR-" + Date.now().toString(36).toUpperCase().slice(-6);