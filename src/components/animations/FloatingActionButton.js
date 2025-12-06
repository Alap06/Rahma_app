import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS, SPACING } from '../utils/constants';

const FloatingActionButton = ({
  icon,
  onPress,
  badgeCount = 0,
  position = 'bottom-right',
}) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const getPositionStyle = () => {
    const positions = {
      'bottom-right': { bottom: SPACING.lg, right: SPACING.lg },
      'bottom-left': { bottom: SPACING.lg, left: SPACING.lg },
      'top-right': { top: SPACING.lg, right: SPACING.lg },
      'top-left': { top: SPACING.lg, left: SPACING.lg },
    };
    return positions[position] || positions['bottom-right'];
  };

  return (
    <Animated.View
      style={[
        styles.container,
        getPositionStyle(),
        animatedStyle,
      ]}
    >
      <Animated.View
        style={[styles.button]}
        onTouchStart={() => {
          scale.value = withTiming(0.9, { duration: 100 });
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1, { duration: 100 });
          onPress?.();
        }}
      >
        {icon}
        {badgeCount > 0 && (
          <View style={styles.badge}>
            <Animated.Text style={styles.badgeText}>
              {badgeCount > 99 ? '99+' : badgeCount}
            </Animated.Text>
          </View>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
});

export default FloatingActionButton;
