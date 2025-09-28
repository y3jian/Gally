import { View, Button, TextInput, ImageBackground, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useThemedStyles } from './styles/theme'; // import our shared styles


export default function SignUp() {
  const router = useRouter();
  const styles = useThemedStyles(); // get themed styles
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  function handleRegister() {
    // TODO: create account
    router.replace('/home'); // go to main app
  }

  return (
    <View style={styles.welcomeContainer}>
      <ImageBackground
              source={require('../assets/images/pink_background.png')} // local image
              style={styles.backgroundImage}
              resizeMode="cover" // or 'contain', depending on your image
      />
              
      <Text style={styles.title}>Sign Up</Text>
            
      <Image
              source={require('../assets/images/mascot_signinout.png')}
              style={styles.welcomeImage}
              resizeMode="contain"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="gray"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="gray"
        style={styles.input}
      />
      <TextInput
        placeholder="Repeat Password"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
        placeholderTextColor="gray"
        style={styles.input}
      />
      {/* <Button title="Sign Up" onPress={handleRegister} style={styles.button} /> */}
      <Pressable
      style={styles.buttonContainer}
        onPress={() => router.push('/home')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
    </View>
  );
}
