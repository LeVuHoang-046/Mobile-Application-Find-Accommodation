import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationApp, NavigationUtils } from "@navigate";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { DEVICE } from "@constants";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "queryClient";
import '@themes/unistyles/unistyle';
import { createStyleSheet } from "react-native-unistyles";
import { scaler } from "@themes";



const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar barStyle={DEVICE.isAndroid ? 'default' : 'dark-content'} />
        <BottomSheetModalProvider>
          <NavigationApp
            ref={(navigatorRef: any) => {
              NavigationUtils.setTopLevelNavigator(navigatorRef);
            }}
          />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    </QueryClientProvider>
  )
};

export default App;

const styles = createStyleSheet({
  container: {
    flex: 1,
  },
  messageNotification: {
    marginTop: DEVICE.isAndroid ? scaler(30) : 0,
  },
});