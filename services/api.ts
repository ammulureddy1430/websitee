import { setStoredToken } from "./token";

let TOKEN: string | null = null;

export const setToken = (t: string | null) => {
  TOKEN = t;
  setStoredToken(t);
};

const BASE_URL = "http://192.168.1.5:4000"; 
// ⚠️ Replace 192.168.1.5 with YOUR laptop’s IP address

interface ApiError {
  message: string;
  status?: number;
  body?: any;
}

async function request<T>(url: string, options: RequestInit): Promise<T> {
  const res = await fetch(BASE_URL + url, options);

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }

  if (!res.ok) {
    const error: ApiError = {
      message: data?.message || "API Error",
      status: res.status,
      body: data,
    };
    throw error;
  }

  return data;
}

export default {
  setToken,

  get: async <T = any>(url: string): Promise<T> => {
    return request<T>(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    });
  },

  post: async <T = any>(url: string, body?: any): Promise<T> => {
    return request<T>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
      body: JSON.stringify(body),
    });
  },
};
