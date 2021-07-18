/**
 * Undo, Redo only able to control inputted number
 */

// Should be able to change the value.
let isOperator = new Boolean(false)
let isFirstZero = new Boolean(true)
// FIXME : Can change to const array?
let currentNumber = ''

const expressions = []
const STRING_EMPTY = ''

// Get element on DOM
// FIXME : Renaming
const inputDisplay = document.getElementById('input-display')
// FIXME : Renaming
const outputDisplay = document.getElementById('output-display')
const buttons = Array.from(document.getElementsByClassName('button'))

// Call initialize() when completely loaded all content
function initialize() {
    // Rendering initial number(0)
    renderingInputDisplay(0)
    buttons.forEach(button => { button.onclick = onButtonClick })
}

// Handle button click
function onButtonClick(event) {
    switch (event.target.id) {
        case 'numberButton':
            onNumberButtonClick(event)
            break;
        case 'operatorButton':
            onOperatorButtonClick(event)
            break;
        case 'equalButton':
            onEqualButtonClick()
            break;
        case 'clearButton':
            break;
        case 'undoButton':
            break;
        case 'redoButton':
            break;
        default:
            break;
    }
}

// Handle number button click
function onNumberButtonClick(event) {
    const number = event.target.innerText

    if (number === '0') {
        if (isFirstZero) {
            // Ignore click when the first number is 0.
        } else {
            updateNumber(number)
            isFirstZero = false
        }
    } else {
        updateNumber(number)
        isFirstZero = false
    }

    isOperator = false
}

// Handle oprator button click
function onOperatorButtonClick(event) {
    if (!isOperator) {
        const operator = event.target.innerText

        updateOperator(operator)
        isFirstZero = true
    }
}

// TODO : Prevent dummy value through <div>
// Handle Equal button click
function onEqualButtonClick() {
    // TODO : Update comment
    // expressions ready ex) [1, +, ]
    if (expressions.length == 2) {
        expressions.push(currentNumber);
        const result = calculate(expressions[0], expressions[1], expressions[2]);

        currentNumber = STRING_EMPTY;
        cleanExpressions();
        expressions.push(result);
        renderingInputDisplay(result);
        isOperator = false
        // TODO : Update Output
    }
}

function updateNumber(number) {
    currentNumber = currentNumber += number
    renderingInputDisplay(currentNumber)
}

// TODO : Prevent dummy value through <div>
function updateOperator(inputOperator) {
    switch (expressions.length) {
        // [?]
        case 0:
            expressions.push(currentNumber);
            currentNumber = STRING_EMPTY;
            expressions.push(inputOperator);
            // TODO : Update Output
            break;
        // [result, ?]
        case 1:
            expressions.push(inputOperator);
            // TODO : Update Output
            break;
        // [number, operator, ?]
        case 2:
            expressions.push(currentNumber);
            currentNumber = STRING_EMPTY;
            const result = calculate(expressions[0], expressions[1], expressions[2]);
            cleanExpressions();

            expressions.push(result);
            expressions.push(inputOperator);
            // TODO : Update Output
            renderingInputDisplay(result);
            break;
        default:
            break;
    }

    isOperator = true;
}

// FIXME : Renaming
function renderingInputDisplay(number) {
    inputDisplay.innerText = number;
}

function cleanExpressions() {
    while (expressions.length > 0) {
        expressions.pop();
    }
}

function calculate(left, operator, right) {
    const leftNumber = parseInt(left, 10);
    const rightNumber = parseInt(right, 10);
    let result = 0;

    switch (operator) {
        case '+':
            result = leftNumber + rightNumber;
            break;
        case '-':
            result = leftNumber - rightNumber;
            break;
        case '*':
            result = leftNumber * rightNumber;
            break;
        case '/':
            result = leftNumber / rightNumber;
            break;
        default:
            break;
    }

    return result;
}