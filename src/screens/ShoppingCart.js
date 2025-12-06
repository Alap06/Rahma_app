// ShoppingCart.js - TP6, TP7
// Panier avec FlatList + Totaux + Checkout button
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  selectCartItems,
  selectSubtotal,
  selectDeliveryFee,
  selectTotal,
} from '../store/cartSlice';
import CartListItem from '../components/CartListItem';

export default function ShoppingCart() {
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryFee);
  const total = useSelector(selectTotal);

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Votre panier est vide</Text>
        <Text style={styles.emptySubtext}>
          Commencez vos achats maintenant !
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Liste des articles */}
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem item={item} />}
        keyExtractor={(item) => `${item.product.id}-${item.size}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* TP6 - Section des totaux */}
      <View style={styles.totalsContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Sous-total:</Text>
          <Text style={styles.totalValue}>{subtotal.toFixed(2)} DH</Text>
        </View>
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Livraison:</Text>
          <Text style={styles.totalValue}>{deliveryFee.toFixed(2)} DH</Text>
        </View>
        
        <View style={[styles.totalRow, styles.totalRowFinal]}>
          <Text style={styles.totalLabelFinal}>Total:</Text>
          <Text style={styles.totalValueFinal}>{total.toFixed(2)} DH</Text>
        </View>
      </View>

      {/* Bouton Checkout - position absolute (TP6) */}
      <Pressable
        style={({ pressed }) => [
          styles.checkoutButton,
          pressed && styles.checkoutButtonPressed,
        ]}
        onPress={() => alert('Fonctionnalité Checkout à venir !')}
      >
        <Text style={styles.checkoutText}>Commander ({total.toFixed(2)} DH)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#64748B',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 250, // Espace pour les totaux + bouton
  },
  totalsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalRowFinal: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 16,
    color: '#64748B',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  totalLabelFinal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  totalValueFinal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066FF',
  },
  checkoutButton: {
    position: 'absolute', // TP6 - Position absolute
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#00D4AA',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  checkoutButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
