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
let autoRate = 0;
requestAnimationFrame(autoIncrement);
function autoIncrement() {
  const distance = ((performance.now() - zero) / 1000) * autoRate; // 1000 milliseconds in a second
  increment(distance);
  zero = performance.now();
  requestAnimationFrame(autoIncrement);
}

const rateDisplay = document.createElement("h4");
function updateRateDisplay() {
  rateDisplay.innerHTML = autoRate.toFixed(1) + " " + unit + "/sec";
}
updateRateDisplay();
app.append(rateDisplay);

// Already did step 9 when I did step 6
interface Upgrade {
  name: string;
  cost: number;
  rate: number;
}

const upgrades: Upgrade[] = [
  { name: "🧍", cost: 10, rate: 0.1 },
  { name: "🛶", cost: 100, rate: 2 },
  { name: "⛵", cost: 1000, rate: 50 },
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
