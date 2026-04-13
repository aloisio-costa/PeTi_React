import { API_BASE_URL } from "../config/env";

export async function apiClient(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      return {
        data: null,
        error: `Request failed with status ${response.status}`,
      };
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return { data, error: null };
    }

    return { data: null, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.message || "Unexpected network error",
    };
  }
}