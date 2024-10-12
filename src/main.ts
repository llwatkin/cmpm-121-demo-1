import "./style.css";
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Stepper";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const stepButton = document.createElement("button");
stepButton.innerHTML = "👣";
app.append(stepButton);

let steps: number = 0;
const counterText = document.createElement("h3");
function updateCounter() {
  counterText.innerHTML = steps.toFixed(0) + " step";
  if (steps != 1) {
    counterText.innerHTML += "s";
  }
}
updateCounter();
app.append(counterText);

function step() {
  steps++;
  updateCounter();
}

stepButton.addEventListener("click", () => {
  step();
});

let zero = performance.now();
let autoRate = 0;
requestAnimationFrame(autoStepper);
// Runs every frame
function autoStepper() {
  const elapsedTime = ((performance.now() - zero) / 1000) * autoRate; // 1000 milliseconds in a second
  steps += elapsedTime;
  updateCounter();
  zero = performance.now();
  updateUpgradeAvailability();
  requestAnimationFrame(autoStepper);
}

const upgrade1Button = document.createElement("button");
upgrade1Button.innerHTML = "🧦";
upgrade1Button.disabled = true;
app.append(upgrade1Button);

function hasSteps(val: number) {
  return steps >= val;
}

function updateUpgradeAvailability() {
  upgrade1Button.disabled = !hasSteps(10);
}

upgrade1Button.addEventListener("click", () => {
  steps -= 10;
  autoRate += 1;
});
