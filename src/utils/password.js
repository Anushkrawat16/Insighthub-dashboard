import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

