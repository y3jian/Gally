import React, { useEffect, useState, useRef } from 'react';
import { Image, StyleSheet, View, Animated } from 'react-native';
import { Asset } from 'expo-asset';

// Preload local images into an array
const frames = [
  require('../assets/animations/green/1.0.png'),
  require('../assets/animations/green/1.1.png'),
  require('../assets/animations/green/1.2.png'),
  require('../assets/animations/green/1.3.png'),
  require('../assets/animations/green/1.4.png'),
  require('../assets/animations/green/1.5.png'),
  require('../assets/animations/green/1.6.png'),
  require('../assets/animations/green/1.7.png'), 
  require('../assets/animations/green/2.0.png'),
  require('../assets/animations/green/2.1.png'),
  require('../assets/animations/green/2.2.png'),
  require('../assets/animations/green/2.3.png'),
  require('../assets/animations/green/2.4.png'),
  require('../assets/animations/green/2.5.png'),
  require('../assets/animations/green/2.6.png'),
  require('../assets/animations/green/2.7.png'), 
  require('../assets/animations/green/3.0.png'),
  require('../assets/animations/green/3.1.png'),
  require('../assets/animations/green/3.2.png'),
  require('../assets/animations/green/3.3.png'),
  require('../assets/animations/green/3.4.png'),
  require('../assets/animations/green/3.5.png'),
  require('../assets/animations/green/3.6.png'),
  require('../assets/animations/green/3.7.png'), 
  require('../assets/animations/green/4.0.png'),
  require('../assets/animations/green/4.1.png'),
  require('../assets/animations/green/4.2.png'),
  require('../assets/animations/green/4.3.png'),
  require('../assets/animations/green/4.4.png'),
  require('../assets/animations/green/4.5.png'),
  require('../assets/animations/green/4.6.png'),
  require('../assets/animations/green/4.7.png'),
];


async function preloadImages() {
  await Promise.all(frames.map(frame => Asset.fromModule(frame).downloadAsync()));
  console.log('All frames loaded!');
}

preloadImages();

type Props = {
  stage: number; // 0 = start, 1 = halfway condition, 2 = complete
};

export default function GreenAnimation({ stage }: Props) {

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (stage === 1) {
      // animate from 0 → 4
        let i = 0;
      interval = setInterval(() => {
        setCurrentFrame(i);
        if (i === 15) {
          clearInterval(interval!);
        } else {
          i++;
        }
      }, 80); // frame speed (ms)
    } else if (stage === 2) {
      // animate from 4 → 8
      let i = 13;
      interval = setInterval(() => {
        setCurrentFrame(i);
        if (i === 31) {
          clearInterval(interval!);
        } else {
          i++;
        }
      }, 80);
    } else {
      // Default: show frame 0
      setCurrentFrame(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stage]);

  return (
    <View style={styles.container}>
      <Image
        source={frames[currentFrame]}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  image: {
    width: 300,
    height: 200,
  },
});
