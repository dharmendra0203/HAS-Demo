const mathForm = typeof document !== 'undefined' ? document.querySelector('#math-form') : null;
const resultValue = typeof document !== 'undefined' ? document.querySelector('#math-result-value') : null;

function calculateMathOperation(operation, firstNumber, secondNumber) {
  switch (operation) {
    case 'add':
      return firstNumber + secondNumber;
    case 'multiply':
      return firstNumber * secondNumber;
    case 'percent':
      return (firstNumber * secondNumber) / 100;
    case 'divide':
      if (secondNumber === 0) {
        return 'Cannot divide by zero';
      }
      return firstNumber / secondNumber;
    default:
      return 'Unsupported operation';
  }
}

function calculate(operation) {
  if (!mathForm || !resultValue || !mathForm.reportValidity()) {
    return;
  }

  const firstNumber = Number(mathForm.elements.firstNumber.value);
  const secondNumber = Number(mathForm.elements.secondNumber.value);
  const result = calculateMathOperation(operation, firstNumber, secondNumber);

  resultValue.textContent = String(result);
}

if (mathForm) {
  mathForm.querySelectorAll('button[data-operation]').forEach((button) => {
    button.addEventListener('click', () => calculate(button.dataset.operation));
  });
}

if (typeof module !== 'undefined') {
  module.exports = { calculateMathOperation };
}