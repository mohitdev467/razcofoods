import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const createImageFormData = async (imageAsset) => {
  const uri = imageAsset.uri;
  const fileInfo = await FileSystem.getInfoAsync(uri);

  if (!fileInfo.exists) {
    Alert.alert("File not found", "Could not find selected image.");
    return null;
  }

  const fileName = uri.split("/").pop();
  const match = /\.(\w+)$/.exec(fileName || "");
  const type = match ? `image/${match[1]}` : `image`;

  return {
    uri,
    name: fileName,
    type,
  };
};

export const pickImageFromGallery = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.status !== "granted") {
    Alert.alert("Permission required", "Permission to access gallery is required!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.7,
  });

  if (!result.canceled) {
    return await createImageFormData(result.assets[0]);
  }
  return null;
};

export const takePhotoWithCamera = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.status !== "granted") {
    Alert.alert("Permission required", "Permission to access camera is required!");
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.7,
  });

  if (!result.canceled) {
    return await createImageFormData(result.assets[0]);
  }
  return null;
};
