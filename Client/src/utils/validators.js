export const isValidBabcockEmail = (email) =>
  /^[a-zA-Z0-9._%+\-]+@student\.babcock\.edu\.ng$/.test(email?.trim() ?? "");

export const isValidFullName = (fullName) => {
  const trimmed = fullName?.trim() ?? "";
  // Must be greater than 6 characters, only letters and spaces
  if (trimmed.length <= 6) return false;
  return /^[a-zA-Z\s]+$/.test(trimmed);
};

export const isValidPhone = (phone) =>
  /^(\+234|0)[789][01]\d{8}$/.test(phone?.trim() ?? "");