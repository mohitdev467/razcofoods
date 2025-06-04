import { API_ENDPOINTS } from "../Api/apiEndpoints";
import axiosInstance from "../Api/axiosInstance";


export const handleCreatePaymentIntent = async (data) => {
    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.createPaymentIntent}`,
        data
      );
      return response?.data;
    } catch (error) {
      console.log(commonEntities.unexpectedError, error);
    }
  };