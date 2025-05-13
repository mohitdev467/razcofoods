import { useEffect, useState } from "react";
import axiosInstance from "../../services/Api/axiosInstance";
import { API_ENDPOINTS } from "../../services/Api/apiEndpoints";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";

const useProductById = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          API_ENDPOINTS.getProductById(id)
        );
        setProduct(response?.data);
      } catch (err) {
        console.error(commonEntities.unexpectedError, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export default useProductById;
