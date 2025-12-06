# Documentation des Composants - FitPulse Store

## Composants Communs

### 1. AnimatedButton
Bouton réutilisable avec animations spring et gradient.

```javascript
import { AnimatedButton } from '@/components';

<AnimatedButton
  label="Ajouter au panier"
  onPress={() => handleAddCart()}
  variant="primary"        // primary | secondary | outline | danger
  size="md"               // sm | md | lg
  loading={false}         // Affiche un spinner
  disabled={false}
  icon={<FontAwesome name="shopping-cart" size={18} />}
  fullWidth={true}        // Prend 100% de largeur
/>
```

**Props:**
- `label` (string): Texte du bouton
- `onPress` (function): Callback au clic
- `variant` (string): Style du bouton
- `size` (string): Taille (32px, 48px, 56px)
- `loading` (boolean): Affiche spinner
- `disabled` (boolean): Désactiver le bouton
- `icon` (ReactElement): Icône optionnelle
- `fullWidth` (boolean): 100% de largeur
- `style` (object): Styles personnalisés

---

### 2. GradientCard
Carte avec gradient de couleurs.

```javascript
import { GradientCard } from '@/components';

<GradientCard
  gradient={['#0066FF', '#00D4AA']}
  padding={16}
  borderRadius={16}
>
  <Text>Contenu avec gradient</Text>
</GradientCard>
```

**Props:**
- `gradient` (array): [couleur1, couleur2]
- `padding` (number): Padding interne
- `borderRadius` (number): Rayon des coins
- `children` (ReactElement): Contenu

---

### 3. LoadingShimmer
Loader squelette animé.

```javascript
import { LoadingShimmer, ShimmerLoader } from '@/components';

// Single shimmer
<LoadingShimmer width="100%" height={100} borderRadius={12} />

// Multiple shimmer rows
<ShimmerLoader rows={3} width="100%" height={80} />
```

**Props:**
- `width` (string|number): Largeur
- `height` (number): Hauteur
- `borderRadius` (number): Rayon des coins

---

### 4. TextInputField
Input réutilisable avec validation.

```javascript
import { TextInputField } from '@/components';

<TextInputField
  label="Email"
  placeholder="jean@example.com"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
  icon={<FontAwesome name="envelope" size={16} />}
  disabled={false}
/>
```

**Props:**
- `label` (string): Étiquette du champ
- `placeholder` (string): Texte placeholder
- `value` (string): Valeur de l'input
- `onChangeText` (function): Callback au changement
- `error` (string): Message d'erreur
- `keyboardType` (string): Type de clavier
- `icon` (ReactElement): Icône optionnelle
- `disabled` (boolean): Désactiver l'input

---

### 5. SwipeableItem
Item avec action swipe to delete.

```javascript
import { SwipeableItem } from '@/components';

<SwipeableItem
  item={cartItem}
  onDelete={() => removeFromCart(item.id)}
  onEdit={() => editItem(item.id)}
  backgroundColor="#0F172A"
>
  <View>Contenu du item</View>
</SwipeableItem>
```

**Props:**
- `item` (object): Données du item
- `onDelete` (function): Callback suppression
- `onEdit` (function): Callback édition
- `backgroundColor` (string): Couleur actions
- `children` (ReactElement): Contenu affiché

---

## Composants Produits

### 6. ProductCard
Carte produit avec animations.

```javascript
import { ProductCard } from '@/components';

<ProductCard
  product={product}
  onPress={() => navigate('ProductDetail', { product })}
  isHorizontal={false}
/>
```

**Props:**
- `product` (object): Données produit
- `onPress` (function): Callback clic
- `isHorizontal` (boolean): Layout horizontal

**Affiche:**
- Badge "Nouveau" si `product.isNew`
- Réduction % si `product.originalPrice > product.price`
- Cœur favoris avec toggle
- Rating stars
- Stock status

---

### 7. ColorPicker
Sélecteur de couleur animé.

```javascript
import { ColorPicker } from '@/components';

<ColorPicker
  colors={['#000000', '#0066FF', '#FFFFFF']}
  selectedColor={selectedColor}
  onSelectColor={setSelectedColor}
/>
```

**Props:**
- `colors` (array): Liste des couleurs hex
- `selectedColor` (string): Couleur sélectionnée
- `onSelectColor` (function): Callback changement

---

### 8. SizeSelector
Sélecteur de tailles animé.

