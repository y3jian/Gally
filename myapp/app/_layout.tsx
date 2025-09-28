import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import React from 'react';
import { LightTheme, DarkTheme } from './styles/nav_theme';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const scheme = useColorScheme(); // 'light' | 'dark' | null
  // const styles = useThemedStyles();

  // Load Manrope fonts
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  // Don't render app until fonts are loaded
  if (!fontsLoaded) return null; // or <AppLoading /> if you want a splash screen

  return (
    <ThemeProvider value={scheme === 'light' ? LightTheme : DarkTheme }>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Auth flow */}
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false, title: '' }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false, title: '' }} />

        {/* Main app */}
        <Stack.Screen name="home" options={{ headerShown: false }} />

        {/* Modals */}
        <Stack.Screen name="modal" options={{ headerShown: false , presentation: 'modal' }} />
      </Stack>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
