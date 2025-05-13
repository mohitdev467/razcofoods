import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../services/Api/axiosInstance";
import { API_ENDPOINTS } from "../../services/Api/apiEndpoints";

export const useAllOrders = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (userId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_ENDPOINTS.getAllOrderWithPagination(userId)
      );
      setData(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    fetchOrders,
  };
};
