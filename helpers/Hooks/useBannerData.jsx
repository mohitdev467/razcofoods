import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../services/Api/apiEndpoints";
import axiosInstance from "../../services/Api/axiosInstance";

const endpointMap = {
  hero: API_ENDPOINTS.heroBannersAll,
  superDiscount: API_ENDPOINTS.superDiscountBanner,
  weeklyDeal: API_ENDPOINTS.weeklyDealBanners,
  smallBanner: API_ENDPOINTS.bannerCardSmall,
  categoriesCard: API_ENDPOINTS.getAllCategories,
  bestDeal: API_ENDPOINTS.bestDealBanner,
};

export const useBannerData = (type) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!type || !endpointMap[type]) {
      setError("Invalid banner type");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(endpointMap[type]);
        setData(response?.data);
      } catch (err) {
        console.error("Unexpected Error:", err);
        setError("Failed to fetch banner data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { data, loading, error };
};
