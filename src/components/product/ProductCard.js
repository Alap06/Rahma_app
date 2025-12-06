import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, SPACING, RADIUS } from '../utils/constants';
import { calculateDiscount, formatPrice, formatRating } from '../utils/formatters';
import useStore from '../store/useStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 2 - SPACING.md) / 2;

const ProductCard = ({
  product,
  onPress,
  style,
  isHorizontal = false,
}) => {
  const scale = useSharedValue(1);
  const { isFavorite, toggleFavorite } = useStore();
  const favorited = isFavorite(product.id);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, { damping: 10, mass: 1, overshootClamping: true });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 10, mass: 1, overshootClamping: true });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const discount = calculateDiscount(product.originalPrice, product.price);

  return (
    <Animated.View
      style={[
        {
          width: isHorizontal ? width * 0.7 : CARD_WIDTH,
          marginRight: isHorizontal ? SPACING.md : 0,
        },
        animatedStyle,
        style,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.container}
      >
        {/* Badge Section */}
        <View style={styles.badgeContainer}>
          {product.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.badgeText}>Nouveau</Text>
            </View>
          )}
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.badgeText}>-{discount}%</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteBadge}
            onPress={() => toggleFavorite(product)}
          >
            <FontAwesome
              name={favorited ? 'heart' : 'heart-o'}
              size={18}
              color={favorited ? '#FF4444' : COLORS.dark}
            />
          </TouchableOpacity>
        </View>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Text style={styles.emoji}>{product.images[0]}</Text>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FontAwesome
                  key={i}
                  name="star"
                  size={12}
                  color={i < Math.floor(product.rating) ? COLORS.warning : COLORS.lightGray}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {formatRating(product.rating)}
            </Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </Text>
            )}
          </View>

          {/* Stock Status */}
          <Text
            style={[
              styles.stockText,
              { color: product.inStock ? COLORS.success : '#FF4444' },
            ]}
          >
            {product.inStock ? 'En stock' : 'Rupture'}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  badgeContainer: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  newBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  discountBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
  favoriteBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  imageContainer: {
    height: 150,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.sm,
    fontFamily: 'Poppins',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 11,
    color: COLORS.gray,
    fontFamily: 'Poppins',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    fontFamily: 'Poppins',
  },
  stockText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});

export default ProductCard;
