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
const counterDisplay = document.createElement("h3");
function updateCounterDisplay() {
  counterDisplay.innerHTML = steps.toFixed(1) + " step";
  if (steps != 1) {
    counterDisplay.innerHTML += "s";
  }
}
updateCounterDisplay();
app.append(counterDisplay);

function step(distance: number) {
  steps += distance;
  updateCounterDisplay();
  updateRateDisplay();
  updateUpgradeAvailability();
}

stepButton.addEventListener("click", () => {
  step(1);
});

let zero = performance.now();
let autoRate = 0;
requestAnimationFrame(autoStepper);
function autoStepper() {
  const distance = ((performance.now() - zero) / 1000) * autoRate; // 1000 milliseconds in a second
  step(distance);
  zero = performance.now();
  requestAnimationFrame(autoStepper);
}

const rateDisplay = document.createElement("h4");
function updateRateDisplay() {
  rateDisplay.innerHTML = autoRate.toFixed(1) + " steps/sec";
}
updateRateDisplay();
app.append(rateDisplay);

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
}
const upgrades: Upgrade[] = [
  { name: "🩴", cost: 10, rate: 0.1 },
  { name: "🥾", cost: 100, rate: 2 },
  { name: "👟", cost: 1000, rate: 50 },
];

class UpgradeDisplay {
  cost: number;
  button: HTMLButtonElement;
  amount: number;

  constructor(upgrade: Upgrade) {
    const button = document.createElement("button");
    button.innerHTML = upgrade.name;
    button.disabled = true;
    app.append(button);

    const amountDisplay = document.createElement("h5");
    amountDisplay.innerHTML = "0";
    app.append(amountDisplay);

    button.addEventListener("click", () => {
      steps -= this.cost;
      this.cost *= 1.15;
      autoRate += upgrade.rate;
      this.amount++;
      amountDisplay.innerHTML = this.amount.toString();
    });

    this.cost = upgrade.cost;
    this.button = button;
    this.amount = 0;
    return this;
  }
}

// Create all upgrade buttons
const upgradeButtons: UpgradeDisplay[] = [];
for (let i = 0; i < upgrades.length; i++) {
  upgradeButtons[i] = new UpgradeDisplay(upgrades[i]);
}

function hasSteps(val: number) {
  return steps >= val;
}

function updateUpgradeAvailability() {
  for (let i = 0; i < upgradeButtons.length; i++) {
    upgradeButtons[i].button.disabled = !hasSteps(upgradeButtons[i].cost);
  }
}
