import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/controls/OrbitControls.js";

const palette = {
  skinA: 0xc9855d,
  skinB: 0x8f553f,
  suitMale: 0x151b2f,
  suitFemale: 0x23162f,
  cyan: 0x18e7ff,
  lime: 0xb9ff3d,
  orange: 0xff8a2a,
  white: 0xf5f8ff,
};

function ease(value) {
  return 0.5 - Math.cos(value * Math.PI) / 2;
}

function makeMat(color, emissive = 0x000000, roughness = 0.55) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: emissive ? 0.12 : 0,
    roughness,
    metalness: 0.18,
    flatShading: true,
  });
}

function makeLimb(length, radius, mat, name) {
  const pivot = new THREE.Group();
  pivot.name = name;
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.9, length, 10), mat);
  mesh.position.y = -length / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  pivot.add(mesh);
  return pivot;
}

function makeJoint(radius, mat) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 12), mat);
  mesh.castShadow = true;
  return mesh;
}

function makeAvatar(options = {}) {
  const {
    type = "male",
    skin = palette.skinA,
    outfit = type === "female" ? palette.suitFemale : palette.suitMale,
    accent = palette.cyan,
    bodyFat = 18,
  } = options;

  const avatar = new THREE.Group();
  avatar.name = "VitrusProceduralAvatar";
  avatar.userData.exercise = "squat";
  avatar.userData.type = type;

  const skinMat = makeMat(skin);
  const outfitMat = makeMat(outfit, accent);
  const accentMat = makeMat(accent, accent, 0.35);
  const shoeMat = makeMat(0x05070d);

  const bulk = THREE.MathUtils.clamp((bodyFat - 12) / 40, -0.08, 0.18);
  const torsoScale = type === "female" ? [0.84 + bulk, 1, 0.48 + bulk] : [0.96 + bulk, 1.06, 0.54 + bulk];
  const shoulderWidth = type === "female" ? 0.68 : 0.84;
  const hipWidth = type === "female" ? 0.5 : 0.56;

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 1.28, 6, 14), outfitMat);
  torso.name = "torso";
  torso.position.y = 2.25;
  torso.scale.set(...torsoScale);
  torso.castShadow = true;
  avatar.add(torso);

  const chestLine = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.012, 8, 60), accentMat);
  chestLine.position.set(0, 2.72, 0.015);
  chestLine.rotation.x = Math.PI / 2;
  chestLine.scale.x = shoulderWidth;
  avatar.add(chestLine);

  const neck = makeLimb(0.18, 0.08, skinMat, "neck");
  neck.position.y = 3.08;
  avatar.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(type === "female" ? 0.27 : 0.29, 14, 14), skinMat);
  head.name = "head";
  head.position.y = 3.42;
  head.scale.y = 1.12;
  head.castShadow = true;
  avatar.add(head);

  const hip = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.28, 5, 12), outfitMat);
  hip.position.y = 1.46;
  hip.rotation.z = Math.PI / 2;
  hip.scale.x = type === "female" ? 1.08 : 1;
  avatar.add(hip);

  const parts = {};
  const armLength = type === "female" ? 0.84 : 0.92;
  const legLength = type === "female" ? 1.06 : 1.14;
  const armRadius = type === "female" ? 0.055 : 0.067;
  const legRadius = type === "female" ? 0.08 : 0.095;

  ["left", "right"].forEach((side) => {
    const sign = side === "left" ? -1 : 1;
    const shoulder = new THREE.Group();
    shoulder.name = `${side}Shoulder`;
    shoulder.position.set(sign * shoulderWidth, 2.9, 0);
    avatar.add(shoulder);

    const upperArm = makeLimb(armLength * 0.54, armRadius, outfitMat, `${side}UpperArm`);
    const elbow = makeJoint(armRadius * 1.28, accentMat);
    const lowerArm = makeLimb(armLength * 0.5, armRadius * 0.86, skinMat, `${side}LowerArm`);
    const hand = makeJoint(armRadius * 1.58, skinMat);
    upperArm.position.y = 0;
    elbow.position.y = -armLength * 0.54;
    lowerArm.position.y = -armLength * 0.54;
    hand.position.y = -armLength * 1.04;
    shoulder.add(upperArm, elbow, lowerArm, hand);

    const hipJoint = new THREE.Group();
    hipJoint.name = `${side}Hip`;
    hipJoint.position.set(sign * hipWidth / 2, 1.35, 0);
    avatar.add(hipJoint);

    const upperLeg = makeLimb(legLength * 0.55, legRadius, outfitMat, `${side}UpperLeg`);
    const knee = makeJoint(legRadius * 1.2, accentMat);
    const lowerLeg = makeLimb(legLength * 0.56, legRadius * 0.86, skinMat, `${side}LowerLeg`);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.11, 0.42), shoeMat);
    foot.name = `${side}Foot`;
    foot.position.set(0, -legLength * 1.12, 0.1);
    foot.castShadow = true;
    knee.position.y = -legLength * 0.55;
    lowerLeg.position.y = -legLength * 0.55;
    hipJoint.add(upperLeg, knee, lowerLeg, foot);

    parts[`${side}Shoulder`] = shoulder;
    parts[`${side}LowerArm`] = lowerArm;
    parts[`${side}Hip`] = hipJoint;
    parts[`${side}LowerLeg`] = lowerLeg;
    parts[`${side}Foot`] = foot;
  });

  avatar.userData.parts = parts;
  avatar.userData.baseY = 0;
  avatar.position.y = -0.72;
  avatar.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return avatar;
}

