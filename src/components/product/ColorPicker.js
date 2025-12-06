import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { COLORS, SPACING, RADIUS } from '../utils/constants';

const ColorPicker = ({
  colors = [],
  selectedColor,
  onSelectColor,
  style,
}) => {
  const scaleValues = colors.reduce((acc, color) => {
    acc[color] = useSharedValue(selectedColor === color ? 1.1 : 1);
    return acc;
  }, {});

  const handleColorSelect = (color) => {
    colors.forEach((c) => {
      scaleValues[c].value = withSpring(c === color ? 1.1 : 1, {
        damping: 10,
        mass: 1,
        overshootClamping: true,
      });
    });
    onSelectColor(color);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>Couleur</Text>
      <View style={styles.colorGrid}>
        {colors.map((color) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scaleValues[color].value }],
          }));

          return (
            <Animated.View
              key={color}
              style={[
                styles.colorItemWrapper,
                animatedStyle,
              ]}
            >
              <TouchableOpacity
                onPress={() => handleColorSelect(color)}
                style={[
                  styles.colorItem,
                  {
                    backgroundColor: color,
                    borderColor: selectedColor === color ? COLORS.dark : 'transparent',
                    borderWidth: selectedColor === color ? 3 : 0,
                  },
                ]}
              />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const SizeSelector = ({
  sizes = [],
  selectedSize,
  onSelectSize,
  style,
}) => {
  const scaleValues = sizes.reduce((acc, size) => {
    acc[size] = useSharedValue(selectedSize === size ? 1 : 1);
    return acc;
  }, {});

  const handleSizeSelect = (size) => {
    sizes.forEach((s) => {
      scaleValues[s].value = withSpring(s === size ? 1.05 : 1, {
        damping: 10,
        mass: 1,
        overshootClamping: true,
      });
    });
    onSelectSize(size);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>Taille</Text>
      <View style={styles.sizeGrid}>
        {sizes.map((size) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scaleValues[size].value }],
          }));

          return (
            <Animated.View
              key={size}
              style={[
                styles.sizeItemWrapper,
                animatedStyle,
              ]}
            >
              <TouchableOpacity
                onPress={() => handleSizeSelect(size)}
                style={[
                  styles.sizeItem,
                  {
                    backgroundColor: selectedSize === size ? COLORS.primary : COLORS.light,
                    borderColor: selectedSize === size ? COLORS.primary : COLORS.lightGray,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    {
                      color: selectedSize === size ? '#FFFFFF' : COLORS.dark,
                    },
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.md,
    fontFamily: 'Poppins',
  },
  colorGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    flexWrap: 'wrap',
  },
  colorItemWrapper: {
    width: '18%',
  },
  colorItem: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: RADIUS.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sizeGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    flexWrap: 'wrap',
  },
  sizeItemWrapper: {
    width: '22%',
  },
  sizeItem: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});

export { ColorPicker, SizeSelector };
