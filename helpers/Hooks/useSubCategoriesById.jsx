import { useEffect, useState } from "react";
import axiosInstance from "../../services/Api/axiosInstance";
import { API_ENDPOINTS } from "../../services/Api/apiEndpoints";

export const useSubCategoriesByCategoryId = (categoryId) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          API_ENDPOINTS.getSubCategoryById(categoryId)
        );
        setSubcategories(response.data?.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || "Error fetching subcategories");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  return { subcategories, loading, error };
};