function resetAvatarPose(avatar) {
  avatar.rotation.set(0, 0, 0);
  avatar.position.x = 0;
  avatar.position.z = 0;
  avatar.scale.setScalar(1);
  const p = avatar.userData.parts;
  Object.values(p).forEach((part) => part.rotation.set(0, 0, 0));
  p.leftShoulder.rotation.z = -0.22;
  p.rightShoulder.rotation.z = 0.22;
  p.leftFoot.rotation.x = 0;
  p.rightFoot.rotation.x = 0;
}

function poseAvatar(avatar, exercise, time, speed = 1) {
  resetAvatarPose(avatar);
  const p = avatar.userData.parts;
  const phase = ease((Math.sin(time * speed) + 1) / 2);
  avatar.userData.exercise = exercise;

  if (exercise === "squat") {
    avatar.position.y = -0.72 - phase * 0.48;
    avatar.rotation.x = -phase * 0.12;
    ["left", "right"].forEach((side) => {
      p[`${side}Hip`].rotation.x = -phase * 0.95;
      p[`${side}LowerLeg`].rotation.x = phase * 1.08;
      p[`${side}Shoulder`].rotation.x = -phase * 0.62;
    });
  } else if (exercise === "pushup" || exercise === "plank") {
    avatar.rotation.x = Math.PI / 2 - 0.16;
    avatar.position.y = 0.18 - phase * (exercise === "plank" ? 0.02 : 0.22);
    avatar.position.z = -0.2;
    ["left", "right"].forEach((side) => {
      p[`${side}Shoulder`].rotation.x = -1.36 + phase * 0.48;
      p[`${side}LowerArm`].rotation.x = phase * 0.84;
      p[`${side}Hip`].rotation.x = -0.08;
      p[`${side}LowerLeg`].rotation.x = 0.08;
    });
  } else if (exercise === "pullup") {
    avatar.position.y = -0.42 + phase * 0.64;
    ["left", "right"].forEach((side) => {
      p[`${side}Shoulder`].rotation.z = side === "left" ? -2.72 : 2.72;
      p[`${side}Shoulder`].rotation.x = 0.16;
      p[`${side}LowerArm`].rotation.x = -phase * 0.7;
      p[`${side}Hip`].rotation.x = phase * 0.12;
    });
  } else if (exercise === "deadlift") {
    avatar.rotation.x = -phase * 0.62;
    avatar.position.y = -0.72 - phase * 0.12;
    ["left", "right"].forEach((side) => {
      p[`${side}Hip`].rotation.x = -phase * 0.58;
      p[`${side}LowerLeg`].rotation.x = phase * 0.3;
      p[`${side}Shoulder`].rotation.x = -0.4 - phase * 0.32;
    });
  } else if (exercise === "bench") {
    avatar.rotation.x = Math.PI / 2;
    avatar.position.y = -0.04;
    ["left", "right"].forEach((side) => {
      p[`${side}Shoulder`].rotation.x = -1.42 + phase * 0.9;
      p[`${side}Shoulder`].rotation.z = side === "left" ? -0.54 : 0.54;
      p[`${side}LowerArm`].rotation.x = -0.92 + phase * 0.7;
    });
  } else if (exercise === "burpee") {
    const down = phase;
    avatar.rotation.x = down > 0.52 ? Math.PI / 2 - 0.2 : -down * 0.36;
    avatar.position.y = -0.72 + Math.sin(time * speed * 0.5) * 0.16 - down * 0.25;
    ["left", "right"].forEach((side) => {
      p[`${side}Hip`].rotation.x = -down * 0.9;
      p[`${side}LowerLeg`].rotation.x = down * 0.88;
      p[`${side}Shoulder`].rotation.x = -down * 1.1;
    });
  } else {
    avatar.position.y = -0.72 + Math.sin(time * speed) * 0.04;
  }
}

