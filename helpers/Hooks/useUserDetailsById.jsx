import { useEffect, useState, useCallback } from "react";
import { getUserById } from "../../services/UserServices/UserServices";

const useUserDetailsById = (id, shouldFetch = true) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!shouldFetch);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    if (!id || !shouldFetch) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getUserById(id);
      setUser(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id, shouldFetch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch: fetchUser };
};

export default useUserDetailsById;
