import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme, Linking, Platform } from 'react-native';
import awsConfig from '../aws-exports';
import * as WebBrowser from "expo-web-browser";
import { Provider } from 'react-redux';
import store from '../global/store';
import { Amplify } from 'aws-amplify';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const isLocalhost = Boolean(__DEV__);

const localRedirectURL="exp://192.168.29.55:19000/";
const productionRedirectURL="envest://";

async function urlOpener(url: string, redirectUrl: string): Promise<void> {
  const authSessionResult = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (authSessionResult.type === "success" && (Platform.OS === "ios" || Platform.OS === "android")) {
    WebBrowser.dismissBrowser();
    return Linking.openURL(authSessionResult.url);
  }
}

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectURL : productionRedirectURL,
    redirectSignOut: isLocalhost ? localRedirectURL : productionRedirectURL,
    urlOpener
  }
}

Amplify.configure(updatedAwsConfig);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'gilroy-regular': require('../assets/fonts/Gilroy-Regular.ttf'),
    'gilroy-bold': require('../assets/fonts/Gilroy-Bold.ttf'),
    'gilroy-medium': require('../assets/fonts/Gilroy-Medium.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if(loaded){
    SplashScreen.hideAsync();
  }

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </Provider>
    </QueryClientProvider>
  );
}