function addEnvironment(scene) {
  scene.background = new THREE.Color(0x05070d);
  scene.fog = new THREE.Fog(0x05070d, 7, 18);

  const hemi = new THREE.HemisphereLight(0x8adfff, 0x05070d, 0.55);
  scene.add(hemi);

  const key = new THREE.SpotLight(0xffffff, 2.25, 16, 0.58, 0.32, 1.4);
  key.position.set(-4, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);

  const cyan = new THREE.PointLight(palette.cyan, 2.6, 8);
  cyan.position.set(3.4, 2.5, 2.6);
  scene.add(cyan);

  const lime = new THREE.PointLight(palette.lime, 1.55, 7);
  lime.position.set(-3, 1.4, -2.2);
  scene.add(lime);

  const orange = new THREE.PointLight(palette.orange, 1.25, 8);
  orange.position.set(0, 3.2, -4);
  scene.add(orange);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(4.3, 72),
    new THREE.MeshStandardMaterial({
      color: 0x0b111f,
      roughness: 0.75,
      metalness: 0.18,
      transparent: true,
      opacity: 0.88,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.84;
  floor.receiveShadow = true;
  scene.add(floor);

  [1.6, 2.45, 3.22].forEach((radius, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.01, 8, 120),
      new THREE.MeshBasicMaterial({
        color: [palette.cyan, palette.lime, palette.orange][index],
        transparent: true,
        opacity: 0.4,
      }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.81 + index * 0.01;
    scene.add(ring);
  });

  const grid = new THREE.GridHelper(8, 24, 0x18e7ff, 0x1b263c);
  grid.position.y = -0.82;
  grid.material.transparent = true;
  grid.material.opacity = 0.2;
  scene.add(grid);
}

function createBaseScene(container, options = {}) {
  const scene = new THREE.Scene();
  addEnvironment(scene);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0.2, 2.18, 6.3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.append(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = options.autoRotate ?? true;
  controls.autoRotateSpeed = 0.7;
  controls.minDistance = 3.2;
  controls.maxDistance = 9;
  controls.target.set(0, 1.35, 0);

  let avatar = makeAvatar(options.avatar || {});
  scene.add(avatar);

  const bar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 2.4, 16),
    new THREE.MeshStandardMaterial({ color: palette.white, metalness: 0.75, roughness: 0.28 }),
  );
  bar.name = "exerciseProp";
  bar.rotation.z = Math.PI / 2;
  bar.position.set(0, 3.75, 0.02);
  scene.add(bar);

  const clock = new THREE.Clock();
  let playing = true;
  let exercise = options.exercise || "squat";
  let speed = options.speed || 1.35;
  let elapsed = 0;
  let repCount = 0;
  let lastRepBucket = 0;

  function resize() {
    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width, 240);
    const height = Math.max(rect.height, 320);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function tick() {
    requestAnimationFrame(tick);
    const delta = clock.getDelta();
    if (playing) {
      elapsed += delta;
      poseAvatar(avatar, exercise, elapsed, speed);
      const bucket = Math.floor(elapsed * speed / (Math.PI * 2));
      if (bucket > lastRepBucket) {
        repCount += 1;
        lastRepBucket = bucket;
        container.dispatchEvent(new CustomEvent("vitrus:rep", { detail: { reps: repCount } }));
      }
    }
    const prop = scene.getObjectByName("exerciseProp");
    if (prop) {
      prop.visible = exercise === "pullup" || exercise === "bench" || exercise === "deadlift";
      if (exercise === "deadlift") prop.position.set(0, 0.1, 0.34);
      if (exercise === "bench") prop.position.set(0, 1.16, 0.15);
      if (exercise === "pullup") prop.position.set(0, 3.75, 0.02);
    }
    controls.update();
    renderer.render(scene, camera);
  }

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();
  tick();

  return {
    scene,
    camera,
    renderer,
    controls,
    avatar,
    setExercise(nextExercise) {
      exercise = nextExercise;
      repCount = 0;
      lastRepBucket = 0;
      elapsed = 0;
      container.dispatchEvent(new CustomEvent("vitrus:exercise", { detail: { exercise } }));
      container.dispatchEvent(new CustomEvent("vitrus:rep", { detail: { reps: 0 } }));
    },
    setAvatar(nextOptions) {
      scene.remove(avatar);
      avatar = makeAvatar(nextOptions);
      scene.add(avatar);
      this.avatar = avatar;
    },
    setSpeed(nextSpeed) {
      speed = nextSpeed;
    },
    togglePause() {
      playing = !playing;
      return playing;
    },
    setPlaying(nextPlaying) {
      playing = nextPlaying;
    },
    fullscreen() {
      if (container.requestFullscreen) container.requestFullscreen();
    },
    dispose() {
      observer.disconnect();
      renderer.dispose();
    },
  };
}

function initHero() {
  const stage = document.querySelector("[data-hero-three]");
  if (!stage) return;
  const scene = createBaseScene(stage, { exercise: "squat", avatar: { type: "male" }, autoRotate: true });
  stage._vitrusScene = scene;

  const sequence = ["squat", "pushup", "pullup"];
  let activeIndex = 0;
  const label = document.querySelector("[data-hero-exercise]");
  const names = { squat: "Squat mechanics", pushup: "Push-up tempo", pullup: "Pull-up control" };
  setInterval(() => {
    if (stage.dataset.locked === "true") return;
    activeIndex = (activeIndex + 1) % sequence.length;
    scene.setExercise(sequence[activeIndex]);
    if (label) label.textContent = names[sequence[activeIndex]];
  }, 6200);

  document.addEventListener("click", (event) => {
    const modelButton = event.target.closest("[data-hero-model]");
    if (modelButton) {
      document.querySelectorAll("[data-hero-model]").forEach((btn) => btn.classList.remove("active"));
      modelButton.classList.add("active");
      scene.setAvatar({
        type: modelButton.dataset.heroModel,
        skin: modelButton.dataset.heroModel === "female" ? palette.skinB : palette.skinA,
        outfit: modelButton.dataset.heroModel === "female" ? palette.suitFemale : palette.suitMale,
      });
    }

    const action = event.target.closest("[data-three-action]");
    if (!action || action.dataset.target !== "hero") return;
    if (action.dataset.threeAction === "pause") {
      const isPlaying = scene.togglePause();
      stage.dataset.locked = isPlaying ? "false" : "true";
      action.textContent = isPlaying ? "Pause" : "Resume";
    }
    if (action.dataset.threeAction === "fullscreen") scene.fullscreen();
  });
}

function initExerciseViewer(selector = "[data-exercise-three]") {
  document.querySelectorAll(selector).forEach((stage) => {
    if (stage._vitrusScene) return;
    const scene = createBaseScene(stage, {
      exercise: stage.dataset.exercise || "squat",
      speed: Number(stage.dataset.speed || 1.2),
      avatar: { type: stage.dataset.model || "male" },
      autoRotate: false,
    });
    stage._vitrusScene = scene;
    stage.addEventListener("vitrus:rep", (event) => {
      const output = stage.closest(".exercise-viewer")?.querySelector("[data-rep-count]");
      if (output) output.textContent = `${event.detail.reps} reps`;
    });
  });
}

function initAnalyzer() {
  const stage = document.querySelector("[data-analyzer-three]");
  if (!stage) return;
  const scene = createBaseScene(stage, { exercise: "squat", avatar: { type: "female", skin: palette.skinB }, autoRotate: true, speed: 0.9 });
  stage._vitrusScene = scene;

  const inputs = document.querySelectorAll("[data-avatar-option]");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const type = document.querySelector("[name='bodyType']")?.value || "female";
      const tone = document.querySelector("[name='skinTone']")?.value || "#8f553f";
      const outfit = document.querySelector("[name='outfitColor']")?.value || "#23162f";
      scene.setAvatar({
        type,
        skin: new THREE.Color(tone).getHex(),
        outfit: new THREE.Color(outfit).getHex(),
      });
    });
  });
}

function initComposition() {
  const stage = document.querySelector("[data-composition-three]");
  if (!stage) return;
  const slider = document.querySelector("[data-body-fat]");
  const output = document.querySelector("[data-body-fat-output]");
  const scene = createBaseScene(stage, {
    exercise: "squat",
    avatar: { type: "male", bodyFat: Number(slider?.value || 18) },
    speed: 0.65,
    autoRotate: true,
  });
  stage._vitrusScene = scene;

  slider?.addEventListener("input", () => {
    const bodyFat = Number(slider.value);
    if (output) output.textContent = `${bodyFat}%`;
    scene.setAvatar({ type: "male", bodyFat });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initExerciseViewer();
  initAnalyzer();
  initComposition();
});

window.Vitrus3D = {
  initHero,
  initExerciseViewer,
  initAnalyzer,
  initComposition,
  createBaseScene,
};
