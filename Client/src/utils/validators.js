export const isValidBabcockEmail = (email) =>
  /^[a-zA-Z0-9._%+\-]+@student\.babcock\.edu\.ng$/.test(email?.trim() ?? "");

export const isValidPhone = (phone) =>
  /^(\+234|0)[789][01]\d{8}$/.test(phone?.trim() ?? "");