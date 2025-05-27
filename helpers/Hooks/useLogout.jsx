// hooks/useLogout.js
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import screenNames from "../../helpers/ScreenNames/screenNames.js";

const useLogout = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@loginData");
      navigation.reset({
        index: 0,
        routes: [{ name: screenNames.LoginScreen }],
      });
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return logout;
};

export default useLogout;
