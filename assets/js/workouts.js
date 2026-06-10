const workouts = [
  {
    id: "apex-strength-45",
    title: "Apex Strength 45",
    category: "Strength",
    difficulty: "Intermediate",
    duration: "45 min",
    muscles: ["glutes", "quads", "core"],
    exercise: "squat",
    image: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=900&q=80",
    summary: "A progressive full-body lift day built around squat mechanics, loaded carries, and controlled tempo.",
    steps: [
      "Warm up with 6 minutes of nasal-breathing mobility and three bodyweight squat sets.",
      "Complete 5 working squat sets at an RPE of 7 to 8 while keeping ribs stacked over pelvis.",
      "Pair each set with 8 slow push-ups to reinforce trunk stiffness.",
      "Finish with loaded carries and a 3 minute cooldown walk.",
    ],
  },
  {
    id: "hypertrophy-upper",
    title: "Hypertrophy Upper",
    category: "Hypertrophy",
    difficulty: "Advanced",
    duration: "52 min",
    muscles: ["chest", "shoulders", "triceps"],
    exercise: "bench",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80",
    summary: "High-tension pressing, upper-back volume, and slow eccentrics for measurable muscle gain.",
    steps: [
      "Prime shoulders with band pull-aparts and scapular wall slides.",
      "Perform bench press sets with a 3 second lowering phase and explosive press.",
      "Superset incline presses with chest-supported rows for balanced shoulders.",
      "Log the top set and save your pump score after the finisher.",
    ],
  },
  {
    id: "metabolic-ignite",
    title: "Metabolic Ignite",
    category: "HIIT",
    difficulty: "Intermediate",
    duration: "28 min",
    muscles: ["core", "quads", "shoulders"],
    exercise: "burpee",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
    summary: "A low-equipment interval session that spikes output while protecting joint positions.",
    steps: [
      "Cycle 40 seconds of burpees, 20 seconds of rest, and repeat for six rounds.",
      "Keep hands under shoulders and step back if jumping compromises trunk control.",
      "Use the rep overlay as your pacing target instead of sprinting the first minute.",
      "Recover with box breathing until heart rate settles below 120 bpm.",
    ],
  },
  {
    id: "mobility-flow-20",
    title: "Mobility Flow 20",
    category: "Mobility",
    difficulty: "Beginner",
    duration: "20 min",
    muscles: ["hips", "spine", "shoulders"],
    exercise: "plank",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
    summary: "Joint-friendly movement quality work for hips, thoracic spine, shoulders, and breathing.",
    steps: [
      "Start with 90/90 hip switches and slow nasal breathing.",
      "Move through plank shoulder taps without shifting hips.",
      "Add thoracic rotations while keeping the low back quiet.",
      "End with long exhales in a deep squat hold.",
    ],
  },
  {
    id: "pull-power",
    title: "Pull Power",
    category: "Strength",
    difficulty: "Advanced",
    duration: "38 min",
    muscles: ["lats", "biceps", "core"],
    exercise: "pullup",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=900&q=80",
    summary: "Pull-up strength, hollow-body control, and upper-back density in one focused session.",
    steps: [
      "Hang for 30 seconds, then complete scapular pull-ups to set shoulder position.",
      "Perform controlled pull-ups with a one-second pause above the bar.",
      "Use assisted reps when form drops before the rep target.",
      "Finish with isometric holds at the top, middle, and bottom positions.",
    ],
  },
  {
    id: "deadlift-engine",
    title: "Deadlift Engine",
    category: "Strength",
    difficulty: "Advanced",
    duration: "50 min",
    muscles: ["hamstrings", "glutes", "back"],
    exercise: "deadlift",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=900&q=80",
    summary: "Posterior-chain power with hinge pattern coaching and grip endurance finishers.",
    steps: [
      "Build the hinge with dowel reps: head, ribs, and pelvis stay connected.",
      "Deadlift five triples with perfect bar path and full foot pressure.",
      "Keep lats locked by imagining oranges squeezed under the armpits.",
      "Finish with hamstring sliders and suitcase carries.",
    ],
  },
  {
    id: "zone-two-run",
    title: "Zone 2 Run Lab",
    category: "Cardio",
    difficulty: "Beginner",
    duration: "35 min",
    muscles: ["heart", "calves", "quads"],
    exercise: "squat",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=80",
    summary: "Aerobic base work with cadence checks and recovery scoring for sustainable fat loss.",
    steps: [
      "Warm up with brisk walking until breathing is smooth.",
      "Run at a conversational pace for 25 minutes.",
      "Keep cadence light and shoulders quiet.",
      "Log perceived effort, distance, and recovery notes.",
    ],
  },
  {
    id: "beginner-reset",
    title: "Beginner Reset",
    category: "Beginner",
    difficulty: "Beginner",
    duration: "30 min",
    muscles: ["full body", "core", "hips"],
    exercise: "squat",
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=80",
    summary: "A confidence-building first program with simple movement standards and recovery windows.",
    steps: [
      "Practice squat, hinge, push, pull, and carry patterns without rushing.",
      "Stop each set with two clean reps left in reserve.",
      "Rest until breathing is calm enough to speak in full sentences.",
      "Save your session to unlock the next recommendation.",
    ],
  },
  {
    id: "core-armor",
    title: "Core Armor",
    category: "Mobility",
    difficulty: "Intermediate",
    duration: "24 min",
    muscles: ["core", "obliques", "hips"],
    exercise: "plank",
    image: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=900&q=80",
    summary: "Anti-extension and anti-rotation work that transfers directly into stronger lifts.",
    steps: [
      "Hold a hard-style plank for 20 seconds, rest, and repeat six times.",
      "Add slow shoulder taps without pelvis rotation.",
      "Move to dead bugs and keep low ribs down.",
      "Retest plank quality through the 3D analyzer.",
    ],
  },
  {
    id: "lower-body-build",
    title: "Lower Body Build",
    category: "Hypertrophy",
    difficulty: "Intermediate",
    duration: "48 min",
    muscles: ["glutes", "quads", "hamstrings"],
    exercise: "squat",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=900&q=80",
    summary: "Volume-driven lower-body training with unilateral balance and quad-dominant finishers.",
    steps: [
      "Start with split squat isometrics to open hips and activate glutes.",
      "Squat with a controlled descent and consistent depth.",
      "Add walking lunges and Romanian deadlifts.",
      "Finish with a two-minute wall sit for mental toughness.",
    ],
  },
  {
    id: "athletic-conditioning",
    title: "Athletic Conditioning",
    category: "HIIT",
    difficulty: "Advanced",
    duration: "32 min",
    muscles: ["full body", "core", "shoulders"],
    exercise: "burpee",
    image: "https://images.unsplash.com/photo-1517963628607-235ccdd5476c?auto=format&fit=crop&w=900&q=80",
    summary: "Power intervals for athletes who need repeatable speed, clean landings, and fast recovery.",
    steps: [
      "Complete three rounds of jumps, sprawls, carries, and shuttle runs.",
      "Keep landing noise low and knees tracking over toes.",
      "Use the timer for 30 seconds on and 30 seconds off.",
      "Stop before movement quality breaks down.",
    ],
  },
  {
    id: "recovery-restore",
    title: "Recovery Restore",
    category: "Mobility",
    difficulty: "Beginner",
    duration: "18 min",
    muscles: ["spine", "hips", "breath"],
    exercise: "plank",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
    summary: "Downshift your nervous system with breath-led mobility and low-intensity tissue work.",
    steps: [
      "Spend three minutes on slow crocodile breathing.",
      "Flow through cat-cow, child's pose reaches, and hip flexor rocks.",
      "Keep intensity below a four out of ten.",
      "Write one recovery note in the dashboard.",
    ],
  },
];

