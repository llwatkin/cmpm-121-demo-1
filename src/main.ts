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
  counterText.innerHTML = steps + " step";
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

setInterval(step, 1000);
