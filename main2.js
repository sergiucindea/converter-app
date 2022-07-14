import Converter from "./simpleConverter.js";

const FORMAT_HEX = 1;
const FORMAT_DEC = 2;
const FORMAT_INVALID = 0;

function getInput() {
    const input = document.getElementById('inputNumber');
    return input.value;
}

function checkForLetters(str) {
    return /^[0-9]*$/.test(str);
}

function trim(value) {
    let trimmed = value.replace(/[^a-fA-F0-9 ]/g, "");
    while (trimmed[0] == 0) {
        trimmed = trimmed.slice(1);
    }
    return trimmed;
}

function containsNoSpecialCharacters(value) {
    return /^[a-fA-F0-9hHXx#]*$/.test(value);
}
    
function getValueType(value) {
    let valueType;
    if (containsNoSpecialCharacters(value)) {
        if (!checkForLetters(value)) {
            valueType = FORMAT_DEC;
        } else {
            valueType = FORMAT_HEX;
        }
    } else {
        valueType = FORMAT_INVALID;
    }
    return valueType;
}

function displayResultsToHtml(value, result) {
    const decimalMessageEl = document.getElementById('hexadecimal');
    const binaryMessageEl = document.getElementById('binary');
    const inputMessageEl = document.getElementById('input');
    let valueType = getValueType(value);

    clearInputs();

    if (!valueType) {
        inputMessageEl.textContent = 'The input was of unknown format';
    } else if (valueType == FORMAT_DEC) {
        inputMessageEl.textContent = `Input value: ${value} Format: hexadecimal`;
        decimalMessageEl.textContent = `The decimal value is ${result}`;
    } else {
        inputMessageEl.textContent = `Input value: ${value} Format: decimal`;
        decimalMessageEl.textContent = `The hexadecimal value is ${result}`;
    }
}

function clearInputs() {
    const decimalMessageEl = document.getElementById('hexadecimal');
    const binaryMessageEl = document.getElementById('binary');
    const inputMessageEl = document.getElementById('input');

    decimalMessageEl.textContent = '';
    binaryMessageEl.textContent = '';
    inputMessageEl.textContent = '';
}


function mainFunc(e) {
    let converter;
    let result;
    let errorMessage = 'The input was of unknown format';
    let value = getInput();
    e.preventDefault();
    
    if (value) {
        let valueType = getValueType(value);
        if (valueType == FORMAT_DEC) {
            converter = new Converter(10);
            result = converter.doConversion(trim(value));
        } else if (valueType == FORMAT_HEX) {
            converter = new Converter(16);
            result = converter.doConversion(value);
        } else {
            result = errorMessage;
        }
        displayResultsToHtml(value, result);
    } else {
        console.log('Please provide an input');
    }
}

function run() {
    const form = document.getElementById('input-group');
    form.addEventListener('submit', mainFunc);
}

run();