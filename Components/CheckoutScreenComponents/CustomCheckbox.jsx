import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomCheckbox = ({ checked, onToggle, size = 24, color = "#6200EE" }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <Ionicons
        name={checked ? "checkbox" : "square-outline"}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomCheckbox;
