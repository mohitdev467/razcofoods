import axios from "axios";
import { commonContent } from "../../constants/CommonContent/CommonContent";
import { API_BASE_URL } from "../Api/axiosInstance";
import { API_ENDPOINTS } from "../Api/apiEndpoints";

const headers = {
  "Content-Type": "application/json",
};

export const handleLoginUser = async (data) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.loginUser}`,
      data,
      headers
    );
    console.log("responseeeee", response.data);
    if (response.data?.status === 1) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        error: commonContent.invalidCredentials,
        data: response.data,
      };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

export const handleRegisterUser = async (payload) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.registerUser}`,
      payload,
      { headers }
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const handleVerifyOtp = async (payload) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.verifyOtp}`,
      payload,
      { headers }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
export const handleVerifyOtpForgotPassword = async (payload) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.verifyOtpForgotPassword}`,
      payload
    );
    console.log("Forgot passwordd", response?.data);
    if (response.data?.status === 200) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        error: commonContent.registrationFailed || "Otp Verified Successfully",
        data: response.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
