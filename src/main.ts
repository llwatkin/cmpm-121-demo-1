import "./style.css";
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fishing";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const incrementButton = document.createElement("button");
incrementButton.innerHTML = "🐟";
app.append(incrementButton);

let total: number = 0;
const unit = "fish";
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
    name: "🛶Canoe",
    desc: "A trusty boat for reaching more fish.",
    cost: 100,
    rate: 2,
  },
  {
    name: "⛵Sailboat",
    desc: "A faster boat for reaching more fish.",
    cost: 1000,
    rate: 50,
  },
  {
    name: "🚤Speedboat",
    desc: "A speedy boat with fish detection technology.",
    cost: 5000,
    rate: 150,
  },
  {
    name: "🛥️Motorboat",
    desc: "A large, speedy boat with netting.",
    cost: 10000,
    rate: 500,
  },
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

    const descDisplay = document.createElement("h6");
    descDisplay.innerHTML = upgrade.desc;
    app.append(descDisplay);

    button.addEventListener("click", () => {
      total -= this.cost;
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

let zero = performance.now();
requestAnimationFrame(autoIncrement);
function autoIncrement() {
  const distance = ((performance.now() - zero) / 1000) * autoRate;
  increment(distance);
  zero = performance.now();
  requestAnimationFrame(autoIncrement);
}
