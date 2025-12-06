import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '../utils/constants';

const { width } = Dimensions.get('window');

// Confetti particle component
const Particle = ({ delay = 0, duration = 1000 }) => {
  const x = Math.random() * width;
  const y = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      y.value = withTiming(800, { duration });
      opacity.value = withTiming(0, { duration: duration * 0.8 });
      rotation.value = withTiming(360 * Math.random(), { duration });
    }, delay);
  }, [delay, duration, y, opacity, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: y.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const colors = [COLORS.primary, COLORS.secondary, COLORS.accent, '#10B981'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: x,
          backgroundColor: randomColor,
        },
        animatedStyle,
      ]}
    />
  );
};

const ConfettiAnimation = ({ particleCount = 50, duration = 2000, isActive = true }) => {
  if (!isActive) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: particleCount }).map((_, index) => (
        <Particle
          key={index}
          delay={index * 20}
          duration={duration}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: -10,
  },
});

export default ConfettiAnimation;
