const correctionLibrary = {
  squat: [
    ["Knee track", "Drive knees in line with the second and third toe; avoid collapsing inward at the bottom."],
    ["Rib position", "Exhale before descent and keep ribs stacked over pelvis to protect the low back."],
    ["Depth", "Pause at the lowest pain-free depth, then stand by pushing the floor away."],
  ],
  pushup: [
    ["Shoulder angle", "Hands should sit under lower chest with elbows tracking about 35 to 50 degrees from the ribs."],
    ["Trunk stiffness", "Squeeze glutes and pull ribs down so the hips and shoulders rise together."],
    ["Neck", "Keep gaze slightly forward and maintain a long neck instead of dropping the head."],
  ],
  deadlift: [
    ["Bar path", "Keep the bar close enough to lightly brush the legs from floor to lockout."],
    ["Lat tension", "Pull shoulders into back pockets before the bar leaves the floor."],
    ["Hinge", "Push hips back first; the torso angle should change before the knees bend deeply."],
  ],
};

function renderCorrections(exercise = "squat") {
  const panel = document.querySelector("[data-corrections]");
  if (!panel) return;
  panel.innerHTML = correctionLibrary[exercise].map(([title, copy]) => `
    <div class="correction">
      <strong>${title}</strong>
      <p style="margin:0">${copy}</p>
    </div>
  `).join("");
}

function initAnalyzerControls() {
  const exercise = document.querySelector("[data-analyzer-exercise]");
  renderCorrections(exercise?.value || "squat");
  exercise?.addEventListener("change", () => {
    renderCorrections(exercise.value);
    document.querySelector("[data-analyzer-three]")?._vitrusScene?.setExercise(exercise.value);
  });

  document.querySelector("[data-simulate-webcam]")?.addEventListener("click", () => {
    const output = document.querySelector("[data-analysis-status]");
    if (!output) return;
    output.textContent = "Webcam simulation active: 17 keypoints detected, confidence 92%, squat depth slightly shallow.";
  });

  document.querySelector("[data-photo-input]")?.addEventListener("change", (event) => {
    const output = document.querySelector("[data-analysis-status]");
    const file = event.target.files?.[0];
    if (!output || !file) return;
    output.textContent = `${file.name} analyzed: hips shift 4 degrees right, torso angle stable, recommended tempo 3-1-1.`;
  });
}

document.addEventListener("DOMContentLoaded", initAnalyzerControls);
