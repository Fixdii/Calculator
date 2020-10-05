class Calculator {
  clear(id) {
    if (id === "AC") {
      display.value = "0";
      MemoryNewNumber = true;
    } else if (id === "DEL") {
      display.value = display.value.toString().slice(0, -1);
       MemoryNewNumber = true;
    }
  }

  operation(op) {
    let localOperationMemory = display.value;
    if (MemoryNewNumber && MemoryPendingOperation != "=") {
      display.value = MemoryCurrentNumder;
    } else {
      MemoryNewNumber = true;
      switch (MemoryPendingOperation) {
        case "+":
          MemoryCurrentNumder += +localOperationMemory;
          break;
        case "-":
          MemoryCurrentNumder += +localOperationMemory;
          break;
        case "*":
          MemoryCurrentNumder *= +localOperationMemory;
          break;
        case "÷":
          MemoryCurrentNumder /= +localOperationMemory;
          break;
        default:
          MemoryCurrentNumder = +localOperationMemory;
      }
      display.value = MemoryCurrentNumder;
      MemoryPendingOperation = op;
    }
  }

  numberPress(number) {
    if (MemoryNewNumber) {
      if (number === ".") {
        display.value = "0.";
      } else {
        display.value = number;
        MemoryNewNumber = false;
      }
    } else {
      if (display.value === "0") {
        display.value = number;
        if (number === ".") {
          display.value = "0.";
        }
      } else {
        display.value += number;
      }
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelectorAll("[data-equals]");
const deleteButton = document.querySelectorAll("[data-delete]");
const display = document.getElementById("display");
console.log(display.value);
const previousOperandTextElement = document.querySelectorAll(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelectorAll(
  "[data-current-operand]"
);
let MemoryCurrentNumder = 0,
  MemoryNewNumber = false,
  MemoryPendingOperation = "";

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.numberPress(button.textContent);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.operation(button.textContent);
  });
});

deleteButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.clear(button.id);
  });
});