const muscleGroups = {
  chest: ["chest"],
  shoulders: ["shoulders"],
  triceps: ["arms"],
  biceps: ["arms"],
  lats: ["back"],
  back: ["back"],
  core: ["core"],
  obliques: ["core"],
  glutes: ["glutes"],
  hips: ["glutes"],
  quads: ["quads"],
  hamstrings: ["hamstrings"],
  calves: ["calves"],
  "full body": ["chest", "shoulders", "arms", "back", "core", "glutes", "quads", "hamstrings", "calves"],
};

function muscleMapSvg(activeMuscles) {
  const active = new Set(activeMuscles.flatMap((m) => muscleGroups[m.toLowerCase()] || []));
  const cls = (name) => `muscle ${active.has(name) ? "active" : ""}`;
  return `
    <svg class="muscle-svg" viewBox="0 0 150 220" role="img" aria-label="Targeted muscle map">
      <ellipse class="${cls("shoulders")}" cx="75" cy="43" rx="38" ry="13"/>
      <rect class="${cls("chest")}" x="51" y="52" width="48" height="34" rx="13"/>
      <rect class="${cls("back")}" x="43" y="88" width="64" height="38" rx="16"/>
      <rect class="${cls("core")}" x="58" y="77" width="34" height="58" rx="12"/>
      <rect class="${cls("arms")}" x="25" y="55" width="18" height="70" rx="9"/>
      <rect class="${cls("arms")}" x="107" y="55" width="18" height="70" rx="9"/>
      <ellipse class="${cls("glutes")}" cx="75" cy="132" rx="33" ry="17"/>
      <rect class="${cls("quads")}" x="50" y="142" width="20" height="52" rx="10"/>
      <rect class="${cls("quads")}" x="80" y="142" width="20" height="52" rx="10"/>
      <rect class="${cls("hamstrings")}" x="33" y="143" width="14" height="48" rx="7"/>
      <rect class="${cls("hamstrings")}" x="103" y="143" width="14" height="48" rx="7"/>
      <rect class="${cls("calves")}" x="52" y="192" width="16" height="24" rx="8"/>
      <rect class="${cls("calves")}" x="82" y="192" width="16" height="24" rx="8"/>
    </svg>
  `;
}

