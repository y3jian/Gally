import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import React from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load Manrope fonts
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  // Don't render app until fonts are loaded
  if (!fontsLoaded) return null; // or <AppLoading /> if you want a splash screen

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Auth flow */}
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: '' }} />
        <Stack.Screen name="sign-up" options={{ title: '' }} />

        {/* Main app */}
        <Stack.Screen name="home" options={{ headerShown: false }} />

        {/* Modals */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
