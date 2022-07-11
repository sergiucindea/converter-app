import Converter from './convert.js';

function getInput() {
    const input = document.getElementById('inputNumber');
    return input.value;
}

function displayConversion(e) {
    const decimalMessageEl = document.getElementById('hexadecimal');
    const binaryMessageEl = document.getElementById('binary');
    const inputMessageEl = document.getElementById('input');
    const displayMessageEl = document.getElementById('body-message');
    const form = document.getElementById('input-group');
    let value = getInput();
    
    if (form.checkValidity()) {
        e.preventDefault();
        displayMessageEl.classList.remove('invisible');
        let numToConvert = new Converter(value);
        numToConvert.doConversion();
        inputMessageEl.textContent = `The format of the input is ${numToConvert.valueFormat}`;
        decimalMessageEl.textContent = `The ${numToConvert.conversionType} value is: ${numToConvert.convertedResult}`;
        binaryMessageEl.textContent = `The binary value is: ${numToConvert.binResult}`;
    } else {
        e.preventDefault();
        form.classList.add('was-validated');
        displayMessageEl.classList.add('invisible');
    }
}

function run() {
    const form = document.getElementById('input-group');
    form.addEventListener('submit', displayConversion);
}

run();