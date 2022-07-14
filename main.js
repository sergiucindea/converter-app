import Converter from './convert.js';
//import NewConverter from "./simpleConverter.js";

const FORMAT_HEX = 1;
const FORMAT_DEC = 2;
const FORMAT_INVALID = 0;

function getInput() {
    const input = document.getElementById('inputNumber');
    const inputMessageEl = document.getElementById('input');
    inputMessageEl.classList.remove('alert', 'alert-danger');
    return input.value;
}

function displayResultsToHtml(value, result, binary) {
    const decimalMessageEl = document.getElementById('hexadecimal');
    const binaryMessageEl = document.getElementById('binary');
    const inputMessageEl = document.getElementById('input');
    let valueType = getValueType(value);
    clearInputs();
    if (value) {
        if (!valueType) {
            inputMessageEl.textContent = 'The input was of unknown format';
        } else if (valueType == FORMAT_DEC) {
            inputMessageEl.textContent = `The input value is ${value} an the format is: hexadecimal`;
            decimalMessageEl.textContent = `The decimal value is ${result}`;
            binaryMessageEl.textContent = `The binary value is ${binary}`;
        } else {
            inputMessageEl.textContent = `The input value is ${value} an the format is: decimal`;
            decimalMessageEl.textContent = `The hexadecimal value is ${result}`;
            binaryMessageEl.textContent = `The binary value is ${binary}`;
        }
    } else {
        inputMessageEl.textContent = 'Please provide an input';
        inputMessageEl.classList.add('alert', 'alert-danger');
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

function checkForLetters(str) {
    return /^[0-9]*$/.test(str);
}

function containsNoSpecialCharacters(value) {
    return /^[a-fA-F0-9hx#]*$/.test(value);
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

function mainFunc(e) {
    let converter;
    let result;
    let value = getInput();
    let valueType = getValueType(value);
    let binaryValue;
    let hexaValue;
    e.preventDefault();
    
    if (value) {
        if (valueType == FORMAT_DEC) {
            converter = new Converter(10);
            result = converter.doConversion(value);
            hexaValue = value;
        } else {
            converter = new Converter(16);
            result = converter.doConversion(value);
            hexaValue = result;
        }
        converter = new Converter(2);
        binaryValue = converter.doConversion(hexaValue);
    } 
    displayResultsToHtml(value, result, binaryValue);
}

function run() {
    const form = document.getElementById('input-group');
    form.addEventListener('submit', mainFunc);
}

run();