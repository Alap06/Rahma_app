import React from 'react';
import { Animated, StyleSheet } from 'react-native';

const ParallaxScrollView = ({
  scrollY,
  children,
  parallaxHeight = 300,
}) => {
  const parallaxTranslate = scrollY.interpolate({
    inputRange: [0, parallaxHeight],
    outputRange: [0, parallaxHeight * 0.5],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.parallaxContainer,
        {
          transform: [{ translateY: parallaxTranslate }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  parallaxContainer: {
    overflow: 'hidden',
  },
});

export default ParallaxScrollView;
