const VITRUS_STORAGE_KEY = "vitrus-state-v1";

const iconPaths = {
  bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>',
  dumbbell: '<path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  play: '<path d="m5 3 14 9-14 9V3Z"/>',
  pause: '<path d="M8 5v14"/><path d="M16 5v14"/>',
  maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-.75-.36-1.5-.91-1.98C11.5 11.56 11 10.23 11 9c-1.5 1-2.5 2.55-2.5 5.5Z"/><path d="M12 2C8 5 5 8.5 5 13a7 7 0 0 0 14 0c0-3.5-2-6.5-5-9 .5 2-.5 3.5-2 5 .5-2-1-4.5 0-7Z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.bolt}</svg>`;
}

function renderChrome() {
  const current = document.body.dataset.page || "home";
  const links = [
    ["home", "index.html", "Home"],
    ["workouts", "workouts.html", "Workouts"],
    ["analyzer", "analyzer.html", "3D Analyzer"],
    ["nutrition", "nutrition.html", "Nutrition"],
    ["dashboard", "dashboard.html", "Dashboard"],
    ["community", "community.html", "Community"],
    ["about", "about.html", "About"],
  ];

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container nav-shell">
      <a class="brand" href="index.html" aria-label="VITRUS home">
        <span class="brand-mark">${icon("bolt")}</span>
        <span>VITRUS</span>
      </a>
      <nav class="nav-links" aria-label="Primary navigation">
        ${links.map(([key, href, label]) => `<a class="${current === key ? "active" : ""}" href="${href}">${label}</a>`).join("")}
      </nav>
      <div class="nav-actions">
        <button class="icon-button" data-theme-toggle aria-label="Toggle theme">${icon("moon")}</button>
        <a class="btn desktop-cta" href="workouts.html">Start Training</a>
        <button class="menu-button" data-menu-toggle aria-label="Open menu">${icon("menu")}</button>
      </div>
    </div>
  `;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html"><span class="brand-mark">${icon("bolt")}</span><span>VITRUS</span></a>
          <p style="max-width:460px;margin-top:16px">Science-based training, nutrition, 3D form feedback, and progress tracking for people who want a stronger body and sharper mind.</p>
        </div>
        <div class="footer-links">
          <strong>Platform</strong>
          <a href="workouts.html">Workout library</a>
          <a href="analyzer.html">3D form analyzer</a>
          <a href="nutrition.html">Meal planner</a>
          <a href="dashboard.html">Progress dashboard</a>
        </div>
        <div class="footer-links">
          <strong>Company</strong>
          <a href="community.html">Community</a>
          <a href="about.html">About</a>
          <a href="blog.html">Blog</a>
          <a href="README.md">Model guide</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} VITRUS Performance Lab. Static demo, production-ready structure.</span>
        <span>Train in 3D. Track in Real Time. Transform Forever.</span>
      </div>
    </div>
  `;
  document.body.append(footer);
}

function getStoredState() {
  try {
    return JSON.parse(localStorage.getItem(VITRUS_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function setStoredState(partial) {
  const next = { ...getStoredState(), ...partial };
  localStorage.setItem(VITRUS_STORAGE_KEY, JSON.stringify(next));
  return next;
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  const button = document.querySelector("[data-theme-toggle]");
  if (button) {
    button.innerHTML = icon(theme === "light" ? "sun" : "moon");
  }
}

function initTheme() {
  const state = getStoredState();
  applyTheme(state.theme || "dark");
  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-theme-toggle]");
    if (!toggle) return;
    const nextTheme = document.documentElement.classList.contains("light") ? "dark" : "light";
    setStoredState({ theme: nextTheme });
    applyTheme(nextTheme);
  });
}

function initMenu() {
  document.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-menu-toggle]");
    const navLink = event.target.closest(".nav-links a");
    if (menuButton) {
      document.body.classList.toggle("nav-open");
    }
    if (navLink) {
      document.body.classList.remove("nav-open");
    }
  });
}

function initReveals() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    revealEls.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
}

function initCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count || 0);
    let start;
    const duration = 1200;
    const step = (timestamp) => {
      start ||= timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = Math.round(end * progress).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function initRecommendationForm() {
  const form = document.querySelector("[data-recommendation-form]");
  const output = document.querySelector("[data-recommendation-output]");
  if (!form || !output) return;

  const rules = {
    strength: "Start with Apex Strength 45, add two mobility primers, and retest your top set every third week.",
    muscle: "Run the Hypertrophy Split with controlled eccentrics and a 250 calorie surplus from the macro planner.",
    fatloss: "Pair Metabolic Ignite with Zone 2 cardio and keep protein above 0.8g per lb of body weight.",
    mobility: "Use Mobility Flow 20 daily, then graduate to loaded mobility circuits after pain-free ranges improve.",
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const goal = data.get("goal") || "strength";
    const days = Number(data.get("days") || 3);
    const level = data.get("level") || "intermediate";
    const recommendation = `${rules[goal]} Recommended cadence: ${days} training days per week at ${level} intensity.`;
    setStoredState({ recommendation: { goal, days, level, recommendation } });
    output.textContent = recommendation;
  });

  const saved = getStoredState().recommendation;
  if (saved?.recommendation) output.textContent = saved.recommendation;
}

function initLocalProgressButtons() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-save-progress]");
    if (!button) return;
    const state = getStoredState();
    const completed = Number(state.completedWorkouts || 0) + 1;
    setStoredState({ completedWorkouts: completed, lastWorkout: button.dataset.saveProgress });
    button.textContent = `Saved (${completed})`;
  });
}

const exerciseLabels = {
  squat: "Squat demo",
  pushup: "Push-up demo",
  pullup: "Pull-up demo",
  deadlift: "Deadlift demo",
  bench: "Bench press demo",
  plank: "Plank hold demo",
  burpee: "Burpee demo",
};

const poseLibrary = {
  squat: {
    cue: "knees track, hips descend",
    a: {
      head: [120, 54], neck: [120, 88], shoulderL: [82, 102], shoulderR: [158, 102],
      elbowL: [72, 142], elbowR: [168, 142], handL: [92, 162], handR: [148, 162],
      hipL: [96, 176], hipR: [144, 176], kneeL: [96, 246], kneeR: [144, 246],
      footL: [84, 316], footR: [156, 316],
    },
    b: {
      head: [120, 82], neck: [120, 116], shoulderL: [82, 132], shoulderR: [158, 132],
      elbowL: [70, 164], elbowR: [170, 164], handL: [94, 160], handR: [146, 160],
      hipL: [92, 214], hipR: [148, 214], kneeL: [72, 258], kneeR: [168, 258],
      footL: [84, 316], footR: [156, 316],
    },
  },
  pushup: {
    cue: "body lowers as one line",
    a: {
      head: [196, 152], neck: [174, 160], shoulderL: [148, 150], shoulderR: [150, 170],
      elbowL: [128, 210], elbowR: [132, 222], handL: [112, 258], handR: [120, 268],
      hipL: [84, 150], hipR: [84, 170], kneeL: [48, 154], kneeR: [48, 172],
      footL: [18, 160], footR: [18, 178],
    },
    b: {
      head: [196, 190], neck: [174, 196], shoulderL: [148, 188], shoulderR: [150, 208],
      elbowL: [128, 228], elbowR: [132, 238], handL: [112, 258], handR: [120, 268],
      hipL: [84, 188], hipR: [84, 208], kneeL: [48, 190], kneeR: [48, 208],
      footL: [18, 160], footR: [18, 178],
    },
  },
  pullup: {
    cue: "chin rises above bar",
    prop: "pullup",
    a: {
      head: [120, 120], neck: [120, 152], shoulderL: [92, 160], shoulderR: [148, 160],
      elbowL: [78, 96], elbowR: [162, 96], handL: [86, 46], handR: [154, 46],
      hipL: [100, 230], hipR: [140, 230], kneeL: [96, 286], kneeR: [144, 286],
      footL: [98, 330], footR: [142, 330],
    },
    b: {
      head: [120, 82], neck: [120, 114], shoulderL: [92, 126], shoulderR: [148, 126],
      elbowL: [78, 82], elbowR: [162, 82], handL: [86, 46], handR: [154, 46],
      hipL: [100, 196], hipR: [140, 196], kneeL: [96, 254], kneeR: [144, 254],
      footL: [98, 300], footR: [142, 300],
    },
  },
  deadlift: {
    cue: "hinge, brace, stand tall",
    prop: "deadlift",
    a: {
      head: [124, 70], neck: [124, 104], shoulderL: [96, 116], shoulderR: [152, 116],
      elbowL: [94, 168], elbowR: [158, 168], handL: [92, 236], handR: [166, 236],
      hipL: [100, 184], hipR: [146, 184], kneeL: [100, 252], kneeR: [148, 252],
      footL: [86, 318], footR: [164, 318],
    },
    b: {
      head: [164, 126], neck: [146, 150], shoulderL: [120, 158], shoulderR: [174, 158],
      elbowL: [112, 202], elbowR: [184, 202], handL: [102, 250], handR: [196, 250],
      hipL: [94, 194], hipR: [144, 194], kneeL: [104, 256], kneeR: [152, 256],
      footL: [86, 318], footR: [164, 318],
    },
  },
  bench: {
    cue: "press from chest to lockout",
    prop: "bench",
    a: {
      head: [58, 204], neck: [84, 204], shoulderL: [104, 194], shoulderR: [104, 216],
      elbowL: [102, 164], elbowR: [124, 164], handL: [102, 140], handR: [126, 140],
      hipL: [166, 200], hipR: [184, 218], kneeL: [196, 252], kneeR: [212, 268],
      footL: [202, 318], footR: [224, 318],
    },
    b: {
      head: [58, 204], neck: [84, 204], shoulderL: [104, 194], shoulderR: [104, 216],
      elbowL: [104, 128], elbowR: [126, 128], handL: [104, 88], handR: [126, 88],
      hipL: [166, 200], hipR: [184, 218], kneeL: [196, 252], kneeR: [212, 268],
      footL: [202, 318], footR: [224, 318],
    },
  },
  plank: {
    cue: "long spine, forearms grounded",
    a: {
      head: [192, 174], neck: [170, 180], shoulderL: [144, 172], shoulderR: [146, 194],
      elbowL: [120, 232], elbowR: [132, 238], handL: [100, 250], handR: [116, 260],
      hipL: [84, 174], hipR: [84, 196], kneeL: [48, 178], kneeR: [48, 198],
      footL: [18, 182], footR: [18, 202],
    },
    b: {
      head: [190, 170], neck: [168, 176], shoulderL: [144, 170], shoulderR: [146, 192],
      elbowL: [120, 232], elbowR: [132, 238], handL: [100, 250], handR: [116, 260],
      hipL: [84, 172], hipR: [84, 194], kneeL: [48, 176], kneeR: [48, 196],
      footL: [18, 182], footR: [18, 202],
    },
  },
  burpee: {
    cue: "stand, sprawl, reset",
    a: {
      head: [120, 56], neck: [120, 90], shoulderL: [84, 106], shoulderR: [156, 106],
      elbowL: [68, 144], elbowR: [172, 144], handL: [92, 164], handR: [148, 164],
      hipL: [98, 178], hipR: [142, 178], kneeL: [98, 248], kneeR: [142, 248],
      footL: [84, 318], footR: [156, 318],
    },
    b: {
      head: [190, 182], neck: [168, 188], shoulderL: [142, 180], shoulderR: [144, 202],
      elbowL: [122, 232], elbowR: [132, 242], handL: [104, 266], handR: [116, 274],
      hipL: [82, 184], hipR: [82, 206], kneeL: [48, 190], kneeR: [48, 210],
      footL: [18, 188], footR: [18, 208],
    },
  },
};

function pointValues(poseA, poseB, key, index) {
  return `${poseA[key][index]};${poseB[key][index]};${poseA[key][index]}`;
}

function animatedLine(name, from, to, poseA, poseB, className = "coach-bone") {
  return `
    <line class="${className} ${name}" x1="${poseA[from][0]}" y1="${poseA[from][1]}" x2="${poseA[to][0]}" y2="${poseA[to][1]}">
      <animate attributeName="x1" values="${pointValues(poseA, poseB, from, 0)}" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="y1" values="${pointValues(poseA, poseB, from, 1)}" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="${pointValues(poseA, poseB, to, 0)}" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="${pointValues(poseA, poseB, to, 1)}" dur="1.8s" repeatCount="indefinite"/>
    </line>
  `;
}

function animatedJoint(name, poseA, poseB, radius = 5) {
  return `
    <circle class="coach-joint" cx="${poseA[name][0]}" cy="${poseA[name][1]}" r="${radius}">
      <animate attributeName="cx" values="${pointValues(poseA, poseB, name, 0)}" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="${pointValues(poseA, poseB, name, 1)}" dur="1.8s" repeatCount="indefinite"/>
    </circle>
  `;
}

function animatedHead(poseA, poseB) {
  return `
    <circle class="coach-head" cx="${poseA.head[0]}" cy="${poseA.head[1]}" r="18">
      <animate attributeName="cx" values="${pointValues(poseA, poseB, "head", 0)}" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="${pointValues(poseA, poseB, "head", 1)}" dur="1.8s" repeatCount="indefinite"/>
    </circle>
  `;
}

function propMarkup(config, poseA, poseB) {
  if (config.prop === "pullup") {
    return `<line class="coach-prop" x1="58" y1="42" x2="182" y2="42"/><line class="coach-prop weak" x1="62" y1="42" x2="62" y2="18"/><line class="coach-prop weak" x1="178" y1="42" x2="178" y2="18"/>`;
  }
  if (config.prop === "deadlift") {
    return `
      <line class="coach-prop" x1="${poseA.handL[0] - 18}" y1="${poseA.handL[1] + 8}" x2="${poseA.handR[0] + 18}" y2="${poseA.handR[1] + 8}">
        <animate attributeName="x1" values="${poseA.handL[0] - 18};${poseB.handL[0] - 18};${poseA.handL[0] - 18}" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="y1" values="${poseA.handL[1] + 8};${poseB.handL[1] + 8};${poseA.handL[1] + 8}" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="${poseA.handR[0] + 18};${poseB.handR[0] + 18};${poseA.handR[0] + 18}" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="${poseA.handR[1] + 8};${poseB.handR[1] + 8};${poseA.handR[1] + 8}" dur="1.8s" repeatCount="indefinite"/>
      </line>
    `;
  }
  if (config.prop === "bench") {
    return `
      <line class="coach-prop weak" x1="52" y1="232" x2="194" y2="232"/>
      <line class="coach-prop" x1="${poseA.handL[0] - 22}" y1="${poseA.handL[1]}" x2="${poseA.handR[0] + 22}" y2="${poseA.handR[1]}">
        <animate attributeName="y1" values="${poseA.handL[1]};${poseB.handL[1]};${poseA.handL[1]}" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="${poseA.handR[1]};${poseB.handR[1]};${poseA.handR[1]}" dur="1.8s" repeatCount="indefinite"/>
      </line>
    `;
  }
  return "";
}

function fallbackSvg(exercise = "squat") {
  const config = poseLibrary[exercise] || poseLibrary.squat;
  const { a, b } = config;
  const bones = [
    ["shoulders", "shoulderL", "shoulderR", "coach-bone accent"],
    ["torso-left", "shoulderL", "hipL", "coach-bone torso"],
    ["torso-right", "shoulderR", "hipR", "coach-bone torso"],
    ["pelvis", "hipL", "hipR", "coach-bone accent"],
    ["upper-arm-left", "shoulderL", "elbowL"],
    ["lower-arm-left", "elbowL", "handL"],
    ["upper-arm-right", "shoulderR", "elbowR"],
    ["lower-arm-right", "elbowR", "handR"],
    ["upper-leg-left", "hipL", "kneeL"],
    ["lower-leg-left", "kneeL", "footL"],
    ["upper-leg-right", "hipR", "kneeR"],
    ["lower-leg-right", "kneeR", "footR"],
  ];
  const joints = ["neck", "shoulderL", "shoulderR", "elbowL", "elbowR", "handL", "handR", "hipL", "hipR", "kneeL", "kneeR", "footL", "footR"];

  return `
    <svg class="fallback-coach" viewBox="0 0 240 360" aria-hidden="true">
      <defs>
        <radialGradient id="coachGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#18e7ff" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#18e7ff" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="coachBone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18e7ff"/>
          <stop offset="52%" stop-color="#f5f8ff"/>
          <stop offset="100%" stop-color="#b9ff3d"/>
        </linearGradient>
      </defs>
      <ellipse class="coach-floor" cx="120" cy="330" rx="84" ry="16"/>
      <ellipse class="coach-aura" cx="120" cy="178" rx="104" ry="142"/>
      ${propMarkup(config, a, b)}
      ${animatedLine("neck", "head", "neck", a, b, "coach-bone neck")}
      ${bones.map(([name, from, to, className]) => animatedLine(name, from, to, a, b, className)).join("")}
      ${animatedHead(a, b)}
      ${joints.map((joint) => animatedJoint(joint, a, b, ["handL", "handR", "footL", "footR"].includes(joint) ? 4 : 5)).join("")}
    </svg>
  `;
}

function fallbackMarkup(exercise = "squat") {
  const label = exerciseLabels[exercise] || "Workout demo";
  const cue = (poseLibrary[exercise] || poseLibrary.squat).cue;
  return `
    <div class="fallback-avatar fallback-svg-avatar" data-exercise="${exercise}" aria-label="${label}" role="img">
      <span class="fallback-label"><strong>${label}</strong><small>${cue}</small></span>
      ${fallbackSvg(exercise)}
      <span class="fallback-phase"></span>
    </div>
  `;
}

function updateFallbackExercise(stage, exercise) {
  const avatar = stage?.querySelector(".fallback-avatar");
  if (!avatar) return;
  avatar.outerHTML = fallbackMarkup(exercise);
}

function ensureFallbackModel(stage) {
  const exercise = stage.dataset.exercise || stage.dataset.analyzerExercise || "squat";
  if (!stage || stage.querySelector(".fallback-avatar")) {
    updateFallbackExercise(stage, exercise);
    return;
  }
  stage.insertAdjacentHTML("afterbegin", fallbackMarkup(exercise));
}

function initFallbackModels(root = document) {
  root
    .querySelectorAll("[data-hero-three], [data-exercise-three], [data-analyzer-three], [data-composition-three]")
    .forEach(ensureFallbackModel);
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  initTheme();
  initMenu();
  initReveals();
  initCounters();
  initRecommendationForm();
  initLocalProgressButtons();
  initFallbackModels();
});

window.Vitrus = {
  icon,
  getStoredState,
  setStoredState,
  ensureFallbackModel,
  initFallbackModels,
  updateFallbackExercise,
};
