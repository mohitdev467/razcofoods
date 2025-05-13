import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const loadWishlist = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("user_wishlist_items");
      if (json) {
        const parsed = JSON.parse(json);
        setWishlistItems(parsed);
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const saveWishlist = async (items) => {
    try {
      await AsyncStorage.setItem("user_wishlist_items", JSON.stringify(items));
      setWishlistItems(items);
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  };

  const toggleWishlistItem = async (item) => {
    if (!item?._id) {
      console.warn("Item does not have a valid _id");
      return;
    }

    const exists = wishlistItems.some((i) => i._id === item._id);
    let updated;

    if (exists) {
      updated = wishlistItems.filter((i) => i._id !== item._id);
    } else {
      updated = [...wishlistItems, item];
    }

    setWishlistItems(updated); // local update first
    await saveWishlist(updated); // persist to storage
  };

  const isInWishlist = (itemId) => {
    return wishlistItems?.some((i) => i?._id === itemId);
  };

  const clearWishlist = async () => {
    try {
      await AsyncStorage?.removeItem("user_wishlist_items");
      setWishlistItems([]);
    } catch (error) {
      console.error("Failed to clear wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlistItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
