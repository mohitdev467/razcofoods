import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
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
import { useRoute } from "@react-navigation/native";
import { handleCreateContact } from "../../services/UserServices/UserServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import useUserContact from "../../helpers/Hooks/useUserContact";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById";

const allSteps = [
  { title: "Curbside Pickup" },
  { title: "Contact Number" },
  { title: "Payment Option" },
  { title: "Curbside Pickup Instructions (optional)" },
  { title: "Redeem Points" },
];

function CheckoutScreen() {
  const route = useRoute();
  const { cartData } = route.params || {};
  const { loginData } = useAuthStorage();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentType, setPaymentType] = useState("pickup");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedMobileNumber, setSelectedMobileNumber] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Lindsay");
  const initialContact = { title: "", number: "", countryCode: "+1" };
  const [contacts, setContacts] = useState([initialContact]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useUserDetailsById(loginData?._id);



  const userPoints = user?.data?.points?.available || 0;
  const [redeemDiscount, setRedeemDiscount] = useState(0);
  const [redeemed, setRedeemed] = useState(false);


  const { contact: contactsData, fetchContact } = useUserContact(loginData?._id);


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
      setSelectedMobileNumber(contactsData.data.phone[0]);
    }
  }, [contactsData]);

  const steps = allSteps.filter(
    (step) => !(step.title === "Redeem Points" && userPoints <= 0)
  );

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
});

export default CheckoutScreen;
