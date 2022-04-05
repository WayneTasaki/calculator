let currentNum = ''
let previousNum = ''
let operator = ''

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clearDisplay)
const deleteButton = document.querySelector('.delete-button');
const numButtons = document.querySelectorAll('.number-button');
const operators = document.querySelectorAll('.operator-button');
const equals = document.querySelector('.equals-button')
equals.addEventListener('click', operate)

const currentNumDisplay = document.querySelector('.currentNumDisplay')
const previousNumDisplay = document.querySelector('.previousNumDisplay');

numButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    displayNums(e.target.textContent)
  })
});
// adds an event listener to each number button and fires the displayNums function

function displayNums(number) {
  if (currentNum.length <= 16) {
  currentNum += number
  currentNumDisplay.textContent = currentNum
  }
}
// displays the current number in the calculator window and up to 16 characters

operators.forEach(btn => {
  btn.addEventListener('click', (e) => {
    displayOperators(e.target.textContent)
  })
})
// adds event listener to each operator button and fires the displayOperators function

function displayOperators(op) {
  operator = op
  previousNum = currentNum
  previousNumDisplay.textContent = `${previousNum} ${op}`
  currentNum = ''
  currentNumDisplay.textContent = ''
}
// since clicking an operator indicates another number will be selected, this changes the number displayed in the displayNums function to a variable called previousNum and displays that above the currentNum section along with the operator

function operate() {
  currentNum = Number(currentNum)
  previousNum = Number(previousNum)
  if (operator === '+') {
    previousNum = previousNum + currentNum
  } else if (operator === '−') {
    previousNum = previousNum - currentNum
  } else if (operator === '×') {
    previousNum = previousNum * currentNum
  } else if (operator === '÷') {
      if (currentNum <= 0) {
        previousNum = 'ERROR'
        previousNumDisplay.textContent = ''
        currentNumDisplay.textContent = previousNum
        operator = ''
        return
      }
      previousNum = previousNum / currentNum
  }
  previousNum = previousNum.toString()
  previousNumDisplay.textContent = ''
  currentNumDisplay.textContent = previousNum
}
// The main operator function that calculates and displays the results

function clearDisplay() {
  previousNumDisplay.textContent = ''
  currentNumDisplay.textContent = ''
}

// TO ADD:
// add character limit to the operate function, clear, delete, chain operations with correct number