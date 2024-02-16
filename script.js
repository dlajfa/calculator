const LIMIT = 10;

const screen = document.querySelector('#screen');

let current, previous, operator, error;

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
      current = key.value;
    } else if (current.length < LIMIT) {
      current += key.value;
    }
    display();
  });
});


// Decimal Key
const decimalKey = document.querySelector('.decimal');

decimalKey.addEventListener('click', () => {
  if (current === '') {
    current = '0.';
  } else if (!current.includes('.') && current.length < LIMIT - 1) {
    current += '.';
  }
  display();
});


// Equals Key
const equalsKey = document.querySelector('.equals');

equalsKey.addEventListener('click', () => {
  if (operator && current) {
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
    if (operator && current) {
      calculate();
    }
    display();

    operator = key.value;
    previous = current;
    current = '';
  });
});


// Initial State
function init() {
  current = '';
  operator = '';
  previous = '';
  error = false;
  display();
}


// Display Function
function display() {
  if (error) {
    screen.textContent = 'Error';
  } else {
    screen.textContent = current.slice(0, LIMIT) || '0';
  }
}


// Calculate Function
function calculate() {
  const previousNumber = Number(previous);
  const currentNumber = Number(current);
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
    current = String(result);
  } else {
    error = true;
  }
}
