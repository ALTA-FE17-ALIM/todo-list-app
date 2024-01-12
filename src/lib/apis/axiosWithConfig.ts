import axios from "axios";

const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "https://api.todoist.com/rest/v2/"
  axiosConfig.headers.Authorization = `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`;
  return axiosConfig
});

export default axiosWithConfig;