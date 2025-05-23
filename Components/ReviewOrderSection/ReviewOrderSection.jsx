import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import {
  getBestPromoCode,
  handleCreateOrder,
} from "../../services/OrderServices/OrderServices";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames";
import { useCart } from "../../helpers/Hooks/useCart";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";

const ReviewOrderSection = ({
  cartData,
  selectedDate,
  selectedTimeSlot,
  selectedLocation,
  selectedMobileNumber,
  redeemDiscount,
  userPoints,

}) => {
  const [promoCode, setPromoCode] = useState("");
  const { loginData } = useAuthStorage();
  const [loading, setLoading] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const naviagtion = useNavigation();
  const { clearCart } = useCart();

  const handleApplyPromoCode = async () => {
    if (!promoCode) return;

    setLoading(true);
    try {
      const data = await getBestPromoCode(promoCode);
      if (data.status === 200) {
        setCouponDiscount(data?.data?.couponDiscount);
        setSuccessMessage("Promo code applied successfully!");
      } else {
        errorHandler(data?.message);
      }
    } catch (error) {
      console.log("Error applying promo code", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();

  const discountAmount = (subtotal * couponDiscount) / 100;
  const total = subtotal - discountAmount - (redeemDiscount || 0);

  const handlePlaceOrder = async () => {
    if (!selectedMobileNumber || !selectedDate || !selectedTimeSlot) {
      console.warn("Missing required checkout details.");
      errorHandler(" Please fill all required fields.");
      return;
    }

    try {
      setIsOrdering(true);

      const payload = {
        couponId: null,
        discount: discountAmount,
        id: loginData?._id,
        items:
          cartData?.map((item) => ({
            _id: item.id,
            productName: item.description,
            productImage: item.productImage,
            quantity: item.quantity,
            price: item.price,
          })) || [],
        selectedOrderDetails: {
          contact: selectedMobileNumber?.number || "",
          deliveryAddress: "default",
          instructions: "",
          payment: "Payment On Pickup",
          schedule: {
            deliveryDate: selectedDate,
            deliveryTime: selectedTimeSlot,
            shopLocation: selectedLocation,
          },
        },
        subTotal: subtotal,
        total: total,
        redeemDiscount :redeemDiscount,
        userPoints :userPoints,

      };

      const result = await handleCreateOrder(payload);

      if (result?.status === 200 || result?.success) {
        successHandler(result?.message || "Order placed successfully");
        clearCart();
        naviagtion.navigate(screenNames.OrderSuccessScreen, {
          orderedData: result?.data,
          cartData: cartData,
          redeemDiscount :redeemDiscount,
          userPoints :userPoints,
        });
      } else {
        errorHandler(result?.message || "Something went wrong");
      }
    } catch (error) {
      errorHandler("Something went wrong. Please try again later.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Product List */}
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productRow}>
            <Image
              source={
                typeof item?.imageUrl === "string"
                  ? { uri: `${item.imageUrl}` }
                  : item.imageUrl || ImagePicker.PlaceholderImage
              }
              style={styles.image}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.description}</Text>
              <Text style={styles.quantity}>X {item.quantity}</Text>
            </View>
            <Text style={styles.price}>
              {" "}
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
            
          </View>
        )}
      />

      <View style={styles.promoContainer}>
        <TextInput
          placeholder="Promo code"
          style={styles.promoInput}
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApplyPromoCode}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.applyText}>Apply</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Success Message */}
      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : null}

      {/* Order Summary */}
      <View style={styles.summaryRow}>
        <Text style={styles.totalSubtotal}>Sub Total</Text>
        <Text style={[styles.totalSubtotal, { width: Responsive.widthPx(10) }]}>
          ${subtotal?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.totalSubtotal}>Shipping</Text>
        <Text style={[styles.totalSubtotal, { width: Responsive.widthPx(10) }]}>
          $0
        </Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.totalSubtotal}>Discount</Text>
        <Text style={[styles.totalSubtotal, { width: Responsive.widthPx(10) }]}>
          ${discountAmount?.toFixed(2)}
        </Text>
      </View>
      {redeemDiscount > 0 && (
  <View style={styles.summaryRow}>
  <Text style={styles.totalSubtotal}>Redemption</Text>
  <Text style={[styles.totalSubtotal, { width: Responsive.widthPx(10) }]}>
  ${redeemDiscount?.toFixed(2)}
  </Text>
</View>
)}
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalLabel}>${total?.toFixed(2)}</Text>
      </View>
     

      {/* Order Button */}
      <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
        {isOrdering ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.orderButtonText}>Order Now</Text>
        )}
      </TouchableOpacity>

      {/* Terms */}
      <Text style={styles.terms}>
        By placing your order, you agree to be bound by the Razco Foods{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy</Text>. Your credit/debit card data
        will not be saved.
      </Text>
      <Text style={styles.note}>
        A bag fee may be added to your final total if required by law or the
        retailer. The fee will be visible on your receipt after delivery.
      </Text>
    </View>
  );
};

export default ReviewOrderSection;

const styles = StyleSheet.create({
  container: {
    padding: rw(4),
    backgroundColor: "#fff",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: rh(1.5),
  },
  image: {
    width: rw(15),
    height: rw(15),
    resizeMode: "contain",
    marginRight: rw(3),
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: rf(1.8),
    fontWeight: "600",
  },
  quantity: {
    fontSize: rf(1.6),
    color: "gray",
  },
  price: {
    fontSize: rf(1.8),
    fontWeight: "600",
  },
  promoContainer: {
    flexDirection: "row",
    marginVertical: rh(2),
    alignItems: "center",
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: rh(1.2),
    borderRadius: 8,
  },
  applyButton: {
    backgroundColor: Colors.primaryButtonColor,
    paddingVertical: rh(1.2),
    paddingHorizontal: rw(5),
    borderRadius: 8,
    marginLeft: rw(2),
  },
  applyText: {
    color: "#fff",
    fontWeight: "600",
  },
  successMessage: {
    color: "green",
    marginTop: rh(1),
    fontSize: rf(1.8),
    fontWeight: "600",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: rh(0.8),
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: rf(2),
  },
  orderButton: {
    backgroundColor:Colors.primaryButtonColor,
    padding: rh(1.5),
    alignItems: "center",
    borderRadius: 8,
    marginTop: rh(2),
  },
  orderButtonText: {
    fontSize: rf(2),
    color: "#fff",
    fontWeight: "bold",
  },
  terms: {
    fontSize: rf(1.5),
    marginTop: rh(2),
    color: "#555",
  },
  link: {
    color: "#00ADEF",
    textDecorationLine: "underline",
  },
  note: {
    fontSize: rf(1.5),
    marginTop: rh(1),
    color: "#555",
  },
  totalSubtotal: {
    width: Responsive.widthPx(25),
  },
});
