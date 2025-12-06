# Deployment Guide - FitPulse Store

## 📦 Build pour Production

### 1. Build EAS (Expo Application Services)

EAS est le service officiel Expo pour construire des apps natives.

#### Installation
```bash
npm install -g eas-cli
eas login
```

#### Configuration
```bash
# Créer le fichier de config
eas build:configure
```

#### Build
```bash
# Build pour iOS et Android
eas build --platform all --auto-submit

# Ou séparément
eas build --platform ios
eas build --platform android
```

### 2. Build Local Android

#### Prérequis
- Android Studio
- JDK 11+
- ANDROID_SDK_ROOT configuré

#### Étapes
```bash
# Configuration EAS
eas build:configure --platform android

# Générer l'APK
eas build --platform android --local

# L'APK sera dans: ./build/
```

### 3. Build Local iOS (Mac uniquement)

#### Prérequis
- macOS 12+
- Xcode 13+
- CocoaPods

#### Étapes
```bash
# Configuration EAS
eas build:configure --platform ios

# Générer l'IPA
eas build --platform ios --local

# L'IPA sera dans: ./build/
```

## 🚀 Distribution

### Google Play Store (Android)

#### Prérequis
1. Créer un compte Google Play Developer ($25 one-time)
2. Créer une application Google Play
3. Générer une clé de signature (keystore)

#### Submission
```bash
# Configure submission
eas submit --platform android --latest

# Ou manuellement:
# 1. Aller sur: https://play.google.com/console
# 2. Upload l'APK/AAB
# 3. Remplir les détails de l'app
# 4. Soumettre pour review (24-48h)
```

### Apple App Store (iOS)

#### Prérequis
1. Créer un compte Apple Developer ($99/an)
2. Créer une application App Store
3. Créer des certificats et profiles

#### Submission
```bash
# Créer les credentials
eas credentials

# Submit
eas submit --platform ios --latest

# Ou manuellement:
# 1. Aller sur: https://appstoreconnect.apple.com
# 2. Upload l'IPA via Xcode ou Transporter
# 3. Remplir les détails de l'app
# 4. Soumettre pour review (1-3 jours)
```

## 📱 Version Web

### Deploy sur Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Build pour web
npm run web

# 3. Deploy
vercel

# Ou avec configuration personnalisée
vercel --prod
```

### Deploy sur Netlify

```bash
# 1. Build pour web
npm run web

# 2. Installer Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --prod --dir=web-build
```

## 🔧 Configuration Expo

### app.json pour Production

```json
{
  "expo": {
    "name": "FitPulse Store",
    "slug": "fitpulse-store",
    "version": "1.0.0",
    "scheme": "fitpulsestore",
    "android": {
      "package": "com.fitpulsestore.app",
      "versionCode": 1
    },
    "ios": {
      "bundleIdentifier": "com.fitpulsestore.app",
      "buildNumber": "1"
    }
  }
}
```

## 🔐 Variables d'environnement

Créer un fichier `.env.production`:

```
REACT_APP_API_URL=https://api.fitpulse.com
NODE_ENV=production
REACT_APP_ENABLE_ANALYTICS=true
```

## 🧪 Pré-deployment Checklist

- [ ] Tous les tests passent
- [ ] Pas d'erreurs de console
- [ ] Polices Poppins incluses
- [ ] Images optimisées
- [ ] Pas de données sensibles en hardcode
- [ ] Version numérique mise à jour
- [ ] Assets complets
- [ ] Privacy policy créée
- [ ] Terms of service créés
- [ ] Support email configuré

## 📊 Performance Optimization

### 1. Bundle Size
```bash
# Analyser la taille
npm run analyze

# Optimisations:
# - Supprimer les imports inutilisés
# - Lazy load les écrans
# - Minifier les images
```

### 2. Runtime Performance
```javascript
// Utiliser React.memo
export default React.memo(ProductCard);

// Utiliser useMemo
const memoizedValue = useMemo(() => computeExpensive(), [deps]);

// Optimiser les animations
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));
```

## 📝 Release Notes Template

```markdown
## Version 1.0.0 - Initial Release

### Features
- ✨ Onboarding complet
- 🛍️ Catalogue de 32 produits
- 🛒 Panier avec persistance
- 💳 Paiement multi-étapes
- ❤️ Système de favoris
- 🌓 Mode sombre/clair
- 📱 UI responsive

### Bug Fixes
- Corrections de performances
- Animations optimisées

### Known Issues
- Aucun issue connu

### Installation
Télécharger depuis Google Play Store ou Apple App Store.
```

## 📞 Post-Launch Support

### Monitoring
```bash
# Sentry pour les erreurs
npm install @sentry/react-native

# Google Analytics
npm install @react-native-firebase/analytics
```

### Updates
```bash
# Expo OTA Updates
eas update --message "Fix for critical bug"
```

## 🔄 Versioning

Suivre Semantic Versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

```bash
# Increment version dans package.json et app.json
npm version patch
```

## 📚 Documentation pour Review

- Screenshots (iOS/Android)
- Feature list
- Keywords
- Description
- Support email
- Privacy policy URL
- Terms URL

## 🎯 App Store Optimization (ASO)

### Keywords
- "fitness app"
- "sports equipment"
- "e-commerce"
- "shopping app"

### Description
```
FitPulse Store - Your Ultimate Fitness E-Commerce App

Découvrez des milliers de produits fitness et sportifs à des prix imbattables!

✨ Features:
- Shopping rapide et facile
- 30+ produits de qualité
- Mode sombre/clair
- Favoris et panier persistants
- Codes promo exclusifs

Téléchargez gratuitement maintenant!
```

## 💰 Monetization

### Options
1. In-app purchases (Premium features)
2. Affiliation marketing (Amazon, etc.)
3. Publicités (avec consentement)
4. Subscriptions (VIP members)

### Implementation
```javascript
// In-app purchases avec Expo IAP
import * as InAppPurchases from 'expo-in-app-purchases';
```

## 📈 Analytics & Tracking

```javascript
// Google Analytics
import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';

await analytics().logEvent('purchase', {
  value: 29.99,
  currency: 'EUR',
  items: [{ id: '1', name: 'Product' }],
});
```

---

**Support:** Pour les questions, consulter la [documentation EAS](https://docs.expo.dev/eas)
