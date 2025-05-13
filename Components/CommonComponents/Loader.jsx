import React, { useEffect, useRef } from "react";
import { View, Modal, Animated } from "react-native";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";

const Loader = ({ visible }) => {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    if (visible) {
      animateDot(dot1, 0);
      setTimeout(() => animateDot(dot2, 150), 150);
      setTimeout(() => animateDot(dot3, 300), 300);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: Responsive.heightPx(3),
      }}
    >
      <Animated.View
        style={{
          width: Responsive.widthPx(2.8),
          height: Responsive.heightPx(1.4),
          borderRadius: 6,
          backgroundColor: Colors.primaryButtonColor,
          marginHorizontal: Responsive.widthPx(3),
          transform: [{ scale: dot1 }],
        }}
      />
      <Animated.View
        style={{
          width: Responsive.widthPx(2.8),
          height: Responsive.heightPx(1.4),
          borderRadius: 6,
          backgroundColor: Colors.primaryButtonColor,
          marginHorizontal: Responsive.widthPx(3),
          transform: [{ scale: dot2 }],
        }}
      />
      <Animated.View
        style={{
          width: Responsive.widthPx(2.8),
          height: Responsive.heightPx(1.4),
          borderRadius: 6,
          backgroundColor: Colors.primaryButtonColor,
          marginHorizontal: Responsive.widthPx(3),
          transform: [{ scale: dot3 }],
        }}
      />
    </View>
  );
};

export default Loader;
