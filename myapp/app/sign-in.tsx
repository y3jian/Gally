import { View, Button, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    // TODO: validate login here
    router.replace('/home'); // replace so user can't go back to login
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20, borderWidth: 1, padding: 8 }}
      />
      <Button title="Sign In" onPress={handleLogin} />
    </View>
  );
}
