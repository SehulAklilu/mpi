import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://mpiglobal.org",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 error and ensure the request hasn't already been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request to avoid infinite retries

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token not available");
        }

        // Request a new access token
        const refreshResponse = await axios.post(
          "https://mpiglobal.org/auth/refresh",
          {
            refreshToken,
          }
        );

        const newAccessToken = refreshResponse.data.tokens.accessToken;
        const newRefreshToken = refreshResponse.data.tokens.refreshToken;
        Cookies.set("authToken", newAccessToken);
        Cookies.set("refreshToken", newRefreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Cookies.remove("authToken");
        // Cookies.remove("refreshToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const getAxiosErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
  return "An unexpected error occurred.";
};

export const getAxiosSuccessMessage = <T>(response: T): string => {
  if (response && typeof response === "object" && "data" in response) {
    const data = (response as any).data;
    return data?.message || "Request was successful.";
  }
  return "Request completed successfully.";
};

export default axiosInstance;
