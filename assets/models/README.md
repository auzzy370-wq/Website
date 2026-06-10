# VITRUS 3D model drop zone

Place optimized production models here:

- `male-athlete.glb`
- `female-athlete.glb`
- `squat.glb`
- `pushup.glb`
- `pullup.glb`
- `deadlift.glb`
- `bench-press.glb`
- `burpee.glb`

The current site uses a procedural low-poly avatar so the demo runs without binary assets. To upgrade to real models:

1. Export GLB files with skeletal animations named after each exercise.
2. Keep hero models under 2 MB when possible, and detailed modal models under 5 MB.
3. Use Draco mesh compression and KTX2/Basis texture compression.
4. Bake non-changing lights into textures; keep real-time lights for rim/neon accents.
5. Add GLTFLoader loading in `assets/js/three-scenes.js` where `makeAvatar()` is called.

Suggested sources:

- Mixamo: free rigged human animations; good for prototyping exercise motion.
- Sketchfab: search for rigged athletic/fitness GLB models; verify license.
- TurboSquid and CGTrader: paid semi-realistic human models.
- Ready Player Me: avatar generation and GLB export.
- Blender + Rigify: custom low-poly models with authored exercise animations.
