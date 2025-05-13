import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import axiosInstance from "./axiosInstance";

const apiRequest = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  },

  post: async (url, data, options = { notifyOnSuccess: true }) => {
    try {
      const response = await axiosInstance.post(url, data);
      if (options.notifyOnSuccess) {
        successHandler(response);
      }
      return response;
    } catch (error) {
      return errorHandler(error);
    }
  },

  patch: async (url, data, options = { notifyOnSuccess: true }) => {
    try {
      const response = await axiosInstance.patch(url, data);
      if (options.notifyOnSuccess) {
        successHandler(response);
      }
      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  },

  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(url, data);
      successHandler(response);
      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  },

  delete: async (url, params = {}, data = {}) => {
    try {
      const response = await axiosInstance.delete(url, { params, data });
      successHandler(response);
      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  },
};

export default apiRequest;
