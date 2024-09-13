import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationApp, NavigationUtils } from "@navigate";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DeviceEventEmitter, StatusBar } from "react-native";
import { DEVICE, EEventEmitter } from "@constants";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "queryClient";
import '@themes/unistyles/unistyle';
import { createStyleSheet } from "react-native-unistyles";
import { scaler } from "@themes";
import { ToastsGlobal } from "@component";
import {persistQueryClient} from '@tanstack/react-query-persist-client';
import { createMMKVPersister } from "@utils";
import { useEffect } from "react";
import { GlobalService, GlobalUI } from "@component/GlobalUI";
import { useTokenUserStore } from "@stores";

persistQueryClient({
  queryClient,
  persister: createMMKVPersister(),
  //   maxAge: 1000 * 60 * 60 * 12, // 12 hours
});

const App = () => {
  const {clearToken} = useTokenUserStore();

  useEffect(() => {
    const onUnauthorized = async () => {
      clearToken()
      GlobalService.hideLoading();
      console.log('abc');
    };
    DeviceEventEmitter.addListener(EEventEmitter.UNAUTHORIZED, onUnauthorized);

    return () => {
      DeviceEventEmitter.removeAllListeners(EEventEmitter.UNAUTHORIZED);
    };
  }, []);
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
          <ToastsGlobal />
          <GlobalUI ref={GlobalService.globalUIRef} />
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