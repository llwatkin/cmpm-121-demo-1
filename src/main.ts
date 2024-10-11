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
counterText.innerHTML = steps + " steps";
app.append(counterText);
button.addEventListener("click", () => {
  steps++;
  counterText.innerHTML = steps + " steps";
});