```javascript
import { SizeSelector } from '@/components';

<SizeSelector
  sizes={['S', 'M', 'L', 'XL']}
  selectedSize={selectedSize}
  onSelectSize={setSelectedSize}
/>
```

**Props:**
- `sizes` (array): Liste des tailles
- `selectedSize` (string): Taille sélectionnée
- `onSelectSize` (function): Callback changement

---

## Composants Animations

### 9. FloatingActionButton
Bouton flottant avec badge.

```javascript
import { FloatingActionButton } from '@/components';

<FloatingActionButton
  icon={<FontAwesome name="shopping-cart" size={24} color="#FFFFFF" />}
  badgeCount={3}
  position="bottom-right"  // bottom-right | bottom-left | top-right | top-left
  onPress={() => navigate('Cart')}
/>
```

**Props:**
- `icon` (ReactElement): Icône du bouton
- `badgeCount` (number): Nombre dans le badge
- `position` (string): Position sur l'écran
- `onPress` (function): Callback au clic

---

### 10. ConfettiAnimation
Confetti explosion.

```javascript
import { ConfettiAnimation } from '@/components';

<ConfettiAnimation
  particleCount={50}
  duration={2000}
  isActive={true}
/>
```

**Props:**
- `particleCount` (number): Nombre de particules
- `duration` (number): Durée en ms
- `isActive` (boolean): Déclencher animation

---

### 11. ParallaxScrollView
ScrollView avec effet parallax.

```javascript
import { ParallaxScrollView } from '@/components';

<ParallaxScrollView
  scrollY={scrollValue}
  parallaxHeight={300}
>
  Contenu avec parallax
</ParallaxScrollView>
```

**Props:**
- `scrollY` (Animated.Value): Valeur scroll
- `parallaxHeight` (number): Hauteur parallax
- `children` (ReactElement): Contenu

---

## Hooks Personnalisés

### useCart
Gestion du panier.

```javascript
import { useCart } from '@/hooks';

const { cart, addToCart, removeFromCart, updateCartQuantity, cartTotal, cartCount } = useCart();

addToCart(product, quantity, color, size);
removeFromCart(itemId);
updateCartQuantity(itemId, newQuantity);
console.log(cartTotal, cartCount);
```

### useFavorites
Gestion des favoris.

```javascript
import { useFavorites } from '@/hooks';

const { favorites, toggleFavorite, isFavorite, favoriteCount } = useFavorites();

toggleFavorite(product);
const isLiked = isFavorite(productId);
```

### useTheme
Gestion du thème.

```javascript
import { useTheme } from '@/hooks';

const { isDarkMode, toggleTheme, theme } = useTheme();

toggleTheme();
```

### useOrders
Gestion des commandes.

```javascript
import { useOrders } from '@/hooks';

const { orders, addOrder, orderCount, totalSpent } = useOrders();
```

---

## Utilitaires (Utils)

### formatPrice
```javascript
import { formatPrice } from '@/utils';

formatPrice(129.99) // "$129.99"
```

### calculateDiscount
```javascript
import { calculateDiscount } from '@/utils';

calculateDiscount(159.99, 129.99) // 18 (%)
```

### calculateTotal
```javascript
import { calculateTotal } from '@/utils';

calculateTotal(cartItems) // Total du panier
```

---

## Store (Zustand)

### useStore
Accès au store global.

```javascript
import useStore from '@/store';

const { 
  // Cart
  cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
  
  // Favorites
  favorites, toggleFavorite, isFavorite,
  
  // Theme
  isDarkMode, toggleTheme,
  
  // User
  user, setUser, updateUser,
  
  // Orders
  orders, addOrder,
  
  // Promo
  appliedPromo, applyPromo, removePromo,
} = useStore();
```

---

## Best Practices

### 1. Mémorisation des composants
```javascript
export default React.memo(ProductCard);
```

### 2. Optimisation des animations
```javascript
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));
```

### 3. Gestion des performances
- Utiliser `FlatList` pour les listes longues
- Utiliser `React.memo` pour les composants listés
- Précharger les images
- Éviter les re-rendus inutiles

### 4. Validation des formulaires
```javascript
const handleSubmit = () => {
  if (!validateEmail(email)) {
    setEmailError('Email invalide');
    return;
  }
  // Soumettre le formulaire
};
```

---

## Documentation complète

Pour plus de détails:
- Voir les fichiers sources dans `src/components/`
- Consulter les exemples d'utilisation dans les écrans
- Lire les commentaires dans le code

---

**Dernière mise à jour:** Décembre 2024
