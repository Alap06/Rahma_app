import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, SPACING, RADIUS } from '../utils/constants';
import { mockProducts, mockCategories } from '../data/mockProducts';
import ProductCard from '../components/product/ProductCard';

const { width } = Dimensions.get('window');

const ShopScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('trending'); // trending, price-low, price-high, rating

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'trending':
      default:
        return b.isTrending ? 1 : -1;
    }
  });

  const renderFilterButton = (label, value) => (
    <TouchableOpacity
      onPress={() => setSortBy(value)}
      style={[
        styles.filterButton,
        sortBy === value && styles.filterButtonActive,
      ]}
    >
      <Text
        style={[
          styles.filterText,
          sortBy === value && styles.filterTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.title}>Boutique</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color={COLORS.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un produit..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <FontAwesome name="times" size={16} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories Filter */}
      <FlatList
        data={mockCategories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(selectedCategory === item.name ? null : item.name)}
            style={[
              styles.categoryTag,
              selectedCategory === item.name && styles.categoryTagActive,
            ]}
          >
            <Text
              style={[
                styles.categoryTagText,
                selectedCategory === item.name && styles.categoryTagTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        scrollEnabled={false}
        style={styles.categoriesContainer}
        contentContainerStyle={{ gap: SPACING.sm }}
      />

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Trier par:</Text>
        <View style={styles.sortButtons}>
          {renderFilterButton('Tendances', 'trending')}
          {renderFilterButton('Prix ↑', 'price-low')}
          {renderFilterButton('Prix ↓', 'price-high')}
          {renderFilterButton('Avis', 'rating')}
        </View>
      </View>

      {/* Products Grid */}
      <FlatList
        data={sortedProducts}
        renderItem={({ item, index }) => (
          <View key={item.id} style={styles.productContainer}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={true}
        contentContainerStyle={styles.productsContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome name="search" size={48} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>Aucun produit trouvé</Text>
          </View>
        }
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
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light,
    borderRadius: RADIUS.md,
    marginHorizontal: SPACING.lg,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    height: 44,
    gap: SPACING.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  categoryTag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryTagActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  categoryTagTextActive: {
    color: '#FFFFFF',
  },
  sortContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: SPACING.sm,
    fontFamily: 'Poppins',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  columnWrapper: {
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  productsContent: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  productContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: SPACING.md,
    fontFamily: 'Poppins',
  },
});

export default ShopScreen;
