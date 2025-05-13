import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import * as Yup from "yup";
import { ContactInfoSchema } from "../../helpers/Validations/ValidationSchema";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

// Validation schema for contacts
const ContactSchema = Yup.array().of(
  Yup.object().shape({
    title: Yup.string().required("Title is required"),
    number: Yup.string()
      .required("Mobile number is required")
      .min(7, "Mobile number must be at least 7 digits")
      .max(10, "Mobile number must be at most 10 digits")
      .matches(/^[0-9]+$/, "Mobile number must contain only digits"),
  })
);

const ContactModal = ({
  visible,
  onClose,
  contacts,
  updateContact,
  onSave,
}) => {
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    try {
      await ContactInfoSchema.validate(contacts, { abortEarly: false });
      setErrors({});
      onSave();
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          const match = error.path.match(/\[(\d+)\]\.(\w+)/);
          if (match) {
            const index = parseInt(match[1]);
            const field = match[2];
            if (!validationErrors[index]) {
              validationErrors[index] = {};
            }
            validationErrors[index][field] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleFieldChange = (index, field, value) => {
    updateContact(index, field, value);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[index]?.[field]) {
        delete newErrors[index][field];

        if (Object.keys(newErrors[index]).length === 0) {
          delete newErrors[index];
        }
      }
      return newErrors;
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Contact Information</Text>

          {contacts.map((item, i) => (
            <View key={i} style={{ marginBottom: rh(2) }}>
              <TextInput
                placeholder="Contact Title"
                style={[styles.input, { marginBottom: rh(1) }]}
                value={item.title}
                onChangeText={(text) => handleFieldChange(i, "title", text)}
              />
              {errors[i]?.title && (
                <Text
                  style={[
                    styles.errorText,
                    { marginBottom: Responsive.heightPx(2) },
                  ]}
                >
                  {errors[i].title}
                </Text>
              )}

              <PhoneInput
                defaultValue={item?.number?.replace(item?.countryCode, "")}
                defaultCode="IN"
                layout="first"
                onChangeFormattedText={(formattedText) =>
                  handleFieldChange(i, "number", formattedText)
                }
                onChangeCountry={(country) => {
                  const code =
                    Array.isArray(country.callingCode) &&
                    country.callingCode.length > 0
                      ? `+${country.callingCode[0]}`
                      : "";
                  updateContact(i, "countryCode", code);
                }}
                containerStyle={styles.phoneContainer}
                textContainerStyle={{ paddingVertical: rh(1.2) }}
              />
              {errors[i]?.number && (
                <Text style={styles.errorText}>{errors[i].number}</Text>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: rh(1) }} onPress={onClose}>
            <Text style={{ color: "#d63031", textAlign: "center" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: rw(4),
    padding: rw(5),
    width: "90%",
  },
  modalTitle: {
    fontSize: rf(2.5),
    fontWeight: "bold",
    marginBottom: rh(2),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: rw(2),
    padding: rw(3),
    fontSize: rf(2),
  },
  phoneContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: rw(2),
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#00b894",
    paddingVertical: rh(1.5),
    borderRadius: rw(2),
    alignItems: "center",
    marginTop: rh(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: rf(2),
  },
  errorText: {
    color: "red",
    fontSize: rf(1.6),
    marginTop: rh(0.5),
  },
});

export default ContactModal;
