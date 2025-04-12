import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/12-2",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉트 토큰 todo

export default apiClient;
