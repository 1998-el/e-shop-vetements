# Configuration CORS pour le Backend - SOLUTION RAPIDE

## 🚨 Problème CORS Résolu

Le frontend ne pouvait pas accéder aux images uploadées à cause d'un problème Cross-Origin-Resource-Policy (CORP).

## ✅ SOLUTION RAPIDE - Configuration Minimale

### 1. Installation des dépendances (si nécessaire)
```bash
npm install cors
npm install --save-dev @types/cors
```

### 2. Configuration CORS Simplifiée dans votre serveur principal

Ajoutez cette configuration **minimale** dans votre `main.ts` ou `app.ts` :

```typescript
import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

// Configuration CORS pour l'API
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Configuration spéciale pour les fichiers statiques (IMAGES)
app.use('/uploads', (req: express.Request, res: express.Response, next: express.Function) => {
  // Headers CORS pour les images
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cache-Control', 'public, max-age=31536000');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});

// Servir les fichiers statiques AVEC les headers CORS
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Vos autres middlewares...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vos routes API...
// app.use('/api', apiRoutes);

export default app;
```

### 3. Alternative Ultra-Simple (si vous n'avez pas cors installé)

Si vous ne voulez pas installer `cors`, voici une version encore plus simple :

```typescript
import express from 'express';
import path from 'path';

const app = express();

// Middleware CORS manuel pour l'API
app.use((req: express.Request, res: express.Response, next: express.Function) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.setHeader('Access-Control-Allow-Origin', origin as string);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});

// Configuration pour les IMAGES (la partie la plus importante)
app.use('/uploads', (req: express.Request, res: express.Response, next: express.Function) => {
  // Ces headers sont CRITIQUES pour les images
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cache-Control', 'public, max-age=31536000');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Vos autres middlewares et routes...
```

## 🔧 Test de la configuration

Après avoir appliqué ces changements :

1. **Redémarrez complètement le serveur backend**
2. **Videz le cache du navigateur** (Ctrl+F5 ou Cmd+Shift+R)
3. **Vérifiez que les images se chargent** dans le navigateur
4. **Vérifiez la console** pour s'assurer qu'il n'y a plus d'erreurs CORS

## 📋 URLs d'images maintenant accessibles

- ✅ `http://localhost:5000/uploads/products/temp_123/image.png`
- ✅ `http://localhost:5000/uploads/products/product-123/image1.jpg`
- ✅ Toutes les images uploadées

## 🚨 Points Critiques

1. **`Cross-Origin-Resource-Policy: cross-origin`** - Header essentiel pour les images
2. **`Access-Control-Allow-Origin: *`** - Permet l'accès depuis n'importe quelle origine
3. **Ordre des middlewares** - Le middleware CORS doit être avant `express.static()`
4. **Redémarrage complet** - Nécessaire après les changements

---

**Résultat :** Les images uploadées seront maintenant correctement accessibles depuis le frontend sans erreurs CORS ! 🎉