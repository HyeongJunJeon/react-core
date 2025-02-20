const NAMESPACE = "reactCore";
const makeKey = (key) => `${NAMESPACE}.${key}`;

export const setItem = (key, value) => {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(makeKey(key), serializedValue);
};

export const getItem = (key) => {
  const item = localStorage.getItem(makeKey(key));
  return item ? JSON.parse(item) : null;
};

export const removeItem = (key) => {
  localStorage.removeItem(makeKey(key));
};
