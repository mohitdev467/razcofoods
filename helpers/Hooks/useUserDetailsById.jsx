import { useEffect, useState } from "react";
import { getUserById } from "../../services/UserServices/UserServices";

const useUserDetailsById = (id, shouldFetch = true) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!shouldFetch);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !shouldFetch) return;

    const fetchUser = async () => {
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
    };

    fetchUser();
  }, [id, shouldFetch]);

  return { user, loading, error };
};

export default useUserDetailsById;
