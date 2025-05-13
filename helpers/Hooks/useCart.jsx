import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const loadCart = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("user_cart_items");
      if (json) {
        const parsed = JSON.parse(json);
        setCartItems(parsed);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    const total = cartItems?.reduce((acc, item) => acc + item?.quantity, 0);
    setTotalItems(total);
  }, [cartItems]);

  const saveCart = async (items) => {
    try {
      await AsyncStorage.setItem("user_cart_items", JSON.stringify(items));
      setCartItems(items);
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  const addToCart = async (item) => {
    const existingItem = cartItems?.find((i) => i?.id === item?.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems?.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      updatedCart = [...cartItems, item];
    }

    await saveCart(updatedCart);
  };

  const removeFromCart = async (itemId) => {
    const updatedCart = cartItems?.filter((i) => i.id !== itemId);
    await saveCart(updatedCart);
  };

  const clearCart = async () => {
    try {
      await AsyncStorage?.removeItem("user_cart_items");
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const getTotalItems = () => {
    return totalItems;
  };

  const getTotalPrice = () => {
    return cartItems?.reduce(
      (total, item) => total + item?.price * item?.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
