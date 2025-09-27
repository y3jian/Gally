import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Button title="Sign In" onPress={() => router.push('/sign-in')} />
      <Button title="Sign Up" onPress={() => router.push('/sign-up')} />
    </View>
  );
}
