import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../services/Api/axiosInstance";
import { API_ENDPOINTS } from "../../services/Api/apiEndpoints";

const useUserContact = (id) => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContact = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.userContact(id));
      setContact(response.data);
    } catch (err) {
      console.error("Failed to fetch contact:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  return { contact, loading, error, fetchContact };
};

export default useUserContact;
