import React, { useState } from 'react';
import { View, Button } from 'react-native';
import GreenAnimation from '../../components/green_animation';

export default function ExampleScreen() {
  const [stage, setStage] = useState(0);

  return (
    <View>
      <GreenAnimation stage={stage} />

      <Button title="Reach Halfway" onPress={() => setStage(1)} />
      <Button title="Complete All" onPress={() => setStage(2)} />
    </View>
  );
}