const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

let expression = "";
let shouldResetDisplay = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("number")) {
      if (shouldResetDisplay) {
        display.value = "";
        shouldResetDisplay = false;
      }
      display.value += value;
    }

    if (button.classList.contains("operator")) {
      if (display.value === "" && value !== "-") return;

      if (display.value !== "") {
        expression = display.value + value;
        display.value += value;
      }
    }

    if (button.classList.contains("decimal")) {
      if (shouldResetDisplay) {
        display.value = "0.";
        shouldResetDisplay = false;
        return;
      }

      if (!display.value.includes(".")) {
        display.value += ".";
      }
    }

    if (button.classList.contains("clear")) {
      display.value = "";
      expression = "";
    }

    if (button.classList.contains("equals")) {
      try {
        const result = Function('"use strict";return (' + display.value + ')')();
        display.value = result;
        expression = "";
      } catch {
        display.value = "Error";
      }
      shouldResetDisplay = true;
    }
  });
});
