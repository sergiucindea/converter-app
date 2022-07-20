const FORMAT_HEX = 1;
const FORMAT_DEC = 2;
const FORMAT_INVALID = 0;
const INPUT_ARR = ['2f', '122.65', '256', '4096', '2fe7', 'cal', 'CAF', 'x345', '10000', '#10000', '#3235L', '0x243'];

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

function convertValue(value, outputField, binaryOutputField, converterType) {
    let valueType = getValueType(value);
    let converterFactory = new Factory();
    let errorMsg = 'Unknown input format';
    let converter;
    let result;
    let hexaValue;
    let binConverter;
    let binaryValue;
    
    if (value) {
        if (valueType == FORMAT_DEC) {
            converter = converterFactory.create(10, converterType);
            result = converter.doConversion(value);
            hexaValue = value;
        } else if (valueType == FORMAT_HEX) {
            converter = converterFactory.create(16, converterType);
            result = converter.doConversion(value);
            hexaValue = result;
        } else {
            result = errorMsg;
            outputField.textContent = result;
            binaryOutputField.textContent = result;
            outputField.classList.add('text-muted', 'fst-italic');
            binaryOutputField.classList.add('text-muted', 'fst-italic');
            return;
        }
        binConverter = converterFactory.create(2, converterType);
        binaryValue = binConverter.doConversion(hexaValue);
    } 

    outputField.textContent = result;
    binaryOutputField.textContent = binaryValue;
    return value;
}

function createTableRow(value, index, converterType) {
    let tableBodyEl = document.getElementById('conversion-table-body');
    let row = document.createElement('tr');
    let html = 
    `<tr>
    <td scope="row">${index}</td>
    <td class="input">${value}</td>
    <td class="output"></td>
    <td class="binary"></td>
    </tr>`;
    row.innerHTML = html;
    tableBodyEl.appendChild(row);

    let outputField = row.querySelector('.output');
    let binaryOutputField = row.querySelector('.binary');
    convertValue(value, outputField, binaryOutputField, converterType);
    
    return value;
}

function populateConversionTable(converterType) {
    let tableBodyEl = document.getElementById('conversion-table-body');
    let tableEl = document.getElementById('conversion-table');

    tableBodyEl.innerHTML = '';
    if (INPUT_ARR.length) {
        [...INPUT_ARR].forEach((elem, index) => {
            createTableRow(elem, index+1, converterType);
        });    
    } else {
        tableEl.classList.add('d-none');
    }
}

function generateHtml() {
    let converterTypeSelectEl = document.getElementById('converter-type');
    let tableContainerEl = document.getElementById('div-content');
    let selectedConverterType = converterTypeSelectEl.selectedIndex;
    let errorMessageEl = document.getElementById('error-message');

    if(selectedConverterType) {
        populateConversionTable(selectedConverterType);
        tableContainerEl.classList.remove('d-none');
        errorMessageEl.classList.add('d-none');
    } else {
        errorMessageEl.classList.remove('d-none');
        errorMessageEl.textContent = 'Please select a converter type';
        tableContainerEl.classList.add('d-none');
    }
}

function setIndex(e) {
    let listElems = e.target.parentElement.parentElement.children;
    [...listElems].forEach(li => {
        let tabEl = li.children[0];
        if (tabEl.classList.contains('active')) { 
            tabEl.style.zIndex = '1';
        } else {
            tabEl.style.zIndex = '0';
        }
    });
}

function run() {
    let tabBtnElems = document.getElementById('pills-tab');
    let generateTableBtnEl = document.getElementById('generate-table');
    generateTableBtnEl.addEventListener('click', generateHtml);
    tabBtnElems.addEventListener('click', setIndex);
}

run();
