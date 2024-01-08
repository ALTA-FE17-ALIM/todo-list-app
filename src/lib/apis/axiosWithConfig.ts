import axios from "axios";

const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "https://api.todoist.com/rest/v2/"
  axiosConfig.headers.Authorization = `Bearer 914c99dc00dc293e701ba41a45a0be77fcfb6797`;
  return axiosConfig
});

export default axiosWithConfig;