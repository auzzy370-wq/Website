function calculateMacros({ sex, age, height, weight, activity, goal }) {
  const base = sex === "female"
    ? 10 * weight + 6.25 * height - 5 * age - 161
    : 10 * weight + 6.25 * height - 5 * age + 5;
  const multipliers = { low: 1.35, moderate: 1.55, high: 1.78 };
  const goalAdjust = { fatloss: -420, maintain: 0, muscle: 320 };
  const calories = Math.round(base * multipliers[activity] + goalAdjust[goal]);
  const protein = Math.round(weight * (goal === "muscle" ? 2.1 : 1.8));
  const fat = Math.round((calories * 0.27) / 9);
  const carbs = Math.max(90, Math.round((calories - protein * 4 - fat * 9) / 4));
  return { calories, protein, carbs, fat };
}

const meals = [
  {
    title: "Neon Protein Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    macros: "610 kcal / 46P / 62C / 18F",
    copy: "Chicken, jasmine rice, mango salsa, greens, avocado, and lime yogurt sauce.",
  },
  {
    title: "Recovery Salmon Plate",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
    macros: "720 kcal / 52P / 58C / 30F",
    copy: "Omega-3 rich salmon with sweet potato, asparagus, and fermented slaw.",
  },
  {
    title: "Lean Mass Oats",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=900&q=80",
    macros: "540 kcal / 38P / 70C / 13F",
    copy: "Protein oats with berries, almond butter, chia, cinnamon, and sea salt.",
  },
  {
    title: "Plant Power Wrap",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80",
    macros: "590 kcal / 34P / 74C / 16F",
    copy: "Tempeh, hummus, crunchy vegetables, pickled onion, and herbs.",
  },
];

function renderMacroResult(result) {
  const output = document.querySelector("[data-macro-output]");
  if (!output) return;
  output.innerHTML = `
    <div class="macro-box"><strong>${result.calories}</strong><span>Calories</span></div>
    <div class="macro-box"><strong>${result.protein}g</strong><span>Protein</span></div>
    <div class="macro-box"><strong>${result.carbs}g</strong><span>Carbs</span></div>
    <div class="macro-box"><strong>${result.fat}g</strong><span>Fat</span></div>
  `;
}

function initMacroCalculator() {
  const form = document.querySelector("[data-macro-form]");
  if (!form) return;
  const saved = window.Vitrus?.getStoredState().macros;
  if (saved) renderMacroResult(saved);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const result = calculateMacros({
      sex: data.get("sex"),
      age: Number(data.get("age")),
      height: Number(data.get("height")),
      weight: Number(data.get("weight")),
      activity: data.get("activity"),
      goal: data.get("goal"),
    });
    window.Vitrus?.setStoredState({ macros: result });
    renderMacroResult(result);
  });
}

function initMealCards() {
  const grid = document.querySelector("[data-meal-grid]");
  if (!grid) return;
  grid.innerHTML = meals.map((meal) => `
    <article class="card media-card hover">
      <img src="${meal.image}" alt="${meal.title}" loading="lazy">
      <div class="card-content">
        <h3>${meal.title}</h3>
        <p>${meal.copy}</p>
        <span class="tag">${meal.macros}</span>
      </div>
    </article>
  `).join("");
}

function getTracker() {
  return window.Vitrus?.getStoredState().tracker || [];
}

function saveTracker(items) {
  window.Vitrus?.setStoredState({ tracker: items });
}

function renderTracker() {
  const list = document.querySelector("[data-tracker-list]");
  const totals = document.querySelector("[data-tracker-totals]");
  if (!list || !totals) return;
  const items = getTracker();
  const sum = items.reduce((acc, item) => {
    acc.calories += item.calories;
    acc.protein += item.protein;
    return acc;
  }, { calories: 0, protein: 0 });
  list.innerHTML = items.length
    ? items.map((item, index) => `
      <div class="leaderboard-row">
        <span class="rank">${index + 1}</span>
        <div><strong>${item.name}</strong><p style="margin:3px 0 0">${item.calories} kcal / ${item.protein}g protein</p></div>
        <button class="model-button" data-remove-food="${index}">Remove</button>
      </div>
    `).join("")
    : `<p>No foods logged yet. Add your first meal to simulate backend progress saving.</p>`;
  totals.innerHTML = `
    <div class="macro-box"><strong>${sum.calories}</strong><span>Logged calories</span></div>
    <div class="macro-box"><strong>${sum.protein}g</strong><span>Logged protein</span></div>
    <div class="macro-box"><strong>${Math.max(0, 2200 - sum.calories)}</strong><span>Default remaining</span></div>
  `;
}

function initTracker() {
  const form = document.querySelector("[data-tracker-form]");
  if (!form) return;
  renderTracker();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const next = [
      ...getTracker(),
      {
        name: data.get("food"),
        calories: Number(data.get("calories")),
        protein: Number(data.get("protein")),
      },
    ];
    saveTracker(next);
    form.reset();
    renderTracker();
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-food]");
    if (!button) return;
    const items = getTracker();
    items.splice(Number(button.dataset.removeFood), 1);
    saveTracker(items);
    renderTracker();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMacroCalculator();
  initMealCards();
  initTracker();
});
