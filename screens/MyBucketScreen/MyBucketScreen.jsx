import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import useGoBack from "../../helpers/Hooks/useGoBack.jsx";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive.js";
import { Colors } from "../../helpers/theme/colors.js";
import Icon from "react-native-vector-icons/Feather";
import { useCart } from "../../helpers/Hooks/useCart.jsx";
import { ActivityIndicator, Button, Modal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames.js";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage.jsx";
import ModalComponent from "../../Components/CommonComponents/ModalComponent.jsx";
import { SafeAreaView } from "react-native-safe-area-context";

const MyBucketScreen = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getTotalPrice } =
    useCart();
  const [isClearingCart, setIsClearingCart] = useState(false);
  const { loginData } = useAuthStorage();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const goBack = useGoBack();
  const navigation = useNavigation();

  const increaseQty = (item) => {
    addToCart({ ...item, quantity: 1 });
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 });
    }
  };

  const subtotal = getTotalPrice();

  const handleClearCart = async () => {
    setIsClearingCart(true);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    clearCart();
    setIsClearingCart(false);
  };

  const handleProceedToCheckout = () => {
    if (loginData?.verified) {
      navigation.navigate(screenNames.checkoutScreen, {
        cartData: cartItems,
      });
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={rf(3)} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        {isClearingCart ? (
          <ActivityIndicator size="small" />
        ) : cartItems?.length > 0 ? (
          <TouchableOpacity onPress={handleClearCart}>
            <View style={styles.clearAll}>
              <Feather name="trash-2" size={rf(2)} color="gray" />
              <Text style={styles.clearAllText}>Clear All</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>

      {cartItems?.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {cartItems?.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.overlayWrapper}>
                <Image
                  source={
                    typeof item?.imageUrl === "string"
                      ? { uri: `${item.imageUrl}` }
                      : ImagePicker.PlaceholderImage
                  }
                  style={styles.image}
                />
                <TouchableOpacity
                  style={styles.iconWrapper}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Icon
                    name="x"
                    size={Responsive.font(5.5)}
                    style={styles.iconStyle}
                  />
                </TouchableOpacity>
                <View style={styles.overlay} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {item?.description?.length > 40
                    ? `${item?.description?.slice(0, 40)}...`
                    : item?.description || "Product"}
                </Text>
                <Text style={styles.itemQty}>X {item.quantity}</Text>
                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => decreaseQty(item)}
                  >
                    <Text style={styles.qtyIcon}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => increaseQty(item)}
                  >
                    <Text style={styles.qtyIcon}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {item?.price === "NaN" ? (
                <Text style={styles.price}>{0}</Text>
              ) : (
                <Text style={styles.price}>
                  ${(item?.price * item?.quantity).toFixed(2)}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyCartWrapper}>
          <Image
            source={ImagePicker.emptyCartImage}
            style={styles.emptyCartImageStyle}
          />
          <Text style={styles.cartEmptyText}>Your cart is empty</Text>
          <Text style={styles.cartEmptySubtitle}>
            Please add product to your cart list
          </Text>
        </View>
      )}

      {/* Footer */}
      {cartItems?.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.subtotal}>
              Subtotal:{" "}
              <Text style={styles.subtotalAmount}>${subtotal.toFixed(2)}</Text>
            </Text>
            <Text style={styles.note}>
              Final price and discounts will be determined at the time of
              payment processing.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={handleProceedToCheckout}
          >
            <Text style={styles.checkoutText}>Proceed To Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

      <ModalComponent
        isVisible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Login Needed"
      >
        <Text style={styles.modalMessage}>
          To place your order, please log in to your account.
        </Text>

        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setShowLoginModal(false)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              setShowLoginModal(false);
              navigation.navigate(screenNames.LoginScreen);
            }}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ModalComponent>
    </SafeAreaView>
  );
};

export default MyBucketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: rh(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: rw(4),
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: {
    fontSize: rf(2.5),
    fontWeight: "bold",
  },
  clearAll: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearAllText: {
    color: "gray",
    fontSize: Responsive.font(3.5),
    marginLeft: Responsive.widthPx(2),
    width: Responsive.widthPx(15),
  },
  scrollViewContent: {
    paddingHorizontal: rw(4),
    paddingBottom: rh(20),
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: rh(1.5),
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: rh(1.5),
  },
  overlayWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Responsive.widthPx(18),
    height: Responsive.heightPx(9),
    borderRadius: rw(2),
    marginRight: Responsive.widthPx(4),
    resizeMode: "contain",
  },
  iconWrapper: {
    height: Responsive.heightPx(6),
    width: Responsive.widthPx(12),
    position: "absolute",
    zIndex: 99,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    position: "absolute",
    right: Responsive.widthPx(4),
  },
  iconStyle: {
    position: "absolute",
    alignSelf: "center",
    fontSize: Responsive.font(5.5),
    color: Colors.blackColor,
    right: Responsive.widthPx(5),
    backgroundColor: Colors.whiteColor,
    borderRadius: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: rf(2),
    fontWeight: "600",
  },
  itemQty: {
    fontSize: rf(1.8),
    color: "#555",
    marginVertical: rh(0.5),
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    width: rw(7),
    height: rh(4),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 4,
  },
  qtyIcon: {
    fontSize: rf(2),
  },
  qtyText: {
    marginHorizontal: rw(2),
    fontSize: rf(2),
  },
  price: {
    fontSize: rf(2),
    fontWeight: "bold",
  },
  footer: {
    padding: rw(4),
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  subtotal: {
    fontSize: rf(2),
    fontWeight: "bold",
  },
  subtotalAmount: {
    color: Colors.primaryButtonColor,
  },
  note: {
    fontSize: rf(1.6),
    color: "#777",
    marginTop: rh(1),
  },
  checkoutBtn: {
    marginTop: rh(2),
    backgroundColor: Colors.primaryButtonColor,
    paddingVertical: rh(1.5),
    borderRadius: rw(2),
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: rf(2.2),
    fontWeight: "bold",
  },

  modalMessage: {
    fontSize: Responsive.font(4),
    fontFamily: "SemiBold",
    textAlign: "left",
    marginBottom: Responsive.heightPx(4),
    color: Colors.blackColor,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: Colors.errorColor,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelText: {
    color: Colors.whiteColor,
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
  },
  loginBtn: {
    flex: 1,
    backgroundColor: Colors.primaryButtonColor,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
    color: Colors.whiteColor,
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
  },

  emptyCartImageStyle: {
    height: Responsive.heightPx(25),
    width: Responsive.widthPx(50),
    alignSelf: "center",
    resizeMode: "contain",
  },
  emptyCartWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  cartEmptyText: {
    width: "100%",
    textAlign: "center",
    fontSize: Responsive.font(6),
    fontFamily: "SemiBold",
  },
  cartEmptySubtitle: {
    fontFamily: "Regular",
    fontSize: Responsive.font(3.5),
  },
});
