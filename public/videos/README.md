# Guide d'utilisation des vidéos

## Structure des fichiers

```
public/
├── videos/
│   ├── demo-produit.mp4      # Vidéo principale de démonstration
│   └── utilisation-detail.mp4 # Vidéo d'utilisation détaillée
└── images/
    └── video/
        ├── video-poster.jpg   # Image de remplacement pour la vidéo principale
        └── usage-poster.jpg   # Image de remplacement pour la vidéo d'utilisation
```

## Instructions de mise en place

### 1. Ajouter les vidéos
- Placez vos fichiers vidéo MP4 dans le dossier `public/videos/`
- Formats recommandés : MP4 (H.264) pour une compatibilité maximale
- Taille recommandée : < 10MB pour un chargement rapide
- Durée recommandée : 30-60 secondes maximum

### 2. Ajouter les images poster
- Créez des images de remplacement (thumbnails) pour vos vidéos
- Formats recommandés : JPG ou PNG
- Dimensions recommandées : 1920x1080px (16:9)
- Placez-les dans `public/images/video/`

### 3. Configuration des vidéos dans le code

Le composant `VideoAutoplayOnScroll` accepte ces props :

```tsx
<VideoAutoplayOnScroll
  videoSrc="/videos/demo-produit.mp4"        // Chemin vers la vidéo
  posterSrc="/images/video/video-poster.jpg" // Image de remplacement
  title="Votre titre personnalisé"           // Titre de la section
  description="Votre description personnalisée" // Description
  className="bg-gradient-to-b from-white to-gray-50 py-12"
  threshold={0.6}                            // Seuil de visibilité (60%)
/>
```

## Fonctionnalités du composant

- ✅ Autoplay au scroll avec Intersection Observer
- ✅ Lecture muette par défaut (conforme aux bonnes pratiques)
- ✅ Bouton de contrôle du son
- ✅ Indicateurs visuels de lecture
- ✅ Responsive design
- ✅ Optimisé pour mobile et desktop
- ✅ Gestion des erreurs de autoplay
- ✅ Préchargement optimisé

## Personnalisation

### Threshold (Seuil de visibilité)
- `0.1` = Se déclenche dès que 10% de la vidéo est visible
- `0.5` = Se déclenche quand 50% de la vidéo est visible (recommandé)
- `0.7` = Se déclenche quand 70% de la vidéo est visible (par défaut)

### Classes CSS
Vous pouvez personnaliser l'apparence avec les classes Tailwind CSS :
- `bg-gradient-to-b from-white to-gray-50` pour un fond dégradé
- `bg-white` pour un fond blanc simple
- `py-12 md:py-16` pour l'espacement vertical

## Tests recommandés

1. **Test sur mobile** : Vérifiez que l'autoplay fonctionne sur iOS/Android
2. **Test sur desktop** : Chrome, Firefox, Safari, Edge
3. **Test de performance** : Vérifiez que les vidéos se chargent rapidement
4. **Test d'accessibilité** : Contrôles au clavier et lecteurs d'écran

## Optimisation des performances

- Utilisez des vidéos compressées (bitrate ~1-2 Mbps)
- Activez le lazy loading si vous avez plusieurs vidéos
- Surveillez la taille totale des assets