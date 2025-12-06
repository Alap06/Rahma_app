import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated as RNAnimated,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, SPACING, RADIUS } from '../utils/constants';
import { mockProducts, mockCategories } from '../data/mockProducts';
import ProductCard from '../components/product/ProductCard';
import AnimatedButton from '../components/common/AnimatedButton';
import FloatingActionButton from '../components/animations/FloatingActionButton';
import useStore from '../store/useStore';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cart } = useStore();
  const scrollY = useRef(new RNAnimated.Value(0)).current;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.category === selectedCategory)
    : mockProducts.slice(0, 10);

  const trendingProducts = mockProducts.filter((p) => p.isTrending);

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Logo & Icons */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.logo}>FitPulse</Text>
          <Text style={styles.tagline}>Store</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileIcon}
        >
          <FontAwesome name="user-circle" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Shop')}
        style={styles.searchBar}
      >
        <FontAwesome name="search" size={16} color={COLORS.gray} />
        <Text style={styles.searchPlaceholder}>Rechercher...</Text>
      </TouchableOpacity>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <FlatList
          data={mockCategories}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item.name)}
              style={[
                styles.categoryItem,
                selectedCategory === item.name && styles.categoryItemActive,
              ]}
            >
              <FontAwesome
                name={item.icon}
                size={20}
                color={selectedCategory === item.name ? '#FFFFFF' : COLORS.primary}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.name && styles.categoryTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ gap: SPACING.md, paddingVertical: SPACING.md }}
        />
      </View>

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Découvrez les Meilleures Offres</Text>
          <Text style={styles.heroSubtitle}>Jusqu'à -40% sur les produits sélectionnés</Text>
          <AnimatedButton
            label="Explorer"
            onPress={() => navigation.navigate('Shop')}
            variant="secondary"
            size="sm"
            style={{ marginTop: SPACING.md }}
          />
        </View>
        <Text style={styles.heroEmoji}>🎉</Text>
      </View>

      {/* Trending Section */}
      <View style={styles.trendingSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tendances</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.seeAll}>Tout voir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <AnimatedButton
        label="Voir tous les produits"
        onPress={() => navigation.navigate('Shop')}
        variant="outline"
        fullWidth
      />
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={selectedCategory ? filteredProducts : trendingProducts}
        renderItem={({ item }) => (
          <View style={styles.productRow}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
            {trendingProducts.indexOf(item) % 2 === 0 && (
              <ProductCard
                product={trendingProducts[(trendingProducts.indexOf(item) + 1) % trendingProducts.length]}
                onPress={() =>
                  navigation.navigate(
                    'ProductDetail',
                    { product: trendingProducts[(trendingProducts.indexOf(item) + 1) % trendingProducts.length] }
                  )
                }
              />
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        scrollEventThrottle={16}
        onScroll={RNAnimated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SPACING.xl * 2 }}
      />

      {/* Floating Cart Button */}
      <FloatingActionButton
        icon={<FontAwesome name="shopping-cart" size={24} color="#FFFFFF" />}
        badgeCount={cartCount}
        onPress={() => navigation.navigate('Cart')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  tagline: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  profileIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 44,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  searchPlaceholder: {
    color: COLORS.gray,
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  categoriesSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.md,
    fontFamily: 'Poppins',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  categoryItemActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  heroBanner: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: SPACING.sm,
    fontFamily: 'Poppins',
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Poppins',
  },
  heroEmoji: {
    fontSize: 48,
  },
  trendingSection: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  productRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  columnWrapper: {
    paddingHorizontal: SPACING.lg,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
});

export default HomeScreen;
