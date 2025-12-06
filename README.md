# FitPulse Store - React Native E-Commerce App

Une application React Native 100% frontend pour un e-commerce de produits de sport et fitness. 

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 16+
- Expo CLI (`npm install -g expo-cli`)
- Un téléphone avec l'app Expo Go (optionnel)

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Ajouter les polices Poppins
# Télécharger depuis: https://fonts.google.com/specimen/Poppins
# Copier Poppins-Regular.ttf, Poppins-Bold.ttf, Poppins-Medium.ttf dans assets/fonts/

# 3. Lancer l'app
npm start

# Expo Go: Scanner le QR code avec votre phone
# Web: Appuyer sur 'w'
# Android: Appuyer sur 'a'
# iOS: Appuyer sur 'i'
```

## 📱 Features

### Authentification & Onboarding
- ✅ Écran Onboarding avec animations Lottie (3 slides)
- ✅ Indicators dots animés
- ✅ Skip button avec micro-interaction

### Écran Accueil (Home)
- ✅ Header animé avec logo
- ✅ Search bar expanding
- ✅ Hero slider avec autoplay (5s)
- ✅ Categories grid avec hover effect
- ✅ Trending products horizontal scroll
- ✅ Floating cart button avec badge animé

### Écran Boutique (Shop)
- ✅ Grille de produits (2 colonnes)
- ✅ Filtres par catégorie
- ✅ Tri (Tendances, Prix, Avis)
- ✅ Recherche en temps réel
- ✅ ProductCard animées avec rating

### Détail Produit
- ✅ Galerie d'images avec swipe
- ✅ Color picker animé
- ✅ Size selector
- ✅ Quantity stepper
- ✅ Description complète
- ✅ Caractéristiques
- ✅ Notes et avis
- ✅ Stock status
- ✅ Add to cart avec animation

### Panier
- ✅ Liste des articles avec swipe to delete
- ✅ Quantity stepper animé
- ✅ Code promo (FITPULSE20, WELCOME10)
- ✅ Résumé du panier
- ✅ Montant total avec réduction
- ✅ Checkout button sticky
- ✅ Empty state animé

### Paiement (Checkout)
- ✅ 3 étapes: Infos → Paiement → Confirmation
- ✅ Progress bar animée
- ✅ Form validation
- ✅ Payment methods selector
- ✅ Order confirmation avec animation Confetti
- ✅ Numéro de commande généré

### Profil
- ✅ Profile card
- ✅ Statistiques (Commandes, Dépensé, Depuis)
- ✅ Menu de navigation
- ✅ Toggle Dark/Light mode
- ✅ Logout button
- ✅ Footer avec liens

## 🎨 Design System

### Couleurs
- Primary: `#0066FF` (Bleu énergique)
- Secondary: `#00D4AA` (Turquoise)
- Accent: `#FF6B35` (Orange vif)
- Dark: `#0F172A` (Noir/Gris profond)
- Light: `#F8FAFC` (Blanc cassé)
- Success: `#10B981` (Vert)

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Animations
- Reanimated pour les animations fluides 60fps
- Spring animations pour les interactions
- Fade/Slide animations pour les transitions
- Confetti animation sur confirmation commande

## 📊 Données Mockées

### 32 Produits Complets
Chaque produit contient:
- ID, Nom, Catégorie
- Prix, Prix original
- Couleurs, Tailles
- Images (emojis ou chemins)
- Rating (4.3-4.9), Reviews
- Description, Caractéristiques
- Stock status, Nouveau/Tendance

### Catégories
- Chaussures (6 produits)
- Vêtements (6 produits)
- Accessoires (10 produits)
- Équipement (10 produits)

## 🛠️ Stack Technique

### Navigation
```
- React Navigation (Stack + Tabs)
- Onboarding → Main (Tabs)
- Animated transitions
```

### State Management
```
- Zustand pour le store global
- AsyncStorage pour la persistance
- Context API ready
```

### Animations
```
- React Native Reanimated 3
- React Native Gesture Handler
- Lottie (ready pour JSON animations)
- Spring & Timing animations
```

### Styling
```
- NativeWind (Tailwind CSS)
- Custom color system
- Responsive design
```

### Composants
```
- AnimatedButton (scale, gradient)
- GradientCard
- LoadingShimmer
- ProductCard (favoris, badges)
- ColorPicker & SizeSelector
- SwipeableItem (delete gesture)
- FloatingActionButton (floating cart)
- ConfettiAnimation
```

## 💾 Persistance des Données

AsyncStorage sauvegarde:
- Panier
- Favoris
- Thème (dark/light)
- Utilisateur
- Historique commandes
- Historique recherche
- Codes promo appliqués

## 🔐 Codes Promo Valides

```
FITPULSE20  → -20% de réduction
WELCOME10   → -10% de réduction
```

## 📱 Responsive Design

Optimisé pour:
- ✅ iPhone 12-15
- ✅ Android phones (360-480px width)
- ✅ Tablets (avec layout adaptatif)

## 🎯 Checklist de Validation

- ✅ 0 erreurs de compatibilité iOS/Android
- ✅ Toutes les animations à 60fps
- ✅ Navigation fluide sans lag
- ✅ Persistance des données locales
- ✅ UI responsive sur toutes tailles
- ✅ Code propre avec commentaires
- ✅ 32+ produits de test
- ✅ Micro-interactions partout
- ✅ Mode sombre/clair fonctionnel
- ✅ Gestures intuitives (swipe, tap, press)

## 📚 Structure Projet

```
FitPulseStore/
├── assets/
│   ├── fonts/ (Poppins TTF)
│   ├── images/ (product images)
│   └── lottie/ (animation JSON)
├── src/
│   ├── components/
│   │   ├── common/ (4 composants)
│   │   ├── product/ (2 composants)
│   │   └── animations/ (3 composants)
│   ├── screens/
│   │   ├── OnboardingScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ShopScreen.js
│   │   ├── ProductDetailScreen.js
│   │   ├── CartScreen.js
│   │   ├── CheckoutScreen.js
│   │   └── ProfileScreen.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── data/
│   │   └── mockProducts.js (32 produits)
│   ├── store/
│   │   └── useStore.js (Zustand)
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   └── animations.js
│   └── hooks/ (ready to extend)
├── App.js
├── app.json
├── package.json
└── README.md
```

## 🚀 Performance Tips

- React.memo appliqué aux ProductCard
- Lazy loading prêt à implémenter
- FlatList optimisée avec numColumns
- Animations avec useMemo
- Pas de re-renders inutiles
- Images optimisées (emojis)

## 🎓 Extensibilité

Facile d'ajouter:
- Backend API (remplacer mockProducts par API calls)
- Authentication (Firebase/Auth0)
- Real payments (Stripe integration)
- Push notifications (Expo Push)
- Analytics (Segment/Mixpanel)
- Analytics (Sentry errors)

## 📞 Support

Pour les problèmes:
1. Vérifier que Node.js 16+ est installé
2. Supprimer node_modules et réinstaller: `rm -rf node_modules && npm install`
3. Nettoyer Expo cache: `expo start -c`
4. Vérifier les polices Poppins sont dans assets/fonts/

## 📄 License

MIT - Libre d'utiliser et de modifier

---

**Fait avec ❤️ pour FitPulse Store**
