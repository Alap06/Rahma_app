import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import { COLORS, RADIUS, SPACING } from '../utils/constants';

const GradientCard = ({
  children,
  gradient = ['#0066FF', '#00D4AA'],
  style,
  padding = SPACING.lg,
  borderRadius = RADIUS.lg,
  ...props
}) => {
  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        {
          padding,
          borderRadius,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default GradientCard;
