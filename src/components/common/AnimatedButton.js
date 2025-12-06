import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'expo-linear-gradient';
import { COLORS, RADIUS, SPACING } from '../utils/constants';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedButton = ({
  label,
  onPress,
  variant = 'primary', // primary, secondary, outline, danger
  size = 'md', // sm, md, lg
  loading = false,
  disabled = false,
  icon = null,
  fullWidth = false,
  style,
  ...props
}) => {
  const scale = useSharedValue(1);

  const getVariantStyles = () => {
    const variants = {
      primary: {
        colors: [COLORS.primary, '#0052CC'],
        textColor: '#FFFFFF',
      },
      secondary: {
        colors: [COLORS.secondary, '#00A691'],
        textColor: '#FFFFFF',
      },
      outline: {
        colors: ['transparent', 'transparent'],
        textColor: COLORS.primary,
        borderColor: COLORS.primary,
        borderWidth: 2,
      },
      danger: {
        colors: ['#FF4444', '#CC0000'],
        textColor: '#FFFFFF',
      },
    };
    return variants[variant] || variants.primary;
  };

  const getSizeStyles = () => {
    const sizes = {
      sm: {
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        fontSize: 12,
        height: 32,
      },
      md: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        fontSize: 14,
        height: 48,
      },
      lg: {
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xl,
        fontSize: 16,
        height: 56,
      },
    };
    return sizes[size] || sizes.md;
  };

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, {
      damping: 10,
      mass: 1,
      overshootClamping: true,
    });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, {
      damping: 10,
      mass: 1,
      overshootClamping: true,
    });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Animated.View
      style={[
        {
          width: fullWidth ? '100%' : 'auto',
        },
        animatedStyle,
      ]}
    >
      <AnimatedTouchable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={loading || disabled}
        activeOpacity={0.9}
        {...props}
      >
        <LinearGradient
          colors={variantStyles.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.button,
            {
              ...sizeStyles,
              borderRadius: RADIUS.md,
              borderColor: variantStyles.borderColor,
              borderWidth: variantStyles.borderWidth || 0,
              width: fullWidth ? '100%' : 'auto',
            },
            disabled && { opacity: 0.5 },
            style,
          ]}
        >
          {loading ? (
            <ActivityIndicator color={variantStyles.textColor} size="small" />
          ) : (
            <>
              {icon && <>{icon}</>}
              <Text
                style={[
                  styles.text,
                  {
                    color: variantStyles.textColor,
                    fontSize: sizeStyles.fontSize,
                    fontWeight: '600',
                  },
                ]}
              >
                {label}
              </Text>
            </>
          )}
        </LinearGradient>
      </AnimatedTouchable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  text: {
    fontFamily: 'Poppins',
  },
});

export default AnimatedButton;
