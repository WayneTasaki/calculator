let currentNum = ''
let previousNum = ''
let operator = ''

window.addEventListener('keydown', keyboardCalc)

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clearDisplay)
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', deleteNum)
const numButtons = document.querySelectorAll('.number-button');
const operators = document.querySelectorAll('.operator-button');
const equals = document.querySelector('.equals-button')
equals.addEventListener('click', equalsValidation)
const decimal = document.querySelector('.decimal-button')
decimal.addEventListener('click', insertDecimal)

const currentNumDisplay = document.querySelector('.currentNumDisplay')
const previousNumDisplay = document.querySelector('.previousNumDisplay');

numButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    displayNums(e.target.textContent)
  })
});
// adds an event listener to each number button and fires the displayNums function

function displayNums(number) {
  if (previousNum !== '' && currentNum !== '' && operator === '') {
    previousNumDisplay.textContent = currentNum
  }
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
  if (previousNum === '') {
    previousNum = currentNum
    chainOperate(op)
  } else if (currentNum === '') {
    chainOperate(op)
  } else {
    operate()
    operator = op
    currentNumDisplay.textContent = '0'
    previousNumDisplay.textContent = `${previousNum} ${operator}`
  }
}
// since clicking an operator indicates another number will be selected, this changes the number displayed in the displayNums function to a variable called previousNum and displays that above the currentNum section along with the operator

function chainOperate(a) {
  operator = a
  previousNumDisplay.textContent = `${previousNum} ${operator}`
  currentNumDisplay.textContent = ''
  currentNum = ''
}

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
        previousNum = 'No dividing by 0'
        previousNumDisplay.textContent = ''
        currentNumDisplay.textContent = previousNum
        operator = ''
        displayResult()
        return
      }
      previousNum = previousNum / currentNum
  }
  previousNum = previousNum.toString()
  displayResult()
}
// The main operator function that calculates and displays the results

function clearDisplay() {
  previousNumDisplay.textContent = ''
  currentNumDisplay.textContent = '0'
  currentNum = ''
  previousNum = ''
  operator = ''
}
// Resets the calculator


function displayResult() {
  if (previousNum.length <= 16) {
    currentNumDisplay.textContent = previousNum
  } else {
    currentNumDisplay.textContent = previousNum.slice(0,15)
  }
  previousNumDisplay.textContent = ''
  operator = ''
  currentNum = ''
}
// 

function equalsValidation() {
  if (currentNum != '' && previousNum != '') {
    operate()
  }
}
// prevents user from using the equals button which fires the operate function if there are no numbers

function deleteNum() {
  currentNum = currentNumDisplay.textContent = currentNum.slice(0, currentNum.length - 1)
  if (currentNum === '') {
    currentNumDisplay.textContent = '0'
  }
}
// deletes the last number entered

function insertDecimal() {
  if (!currentNum.includes('.')) {
    currentNum += '.'
    currentNumDisplay.textContent = currentNum
  }
}
// insers a decimal to the current number

function keyboardCalc(k) {
  k.preventDefault()
  if (k.key >= 0 && k.key <= 9) {
    displayNums(k.key)
  }
  if (k.key === 'Escape') {
    clearDisplay()
  }
  if (k.key === 'Backspace') {
    deleteNum()
  }
  if (k.key === '/') {
    displayOperators('÷')
  }
  if (k.key === '*') {
    displayOperators('×')
  }
  if (k.key === '-') {
    displayOperators('−')
  }
  if (k.key === '+') {
    displayOperators('+')
  }
  if (k.key === '.') {
    insertDecimal()
  }
  if (k.key === 'Enter') {
    operate()
  }
}
// Adds keyboard functionality to the calculator
