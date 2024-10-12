import "./style.css";
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Stepper";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "👣";
app.append(button);

let steps: number = 0;
const counterText = document.createElement("h3");
function updateCounter() {
  counterText.innerHTML = steps.toFixed(2) + " step";
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

button.addEventListener("click", () => {
  step();
});

let zero = performance.now();
requestAnimationFrame(autoStepper);
// Runs every frame
function autoStepper() {
  const elapsedTime = (performance.now() - zero) / 1000; // 1000 milliseconds in a second
  console.log(elapsedTime); // This is the fraction of a second that has passed since the last frame
  steps += elapsedTime;
  updateCounter();
  zero = performance.now();
  requestAnimationFrame(autoStepper);
}
