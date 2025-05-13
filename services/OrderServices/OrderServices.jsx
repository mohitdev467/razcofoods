import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import { API_ENDPOINTS } from "../Api/apiEndpoints";
import axiosInstance from "../Api/axiosInstance";

export const getBestPromoCode = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getPromoCode(id));
    return response?.data;
  } catch (error) {
    console.log(commonEntities.unexpectedError, error);
  }
};

export const handleCreateOrder = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.createOrder, data);
    return response?.data;
  } catch (error) {
    console.log(commonEntities.unexpectedError, error);
  }
};
