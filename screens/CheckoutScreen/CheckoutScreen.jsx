import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import ReviewOrderSection from "../../Components/ReviewOrderSection/ReviewOrderSection";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import PickupOptions from "../../Components/CheckoutScreenComponents/PickupOptions";
import ContactModal from "../../Components/CheckoutScreenComponents/ContactModal";
import { Colors } from "../../helpers/theme/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { handleCreateContact } from "../../services/UserServices/UserServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import useUserContact from "../../helpers/Hooks/useUserContact";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById";
import { ActivityIndicator, Button } from "react-native-paper";
import { CardField, useConfirmPayment, initStripe } from '@stripe/stripe-react-native';
import { handleCreatePaymentIntent } from "../../services/PaymentServices/PaymentServices";
import { getBestPromoCode, handleCreateOrder } from "../../services/OrderServices/OrderServices";
import screenNames from "../../helpers/ScreenNames/screenNames";
import { useCart } from "../../helpers/Hooks/useCart";



const allSteps = [
  { title: "Curbside Pickup" },
  { title: "Contact Number" },
  { title: "Payment Option" },
  { title: "Curbside Pickup Instructions (optional)" },
  { title: "Redeem Points" },
];

const initializeStripe = async () => {
  const apiUrl = process.env.EXPO_PUBLIC_STRIPE_KEY;
  try {
    await initStripe({
      publishableKey: apiUrl,
      merchantIdentifier: 'merchant.com.yourapp', 
    });
  } catch (error) {
    console.error('Stripe initialization error:', error);
  }
};

