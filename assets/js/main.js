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

function fallbackMarkup(exercise = "squat") {
  const label = exerciseLabels[exercise] || "Workout demo";
  return `
    <div class="fallback-avatar" data-exercise="${exercise}" aria-label="Animated 3D exercise fallback model" role="img">
      <span class="fallback-label"><strong>${label}</strong><small>animated movement pattern</small></span>
      <span class="fallback-part fallback-head"></span>
      <span class="fallback-part fallback-torso"></span>
      <span class="fallback-part fallback-arm left"></span>
      <span class="fallback-part fallback-arm right"></span>
      <span class="fallback-part fallback-forearm left"></span>
      <span class="fallback-part fallback-forearm right"></span>
      <span class="fallback-part fallback-leg left"></span>
      <span class="fallback-part fallback-leg right"></span>
      <span class="fallback-part fallback-shin left"></span>
      <span class="fallback-part fallback-shin right"></span>
      <span class="fallback-phase"></span>
    </div>
  `;
}

function updateFallbackExercise(stage, exercise) {
  const avatar = stage?.querySelector(".fallback-avatar");
  if (!avatar) return;
  avatar.dataset.exercise = exercise;
  const label = avatar.querySelector(".fallback-label strong");
  if (label) label.textContent = exerciseLabels[exercise] || "Workout demo";
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
