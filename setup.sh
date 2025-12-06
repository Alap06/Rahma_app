#!/bin/bash

# FitPulse Store - Setup Script
# Ce script configure automatiquement l'application

echo "🚀 FitPulse Store - Installation automatique"
echo "============================================="

# Vérifier Node.js
echo "✓ Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "   Télécharger depuis: https://nodejs.org"
    exit 1
fi
echo "  Node.js $(node -v) ✓"

# Vérifier npm
echo "✓ Vérification de npm..."
echo "  npm $(npm -v) ✓"

# Installer Expo CLI globalement si nécessaire
echo "✓ Vérification de Expo CLI..."
if ! command -v expo &> /dev/null; then
    echo "  Installation de Expo CLI..."
    npm install -g expo-cli
fi
echo "  Expo CLI ✓"

# Installer les dépendances
echo ""
echo "✓ Installation des dépendances..."
npm install

# Vérifier les polices
echo ""
echo "✓ Vérification des polices Poppins..."
if [ ! -f "assets/fonts/Poppins-Regular.ttf" ]; then
    echo ""
    echo "⚠️  Polices Poppins manquantes!"
    echo "   Télécharger depuis: https://fonts.google.com/specimen/Poppins"
    echo "   Fichiers requis:"
    echo "   - Poppins-Regular.ttf"
    echo "   - Poppins-Bold.ttf"
    echo "   - Poppins-Medium.ttf"
    echo "   Placer dans: ./assets/fonts/"
else
    echo "  Polices trouvées ✓"
fi

# Configuration .env
echo ""
if [ ! -f ".env" ]; then
    echo "✓ Création du fichier .env..."
    cp .env.example .env
    echo "  Fichier .env créé ✓"
    echo "  Note: Configurer les variables si nécessaire"
fi

# Clean Expo cache
echo ""
echo "✓ Nettoyage du cache Expo..."
rm -rf .expo-shared
rm -rf .expo

echo ""
echo "✅ Installation complète!"
echo ""
echo "Prochaines étapes:"
echo "1. Télécharger les polices Poppins (https://fonts.google.com/specimen/Poppins)"
echo "2. Placer les fichiers dans ./assets/fonts/"
echo "3. Lancer: npm start"
echo ""
echo "Pour plus d'informations: voir SETUP.md"
