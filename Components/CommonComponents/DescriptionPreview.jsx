import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const DescriptionPreview = ({ description }) => {
  const [showFull, setShowFull] = useState(false);

  const words = description?.trim().split(/\s+/) || [];
  const isLong = words.length > 50;
  const preview = words.slice(0, 50).join(" ");

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {showFull || !isLong ? description : `${preview}...`}
      </Text>

      {isLong && (
        <TouchableOpacity onPress={() => setShowFull(!showFull)}>
          <Text style={styles.toggleText}>
            {showFull ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  toggleText: {
    color: "#007BFF",
    marginTop: 5,
    fontWeight: "500",
  },
});

export default DescriptionPreview;
