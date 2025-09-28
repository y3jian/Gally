import { Text, Image, View, TextInput, Pressable, ImageBackground, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useThemedStyles } from './styles/theme'; // import our shared styles

export default function SignIn() {
  const router = useRouter();
  const styles = useThemedStyles(); // get themed styles
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    router.replace('/home');
  }

  return (
    <View style={styles.welcomeContainer}>
      <ImageBackground
        source={require('../assets/images/signinout_background.png')} // local image
        style={styles.backgroundImage}
        resizeMode="cover" // or 'contain', depending on your image
      >
        
      <Text style={styles.title}>Login</Text>
      
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
        style={styles.loginInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="gray"
        style={styles.loginInput}
      />

      <Pressable
        style={styles.buttonContainer}
        onPress={() => router.push('/home')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      </ImageBackground>
    </View>
  );
}
