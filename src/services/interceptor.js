import axios from "axios";

// Create Axios instance
const apiAdmin = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token before request
apiAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token attached to request:", token); // Debugging Log
    } else {
      console.warn("⚠️ No token found in localStorage!");
    }
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Interceptor to handle responses globally
apiAdmin.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("❌ API Error Response:", error.response);

      // Unauthorized (401) Handling
      if (error.response.status === 401) {
        console.warn("⚠️ Unauthorized - Redirecting to Login...");
        localStorage.clear(); // Clear all auth-related data
        window.location.replace("/auth/sign-in"); // Redirect to login
      }
    } else {
      console.error("❌ Network Error or No Response:", error);
    }

    return Promise.reject(error);
  }
);

export default apiAdmin;
