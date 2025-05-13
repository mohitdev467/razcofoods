import { useEffect, useState } from "react";
import axiosInstance from "../../services/Api/axiosInstance";
import { API_ENDPOINTS } from "../../services/Api/apiEndpoints";

export const useAllCategories = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          API_ENDPOINTS.getAllCategories
        );
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
