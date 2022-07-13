import Converter from './convert.js';

const FORMAT_HEX = 1;
const FORMAT_DEC = 2;
const FORMAT_INVALID = 0;

function getInput() {
    const input = document.getElementById('inputNumber');
    return input.value;
}

// function displayConversion(e) {
//     const decimalMessageEl = document.getElementById('hexadecimal');
//     const binaryMessageEl = document.getElementById('binary');
//     const inputMessageEl = document.getElementById('input');
//     const displayMessageEl = document.getElementById('body-message');
//     const form = document.getElementById('input-group');
//     let value = getInput();
    
//     if (form.checkValidity()) {
//         e.preventDefault();
//         displayMessageEl.classList.remove('invisible');
//         let converter = new Converter(10);
//         let result = converter.doConversion('8d');
//         // inputMessageEl.textContent = `The format of the input is ${numToConvert.valueFormat}`;
//         // decimalMessageEl.textContent = `The ${numToConvert.conversionType} value is: ${numToConvert.convertedResult}`;
//         // binaryMessageEl.textContent = `The binary value is: ${numToConvert.binResult}`;
//         console.log(result);
//     } else {
//         e.preventDefault();
//         form.classList.add('was-validated');
//         displayMessageEl.classList.add('invisible');
//     }
// }

function checkForLetters(str) {
    return /^[0-9]*$/.test(str);
}

function containsSpecialCharacters(value) {
    return /^[a-fA-F0-9hx#]*$/.test(value);
}
    
function getValueType(value) {
    let valueType;
    if (containsSpecialCharacters(value)) {
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

// function convertToBinary() {
//  console.log('binary');   
// }
    
function mainFunc(e) {
    let converter;
    let result;
    let errorMessage = 'The input was of unknown format';
    let value = getInput();
    let valueType = getValueType(value);
    e.preventDefault();
    
    if (value) {
        if (valueType == FORMAT_DEC) {
            converter = new Converter(10);
            result = converter.doConversion(value);
        } else if (valueType == FORMAT_HEX) {
            converter = new Converter(16);
            result = converter.doConversion(value);
        } else {
            result = errorMessage;
        }
        console.log(result);
    } else {
        console.log('Please provide an input');
    }
}

function run() {
    const form = document.getElementById('input-group');
    // const btnForBinary = document.getElementById('btn-convert-bin');
    // btnForBinary.addEventListener('click', convertToBinary);
    form.addEventListener('submit', mainFunc);
}

run();