import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Feather from "react-native-vector-icons/Feather";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";

const FileUploader = ({ label, onFileSelected }) => {
  const [fileName, setFileName] = useState(null);

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      if (result.canceled) return;

      setFileName(result.assets[0].name);
      if (onFileSelected) onFileSelected(result.assets[0]);
    } catch (err) {
      console.error("Error selecting file:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileSelect}>
        <Feather name="upload" style={styles.icon} />
        <Text style={styles.buttonText}>Upload document</Text>
      </TouchableOpacity>
      {fileName && <Text style={styles.fileName}>{fileName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Responsive.heightPx(3),
    marginHorizontal: Responsive.widthPx(2),
  },
  label: {
    fontSize: Responsive.font(3.5),
    fontWeight: "SemiBold",
    marginBottom: Responsive.heightPx(0),
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.primaryButtonColor,
    borderStyle: "dashed",
    justifyContent: "center",
    height: Responsive.heightPx(7),
    width: "60%",
  },
  buttonText: {
    color: Colors.secondaryBlackColor,
    fontFamily: "Regular",
    fontSize: Responsive.font(3.7),
    marginLeft: Responsive.widthPx(1),
  },
  fileName: {
    marginTop: 5,
    fontSize: Responsive.font(3.5),
    color: Colors.blackColor,
  },
  icon: {
    fontSize: Responsive.font(4),
    marginRight: Responsive.widthPx(1.5),
    color: Colors.primaryButtonColor,
  },
});

export default FileUploader;
