import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { COLORS, SPACING, RADIUS } from '../utils/constants';

const LoadingShimmer = ({ width = '100%', height = 100, borderRadius = RADIUS.md }) => {
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.shimmer,
        {
          width,
          height,
          borderRadius,
        },
        animatedStyle,
      ]}
    />
  );
};

const ShimmerLoader = ({ rows = 3, width = '100%', height = 80 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: rows }).map((_, index) => (
        <LoadingShimmer key={index} width={width} height={height} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
  },
  shimmer: {
    backgroundColor: COLORS.lightGray,
  },
});

export default LoadingShimmer;
export { ShimmerLoader };
