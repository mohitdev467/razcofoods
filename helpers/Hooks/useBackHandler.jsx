import { useCallback, useState } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const useBackHandler = (exitOnBack) => {
  const navigation = useNavigation();
  const [exitPressedOnce, setExitPressedOnce] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (exitOnBack) {
          if (exitPressedOnce) {
            BackHandler.exitApp();
          } else {
            ToastAndroid.show("Press BACK again to exit", ToastAndroid.SHORT);
            setExitPressedOnce(true);
            setTimeout(() => setExitPressedOnce(false), 2000);
          }
          return true;
        } else {
          navigation.goBack();
          return true;
        }
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove(); // ✅ Correct cleanup
    }, [exitPressedOnce, exitOnBack, navigation])
  );
};

export default useBackHandler;
