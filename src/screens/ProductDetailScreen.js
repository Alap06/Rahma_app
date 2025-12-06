import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, SPACING, RADIUS } from '../utils/constants';
import { formatPrice, calculateDiscount, formatRating } from '../utils/formatters';
import { ColorPicker, SizeSelector } from '../components/product/ColorPicker';
import AnimatedButton from '../components/common/AnimatedButton';
import useStore from '../store/useStore';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { product } = route.params;
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const favorited = isFavorite(product.id);

  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = async () => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product, quantity, selectedColor, selectedSize);
      setLoading(false);
      navigation.navigate('Cart');
    }, 500);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const reviewScore = Math.floor(product.rating);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="chevron-left" size={20} color={COLORS.dark} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavorite(product)}
          style={styles.favoriteButton}
        >
          <FontAwesome
            name={favorited ? 'heart' : 'heart-o'}
            size={20}
            color={favorited ? '#FF4444' : COLORS.dark}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.mainImage}>
            <Text style={styles.emoji}>{product.images[0]}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FontAwesome
                  key={i}
                  name="star"
                  size={14}
                  color={i < reviewScore ? COLORS.warning : COLORS.lightGray}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {formatRating(product.rating)} ({product.reviews} avis)
            </Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </Text>
            )}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Caractéristiques</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <FontAwesome name="check-circle" size={14} color={COLORS.success} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Color Picker */}
          {product.colors.length > 0 && (
            <ColorPicker
              colors={product.colors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          )}

          {/* Size Selector */}
          {product.sizes.length > 0 && (
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
          )}

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantité</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                onPress={() => handleQuantityChange(quantity - 1)}
                style={styles.quantityButton}
              >
                <FontAwesome name="minus" size={16} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange(quantity + 1)}
                style={styles.quantityButton}
              >
                <FontAwesome name="plus" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stock Status */}
          <View style={styles.stockStatus}>
            <FontAwesome
              name="info-circle"
              size={14}
              color={product.inStock ? COLORS.success : '#FF4444'}
            />
            <Text
              style={[
                styles.stockText,
                { color: product.inStock ? COLORS.success : '#FF4444' },
              ]}
            >
              {product.inStock ? 'En stock - Livraison rapide' : 'Rupture de stock'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <AnimatedButton
          label="Ajouter au panier"
          onPress={handleAddToCart}
          loading={loading}
          variant="primary"
          size="lg"
          fullWidth
          icon={<FontAwesome name="shopping-cart" size={18} color="#FFFFFF" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 150,
  },
  imageSection: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 120,
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  discountText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: SPACING.md,
    fontFamily: 'Poppins',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'Poppins',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  originalPrice: {
    fontSize: 16,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    fontFamily: 'Poppins',
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.md,
    fontFamily: 'Poppins',
  },
  description: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 20,
    fontFamily: 'Poppins',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },
  featureText: {
    fontSize: 13,
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  quantitySection: {
    marginBottom: SPACING.lg,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
    minWidth: 40,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  stockStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.md,
  },
  stockText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
});

export default ProductDetailScreen;
