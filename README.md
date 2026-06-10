# VITRUS

VITRUS is a premium static HTML fitness website focused on transforming bodies and minds through science-based training, nutrition, 3D form education, and real-time progress tracking.

Tagline: **Train in 3D. Track in Real Time. Transform Forever.**

This implementation is intentionally "all HTML" friendly: no build step, no framework, and no package install required. It uses static HTML pages, shared CSS, plain JavaScript, and CDN-hosted Three.js, GSAP, and Chart.js.

## Full folder structure

```text
.
├── index.html                  # Home / landing page with 3D hero
├── workouts.html               # Workout library and detailed 3D modal
├── analyzer.html               # 3D Body & Form Analyzer simulation
├── nutrition.html              # Macro calculator, meal cards, tracker
├── dashboard.html              # Charts, body composition, photo comparison
├── community.html              # Challenges, leaderboard, mocked feed
├── about.html                  # Brand, mission, implementation notes
├── blog.html                   # Blog / education page
├── assets
│   ├── css
│   │   └── styles.css          # Dark/light theme, responsive UI system
│   ├── js
│   │   ├── main.js             # Header/footer, theme, nav, localStorage
│   │   ├── three-scenes.js     # Hero, exercise viewer, analyzer, 3D body
│   │   ├── workouts.js         # 12 workouts, filters, modal, muscle map
│   │   ├── analyzer.js         # Upload/webcam simulation and corrections
│   │   ├── nutrition.js        # Macro calculator and food tracker
│   │   └── dashboard.js        # Chart.js dashboards and photo uploads
│   ├── data                    # Reserved for future JSON/data files
│   └── models
│       └── README.md           # GLB model placement and sourcing guide
└── README.md
```

## Highlights

- Dark-first premium visual design with electric cyan, lime, and orange accents.
- Fully responsive multi-page static site.
- Interactive Three.js 3D hero with:
  - procedural low-poly human avatar fallback,
  - male/female toggle,
  - squat -> push-up -> pull-up cycle,
  - OrbitControls rotation/zoom,
  - pause and fullscreen controls,
  - cinematic lights, rim accents, neon floor rings.
- Workout library with 12 sample programs across Strength, Hypertrophy, Cardio, Mobility, HIIT, and Beginner categories.
- Workout detail modal with:
  - animated 3D exercise viewer,
  - rep counter overlay,
  - slow-motion toggle,
  - angle switch,
  - video fallback link,
  - SVG muscle map highlights,
  - localStorage progress save.
- 3D Body & Form Analyzer simulation:
  - photo upload placeholder,
  - webcam simulation,
  - body type, skin tone, and outfit color controls,
  - exercise-specific correction cards.
- Nutrition page:
  - macro calculator,
  - meal idea cards,
  - calorie/protein tracker saved to localStorage.
- Dashboard:
  - Chart.js weight, measurement, and strength trends,
  - 3D body composition slider,
  - before/after photo upload preview.
- Community/challenges, About, and Blog pages.
- SEO meta tags on every page.

## Run locally

Because ES modules are used for Three.js imports, serve the folder with a local static server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

Opening files directly from disk may block module imports in some browsers.

## Key files to start with

1. `index.html` - hero markup and landing page content.
2. `assets/js/three-scenes.js` - all 3D scene code.
3. `assets/css/styles.css` - visual system and responsive layout.
4. `workouts.html` and `assets/js/workouts.js` - workout modal and exercise viewer.

## Adding real GLB fitness models

The current site ships with a procedural avatar so it works immediately without binary files. For production, place real GLB files in `assets/models/`:

```text
assets/models/male-athlete.glb
assets/models/female-athlete.glb
assets/models/squat.glb
assets/models/pushup.glb
assets/models/pullup.glb
assets/models/deadlift.glb
assets/models/bench-press.glb
assets/models/burpee.glb
```

Recommended sources:

- **Mixamo** - free rigged characters and starter exercise-like motions.
- **Sketchfab** - free and paid GLB models; check commercial license.
- **CGTrader / TurboSquid** - paid semi-realistic human and fitness models.
- **Ready Player Me** - customizable avatar pipeline with GLB export.
- **Blender + Rigify** - best option for custom low-poly branded models.

Implementation notes for production GLB loading:

1. Import `GLTFLoader` from the Three.js CDN or bundle it in your build system.
2. Replace or augment `makeAvatar()` in `assets/js/three-scenes.js`.
3. Use `AnimationMixer` for skeletal exercise clips.
4. Keep files small:
   - Draco-compress meshes.
   - Use KTX2/Basis-compressed textures.
   - Limit texture resolution to what the camera can see.
   - Prefer shared skeletons and reusable animation clips.
5. Add LODs for mobile and reduce shadow map size on low-power devices.

## Deployment

This can be deployed to any static host:

- Netlify
- Vercel static output
- GitHub Pages
- Cloudflare Pages
- S3 + CloudFront

No build command is required. The publish directory is the repository root.

## Notes

- The pose estimation, social feed, and backend persistence are mocked by design.
- localStorage powers theme, recommendations, tracker entries, and progress saves.
- Unsplash images are used as placeholders; replace with licensed brand photography for production.
