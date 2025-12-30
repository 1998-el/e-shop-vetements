# Vercel Deployment Configuration

## Configuration de routage pour Vercel

Ce fichier `vercel.json` configure le routage approprié pour une application React (SPA) déployée sur Vercel.

### Problème résolu
- **Erreurs 404** lors du rafraîchissement des pages ou accès direct aux routes
- Les applications SPA nécessitent que toutes les routes soient redirigées vers `index.html` pour que React Router puisse gérer le routage côté client

### Solution
La configuration `rewrites` dans `vercel.json` redirige toutes les requêtes vers `index.html` tout en préservant l'URL dans le navigateur.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Fonctionnement
1. Quand un utilisateur accède à `/products` ou rafraîchit la page
2. Vercel intercepte la requête
3. Le serveur retourne le contenu de `index.html`
4. React Router prend le relais et affiche la bonne composant basée sur l'URL

### Fichiers de déploiement
- `vercel.json` : Configuration principale pour Vercel
- `public/_redirects` : Redondant pour Vercel mais maintenu pour compatibilité
- `render.yaml` : Ancien fichier de configuration Render (ignoré par Vercel)

### Déploiement
1. Connecter le repository à Vercel
2. Vercel détectera automatiquement `vercel.json`
3. Le script de build `npm run build` sera exécuté automatiquement
4. Les rewrites seront appliqués pour gérer le routage SPA