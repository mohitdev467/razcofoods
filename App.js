import { SafeAreaView, StyleSheet, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { Colors } from "./helpers/theme/colors.js";
import useFonts from "./helpers/Hooks/useFonts.jsx";
import MainRoutes from "./Router/MainRoutes.jsx";
import { CartProvider } from "./helpers/Hooks/useCart.jsx";
import { WishlistProvider } from "./helpers/Hooks/useWishlist.jsx";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.textColor,
    accent: Colors.whiteColor,
    background: Colors.whiteColor,
    text: Colors.textColor,
  },
};

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {
    LoadFonts().then(() => SetIsReady(true));
  }, []);

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }
  return (
    <CartProvider>
      <WishlistProvider>
        <PaperProvider theme={customTheme}>
          <StatusBar
            translucent={false}
            backgroundColor={Colors.primaryButtonColor}
            barStyle="dark-content"
          />
          <SafeAreaView style={styles.container}>
            <MainRoutes />
            <FlashMessage position="top" />
          </SafeAreaView>
        </PaperProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
