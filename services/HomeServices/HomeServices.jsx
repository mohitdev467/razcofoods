import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import { API_ENDPOINTS } from "../Api/apiEndpoints";
import axiosInstance from "../Api/axiosInstance";

export const getHomeBaners = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.heroBannersAll);
    return response?.data;
  } catch (error) {
    console.log(commonContent.unexpectedError, error);
  }
};
export const superDiscountBanners = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.superDiscountBanner);
    return response?.data;
  } catch (error) {
    console.log(commonContent.unexpectedError, error);
  }
};
export const weeklyDealBanner = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.weeklyDealBanners);
    return response?.data;
  } catch (error) {
    console.log(commonContent.unexpectedError, error);
  }
};
export const bestDealBamners = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.bestDealBanner);
    return response?.data;
  } catch (error) {
    console.log(commonContent.unexpectedError, error);
  }
};
export const bannerCardSmall = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.bannerCardSmall);
    return response?.data;
  } catch (error) {
    console.log(commonContent.unexpectedError, error);
  }
};

export const handleSearchProduct = async (query) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.searchingProduct(query)
    );
    return response?.data;
  } catch (error) {
    console.log(commonEntities.unexpectedError, error);
  }
};

export const handleAndGetProductById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getProductById(id));
    return response?.data;
  } catch (error) {
    console.log(commonEntities.unexpectedError, error);
  }
};
