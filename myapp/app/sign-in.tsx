import { View, TextInput, Button } from 'react-native';
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
    <View style={styles.container}>
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
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleLogin} />
      </View>
    </View>
  );
}
