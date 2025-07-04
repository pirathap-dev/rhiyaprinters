// utils/otpStore.js

const otpMap = new Map(); // { email: { otp, expiresAt } }

export const generateOTP = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins
  otpMap.set(email, { otp, expiresAt });
  return otp;
};

export const verifyOTP = (email, otp) => {
  const record = otpMap.get(email);
  if (!record) return false;
  const { otp: validOtp, expiresAt } = record;
  const isValid = validOtp === otp && Date.now() < expiresAt;
  if (isValid) otpMap.delete(email); // remove after success
  return isValid;
};
