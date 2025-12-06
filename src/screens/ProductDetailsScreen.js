// ProductDetailsScreen.js - TP5, TP6
// Images scrollables + Add to cart + useWindowDimensions
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;
  const product = useSelector(selectProductById(productId));
  const dispatch = useDispatch();

  // TP5 - useWindowDimensions pour responsive
  const { width } = useWindowDimensions();

  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produit non trouvé</Text>
      </View>
    );
  }

  // TP6 - Fonction Add to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Taille requise', 'Veuillez sélectionner une taille');
      return;
    }

    dispatch(addToCart({ product, size: selectedSize }));
    Alert.alert('Succès', 'Produit ajouté au panier', [
      {
        text: 'Voir le panier',
        onPress: () => navigation.navigate('Cart'),
      },
      { text: 'Continuer', style: 'cancel' },
    ]);
  };

  // Rendu d'une image dans la galerie
  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={[styles.image, { width }]} />
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TP5 - FlatList horizontal pour images scrollables */}
        <FlatList
          data={product.images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled // TP5 - Effet de pagination
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.details}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price} DH</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Sélecteur de taille */}
          <Text style={styles.sectionTitle}>Taille</Text>
          <View style={styles.sizesContainer}>
            {product.sizes.map((size) => (
              <Pressable
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.sizeButtonSelected,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.sizeTextSelected,
                  ]}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bouton Add to Cart fixé en bas */}
      <Pressable
        style={({ pressed }) => [
          styles.addToCartButton,
          pressed && styles.addToCartButtonPressed,
        ]}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartText}>Ajouter au Panier</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    height: 400,
    resizeMode: 'cover',
  },
  details: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066FF',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 24,
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  sizeButtonSelected: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  sizeText: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  sizeTextSelected: {
    color: '#FFFFFF',
  },
  addToCartButton: {
    margin: 20,
    backgroundColor: '#00D4AA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    // Chapitre 5 - Flexbox
    justifyContent: 'center',
  },
  addToCartButtonPressed: {
    opacity: 0.8,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
