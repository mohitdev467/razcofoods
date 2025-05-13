import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import { API_ENDPOINTS } from "../Api/apiEndpoints";
import axiosInstance from "../Api/axiosInstance";

export const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getAllBlogs);
    return response?.data;
  } catch (error) {
    console.log(commonEntities.unexpectedError, error);
  }
};
