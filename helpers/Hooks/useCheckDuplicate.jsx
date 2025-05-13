import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../services/Api/apiEndpoints";
import { API_BASE_URL } from "../../services/Api/axiosInstance";

const useCheckDuplicate = () => {
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const checkEmail = async (email) => {
    try {
      setEmailError("");
      const res = await axios.get(
        `${API_BASE_URL}${API_ENDPOINTS.checkEmail(email)}`
      );
      if (res.data?.status === 409) {
        setEmailError("Email already exists");
      }
    } catch (error) {
      console.error("Email check error", error);
    }
  };

  const checkPhone = async (phone) => {
    try {
      setPhoneError("");
      const res = await axios.get(
        `${API_BASE_URL}${API_ENDPOINTS.checkPhoneNumber(phone)}`
      );

      if (res.data?.status === 409) {
        setPhoneError("Phone number already exists");
      }
    } catch (error) {
      console.error("Phone check error", error);
    }
  };

  return {
    checkEmail,
    checkPhone,
    emailError,
    phoneError,
  };
};

export default useCheckDuplicate;
