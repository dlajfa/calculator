const LIMIT = 11;

const screen = document.querySelector('#screen');

let operand, memory, operator, error;

init();


// Clear Button
const clearKey = document.querySelector('.clear');

clearKey.addEventListener('click', () => {
  init();
});


// Number Keys
const numberKeys = document.querySelectorAll('.number');

numberKeys.forEach((key) => {
  key.addEventListener('click', () => {
    if (operand === '0') {
      operand = key.value;
    } else if (operand.length < LIMIT) {
      operand += key.value;
    }
    display();
  });
});


// Decimal Key
const decimalKey = document.querySelector('.decimal');

decimalKey.addEventListener('click', () => {
  if (operand === '') {
    operand = '0.';
  } else if (!operand.includes('.') && operand.length < LIMIT - 1) {
    operand += '.';
  }
  display();
});


// Unary Operators
const unaryKeys = document.querySelectorAll('.unary');

unaryKeys.forEach((key) => {
  key.addEventListener('click', () => {
    if (key.value === '-') {
      if (Number(operand) < 0) {
        operand = operand.slice(1);
      } else if (Number(operand) > 0) {
        operand = '-' + operand;
      }
    } else if (key.value === '%') {
      operand = String(Number(operand) / 100);
    }
    display();
  });
});


// Binary Operators
const binaryKeys = document.querySelectorAll('.binary');

binaryKeys.forEach((key) => {
  key.addEventListener('click', () => {
    if (memory && operator && operand) {
      calculate();
      display();
    } 
    if (operand) {
      memory = operand;
    }
    operand = '';
    operator = key.value;
  });
});


// Equals Key
const equalsKey = document.querySelector('.equals');

equalsKey.addEventListener('click', () => {
  if (operator && operand) {
    calculate();
    display();
  }
  operator = '';
});


// Initial State
function init() {
  operand = '';
  operator = '';
  memory = '';
  error = false;
  display();
}


// Display Function
function display() {
  console.log(operand, operator, memory);
  if (error) {
    screen.textContent = 'Error';
  } else {
    screen.textContent = operand.slice(0, LIMIT) || '0';
  }
}


// Calculate Function
function calculate() {
  const previousNumber = Number(memory);
  const currentNumber = Number(operand);
  let result;
  if (operator === '+') {
    result = previousNumber + currentNumber;
  } else if (operator === '-') {
    result = previousNumber - currentNumber;
  } else if (operator === '*') {
    result = previousNumber * currentNumber;
  } else if (operator === '/') {
    result = previousNumber / currentNumber;
  }
  if (isFinite(result)) {
    operand = String(result);
  } else {
    error = true;
  }
}
