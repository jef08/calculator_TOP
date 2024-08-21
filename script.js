const display = document.querySelector(".display");
const button = document.querySelectorAll(".button");
const clearButton = document.querySelector(".clear");
const backButton = document.querySelector(".back");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equals");
const positiveNegativeButton = document.querySelector(".positiveNegative");
const decimalButton = document.querySelector(".decimalButton");

//A/C button reloads the page, clearing all//
function refreshPage () {
    location.reload()
}
clearButton.addEventListener('click', refreshPage)

//The positive/Negative button, toggles between making number positive or negative//
positiveNegativeButton.addEventListener('click', toggleNegative)

//Function for the positive/negative button//
function toggleNegative() {
    if (stringArray.includes('-')) {
        stringArray.splice(0, 1)
         display.innerHTML = stringArray.join("")
    } else {
        stringArray.splice(0, 0, '-')
        display.insertAdjacentHTML("afterbegin", '-')
    }
}

//backButton, erase last number inputted in string array//
backButton.addEventListener("click", () => {
    stringArray.splice(-1, 1);
    display.innerHTML = stringArray.join("")
})

//Arrays//
stringArray = []
numArray = []
operatorArray = []

//decimal button, put into string and disabled if already included in string//
function disableDecimal() {
    if (stringArray.includes('.')) {
    decimalButton.disabled = true
    } else {
        stringArray.push(".")
        display.innerHTML = stringArray.join("")
    }
}
decimalButton.addEventListener("click", disableDecimal)

//Populate display, put button values into string array//
button.forEach((button) => {
    button.addEventListener("click", () => {
        stringArray.push(button.value);
        display.innerHTML = stringArray.join("");
    })
})

//Operator buttons: mousedown clears display and joins numbers in String array and pushes new number into number Array//
//If number array contains 2 numbers, the operateOperatorSign function is executed//
operatorButtons.forEach((operatorButtons) => {
    operatorButtons.addEventListener("mousedown", () => {
        display.innerHTML = "";
        joinedNum = stringArray.join('');
        numArray.push(joinedNum);
        stringArray = [];

        if (numArray.length === 2) {
            operateOperatorSign();
        }
    })
})

//Operator buttons: mouseup clears display (so result doesn't attach to next number inputted)//
//If only 1 number in number array, and no operator value in operator array, then a new operator value is pushed into the array//
//if there is already an operator value, then a new value will take its place//
//Storing the operator value onclick caused problems//
operatorButtons.forEach((operatorButtons => {
    operatorButtons.addEventListener("mouseup", () => {
        display.innerHTML = '';
        
        if (numArray.length === 1 && operatorArray.length === 0) {
            operatorArray.push(operatorButtons.value);
            
        } else if (operatorArray.length === 1) {
            operatorArray.push(operatorButtons.value);
            operatorArray.splice(0, 1);
        }
    })
}))

//equals button: mousedown does same as operator buttons, but instead, if there are two #s in #arrayit executes operateEqualSign function//
equalButton.addEventListener("mousedown", () => {
    display.innerHTML = "";
    joinedNum = stringArray.join('');
    numArray.push(joinedNum);
    stringArray = [];

    if (numArray.length === 2) {
            operateEqualsSign();
            console.log(numArray)
    }
})

//Equal button: mouseup, operator and number arrays are emptied//
equalButton.addEventListener("mouseup", () => {
    operatorArray = [];
    numArray = [];
})

//add, subtract, multiply, divide functions using the reduce() method//
function add(accumulator, currentValue) {
    let sum = parseFloat(accumulator) + parseFloat(currentValue);
    let roundedSum = Math.round(sum * 1000) / 1000;
    return roundedSum;
}

function subtract(accumulator, currentValue) {
    let difference = parseFloat(accumulator) - parseFloat(currentValue);
    let roundedDiff = Math.round(difference * 1000) / 1000;
    return roundedDiff;
}

function multiply(accumulator, currentValue) {
    let product = parseFloat(accumulator) * parseFloat(currentValue);
    let roundedProduct = Math.round(product * 1000) / 1000;
    return roundedProduct;
}

function divide(accumulator, currentValue) {
        let quotient = parseFloat(accumulator) / parseFloat(currentValue);
        let roundedQuotient = Math.round(quotient * 1000) / 1000;
        return roundedQuotient;
}

//operate function using the variables and functions//
//Operate Equal Sign function differs in that  it pushes the result into the string Array//
//pushes results into number array caused invalid results//

function operateEqualsSign() {
    if (operatorArray.includes("plus")) {
        let sumOfNums = numArray.reduce(add);
        display.innerHTML = sumOfNums;
        stringArray.push(sumOfNums);
    
    } else if (operatorArray.includes("minus")) {
        let diffOfNums = numArray.reduce(subtract);
        display.innerHTML = diffOfNums;
        stringArray.push(diffOfNums);
    
    } else if (operatorArray.includes("multiply")) {
        let productOfNums = numArray.reduce(multiply);
        display.innerHTML = productOfNums;
        stringArray.push(productOfNums);
    
    } else if (operatorArray.includes("divide")) {
        if (numArray[1] === '0') {
            display.innerHTML = "Hahahah"
        } else {
            let quotientOfNums = numArray.reduce(divide);
            display.innerHTML = quotientOfNums;
            stringArray.push(quotientOfNums);
        }
    } else {
        display.innerHTML = "invalid";
    }
}


//Operate Operator Sign pushes result into the number array//
//pushing the result into the string array resulted in concating the result with the next numbers pressed//
function operateOperatorSign() {
    if (operatorArray.includes("plus")) {
        let sumOfNums = numArray.reduce(add);
        display.innerHTML = sumOfNums;
        numArray = [sumOfNums];
    
    } else if (operatorArray.includes("minus")) {
        let diffOfNums = numArray.reduce(subtract);
        display.innerHTML = diffOfNums;
        numArray = [diffOfNums];
    
    } else if (operatorArray.includes("multiply")) {
        let productOfNums = numArray.reduce(multiply);
        display.innerHTML = productOfNums;
        numArray = [productOfNums];
    
    } else if (operatorArray.includes("divide")) {
        if (numArray[1] === '0') {
            display.innerHTML = "Hahahah"
        } else {
            let quotientOfNums = numArray.reduce(divide);
            display.innerHTML = quotientOfNums;
            numArray = [quotientOfNums];
        }
    } else {
        display.innerHTML = "invalid";
    }
}