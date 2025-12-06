// ProductsScreen.js - TP4, TP8
// FlatList avec 2 colonnes + useSelector (TP9) + Favoris
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { selectAllProducts } from '../store/productsSlice';
import { selectIsFavorite, toggleFavorite } from '../store/cartSlice';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 45) / 2; // Calcul pour 2 colonnes avec marges

export default function ProductsScreen({ navigation }) {
  // TP9 - useSelector pour récupérer les produits
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  const ProductCard = ({ item }) => {
    const isFavorite = useSelector(selectIsFavorite(item.id));

    return (
      <Pressable
        style={({ pressed }) => [
          styles.productCard,
          pressed && styles.productCardPressed,
        ]}
        onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        
        {/* Badge couleur */}
        <View style={[styles.colorBadge, { backgroundColor: item.color }]} />
        
        {/* Bouton Favori */}
        <Pressable
          style={styles.favoriteButton}
          onPress={() => dispatch(toggleFavorite(item.id))}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#FF1493' : '#FFFFFF'}
          />
        </Pressable>

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>{item.price} DH</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2} // TP4 - 2 colonnes
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContainer: {
    padding: 15,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  productImage: {
    width: '100%',
    height: ITEM_WIDTH,
    backgroundColor: '#E5E7EB',
  },
  colorBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
});
