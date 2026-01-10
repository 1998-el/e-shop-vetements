# Démonstration du composant VideoAutoplayOnScroll

## Comment tester sans vraies vidéos

Pour tester le composant avant d'ajouter vos vraies vidéos, vous pouvez utiliser des vidéos de démonstration :

### Option 1 : Vidéos de démonstration en ligne
```tsx
<VideoAutoplayOnScroll
  videoSrc="https://www.w3schools.com/html/mov_bbb.mp4" // Vidéo de démonstration
  posterSrc="https://picsum.photos/1920/1080?random=1"   // Image aléatoire comme poster
  title="L'épluchage ne doit plus être une souffrance"
  description="Test avec une vidéo de démonstration"
  className="bg-white py-12"
/>
```

### Option 2 : Vidéos locales de test
Téléchargez des vidéos de test dans `public/videos/` :
- `demo-produit.mp4` : Une vidéo courte pour les tests
- `utilisation-detail.mp4` : Une deuxième vidéo

### Option 3 : Mode développement avec fallback
Pour éviter les erreurs 404 pendant le développement :

```tsx
// Dans VideoAutoplayOnScroll.tsx, modifiez le src vidéo :
<video
  ref={videoRef}
  src={process.env.NODE_ENV === 'development' 
    ? "https://www.w3schools.com/html/mov_bbb.mp4" 
    : videoSrc
  }
  poster={posterSrc}
  // ... autres props
>
```

## Configuration recommandée pour les tests

### 1. Test de la visibilité
```tsx
<VideoAutoplayOnScroll
  videoSrc="/videos/demo-produit.mp4"
  threshold={0.3}  // Seuil bas pour tester facilement
  className="bg-blue-50 py-8"
/>
```

### 2. Test responsive
Le composant s'adapte automatiquement :
- Mobile : Contrôles optimisés pour tactile
- Desktop : Indicateurs supplémentaires visibles

### 3. Test des contrôles
- Bouton mute/unmute : Fonctionne sur desktop et mobile
- Lecture automatique : Se déclenche au scroll
- Fallback : Si autoplay bloqué, vidéo se lance au clic

## Debug et développement

### Console logs utiles
Le composant log automatiquement :
- "Autoplay blocked" : Si le navigateur bloque l'autoplay
- État de visibilité : `data-video-visible="true/false"`

### Props de debug
```tsx
<VideoAutoplayOnScroll
  // ... autres props
  className="debug:border-4 debug:border-red-500"  // Bordure rouge pour debug
/>
```

### Performance
- `preload="metadata"` : Charge uniquement les métadonnées
- Intersection Observer : Performance optimisée
- Memory cleanup : Observer se nettoie automatiquement

## Checklist de test

- [ ] Vidéo se lance automatiquement au scroll
- [ ] Bouton son fonctionne (mute/unmute)
- [ ] Interface responsive sur mobile
- [ ] Pas d'erreur dans la console
- [ ] Vidéo s'arrête correctement
- [ ] Indicateurs visuels fonctionnels
- [ ] Accessibilité (ARIA labels)

## Prochaines étapes

1. Ajouter vos vraies vidéos dans `public/videos/`
2. Créer des images poster attractives
3. Tester sur différents appareils
4. Optimiser la taille des fichiers
5. Configurer le lazy loading si nécessaire