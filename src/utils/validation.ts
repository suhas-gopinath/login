export const validation = (username: string, password: string) => {
  if (username.trim().length > 5 && password.trim().length > 7) return true;
  return false;
};

export const isUsernameLengthValid = (username: string): boolean => {
  if (username.length > 5 && username.length < 31) return true;
  return false;
};

export const isUsernamePatternValid = (username: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+$/;
  return regex.test(username);
};

export const isPasswordMatch = (p1: string, p2: string): boolean => {
  return p1 == p2;
};

export const hasWhitespace = (password: string): boolean => {
  return /\s/.test(password);
};

export const isStrongPassword = (password: string): boolean => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  return regex.test(password);
};

export const isPasswordLengthValid = (password: string): boolean => {
  if (password.length > 7 && password.length < 65) return true;
  return false;
};
