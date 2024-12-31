const users = [];

export const storeUser = (email, password) => {
  users.push({ email, password });
};

export const validateUser = (email, password) => {
  return users.some((user) => user.email === email && user.password === password);
};
