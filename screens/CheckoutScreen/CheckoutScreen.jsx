import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { handleCreateContact } from "../../services/UserServices/UserServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { extractCountryCode } from "../../Utilities/CommonUtils/CommonUtils";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import useUserContact from "../../helpers/Hooks/useUserContact";
import { SafeAreaView } from "react-native-safe-area-context";

const steps = [
  { title: "Curbside Pickup" },
  { title: "Contact Number" },
  { title: "Payment Option" },
  { title: "Curbside Pickup Instructions (optional)" },
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
  const {
    contact: contactsData,

    fetchContact,
  } = useUserContact(loginData?._id);


  const toggleStep = (index) => {
    setActiveStep((prev) => (prev === index ? null : index));
  };

  const updateContact = async (index, key, value) => {
    try {
      const updated = [...contacts];
      updated[index][key] = value;
      setContacts(updated);
    } catch (err) {
      console.error("Error saving contact to AsyncStorage:", err);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleTimeChange = (time) => {
    setSelectedTimeSlot(time);
  };

  const handleSelectContact = (item) => {
    setSelectedMobileNumber(item);
  };

  const resetContacts = () => {
    setContacts([initialContact]);
  };

  const handleSave = async () => {
    for (const contact of contacts) {
      const payload = {
        title: contact?.title,
        number: contact?.number?.replace(contact?.countryCode, ""),
        countryCode: contact?.countryCode,
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
    onSave();
  };

  const handleClose = () => {
    resetContacts();
    setShowModal(false);
  };

  useEffect(() => {
    if (contactsData?.data?.phone?.length > 0) {
      setSelectedMobileNumber(contactsData?.data?.phone[0]);
    }
  }, [contactsData?.data?.phone]);

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
          {steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <TouchableOpacity
                style={styles.stepHeader}
                onPress={() => toggleStep(index)}
              >
                <View style={styles.circle}>
                  <Text style={styles.circleText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </TouchableOpacity>

              {activeStep === index && (
                <View style={styles.stepContent}>
                  {index === 0 && (
                    <PickupOptions
                      onDateChange={handleDateChange}
                      onTimeChange={handleTimeChange}
                      handleLocationChange={handleLocationChange}
                      selectedLocation={selectedLocation}
                    />
                  )}

                  {index === 1 && (
                    <View>
                      {contactsData?.data &&
                        contactsData?.data?.phone?.map((item, index) => {
                          const isSelected = selectedMobileNumber === item;
                          return (
                            <TouchableOpacity
                              key={index}
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
                              >{`Name :- ${item.title}`}</Text>
                              <Text
                                style={[
                                  styles.textStyle,
                                  { color: isSelected && Colors.whiteColor },
                                ]}
                              >{`Mobile Number :- ${item.number.replace(
                                item.countryCode,
                                ""
                              )}`}</Text>
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

                  {index === 2 && (
                    <View>
                      <View
                        style={{ flexDirection: "row", marginBottom: rh(2) }}
                      >
                        <TouchableOpacity
                          onPress={() => setPaymentType("pickup")}
                          style={{ marginRight: rw(5) }}
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
                    </View>
                  )}

                  {index === 3 && (
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
                </View>
              )}
            </View>
          ))}
          <ReviewOrderSection
            cartData={cartData}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            selectedMobileNumber={selectedMobileNumber}
            selectedLocation={selectedLocation}
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: rw(2),
    padding: rw(3),
    fontSize: rf(2),
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
  pickupContainer: {
    gap: rh(2),
  },
  gridRow: {
    flexDirection: "row",
    gap: rw(4),
    marginBottom: rh(1),
  },
  optionBox: {
    paddingVertical: rh(2),
    paddingHorizontal: rw(5),
    backgroundColor: "#f1f1f1",
    borderRadius: rw(2),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  optionBoxSelected: {
    backgroundColor: "#00b894",
  },
  optionText: {
    fontSize: rf(2),
    fontWeight: "bold",
    color: "#333",
  },
  selectedText: {
    color: "#fff",
  },
  optionSub: {
    fontSize: rf(1.6),
    color: "#444",
  },
  timeHeading: {
    fontSize: rf(2.2),
    fontWeight: "600",
    marginVertical: rh(2),
  },
  timeSlots: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: rw(4),
  },
  timeSlot: {
    padding: rw(3),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: rw(2),
    fontSize: rf(2),
    color: "#444",
  },
  activeTime: {
    borderColor: "#00b894",
    backgroundColor: "#e0f7f1",
    fontWeight: "bold",
  },
  payNow: {
    marginTop: rh(2),
    paddingVertical: rh(1.5),
    borderRadius: rw(2),
    backgroundColor: "#00b894",
    alignItems: "center",
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
