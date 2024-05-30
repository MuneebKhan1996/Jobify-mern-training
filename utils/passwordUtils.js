import bcrypt from 'bcryptjs';

export const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(pwd, salt);
  return hashedPwd;
};

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
