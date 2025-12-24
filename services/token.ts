let STORED_TOKEN: string | null = null;

export const setStoredToken = (token: string | null) => {
  STORED_TOKEN = token;
};

export const getStoredToken = () => STORED_TOKEN;
