# FitPulse Store - Guide de Démarrage

## 📋 Pré-requis

- **Node.js**: v16.x ou supérieur
- **npm**: v8.x ou supérieur (ou yarn)
- **Expo CLI**: `npm install -g expo-cli`
- **Un téléphone** avec Expo Go (optionnel, vous pouvez aussi utiliser l'émulateur)

## 🚀 Installation Rapide

### Étape 1: Cloner/Télécharger le projet

```bash
cd FitPulseStore
```

### Étape 2: Installer les dépendances

```bash
npm install
```

Ou avec yarn:
```bash
yarn install
```

### Étape 3: Ajouter les polices Poppins

Les polices Google Fonts Poppins sont requises pour le design premium.

**Option A: Télécharger manuellement**
1. Aller sur [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
2. Télécharger les fichiers TTF:
   - Poppins-Regular.ttf
   - Poppins-Bold.ttf
   - Poppins-Medium.ttf
3. Copier les fichiers dans `assets/fonts/`

**Option B: Via npm (automatique)**
```bash
npm install @react-native-fonts/poppins
# Puis copier les fichiers dans assets/fonts/
```

### Étape 4: Lancer l'application

```bash
npm start
```

Ou:
```bash
expo start
```

Vous verrez un QR code dans le terminal.

### Étape 5: Choisir votre plateforme

**Option A: Expo Go (Mobile)**
- Ouvrir l'app Expo Go sur votre téléphone
- Scanner le QR code
- L'app se charge et se recharge en hot-reload

**Option B: Émulateur Android**
- Avoir Android Studio configuré
- Dans le terminal: appuyer sur `a`

**Option C: Émulateur iOS (Mac uniquement)**
- Avoir Xcode configuré
- Dans le terminal: appuyer sur `i`

**Option D: Web**
- Dans le terminal: appuyer sur `w`
- L'app s'ouvre dans le navigateur

## 🛠️ Commandes Utiles

```bash
# Démarrer en développement
npm start

# Démarrer sur Android
npm run android

# Démarrer sur iOS
npm run ios

# Démarrer sur Web
npm run web

# Nettoyer le cache Expo
expo start -c

# Réinstaller les dépendances
rm -rf node_modules && npm install

# Vérifier les erreurs de linting
npm run lint

# Formatter le code
npm run format
```

## 📱 Test rapide de l'app

### Compte de test prêt à utiliser:
```
Nom: Jean Dupont
Email: jean@example.com
Téléphone: +33 6 12 34 56 78
```

### Codes promo de test:
```
FITPULSE20  → -20% de réduction
WELCOME10   → -10% de réduction
```

### Produits de test:
- 32 produits mockés dans 4 catégories
- Tous les produits sont disponibles
- Les images utilisent des emojis

## 🔍 Vérifier l'installation

Après le démarrage, vérifiez que vous pouvez:

1. **Voir l'écran Onboarding** (première visite)
2. **Voir l'écran d'Accueil** avec:
   - Logo FitPulse animé
   - Barre de recherche
   - Catégories
   - Banner héro
   - Produits tendances
3. **Naviguer entre les onglets** (Accueil, Boutique, Panier, Profil)
4. **Ajouter un produit au panier** et voir le badge du cart se mettre à jour
5. **Appliquer un code promo** (FITPULSE20 ou WELCOME10)

## ❌ Troubleshooting

### Problème: "Cannot find module 'expo'"
```bash
npm install expo expo-cli
```

### Problème: "Polices non trouvées"
Vérifier que les fichiers Poppins sont dans `assets/fonts/`
```bash
ls assets/fonts/
# Devrait afficher: Poppins-Bold.ttf, Poppins-Medium.ttf, Poppins-Regular.ttf
```

### Problème: "Port 8081 déjà utilisé"
```bash
# Trouver le processus
lsof -i :8081

# Ou utiliser un autre port
expo start --port 8082
```

### Problème: Hot reload ne fonctionne pas
1. Fermer l'app
2. Faire Ctrl+C dans le terminal
3. Faire `npm start` à nouveau
4. Relancer l'app

### Problème: "Could not connect to development server"
- Vérifier que votre téléphone et ordinateur sont sur le même WiFi
- Vérifier que le firewall n'est pas bloquant
- Essayer: `expo start --tunnel`

## 📚 Structure du projet

```
FitPulseStore/
├── src/
│   ├── screens/          # 7 écrans complets
│   ├── components/       # 9 composants réutilisables
│   ├── navigation/       # Stack + Tab navigators
│   ├── store/           # Zustand store
│   ├── data/            # 32+ produits mockés
│   ├── utils/           # Helpers & utilitaires
│   ├── hooks/           # Hooks personnalisés
│   └── config.js        # Configuration app
├── assets/
│   ├── fonts/           # Polices Poppins
│   ├── images/          # Emojis utilisés
│   └── lottie/          # Animations JSON
├── App.js               # Entry point
├── app.json             # Config Expo
├── package.json         # Dépendances
└── README.md            # Documentation
```

## 🎯 Prochaines étapes

Après avoir testé l'app:

1. **Personnaliser les données** dans `src/data/mockProducts.js`
2. **Ajouter l'API backend** en remplaçant les données mockées
3. **Intégrer l'authentification** (Firebase, Auth0, etc.)
4. **Ajouter les paiements** (Stripe, PayPal, etc.)
5. **Configurer push notifications** (Expo Push Notifications)
6. **Déployer** sur Expo Cloud ou as native app

## 📞 Support

Pour les problèmes:
1. Consulter la [Documentation Expo](https://docs.expo.dev)
2. Consulter la [Documentation React Native](https://reactnative.dev)
3. Consulter la [Documentation Zustand](https://github.com/pmndrs/zustand)

## 🎓 Ressources d'apprentissage

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [NativeWind Docs](https://www.nativewind.dev/)

## ✅ Checklist post-démarrage

- [ ] App démarre sans erreurs
- [ ] Onboarding s'affiche bien
- [ ] Tous les écrans se chargent
- [ ] Panier fonctionne
- [ ] Code promo fonctionne
- [ ] Mode dark/light toggle fonctionne
- [ ] Animations fluides à 60fps

---

**Fait avec ❤️ pour FitPulse Store**
Bon développement! 🚀
