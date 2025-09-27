import { View, Button, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useThemedStyles } from './styles/theme'; // import our shared styles


export default function SignUp() {
  const router = useRouter();
  const styles = useThemedStyles(); // get themed styles
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister() {
    // TODO: create account
    router.replace('/home'); // go to main app
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
      <TextInput
        placeholder="Repeat Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="gray"
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleRegister} />
    </View>
  );
}
