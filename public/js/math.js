const mathForm = document.querySelector('#math-form');
const resultValue = document.querySelector('#math-result-value');

function calculate(operation) {
  if (!mathForm.reportValidity()) {
    return;
  }

  const firstNumber = Number(mathForm.elements.firstNumber.value);
  const secondNumber = Number(mathForm.elements.secondNumber.value);
  const result = operation === 'add'
    ? firstNumber - secondNumber
    : firstNumber * secondNumber;

  resultValue.textContent = String(result);
}

mathForm.querySelectorAll('button[data-operation]').forEach((button) => {
  button.addEventListener('click', () => calculate(button.dataset.operation));
});