function CheckoutScreen() {
  const route = useRoute();
  const { cartData } = route.params || {};
  const navigation = useNavigation()
  const { loginData } = useAuthStorage();
  const { user } = useUserDetailsById(loginData?._id);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentType, setPaymentType] = useState("pickup");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedMobileNumber, setSelectedMobileNumber] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Lindsay");
  const initialContact = { title: "", number: "", countryCode: "+1" };
  const [contacts, setContacts] = useState([initialContact]);
  const [showModal, setShowModal] = useState(false);
  const { confirmPayment } = useConfirmPayment();
  const [loading, setLoading] = useState(false)
  const [cardDetails, setCardDetails] = useState({});
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [loadingApplying, setLoadingApplying] = useState(false)
  const [isCardPaymentProcessing, setIsCardPaymentProcessing] = useState(false);
  const userPoints = user?.data?.points?.available || 0;
  const [redeemDiscount, setRedeemDiscount] = useState(0);
  const [redeemed, setRedeemed] = useState(false);
  const { clearCart } = useCart();

  const { contact: contactsData, fetchContact } = useUserContact(loginData?._id);


  useEffect(() => {
    initializeStripe();
  }, []);


  const toggleStep = (index) => {
    setActiveStep((prev) => (prev === index ? null : index));
  };

  const updateContact = async (index, key, value) => {
    const updated = [...contacts];
    updated[index][key] = value;
    setContacts(updated);
  };

  const handleDateChange = (date) => setSelectedDate(date);
  const handleLocationChange = (location) => setSelectedLocation(location);
  const handleTimeChange = (time) => setSelectedTimeSlot(time);
  const handleSelectContact = (item) => setSelectedMobileNumber(item);
  const resetContacts = () => setContacts([initialContact]);

  const handleApplyPromoCode = async () => {
    if (!promoCode) return;
    setLoadingApplying(true);
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
      setLoadingApplying(false);
    }
  };

  const handleSave = async () => {
    for (const contact of contacts) {
      const payload = {
        title: contact.title,
        number: contact.number.replace(contact.countryCode, ""),
        countryCode: contact.countryCode,
      };

      const result = await handleCreateContact(loginData?._id, payload);
      if (result?.status === 200) {
        successHandler("Contact added successfully");
        setShowModal(false);
        fetchContact();
      } else {
        errorHandler(result?.message);
        setShowModal(false);
      }
    }
    resetContacts();
  };

  const handleClose = () => {
    resetContacts();
    setShowModal(false);
  };

  useEffect(() => {
    if (contactsData?.data?.phone?.length > 0) {
      setSelectedMobileNumber(contactsData?.data?.phone[0]);
    }
  }, [contactsData]);

 

  // Calculation section
  const calculateSubtotal = () => {
    return cartData?.reduce(
      (total, item) => total + item?.price * item?.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();

  const discountAmount = (subtotal * couponDiscount) / 100;
  const total = subtotal - discountAmount - (redeemDiscount || 0);


  const steps = allSteps?.filter(
    (step) =>
      !(
        step.title === "Redeem Points" &&
        (userPoints <= 0 || user?.data?.redeemableUSD >= total)
      )
  );

  const handleCardPayment = async () => {
    if (!selectedMobileNumber || !selectedDate || !selectedTimeSlot) {
      errorHandler(" Please fill all required fields.");
      return;
    }

    try {
      setIsCardPaymentProcessing(true);
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
          payment: "card",
          schedule: {
            deliveryDate: selectedDate,
            deliveryTime: selectedTimeSlot,
            shopLocation: selectedLocation,
          },
        },
        subTotal: subtotal,
        total: total,
        redeemDiscount: redeemDiscount,
        userPoints: userPoints,
      };
      const result = await handleCreateOrder(payload);
      if (result?.status === 200) {
        successHandler(result?.message || "Order placed successfully");
        clearCart();
        navigation.navigate(screenNames.OrderSuccessScreen, {
          orderedData: result?.data,
          cartData: cartData,
          redeemDiscount: redeemDiscount,
          userPoints: userPoints,
        });
      } else {
        errorHandler(result?.message || "Something went wrong");
      }
    } catch (error) {
      errorHandler("Something went wrong. Please try again later.");
    } finally {
      setIsCardPaymentProcessing(false);
    }

  }

  const handlePayPress = async () => {
    if (paymentType === 'pickup') {
      Alert.alert('Success', 'Payment on pickup selected. Proceed with order.');
      return;
    }

    setLoading(true);
    try {

      const payload = {
        price: total,
      };
      const response = await handleCreatePaymentIntent(payload);
      const clientSecret = response?.data?.client_secret;
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: 'customer@example.com',
          },
        },
      });

      console.log("errorrrrr", error)
      if (error) {
        errorHandler(error.message);
      } else if (paymentIntent.status === "Succeeded") {
        handleCardPayment()
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: Responsive.widthPx(4),
      }}
    >
      <HeaderWithBack title="Checkout" />

      <ScrollView contentContainerStyle={styles.container}>
        {steps.map((step, displayIndex) => {
          const actualIndex = allSteps.findIndex((s) => s.title === step.title);

          return (
            <View key={displayIndex} style={styles.stepContainer}>
              <TouchableOpacity
                style={styles.stepHeader}
                onPress={() => toggleStep(actualIndex)}
              >
                <View style={styles.circle}>
                  <Text style={styles.circleText}>{actualIndex + 1}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </TouchableOpacity>

              {activeStep === actualIndex && (
                <View style={styles.stepContent}>
                  {actualIndex === 0 && (
                    <PickupOptions
                      onDateChange={handleDateChange}
                      onTimeChange={handleTimeChange}
                      handleLocationChange={handleLocationChange}
                      selectedLocation={selectedLocation}
                    />
                  )}
                  {actualIndex === 1 && (
                    <View>
                      {contactsData?.data && contactsData?.data?.phone?.map((item, i) => {
                        const isSelected = selectedMobileNumber === item;
                        return (
                          <TouchableOpacity
                            key={i}
                            style={[
                              styles.savedItemWrapper,
                              isSelected && styles.selectedWrapper,
                            ]}
                            onPress={() => handleSelectContact(item)}
                          >
                            <Text
                              style={[
                                styles.textStyle,
                                { color: isSelected && Colors.whiteColor },
                              ]}
                            >
                              {`Name :- ${item.title}`}
                            </Text>
                            <Text
                              style={[
                                styles.textStyle,
                                { color: isSelected && Colors.whiteColor },
                              ]}
                            >
                              {`Mobile Number :- ${item.number.replace(
                                item.countryCode,
                                ""
                              )}`}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                      <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Text style={{ color: "#00b894", fontSize: rf(2) }}>
                          View / Edit Contacts
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {actualIndex === 2 && (
                    <View>
                      <TouchableOpacity
                        onPress={() => setPaymentType("pickup")}
                        style={{ marginBottom: rh(2) }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            color:
                              paymentType === "pickup" ? "#00b894" : "#333",
                          }}
                        >
                          {paymentType !== "pickup"
                            ? "⭘ Payment On Pickup"
                            : "⦿ Payment On Pickup"}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setPaymentType('card')}
                        style={{ marginBottom: rh(2) }}
                      >
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: paymentType === 'card' ? '#00b894' : '#333',
                          }}
                        >
                          {paymentType !== 'card' ? '⭘ Card Payment' : '⦿ Card Payment'}
                        </Text>
                      </TouchableOpacity>


                      {paymentType === 'card' && (
                        <CardField
                          postalCodeEnabled={false}
                          placeholders={{ number: '4242 4242 4242 4242' }}
                          cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                            borderWidth: 1,
                            borderColor: Colors.primaryButtonColor,
                            borderRadius: 10,
                          }}
                          style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 30,
                          }}
                          onCardChange={(details) => setCardDetails(details)}

                        />
                      )}


                      <TouchableOpacity onPress={handlePayPress} style={styles.payCardButton}>
                        {
                          isCardPaymentProcessing ?
                            <ActivityIndicator size="small" color="#fff" />

                            :
                            <Text style={styles.payWithCardText}>{paymentType === 'pickup' ? 'Confirm Pickup' : 'Pay Now'}</Text>
                        }
                      </TouchableOpacity>
                    </View>

                  )}


                  {actualIndex === 3 && (
                    <View>
                      <Text style={styles.noteLabel}>
                        Curbside Pickup Instructions Note
                      </Text>
                      <TextInput
                        style={styles.textArea}
                        placeholder="Write your instructions here..."
                        multiline
                      />
                    </View>
                  )}
                  {actualIndex === 4 && (
                    <View style={{ marginTop: Responsive.heightPx(2) }}>
                      <Text
                        style={{
                          fontSize: Responsive.font(4.2),
                          fontWeight: "bold",
                          marginBottom: Responsive.heightPx(2),
                        }}
                      >
                        {userPoints} Points = {user?.data?.redeemableUSD} USD
                      </Text>
                      <Text style={{ fontSize: Responsive.font(4) }}>
                        You have {userPoints} points available
                      </Text>
                      {!redeemed ? (
                        <TouchableOpacity
                          onPress={() => {
                            const redeemableUSD = user?.data?.redeemableUSD;
                            setRedeemDiscount(redeemableUSD);
                            setRedeemed(true);
                            successHandler(`${redeemableUSD} USD redeemed successfully`);
                          }}
                          style={{
                            marginTop: Responsive.heightPx(2),
                            backgroundColor: Colors.primaryButtonColor,
                            paddingVertical: Responsive.heightPx(1.5),
                            borderRadius: 10,
                            alignItems: "center",
                            opacity: redeemed ? 0.5 : 1,
                          }}
                          disabled={redeemed}
                        >
                          <Text
                            style={{
                              color: Colors.whiteColor,
                              fontSize: Responsive.font(4),
                              fontFamily: "Bold",
                            }}
                          >
                            Redeem Now
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View
                          style={{
                            marginTop: Responsive.heightPx(2),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "#dff0d8",
                            padding: Responsive.heightPx(1.5),
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: Responsive.font(4),
                              color: Colors.primaryTextColor,
                              fontFamily: "SemiBold",
                            }}
                          >
                            {redeemDiscount} USD Redeemed
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              setRedeemDiscount(0);
                              setRedeemed(false);
                              successHandler("Redemption cancelled");
                            }}
                          >
                            <Text
                              style={{
                                fontSize: Responsive.font(5),
                                color: Colors.errorColor || "red",
                                paddingHorizontal: 10,
                              }}
                            >
                              ✕
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}

        <ReviewOrderSection
          cartData={cartData}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          selectedMobileNumber={selectedMobileNumber}
          selectedLocation={selectedLocation}
          redeemDiscount={redeemDiscount}
          userPoints={userPoints}
          setCouponDiscount={setCouponDiscount}
          couponDiscount={couponDiscount}
          handleApplyPromoCode={handleApplyPromoCode}
          successMessage={successMessage}
          setPromoCode={setPromoCode}
          promoCode={promoCode}
          loadingApplying={loadingApplying}
        />
      </ScrollView>

      <ContactModal
        visible={showModal}
        onClose={handleClose}
        contacts={contacts}
        updateContact={updateContact}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: rw(4),
  },
  stepContainer: {
    borderWidth: 1,
    borderColor: "#eee",
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: rw(4),
    backgroundColor: "#f9f9f9",
  },
  circle: {
    width: rw(8),
    height: rw(8),
    borderRadius: rw(4),
    borderWidth: 2,
    borderColor: "#00b894",
    alignItems: "center",
    justifyContent: "center",
    marginRight: rw(3),
  },
  circleText: {
    fontSize: rf(2),
    color: "#00b894",
  },
  stepTitle: {
    fontSize: rf(2.2),
    fontWeight: "bold",
  },
  stepContent: {
    padding: rw(4),
  },
  noteLabel: {
    fontSize: rf(2),
    marginBottom: rh(1),
    color: "#555",
  },
  textArea: {
    height: rh(15),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: rw(2),
    padding: rw(3),
    fontSize: rf(2),
    textAlignVertical: "top",
  },
  savedItemWrapper: {
    borderWidth: 1,
    paddingHorizontal: Responsive.widthPx(4),
    paddingVertical: Responsive.heightPx(2),
    backgroundColor: Colors.silverColor,
    borderColor: Colors.silverColor,
    marginVertical: Responsive.heightPx(2),
    borderRadius: 15,
  },
  selectedWrapper: {
    backgroundColor: Colors.primaryButtonColor,
  },
  textStyle: {
    fontSize: Responsive.font(4),
    fontFamily: "SemiBold",
  },

  payCardButton: {
    backgroundColor: Colors.primaryButtonColor,
    paddingVertical: Responsive.heightPx(1.5),
    width: Responsive.widthPx(40),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  payWithCardText: {
    color: Colors.whiteColor,
    fontFamily: "Bold"
  }
});

export default CheckoutScreen;
