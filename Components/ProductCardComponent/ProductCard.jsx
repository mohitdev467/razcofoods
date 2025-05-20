import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { useCart } from "../../helpers/Hooks/useCart";

const ProductCard = ({
  id,
  imageUrl,
  price,
  description,
  productData,
  cardHeight,
}) => {
  const [quantity, setQuantity] = useState(0);
  const navigation = useNavigation();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const numericPrice = parseFloat(price?.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    const itemInCart = cartItems?.find((item) => item.id === id);
    if (itemInCart) {
      setQuantity(itemInCart?.quantity);
    }
  }, [cartItems]);

  const handleAdd = async () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    await addToCart({
      id,
      imageUrl,
      price: numericPrice,
      description,
      quantity: 1,
    });
  };

  const handleRemove = async () => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
      setQuantity(0);
      await removeFromCart(id);
    } else {
      setQuantity(newQty);
      await addToCart({
        id,
        imageUrl,
        price: numericPrice,
        description,
        quantity: -1, // reducing quantity
      });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { minHeight: cardHeight ?? "auto" }]}
      onPress={() =>
        navigation.navigate(screenNames.ProductsDetailsScreen, {
          productData: productData,
        })
      }
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />

      {quantity === 0 ? (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <AntDesign name="plus" size={Responsive.font(4.5)} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={handleRemove}
            style={{ position: "relative", left: -10 }}
          >
            <AntDesign name="minus" size={Responsive.font(5)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={handleAdd}
            style={{ position: "relative", right: -10 }}
          >
            <AntDesign name="plus" size={Responsive.font(5)} color="#000" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() =>
          navigation.navigate(screenNames.ProductsDetailsScreen, {
            productData: productData,
          })
        }
      >
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.desc}>{description}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Responsive.widthPx(43.5),
    backgroundColor: Colors.whiteColor,
    borderRadius: Responsive.widthPx(2),
    padding: Responsive.widthPx(3),
    elevation: 4,
    alignItems: "center",
    position: "relative",
    marginVertical: rh(3),
    marginHorizontal: rw(2),
    shadowColor: Colors.blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
  },
  image: {
    width: Responsive.widthPx(25),
    height: Responsive.heightPx(12),
    marginBottom: Responsive.heightPx(1),
  },
  addButton: {
    backgroundColor: Colors.primaryButtonColor,
    width: Responsive.widthPx(10),
    height: Responsive.heightPx(5),
    borderRadius: Responsive.widthPx(5),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: Responsive.heightPx(10),
    right: Responsive.widthPx(4),
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Responsive.widthPx(5),
    paddingHorizontal: Responsive.widthPx(7),
    paddingVertical: Responsive.heightPx(0.8),
    borderWidth: 1,
    borderColor: "#ccc",
    position: "absolute",
    top: Responsive.heightPx(10),
    right: Responsive.widthPx(4),
  },
  quantityText: {
    marginHorizontal: Responsive.widthPx(2),
    fontSize: Responsive.font(3.8),
    fontWeight: "Bold",
  },
  price: {
    fontFamily: "Bold",
    fontSize: Responsive.font(4.2),
    marginTop: Responsive.heightPx(2),
  },
  desc: {
    fontSize: Responsive.font(3.7),
    textAlign: "center",
    fontFamily: "Regular",
    marginTop: Responsive.widthPx(1),
  },
});

export default ProductCard;
