import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { useThemedStyles } from '../app/styles/theme';

type Props = {
  image: ImageSourcePropType;
  name: string;
  phase: string;
  cravings: string;
  mood: string;
  status: string;
  barColor?: string; // <-- customizable top bar
};

export default function CycleCard({
  image,
  name,
  phase,
  cravings,
  mood,
  status,
  barColor,
}: Props) {
  const styles = useThemedStyles();

  return (
    <View style={styles.card}>
      {/* Top Bar */}
      <View style={[styles.topBar, barColor ? { backgroundColor: barColor } : {}]} />

      {/* Content Row */}
      <View style={styles.content}>
        {/* Left Image */}
        <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} resizeMode="contain" />
            <Text style={styles.label}> {name} </Text>
        </View>

        {/* Right Text */}
        <View style={styles.textContainer}>
          <Text style={styles.label}>
            PHASE: <Text style={styles.value}>{phase}</Text>
          </Text>
          <Text style={styles.label}>
            CRAVINGS: <Text style={styles.value}>{cravings}</Text>
          </Text>
          <Text style={styles.label}>
            MOOD: <Text style={styles.value}>{mood}</Text>
          </Text>
          <Text style={styles.label}>
            STATUS: <Text style={styles.value}>{status}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}