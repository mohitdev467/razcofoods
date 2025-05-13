import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_BASE_URL = "https://backend.razcofoods.net/api/v1/";
export const IMAGE_BASE_URL = "https://backend.razcofoods.net";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const loginData = await AsyncStorage.getItem("@loginData");
      const parsed = JSON.parse(loginData);

      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (error) {
      console.error("Token parsing error:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      "Axios response error:",
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;
