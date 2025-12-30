# Guide des Logs pour le Fetch des Images des Produits

## Vue d'ensemble

Ce document décrit les logs ajoutés pour tracer le processus de récupération et d'affichage des images des produits depuis le backend.

## Fichiers Modifiés

### 1. `src/hooks/useProducts.ts`
Logs ajoutés dans :
- `fetchProducts()` : Trace le processus complet de récupération des produits et de leurs images
- `getProductById()` : Trace la récupération d'un produit individuel

### 2. `src/services/api.ts`
Logs ajoutés dans :
- `productsApi.getAll()` : Trace les requêtes API pour récupérer tous les produits
- `productsApi.getById()` : Trace les requêtes API pour récupérer un produit par ID

### 3. `src/utils/productImageHelper.ts`
Logs ajoutés dans :
- `getProductImageUrl()` : Trace la sélection de l'image principale
- `getProductImageSrcSet()` : Trace la génération du srcset pour les images responsives

### 4. `src/components/home/ProductCard.tsx`
Logs ajoutés dans :
- Rendu du composant : Trace les informations d'image lors du rendu
- Gestionnaire d'erreur d'image : Trace les échecs de chargement d'image

## Structure des Logs

### 🔍 Logs de Début de Processus
```javascript
console.log('🔍 Début du fetch des produits depuis le backend', {
  filters: apiFilters,
  timestamp: new Date().toISOString()
});
```

### 📦 Logs de Réponse API
```javascript
console.log('📦 Réponse reçue du backend pour les produits', {
  totalProducts: response.products.length,
  pagination: response.pagination,
  timestamp: new Date().toISOString()
});
```

### 🖼️ Logs de Traitement des Images
```javascript
console.log('🖼️  Images du produit [index]', {
  productId: product.id,
  productName: product.name,
  imagesCount: product.images?.length || 0,
  primaryImage: product.images?.[0] || null,
  hasImages: !!(product.images && product.images.length > 0)
});
```

### 📊 Logs de Statistiques
```javascript
console.log('📊 Statistiques des images après traitement', {
  totalProducts: mappedProducts.length,
  productsWithImages: mappedProducts.filter(p => p.images && p.images.length > 0).length,
  productsWithoutImages: mappedProducts.filter(p => !p.images || p.images.length === 0).length,
  averageImagesPerProduct: average
});
```

### ❌ Logs d'Erreurs
```javascript
console.error('❌ Erreur lors du chargement des produits:', error);
```

## Comment Utiliser les Logs

### 1. Ouvrir la Console Développeur
- **Chrome/Edge** : F12 → Onglet "Console"
- **Firefox** : F12 → Onglet "Console"
- **Safari** : Cmd+Option+I → Onglet "Console"

### 2. Filtrer les Logs
Utilisez les emojis pour filtrer les logs :
- 🔍 : Début des processus
- 📦 : Réponses API
- 🖼️ : Traitement des images
- 📊 : Statistiques
- ✅ : Succès
- ❌ : Erreurs
- 🌐 : Requêtes réseau

### 3. Scénarios de Debug

#### Problème : Images ne se chargent pas
1. Cherchez les logs 🖼️ pour voir les données d'images reçues
2. Vérifiez les logs ❌ pour les erreurs de chargement
3. Comparez avec les logs 🌐 pour les réponses API

#### Problème : Pas assez d'images
1. Regardez les logs 📊 pour voir le nombre de produits avec/sans images
2. Vérifiez les logs 🖼️ pour les détails de chaque produit

#### Problème : Performance lente
1. Analysez les timestamps dans les logs pour identifier les goulots d'étranglement
2. Comparez les temps de réponse API (logs 📦)

## Exemple de Séquence de Logs Complète

```
🔍 Début du fetch des produits depuis le backend {filters: {...}}
🌐 API Request: GET /products?limit=20 {...}
📦 API Response: GET /products {status: 200, productsCount: 20, ...}
🖼️  Sample products images from API: [{id: 1, imagesCount: 3}, ...]
🖼️  Images du produit [1/20] {productId: 1, imagesCount: 3, ...}
🖼️  Images du produit [2/20] {productId: 2, imagesCount: 1, ...}
🖼️  Images du produit [3/20] {productId: 3, imagesCount: 0, ...}
📊 Statistiques des images après traitement {totalProducts: 20, productsWithImages: 18, ...}
✅ Fetch des produits et images terminé avec succès
```

## Tips de Debug

1. **Timing** : Tous les logs incluent un timestamp ISO pour analyser les performances
2. **Product ID** : Utilisez les IDs de produits pour tracer un produit spécifique
3. **Image Count** : Surveillez les counts d'images pour détecter les données manquantes
4. **Error Tracking** : Les erreurs sont marquées avec ❌ pour un repérage facile

## Désactivation des Logs en Production

Pour désactiver les logs en production, vous pouvez :

1. Remplacer `console.log` par une fonction conditionnelle :
```javascript
const debugLog = (emoji: string, message: string, data?: any) => {
  if (import.meta.env.DEV) {
    console.log(emoji, message, data);
  }
};
```

2. Ou utiliser un logger configuré :
```javascript
const logger = {
  log: (emoji: string, message: string, data?: any) => {
    if (import.meta.env.DEV) console.log(emoji, message, data);
  }
};