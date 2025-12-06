import { 
  withTiming, 
  withSpring, 
  withSequence,
  Easing,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { DURATION } from './constants';

// Spring Animation Presets
export const springAnimationConfig = {
  damping: 10,
  mass: 1,
  overshootClamping: false,
  restSpeedThreshold: 2,
  restDisplacementThreshold: 2,
};

// Timing Animation Presets
export const timingAnimationConfig = {
  duration: DURATION.normal,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

// Scale Animation (Button Press)
export const createScaleAnimation = (targetScale = 0.95) => {
  return withSpring(targetScale, springAnimationConfig);
};

// Slide Animation
export const createSlideAnimation = (targetValue, duration = DURATION.normal) => {
  return withTiming(targetValue, { 
    duration, 
    easing: Easing.inOut(Easing.ease) 
  });
};

// Fade Animation
export const createFadeAnimation = (targetOpacity, duration = DURATION.normal) => {
  return withTiming(targetOpacity, { 
    duration, 
    easing: Easing.inOut(Easing.ease) 
  });
};

// Pulse Animation
export const createPulseAnimation = () => {
  return withSequence(
    withTiming(1.1, { duration: DURATION.fast }),
    withTiming(1, { duration: DURATION.fast })
  );
};

// Interpolation Helper
export const interpolateValue = (
  inputRange,
  outputRange,
  value,
  extrapolateLeft = Extrapolate.CLAMP,
  extrapolateRight = Extrapolate.CLAMP
) => {
  return interpolate(
    value,
    inputRange,
    outputRange,
    extrapolateLeft,
    extrapolateRight
  );
};

// Bounce Animation
export const createBounceAnimation = () => {
  return withSequence(
    withTiming(0, { duration: DURATION.normal, easing: Easing.out(Easing.cubic) }),
    withSpring(1, springAnimationConfig)
  );
};

// Shake Animation
export const createShakeAnimation = (offset = 10) => {
  return withSequence(
    withTiming(-offset, { duration: DURATION.fast }),
    withTiming(offset, { duration: DURATION.fast }),
    withTiming(-offset * 0.5, { duration: DURATION.fast }),
    withTiming(0, { duration: DURATION.fast })
  );
};
