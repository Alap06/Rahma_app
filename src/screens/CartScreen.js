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
import { formatPrice, calculateTotal } from '../utils/formatters';
import SwipeableItem from '../components/common/SwipeableItem';
import AnimatedButton from '../components/common/AnimatedButton';
import TextInputField from '../components/common/TextInputField';
import useStore from '../store/useStore';

const { width } = Dimensions.get('window');

const CartScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { cart, removeFromCart, updateCartQuantity, appliedPromo, applyPromo, removePromo } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = calculateTotal(cart);
  const discountAmount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const total = subtotal - discountAmount;
  const shipping = cart.length > 0 ? 9.99 : 0;
  const finalTotal = total + shipping;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError('Veuillez entrer un code');
      return;
    }
    applyPromo(promoCode);
    if (appliedPromo?.code === promoCode) {
      setPromoCode('');
      setPromoError('');
    } else {
      setPromoError('Code invalide');
    }
  };

  const renderCartItem = ({ item }) => (
    <SwipeableItem
      item={item}
      onDelete={() => removeFromCart(item.cartItemId)}
      backgroundColor={COLORS.dark}
    >
      <View style={styles.cartItem}>
        <View style={styles.itemImage}>
          <Text style={styles.emoji}>{item.images[0]}</Text>
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.itemMeta}>
            <View style={styles.colorSizeContainer}>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: item.selectedColor },
                ]}
              />
              <Text style={styles.metaText}>Taille: {item.selectedSize}</Text>
            </View>
            <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
          </View>
        </View>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() =>
              updateCartQuantity(
                item.cartItemId,
                Math.max(1, item.quantity - 1)
              )
            }
            style={styles.qtyButton}
          >
            <FontAwesome name="minus" size={12} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              updateCartQuantity(item.cartItemId, item.quantity + 1)
            }
            style={styles.qtyButton}
          >
            <FontAwesome name="plus" size={12} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </SwipeableItem>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyTitle}>Panier vide</Text>
      <Text style={styles.emptyText}>Ajoutez des produits pour commencer</Text>
      <AnimatedButton
        label="Continuer mes achats"
        onPress={() => navigation.navigate('Shop')}
        variant="primary"
        size="lg"
        style={{ marginTop: SPACING.lg }}
      />
    </View>
  );

  const renderPromoSection = () => (
    <View style={styles.promoSection}>
      <Text style={styles.promoTitle}>Code promo</Text>
      <View style={styles.promoInputContainer}>
        <TextInput
          style={styles.promoInput}
          placeholder="Entrez votre code"
          placeholderTextColor={COLORS.gray}
          value={promoCode}
          onChangeText={(text) => {
            setPromoCode(text);
            setPromoError('');
          }}
        />
        <TouchableOpacity
          onPress={handleApplyPromo}
          style={styles.applyButton}
        >
          <FontAwesome name="arrow-right" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      {promoError && <Text style={styles.errorText}>{promoError}</Text>}
      {appliedPromo && (
        <View style={styles.appliedPromo}>
          <FontAwesome name="check-circle" size={14} color={COLORS.success} />
          <Text style={styles.appliedPromoText}>
            Code {appliedPromo.code} appliqué!
          </Text>
          <TouchableOpacity onPress={removePromo}>
            <FontAwesome name="times" size={14} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Sous-total</Text>
        <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
      </View>
      {appliedPromo && (
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: COLORS.success }]}>
            Réduction ({Math.round(appliedPromo.discount * 100)}%)
          </Text>
          <Text style={[styles.summaryValue, { color: COLORS.success }]}>
            -{formatPrice(discountAmount)}
          </Text>
        </View>
      )}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Livraison</Text>
        <Text style={styles.summaryValue}>{formatPrice(shipping)}</Text>
      </View>
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatPrice(finalTotal)}</Text>
      </View>
    </View>
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
        <Text style={styles.title}>Panier</Text>
        <View style={{ width: 40 }} />
      </View>

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.cartItemId}
            scrollEnabled={true}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={
              <View>
                {renderPromoSection()}
                {renderSummary()}
              </View>
            }
            showsVerticalScrollIndicator={false}
          />

          {/* Checkout Button */}
          <View style={styles.footer}>
            <AnimatedButton
              label={`Procéder au paiement (${formatPrice(finalTotal)})`}
              onPress={() => navigation.navigate('Checkout', { total: finalTotal })}
              variant="primary"
              size="lg"
              fullWidth
            />
          </View>
        </>
      ) : (
        renderEmptyCart()
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
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
  listContent: {
    padding: SPACING.lg,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.light,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.sm,
    fontFamily: 'Poppins',
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  metaText: {
    fontSize: 11,
    color: COLORS.gray,
    fontFamily: 'Poppins',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.dark,
    minWidth: 24,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.sm,
    fontFamily: 'Poppins',
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    fontFamily: 'Poppins',
  },
  promoSection: {
    backgroundColor: COLORS.light,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  promoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.md,
    fontFamily: 'Poppins',
  },
  promoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 40,
    fontSize: 13,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    fontFamily: 'Poppins',
  },
  applyButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 11,
    marginTop: SPACING.sm,
    fontFamily: 'Poppins',
  },
  appliedPromo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginTop: SPACING.sm,
    gap: SPACING.md,
  },
  appliedPromoText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  summaryContainer: {
    backgroundColor: COLORS.light,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'Poppins',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTopMargin: SPACING.sm,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
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

export default CartScreen;
