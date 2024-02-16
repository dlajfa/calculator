const LIMIT = 10;

const screen = document.querySelector('#screen');

let current, previous, operator;

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
    if (current === '0') {
      current = '';
    }
    if (current.length < LIMIT) {
      current += key.value;
    }
    display();
  });
});


// Decimal Key
const decimalKey = document.querySelector('.decimal');

decimalKey.addEventListener('click', () => {
  if (!current.includes('.') && current.length < LIMIT - 1) {
    current += '.';
    display();
  }
});


// Equals Key
const equalsKey = document.querySelector('.equals');

equalsKey.addEventListener('click', () => {
  if (operator) {
    calculate();
  }
  operator = '';
  display();
});


// Unary Operators
const unaryKeys = document.querySelectorAll('.unary');

unaryKeys.forEach((key) => {
  key.addEventListener('click', () => {
    if (key.value === '-') {
      if (Number(current) < 0) {
        current = current.slice(1);
      } else if (Number(current) > 0) {
        current = '-' + current;
      }
    } else if (key.value === '%') {
      current = String(Number(current) / 100);
    }
    display();
  });
});


// Binary Operators
const binaryKeys = document.querySelectorAll('.binary');

binaryKeys.forEach((key) => {
  key.addEventListener('click', () => {
    if (operator) {
      calculate();
    }
    display();

    operator = key.value;
    previous = current;
    current = '0';
  });
});


// Initial State
function init() {
  current = '0';
  operator = '';
  previous = '';
  display();
}


// Display Function
function display() {
  screen.textContent = current;
}


// Calculate Function
function calculate() {
  const previousNumber = Number(previous);
  const currentNumber = Number(current);
  if (operator === '+') {
    current = String(previousNumber + currentNumber);
  } else if (operator === '-') {
    current = String(previousNumber - currentNumber);
  } else if (operator === '*') {
    current = String(previousNumber * currentNumber);
  } else if (operator === '/') {
    current = String(previousNumber / currentNumber);
  }
}
