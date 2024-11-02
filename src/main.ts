import "./style.css";
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fishing";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const unit = "fish";
const unit_emoji = "🐟";
const incrementButton = document.createElement("button");
incrementButton.innerHTML = unit_emoji;
incrementButton.style.fontSize = "60px";
incrementButton.style.padding = "0px";
app.append(incrementButton);

let total: number = 0;
const counterDisplay = document.createElement("h3");
function updateCounterDisplay() {
  counterDisplay.innerHTML = total.toFixed(0) + " " + unit;
}
updateCounterDisplay();
app.append(counterDisplay);

let autoRate = 0;
const rateDisplay = document.createElement("h4");
function updateRateDisplay() {
  rateDisplay.innerHTML = autoRate.toFixed(1) + " " + unit + "/sec";
}
updateRateDisplay();
app.append(rateDisplay);

interface Upgrade {
  name: string;
  desc: string;
  cost: number;
  rate: number;
}

const upgrades: Upgrade[] = [
  {
    name: "🧍Fisher",
    desc: "A dedicated worker that catches 1 fish every 10 seconds.",
    cost: 10,
    rate: 0.1,
  },
  {
    name: "🛶 Canoe",
    desc: "A trusty boat for reaching more fish.",
    cost: 100,
    rate: 2,
  },
  {
    name: "⛵ Sailboat",
    desc: "A faster boat for reaching more fish.",
    cost: 1000,
    rate: 50,
  },
  {
    name: "🚤 Speedboat",
    desc: "A speedy boat with fish detection technology.",
    cost: 5000,
    rate: 150,
  },
  {
    name: "🛥️ Motorboat",
    desc: "A large, speedy boat with netting.",
    cost: 10000,
    rate: 500,
  },
];

const COST_MULTIPLIER = 1.15;

class UpgradeDisplay {
  cost: number;
  button: HTMLButtonElement;
  amount: number;

  constructor(upgrade: Upgrade) {
    const button = document.createElement("button");
    button.innerHTML = upgrade.name;
    button.disabled = true;
    app.append(button);

    const costDisplay = document.createElement("h5");
    costDisplay.innerHTML = upgrade.cost + "x " + unit_emoji;
    costDisplay.style.margin = "5px";
    button.append(costDisplay);

    const descDisplay = document.createElement("h6");
    descDisplay.innerHTML = upgrade.desc;
    descDisplay.style.margin = "5px";
    button.append(descDisplay);

    const amountDisplay = document.createElement("h4");
    amountDisplay.innerHTML = "0";
    amountDisplay.style.margin = "0px";
    button.append(amountDisplay);

    button.addEventListener("click", () => {
      total -= this.cost;
      this.cost *= COST_MULTIPLIER;
      autoRate += upgrade.rate;
      this.amount++;
      amountDisplay.innerHTML = this.amount.toString();
      costDisplay.innerHTML = this.cost.toFixed(1) + "x " + unit_emoji;
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

function canBuy(val: number): boolean {
  return total >= val;
}

function updateUpgradeAvailability() {
  for (let i = 0; i < upgradeButtons.length; i++) {
    upgradeButtons[i].button.disabled = !canBuy(upgradeButtons[i].cost);
  }
}

function increment(amount: number) {
  total += amount;
  updateCounterDisplay();
  updateRateDisplay();
  updateUpgradeAvailability();
}

incrementButton.addEventListener("click", () => {
  increment(1);
});

let lastTimestamp = performance.now();
const ONE_SECOND = 1000; // 1000 milliseconds
requestAnimationFrame(autoIncrement);
function autoIncrement() {
  const distance =
    ((performance.now() - lastTimestamp) / ONE_SECOND) * autoRate;
  increment(distance);
  lastTimestamp = performance.now();
  requestAnimationFrame(autoIncrement);
}
