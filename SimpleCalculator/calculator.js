let expressions = [];
let currentIndex = 0;
let bIsUndoRedo = new Boolean(false);
const STRING_EMPTY = '';

let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('button'));

buttons.map(button => {
    button.addEventListener('click', (e) => {

        switch (e.target.innerText) {
            // Clear
            case 'C':
                display.innerText = STRING_EMPTY;
                expressions = [];
                currentIndex = 0;
                bIsUndoRedo = false;
                break;
            // Equal
            case '=':
                if (display.innerText !== STRING_EMPTY) {
                    // expression display is empty
                    display.innerText = calculate(expressions[currentIndex]);
                    expressions = [];
                    currentIndex = 0;
                    expressions.push(display.innerText);
                    bIsUndoRedo = false;
                }
                break;
            // Undo
            case '←':
                if (currentIndex === 0) {
                    // index number is 0
                    display.innerText = STRING_EMPTY;
                    bIsUndoRedo = true;
                } else if (currentIndex > 0) {
                    // index number is over 0
                    currentIndex--;
                    display.innerText = expressions[currentIndex];
                    bIsUndoRedo = true;
                }
                break;
            // Redo
            case '→':
                if (currentIndex === 0 && expressions[0] != null) {
                    // index number is 0 and array first value is not NULL
                    display.innerText = expressions[currentIndex];
                    currentIndex++;
                    bIsUndoRedo = true;
                } else if (expressions.length - 1 > currentIndex) {
                    // index number is not over array length
                    display.innerText = expressions[currentIndex];
                    currentIndex++;
                    bIsUndoRedo = true;
                } else if (expressions.length - 1 == currentIndex) {
                    // index number is last number in array
                    display.innerText = expressions[currentIndex];
                    bIsUndoRedo = true;
                }
                break;
            // Number
            default:
                if (bIsUndoRedo) {
                    // use undo OR redo before number button click
                    display.innerText += e.target.innerText;
                    expressions = expressions.slice(0, currentIndex);
                    expressions.push(display.innerText);
                    currentIndex = expressions.length - 1;
                    bIsUndoRedo = false;
                } else {
                    display.innerText += e.target.innerText;
                    expressions.push(display.innerText);
                    currentIndex = expressions.length - 1;
                    bIsUndoRedo = false;
                }
        }
    });
});

// TODO : make calcalute logic without eval()
function calculate(strExpression) {
    let result = eval(strExpression);

    return result;
}