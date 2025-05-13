import { useEffect, useState } from "react";
import axiosInstance from "../../services/Api/axiosInstance";
import { API_ENDPOINTS } from "../../services/Api/apiEndpoints";

export const useAllProducts = (selectedCategory, limit = 20, page = 1) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const category = selectedCategory ?? "undefined";
        const response = await axiosInstance.get(
          API_ENDPOINTS.getProductbyCategory(category, limit, page)
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, limit, page]);

  return { data, loading, error };
};
