const calculator = document.querySelector('.former');
const keys = document.querySelector('.buttons');
const display = document.querySelector('.display');
const state = calculator.dataset;

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === 'add') return firstNum + secondNum;
  if (operator === 'subtract') return firstNum - secondNum;
  if (operator === 'multiply')return firstNum * secondNum;
  if (operator === 'divide') return firstNum / secondNum;
};

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return 'number';
  if (action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide') return 'operator';
  return action;
};

const createResultString = (key, displayedNum, state) => {
  const keyType = getKeyType(key);
  const keyContent = key.textContent;
  const {
    firstValue,
    modValue,
    operator,
    previousKeyType
  } = state;

  if (keyType === 'number') {

    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate' ? keyContent : displayedNum + keyContent;
  }

  if (keyType === 'decimal') {
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
    if (!displayedNum.includes('.')) return displayedNum + '.';
    return displayedNum;
  }

  if (keyType === 'operator') {
    console.log('operator');
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate' ? calculate(firstValue, operator, displayedNum) : displayedNum;
  }

  if (keyType === 'clear') return 0;

  if (keyType === 'calculate') {
    return !firstValue
      ? displayedNum
      : previousKeyType === 'calculate' ? calculate(displayedNum, operator, modValue)
    : calculate(firstValue, operator, displayedNum);
  }

  if (keyType === 'remove') {
    return displayedNum.length === 1 ||
      displayedNum === 0 ? '0' : displayedNum.slice(0, (displayedNum.length-1));
  }
};

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key);
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset
  calculator.dataset.previousKeyType = keyType;

  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate' ? keyContent : displayedNum + keyContent;
  }

  if (keyType === 'decimal') {
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
    if (!displayedNum.includes('.')) return displayedNum + '.';
    return displayedNum;
  }

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue = firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate' ? calculatedValue
    : displayedNum;
  }

  if (keyType === 'clear') {
    calculator.dataset.firstValue = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
  };

  if (keyType === 'remove') {
    return displayedNum.length === 1 ||
      displayedNum === 0 ? '0' : displayedNum.slice(0, (displayedNum.length-1));
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate' ? modValue
    : displayedNum;
  }

};

keys.addEventListener('click', e => {
  if (e.target.matches('.buttons > div')) {
    const key = e.target;
    const displayedNum = display.textContent;
    const resultString = createResultString(key, displayedNum, calculator.dataset);
    display.textContent = resultString;
    updateCalculatorState(key, calculator, resultString, displayedNum);
  }
});
