import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Icon from "react-native-vector-icons/Feather";

const ButtonComponent = ({
  onPress,
  title,
  style,
  textStyle,
  icon,
  iconPosition = "left",
  iconSize = Responsive.font(4.5),
  iconColor = Colors.whiteColor,
  children,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={1}
      disabled={disabled}
    >
      <View style={styles.content}>
        {icon && iconPosition === "left" && (
          <Icon
            name={icon}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
        {children ? (
          children
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryButtonColor,
    borderRadius: Responsive.widthPx(25),
    height: Responsive.heightPx(6.8),
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Colors.whiteColor,
    fontSize: Responsive.font(4.5),
    fontFamily: "SemiBold",
  },
  icon: {
    marginRight: Responsive.widthPx(2),
  },
});

export default ButtonComponent;
