import axios from "axios";
import { API_ENDPOINTS } from "../Api/apiEndpoints";
import axiosInstance, { API_BASE_URL } from "../Api/axiosInstance";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";

export const UpdateUserProfile = async (id, data) => {
  console.log("FormData sending to backend:", data);

  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.userUpdateProfile(id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.userDetailsById(id));
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserPassword = async (data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.changePasswordEndPoint,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleForgetPassword = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${API_ENDPOINTS.forgetPassword}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log(commonEntities.unexpectedError, error);
  }
};
export const handleResetPassword = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.resetPassword}`,
      data
    );
    return response;
  } catch (error) {
    console.log(commonEntities.unexpectedError, error);
  }
};

export const handleCreateContact = async (id, data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.userContact(id),
      data
    );
    return response?.data;
  } catch (error) {
    console.log(commonEntities.unexpectedError, error);
  }
};

export const handleUpdateSend = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.conatctUsApi, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