function renderWorkoutCards(filter = "All") {
  const grid = document.querySelector("[data-workout-grid]");
  if (!grid) return;
  const visible = filter === "All" ? workouts : workouts.filter((item) => item.category === filter);
  grid.innerHTML = visible.map((item) => `
    <article class="card workout-card hover" data-workout-id="${item.id}" tabindex="0" role="button" aria-label="Open ${item.title}">
      <img src="${item.image}" alt="${item.title} training image" loading="lazy">
      <div class="workout-card-content">
        <div>
          <span class="eyebrow ${item.category === "HIIT" ? "orange" : item.category === "Mobility" ? "lime" : ""}">${item.category}</span>
          <h3 style="margin-top:14px">${item.title}</h3>
          <p>${item.summary}</p>
        </div>
        <div class="metric-line"><span>${item.difficulty}</span><span>${item.duration}</span></div>
        <div class="tag-row">${item.muscles.map((m) => `<span class="tag">${m}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

function openWorkoutModal(id) {
  const item = workouts.find((workout) => workout.id === id);
  const modal = document.querySelector("[data-workout-modal]");
  if (!item || !modal) return;

  modal.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-label="${item.title}">
      <div class="modal-head">
        <div>
          <span class="eyebrow">${item.category}</span>
          <h2 style="font-size:clamp(2rem,4vw,3.8rem);margin-top:12px">${item.title}</h2>
          <p>${item.summary}</p>
          <div class="tag-row">
            <span class="tag">${item.difficulty}</span>
            <span class="tag">${item.duration}</span>
            ${item.muscles.map((m) => `<span class="tag">${m}</span>`).join("")}
          </div>
        </div>
        <button class="icon-button" data-close-modal aria-label="Close workout modal">x</button>
      </div>
      <div class="modal-body">
        <div class="exercise-viewer">
          <div class="three-stage" data-exercise-three data-exercise="${item.exercise}"></div>
          <div class="viewer-overlay">
            <span class="rep-pill" data-rep-count>0 reps</span>
            <div class="viewer-controls">
              <button class="model-button" data-viewer-control="slow">Slow motion</button>
              <button class="model-button" data-viewer-control="pause">Pause</button>
              <button class="model-button" data-viewer-control="angle">Angle</button>
              <button class="model-button" data-viewer-control="fullscreen">Fullscreen</button>
            </div>
          </div>
        </div>
        <aside class="grid">
          <div>
            <h3>Step-by-step coaching</h3>
            <ol class="instructions">${item.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
          </div>
          <div class="muscle-map">
            ${muscleMapSvg(item.muscles)}
            <div>
              <span class="mini-label">Muscle map</span>
              <h3>Primary targets</h3>
              <p>Highlighted zones show where you should feel controlled tension during the movement.</p>
            </div>
          </div>
          <div class="card pad">
            <span class="mini-label">Video fallback</span>
            <p>Embed your coaching video here when production footage is available. The 3D viewer remains the primary demonstration.</p>
            <a class="btn secondary" href="https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " exercise form")}" target="_blank" rel="noreferrer">Open video search</a>
          </div>
          <button class="btn" data-save-progress="${item.title}">Save workout progress</button>
        </aside>
      </div>
    </div>
  `;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  window.Vitrus?.initFallbackModels?.(modal);

  const bootViewer = () => {
    if (window.Vitrus3D?.initExerciseViewer) {
      window.Vitrus3D.initExerciseViewer("[data-workout-modal] [data-exercise-three]");
    } else {
      setTimeout(bootViewer, 60);
    }
  };
  bootViewer();
}

function initWorkoutPage() {
  const filterShell = document.querySelector("[data-workout-filters]");
  if (!filterShell) return;
  const categories = ["All", ...new Set(workouts.map((item) => item.category))];
  filterShell.innerHTML = categories.map((category) => `<button class="filter-btn ${category === "All" ? "active" : ""}" data-filter="${category}">${category}</button>`).join("");
  renderWorkoutCards();

  document.addEventListener("click", (event) => {
    const filter = event.target.closest("[data-filter]");
    if (filter) {
      document.querySelectorAll("[data-filter]").forEach((btn) => btn.classList.remove("active"));
      filter.classList.add("active");
      renderWorkoutCards(filter.dataset.filter);
    }

    const card = event.target.closest("[data-workout-id]");
    if (card) openWorkoutModal(card.dataset.workoutId);

    const modal = event.target.closest("[data-workout-modal]");
    if (event.target.matches("[data-close-modal]") || event.target === modal) {
      document.querySelector("[data-workout-modal]")?.classList.remove("open");
      document.body.style.overflow = "";
    }

    const control = event.target.closest("[data-viewer-control]");
    if (control) {
      const stage = document.querySelector("[data-workout-modal] [data-exercise-three]");
      const scene = stage?._vitrusScene;
      if (!scene) return;
      if (control.dataset.viewerControl === "slow") {
        const slow = control.classList.toggle("active");
        scene.setSpeed(slow ? 0.42 : 1.2);
      }
      if (control.dataset.viewerControl === "pause") {
        const playing = scene.togglePause();
        control.textContent = playing ? "Pause" : "Resume";
      }
      if (control.dataset.viewerControl === "angle") {
        scene.camera.position.x = scene.camera.position.x > 0 ? -4 : 4;
      }
      if (control.dataset.viewerControl === "fullscreen") scene.fullscreen();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelector("[data-workout-modal]")?.classList.remove("open");
      document.body.style.overflow = "";
    }
    if (event.key === "Enter" && event.target.matches("[data-workout-id]")) {
      openWorkoutModal(event.target.dataset.workoutId);
    }
  });
}

document.addEventListener("DOMContentLoaded", initWorkoutPage);
window.VitrusWorkouts = { workouts, openWorkoutModal };
