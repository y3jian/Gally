import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Auth flow */}
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
        <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />

        {/* Main app */}
        <Stack.Screen name="home" options={{ headerShown: false }} />
        

        {/* Modals */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
