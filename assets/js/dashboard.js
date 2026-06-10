const chartDefaults = {
  color: "#98a3b7",
  borderColor: "rgba(255,255,255,0.1)",
  grid: { color: "rgba(255,255,255,0.08)" },
};

function makeLineChart(id, label, labels, values, color) {
  const canvas = document.getElementById(id);
  if (!canvas || !window.Chart) return;
  return new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label,
        data: values,
        borderColor: color,
        backgroundColor: `${color}25`,
        fill: true,
        tension: 0.42,
        pointRadius: 4,
        pointHoverRadius: 7,
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: chartDefaults.color } } },
      scales: {
        x: { ticks: { color: chartDefaults.color }, grid: chartDefaults.grid },
        y: { ticks: { color: chartDefaults.color }, grid: chartDefaults.grid },
      },
    },
  });
}

function initCharts() {
  makeLineChart("weightChart", "Body weight", ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], [204, 199, 194, 190, 187, 183], "#18e7ff");
  makeLineChart("strengthChart", "Strength PR score", ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], [280, 292, 305, 325, 338, 352], "#b9ff3d");
  makeLineChart("measurementChart", "Waist measurement", ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], [38, 37.2, 36.4, 35.8, 35.1, 34.6], "#ff8a2a");
}

function initProgressInputs() {
  const form = document.querySelector("[data-progress-form]");
  const list = document.querySelector("[data-progress-list]");
  if (!form || !list) return;

  function render() {
    const state = window.Vitrus?.getStoredState().customProgress || [];
    list.innerHTML = state.length
      ? state.map((item) => `
        <div class="leaderboard-row">
          <span class="rank">${item.metric.slice(0, 1).toUpperCase()}</span>
          <div><strong>${item.metric}</strong><p style="margin:3px 0 0">${item.value} logged ${item.date}</p></div>
          <span class="tag">saved</span>
        </div>
      `).join("")
      : `<p>Log a metric to simulate backend persistence through localStorage.</p>`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const item = {
      metric: data.get("metric"),
      value: data.get("value"),
      date: new Date().toLocaleDateString(),
    };
    const current = window.Vitrus?.getStoredState().customProgress || [];
    window.Vitrus?.setStoredState({ customProgress: [item, ...current].slice(0, 6) });
    form.reset();
    render();
  });

  render();
}

function initPhotoUploads() {
  document.querySelectorAll("[data-photo-upload]").forEach((input) => {
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return;
      const target = document.querySelector(input.dataset.photoUpload);
      if (!target) return;
      const url = URL.createObjectURL(file);
      target.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url("${url}")`;
      target.style.backgroundSize = "cover";
      target.style.backgroundPosition = "center";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  initProgressInputs();
  initPhotoUploads();
});
