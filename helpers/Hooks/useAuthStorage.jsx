import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@loginData";

const useAuthStorage = () => {
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLoginData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setLoginData(JSON.parse(storedData));
      } else {
        setLoginData(null);
      }
    } catch (error) {
      console.error("Error getting login data:", error);
    } finally {
      setLoading(false);
    }
  };

  const storeLoginData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLoginData(data);
    } catch (error) {
      console.error("Error storing login data:", error);
    }
  };

  const updateLoginData = async (updatedData) => {
    try {
      const newData = { ...loginData, ...updatedData };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setLoginData(newData);
    } catch (error) {
      console.error("Error updating login data:", error);
    }
  };

  const clearLoginData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setLoginData(null);
    } catch (error) {
      console.error("Error clearing login data:", error);
    }
  };

  useEffect(() => {
    getLoginData();
  }, []);

  return {
    loginData,
    loading,
    storeLoginData,
    updateLoginData,
    clearLoginData,
    getLoginData,
  };
};

export default useAuthStorage;
