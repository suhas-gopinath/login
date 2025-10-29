export const validation = (username: string, password: string) => {
  if (username.trim().length > 5 && password.trim().length > 7) return true;
  return false;
};
