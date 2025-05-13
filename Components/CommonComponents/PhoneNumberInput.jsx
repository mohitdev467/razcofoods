import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";

const PhoneNumberInput = ({
  onChangePhone,
  label,
  labelStyle,
  error,
  errorMessage,
  defaultValue = "",
  defaultCode = "IN",
}) => {
  const phoneInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState(defaultValue);
  const [formattedValue, setFormattedValue] = useState(defaultValue);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <PhoneInput
        ref={phoneInputRef}
        defaultValue={phoneNumber}
        value={phoneNumber}
        defaultCode={defaultCode}
        layout="second"
        onChangeText={(text) => {
          setPhoneNumber(text);
          onChangePhone(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInputStyle}
        codeTextStyle={styles.codeTextStyle}
        
      />
      {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: Responsive.heightPx(2),
    marginTop: Responsive.heightPx(1),
  },
  label: {
    fontSize: Responsive.font(3.5),
    color: Colors.blackColor,
    fontFamily: "SemiBold",
    marginBottom: Responsive.heightPx(0.5),
  },
  phoneContainer: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: Colors.blackColor,
    backgroundColor: Colors.whiteColor,
    fontFamily: "SemiBold",
  },
  textInputStyle: {
    backgroundColor: Colors.whiteColor,
    fontFamily: "SemiBold",
  },
  codeTextStyle: {
    backgroundColor: Colors.whiteColor,
    fontFamily: "SemiBold",
  },
  textContainer: {
    borderRadius: 8,
    paddingVertical: 0,
    backgroundColor: Colors.whiteColor,
    fontFamily: "Regular",
    height: Responsive.heightPx(6.5),
  },
  errorText: {
    color: "red",
    marginTop: Responsive.heightPx(1),
    fontSize: Responsive.font(3),
  },
});

export default PhoneNumberInput;
