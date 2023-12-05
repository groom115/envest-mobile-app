import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme, Linking, Platform } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsConfig from '../aws-exports';
import * as WebBrowser from "expo-web-browser";

const isLocalhost = Boolean(__DEV__);

const localRedirectURL="exp://127.0.0.1:19000";
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
  initialRouteName: 'home',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        </Stack>
      </ThemeProvider>
    </>
  );
}
