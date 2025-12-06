// Navigation - TP7, TP8
// Stack Navigator avec bouton panier dans header
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../store/cartSlice';

// Screens
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ShoppingCart from '../screens/ShoppingCart';

const Stack = createNativeStackNavigator();

// Bouton panier dans le header (TP8 étape 6-7)
function CartButton({ navigation }) {
  const cartCount = useSelector(selectCartItemsCount);

  return (
    <Pressable
      onPress={() => navigation.navigate('Cart')}
      style={({ pressed }) => [
        styles.cartButton,
        pressed && styles.cartButtonPressed,
      ]}
    >
      <Ionicons name="cart-outline" size={28} color="#0066FF" />
      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </Pressable>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F8FAFC',
          },
          headerTintColor: '#0F172A',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            title: 'RahmaStore',
            headerRight: () => <CartButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            title: 'Détails',
            presentation: 'modal', // TP8 étape 3 - Modal presentation
          }}
        />
        <Stack.Screen
          name="Cart"
          component={ShoppingCart}
          options={{
            title: 'Mon Panier',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    marginRight: 15,
    position: 'relative',
    padding: 5,
  },
  cartButtonPressed: {
    opacity: 0.6,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
