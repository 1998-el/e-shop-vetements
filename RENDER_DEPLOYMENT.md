# Guide de déploiement sur Render

## Configuration SPA pour Render

Ce projet a été configuré pour résoudre les problèmes de routing côté client sur Render.

### Problème résolu
- **Erreur 404** sur les routes React (`/cart`, `/products`, etc.)
- **Navigation cassée** lors du refresh sur une page autre que `/`
- **SPA routing** non supporté par défaut sur les serveurs statiques

### Solutions implémentées

#### 1. Configuration Vite (`vite.config.ts`)
```typescript
build: {
  outDir: 'dist',
  assetsDir: 'assets',
  sourcemap: false,
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        router: ['react-router-dom']
      }
    }
  }
}
```

#### 2. Fichier `render.yaml`
Configuration spécifique pour Render avec :
- Build command : `npm install && npm run build`
- Start command : `npx serve -s dist -l $PORT`
- Redirections SPA configurées
- Headers de cache optimisés

#### 3. Fallbacks pour différents hébergeurs
- `public/_redirects` : Pour Netlify/Vercel
- `.htaccess` : Pour serveurs Apache
- `netlify.toml` : Configuration Netlify
- `public/404.html` : Page d'erreur personnalisée

### Déploiement sur Render

#### Étapes :
1. **Créer un compte** sur [render.com](https://render.com)
2. **Nouveau Web Service**
3. **Connecter** votre repository GitHub/GitLab
4. **Configurer** :
   - **Name** : `beldouze-ecommerce`
   - **Environment** : `Node`
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npx serve -s dist -l $PORT`
5. **Variables d'environnement** :
   - `NODE_VERSION` : `18`
   - `NPM_FLAGS` : `--production=false`
6. **Déployer**

#### Alternative avec render.yaml :
- Uploadez le fichier `render.yaml` à la racine
- Render détectera automatiquement la configuration

### Vérification du déploiement

#### Tests à effectuer :
1. **Page d'accueil** : `https://votre-app.onrender.com/`
2. **Navigation interne** : Cliquer sur "Panier", "Produits"
3. **Refresh test** : Actualiser la page `/cart` directement
4. **URL directe** : Accéder à `https://votre-app.onrender.com/cart`

#### URLs à tester :
- `/` (accueil)
- `/products` (liste produits)
- `/cart` (panier)
- `/checkout` (commande)
- `/about` (à propos)

### Fonctionnalités résolues

✅ **Routing SPA** fonctionnel
✅ **Navigation** sans rechargement
✅ **URLs directes** accessibles
✅ **Refresh** sur toutes les pages
✅ **Boutons précédent/suivant** du navigateur
✅ **Page 404** personnalisée
✅ **Headers de sécurité** configurés
✅ **Cache optimisé** pour les assets

### Commandes de déploiement

#### Build local :
```bash
npm run build
```

#### Test local du build :
```bash
npx serve -s dist -l 4173
```

#### Déploiement Render :
```bash
# Les commandes sont définies dans render.yaml
# Build : npm install && npm run build
# Start : npx serve -s dist -l $PORT
```

### Dépannage

#### Si les routes ne fonctionnent toujours pas :
1. **Vérifier** que `render.yaml` est bien présent
2. **Redéployer** le service
3. **Vérifier les logs** de build sur Render
4. **Tester** avec les URLs directes

#### Logs à vérifier :
- Build success
- No routing errors
- Assets properly served

### Performance

#### Optimisations incluses :
- **Code splitting** automatique
- **Assets cache** : 1 an pour les fichiers statiques
- **Compression** activée par défaut
- **Minification** en production

Le projet est maintenant prêt pour un déploiement sans erreur sur Render !
