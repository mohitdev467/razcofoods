import { useEffect, useState } from "react";
import axiosInstance from "../../services/Api/axiosInstance";
import { API_ENDPOINTS } from "../../services/Api/apiEndpoints";

export const useProducts = (page, pageSize) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!page || !pageSize) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const endpoint = API_ENDPOINTS.getAllProductsByPagination(
          page,
          pageSize
        );
        const response = await axiosInstance.get(endpoint);
        setData(response?.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize]);

  return { data, loading, error };
};
