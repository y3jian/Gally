import React from 'react';
import { View, Image, ImageBackground, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemedStyles } from './styles/theme';

export default function Welcome() {
  const router = useRouter();
  const styles = useThemedStyles();

  return (
    <View style={styles.welcomeContainer}>
      <ImageBackground
        source={require('../assets/images/green_background.png')} // local image
        style={styles.backgroundImage}
        resizeMode="cover" // or 'contain', depending on your image
      >
        {/* Anything inside here is on top of the background */}
        
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/images/mascot_stars.png')}
          style={styles.welcomeImage}
          resizeMode="contain"
        />

      

      {/* Custom themed button */}
      <Pressable
        style={styles.buttonContainer}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/sign-up')}>
        <Text style={styles.signUpText}>
          Don&apos;t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </Pressable>
      </ImageBackground>

    </View>
  );
}
