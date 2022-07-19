const FORMAT_HEX = 1;
const FORMAT_DEC = 2;
const FORMAT_INVALID = 0;

function checkForLetters(str) {
    return /^[0-9]*$/.test(str);
}

function containsNoSpecialCharacters(value) {
    return /^[a-fA-F0-9hHxX#]*$/.test(value);
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

function convertValue(value, outputField, binaryOutputField) {
    let valueType = getValueType(value);
    let converterFactory = new Factory();
    let converter;
    let result;
    let hexaValue;
    let binConverter;
    let binaryValue;
    
    if (value) {
        if (valueType == FORMAT_DEC) {
            converter = converterFactory.create(10, converterFactory.CONVERTER_TYPE_MY);
            result = converter.doConversion(value);
            hexaValue = value;
        } else {
            converter = converterFactory.create(16, converterFactory.CONVERTER_TYPE_MY);
            result = converter.doConversion(value);
            hexaValue = result;
        }
        binConverter = converterFactory.create(2, converterFactory.CONVERTER_TYPE_MY);
        binaryValue = binConverter.doConversion(hexaValue);
    }
    
    outputField.textContent = result;
    binaryOutputField.textContent = binaryValue;
}

function run() {
    const tableBodyEl = document.getElementById('conversion-table-body');
    [...tableBodyEl.children].forEach (tr => {
        let inputValue = tr.querySelector('.input').textContent;
        let outputField = tr.querySelector('.output');
        let binaryOutputField = tr.querySelector('.binary');
        convertValue(inputValue, outputField, binaryOutputField);
    });
}

run();