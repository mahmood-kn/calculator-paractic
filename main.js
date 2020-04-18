let buffer = "0";
let screen = document.getElementById("input");
let previosOperator;
let runningTotal = 0;

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNum(value);
  }
  rerender();
}

function handleNum(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "=":
      if (previosOperator === null) {
        return;
      }
      flushOperator(parseInt(buffer));
      previosOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "+":
    case "-":
    case "÷":
    case "×":
      handelMath(value);
      break;
  }
}

function handelMath(value) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperator(intBuffer);
  }
  previosOperator = value;

  buffer = "0";
}

function flushOperator(intBuffer) {
  if (previosOperator === "+") {
    runningTotal += intBuffer;
  } else if (previosOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previosOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".calc-btn")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}
init();
