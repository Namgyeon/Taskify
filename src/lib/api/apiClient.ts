import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/12-2",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉트 토큰 todo
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
