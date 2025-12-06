# API Documentation - FitPulse Store

## Vue d'ensemble

FitPulse Store utilise actuellement des données mockées locales. Cette documentation explique comment intégrer une API backend.

## Architecture

```
Frontend (React Native)
    ↓
Zustand Store
    ↓
API Client (à créer)
    ↓
Backend Server
    ↓
Database
```

## Endpoints à implémenter

### Produits

#### GET /api/products
Récupère la liste de tous les produits.

**Query Parameters:**
```javascript
{
  page: 1,           // Pagination
  limit: 20,         // Items par page
  category: 'shoes', // Filtrer par catégorie
  sort: 'trending',  // trending | price | rating | newest
  search: 'shoes',   // Recherche texte
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "AirFlex Pro Running Shoes",
      "price": 129.99,
      "originalPrice": 159.99,
      "category": "shoes",
      "images": ["url1", "url2"],
      "rating": 4.8,
      "reviews": 124,
      "inStock": true,
      "isNew": true,
      "isTrending": true
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 5
  }
}
```

#### GET /api/products/:id
Récupère les détails d'un produit.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "AirFlex Pro Running Shoes",
    "description": "Chaussures running haute performance...",
    "features": ["Amorti air", "Respirable", "Waterproof"],
    "colors": ["#000000", "#0066FF"],
    "sizes": ["38", "39", "40"],
    "price": 129.99,
    "originalPrice": 159.99,
    "rating": 4.8,
    "reviews": [
      {
        "id": "1",
        "author": "Jean",
        "rating": 5,
        "comment": "Excellentes chaussures!",
        "date": "2024-01-15"
      }
    ]
  }
}
```

### Utilisateurs

#### POST /api/auth/register
Enregistre un nouvel utilisateur.

**Body:**
```json
{
  "email": "jean@example.com",
  "password": "Password123!",
  "firstName": "Jean",
  "lastName": "Dupont"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-1",
    "email": "jean@example.com",
    "firstName": "Jean",
    "lastName": "Dupont"
  },
  "token": "jwt-token-here"
}
```

#### POST /api/auth/login
Connecte un utilisateur.

**Body:**
```json
{
  "email": "jean@example.com",
  "password": "Password123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-1",
    "email": "jean@example.com",
    "firstName": "Jean"
  },
  "token": "jwt-token-here"
}
```

#### GET /api/users/:id
Récupère le profil utilisateur.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-1",
    "email": "jean@example.com",
    "firstName": "Jean",
    "lastName": "Dupont",
    "phone": "+33 6 12 34 56 78",
    "addresses": [
      {
        "id": "addr-1",
        "type": "home",
        "street": "123 Rue de Paris",
        "city": "Paris",
        "zipCode": "75001",
        "isDefault": true
      }
    ]
  }
}
```

### Commandes

#### POST /api/orders
Crée une nouvelle commande.

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "selectedColor": "#000000",
      "selectedSize": "40"
    }
  ],
  "shippingAddressId": "addr-1",
  "paymentMethodId": "card-1",
  "promoCode": "FITPULSE20"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "ORDER-12345",
    "status": "confirmed",
    "total": 239.99,
    "items": [...],
    "createdAt": "2024-01-15T10:30:00Z",
    "estimatedDelivery": "2024-01-18"
  }
}
```

#### GET /api/orders/:id
Récupère les détails d'une commande.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "ORDER-12345",
    "status": "shipped",
    "items": [...],
    "total": 239.99,
    "shippingInfo": {...},
    "trackingNumber": "SHIP-12345"
  }
}
```

#### GET /api/users/:userId/orders
Récupère toutes les commandes de l'utilisateur.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ORDER-12345",
      "status": "delivered",
      "total": 239.99,
      "date": "2024-01-15"
    }
  ]
}
```

### Paiements

#### POST /api/payments/process
Traite un paiement.

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "amount": 239.99,
  "currency": "EUR",
  "method": "card",
  "cardToken": "stripe-token",
  "orderId": "ORDER-12345"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn-12345",
    "status": "completed",
    "amount": 239.99
  }
}
```

### Favoris

#### POST /api/favorites/:productId
Ajoute un produit aux favoris.

**Headers:**
```
Authorization: Bearer {token}
```

#### DELETE /api/favorites/:productId
Retire un produit des favoris.

**Headers:**
```
Authorization: Bearer {token}
```

#### GET /api/favorites
Récupère les favoris de l'utilisateur.

**Headers:**
```
Authorization: Bearer {token}
```

## Implémentation Client

### Créer un API Client

```javascript
// src/api/client.js
import axios from 'axios';
import useStore from '../store/useStore';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.fitpulse.com';

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Ajouter le token aux requêtes
client.interceptors.request.use((config) => {
  const { user } = useStore.getState();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Gérer les erreurs
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      useStore.setState({ user: null });
    }
    return Promise.reject(error);
  }
);

export default client;
```

### Créer des services API

```javascript
// src/api/products.js
import client from './client';

export const getProducts = async (params) => {
  return client.get('/products', { params });
};

export const getProduct = async (id) => {
  return client.get(`/products/${id}`);
};

export const searchProducts = async (query) => {
  return client.get('/products', { params: { search: query } });
};
```

### Utiliser dans les composants

```javascript
// Dans HomeScreen
import { getProducts } from '../api/products';

useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await getProducts({ limit: 10 });
      setProducts(data.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
  
  loadProducts();
}, []);
```

## Authentification

### JWT Token Handling

```javascript
// src/api/auth.js
import client from './client';
import useStore from '../store/useStore';

export const login = async (email, password) => {
  const response = await client.post('/auth/login', { email, password });
  
  if (response.data.token) {
    useStore.setState({ 
      user: { ...response.data, token: response.data.token } 
    });
  }
  
  return response;
};

export const logout = () => {
  useStore.setState({ user: null });
};
```

## Gestion des erreurs

```javascript
// src/api/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Erreur du serveur
    return {
      message: error.response.data.message,
      status: error.response.status,
    };
  } else if (error.request) {
    // Pas de réponse
    return {
      message: 'Pas de réponse du serveur',
      status: 0,
    };
  } else {
    // Erreur réseau
    return {
      message: error.message,
      status: -1,
    };
  }
};
```

## Codes Promo Valides

À implémenter côté backend avec validation:

```json
{
  "FITPULSE20": {
    "discount": 0.20,
    "maxUses": 1000,
    "expiresAt": "2025-12-31",
    "minAmount": 50.00,
    "usedCount": 234
  },
  "WELCOME10": {
    "discount": 0.10,
    "maxUses": 5000,
    "expiresAt": "2025-12-31",
    "minAmount": 0,
    "usedCount": 1234
  }
}
```

## Migration des données mockées

1. Créer les services API (comme montré ci-dessus)
2. Remplacer les appels `mockProducts` par `getProducts()`
3. Ajouter la gestion des états (loading, error)
4. Tester chaque endpoint

## Considérations de sécurité

- ✅ Utiliser HTTPS en production
- ✅ Valider toutes les entrées utilisateur
- ✅ Stocker les tokens de façon sécurisée
- ✅ Implémenter le rate limiting
- ✅ Valider les JWT tokens
- ✅ Chiffrer les données sensibles

---

**Note:** Cette documentation couvre l'intégration d'une API standard RESTful. Adapter selon votre backend réel.
