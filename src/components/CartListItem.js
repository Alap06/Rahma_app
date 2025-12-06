// CartListItem.js - TP6
// Composant pour chaque article du panier avec boutons +/-
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/cartSlice';

export default function CartListItem({ item }) {
  const dispatch = useDispatch();
  const { product, size, quantity } = item;

  const handleIncrement = () => {
    dispatch(incrementQuantity({ productId: product.id, size }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(decrementQuantity({ productId: product.id, size }));
    } else {
      dispatch(removeFromCart({ productId: product.id, size }));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.size}>Taille: {size}</Text>
        <Text style={styles.price}>{product.price} DH</Text>
      </View>

      <View style={styles.quantityContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.quantityButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleDecrement}
        >
          <Ionicons name="remove" size={20} color="#FFFFFF" />
        </Pressable>
        
        <Text style={styles.quantity}>{quantity}</Text>
        
        <Pressable
          style={({ pressed }) => [
            styles.quantityButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleIncrement}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Chapitre 5 - Flexbox
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  size: {
    fontSize: 13,
    color: '#64748B',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066FF',
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityButton: {
    backgroundColor: '#0066FF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
});
