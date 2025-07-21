import axios from "axios";
import { cookies } from "next/headers";

const axiosServerHelper = axios.create({
  baseURL:
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://sp-taskify-api.vercel.app/12-2",
});

axiosServerHelper.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (accessToken?.value)
    config.headers.Authorization = `Bearer ${accessToken.value}`;

  return config;
});

export default axiosServerHelper;
