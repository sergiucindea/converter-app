const FORMAT_HEX = 1;
const FORMAT_DEC = 2;
const FORMAT_INVALID = 0;
const ALPH = 36;
const INPUT_ARR = ['2f', '8d', '#256', '2fe7', 'CAF', 'x345', '#10000', '#323', '0x243'];
// const INPUT_ARR = ['12265', '256', '4096', '3232', '345', '10000', '36268', '141'];
// const INPUT_ARR = ['33'];


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

function convertValue(value, outputField, binaryOutputField, converterType, conversionBase) {
    let valueType = getValueType(value);
    let errorMsg = 'Unknown input format';
    let converter;
    let result;
    let hexaValue;
    let binConverter;
    let binaryValue;
    
    if (value) {
        if (converterType != Factory.CONVERTER_TYPE_GENERIC) {
            if (valueType == FORMAT_DEC) {
                converter = Factory.create(10, converterType);
                result = converter.doConversion(value);
                hexaValue = value;
            } else if (valueType == FORMAT_HEX) {
                converter = Factory.create(16, converterType);
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
            binConverter = Factory.create(2, converterType);
            binaryValue = binConverter.doConversion(hexaValue);
        } else {
            converter = Factory.create(conversionBase, converterType);
            //result = converter.doConversion(value);
        }
    } 

    outputField.textContent = result;
    binaryOutputField.textContent = binaryValue;
    return value;
}

function generateTableRow(value, index, converterType, conversionBase) {
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
    convertValue(value, outputField, binaryOutputField, converterType, conversionBase);
    return value;
}

function populateConversionTable(converterType, conversionBase) {
    let tableBodyEl = document.getElementById('conversion-table-body');
    let tableEl = document.getElementById('conversion-table');

    tableBodyEl.innerHTML = '';
    if (INPUT_ARR.length) {
        [...INPUT_ARR].forEach((elem, index) => {
            generateTableRow(elem, index+1, converterType, conversionBase);
        });    
    } else {
        tableEl.classList.add('d-none');
    }
}

function populateHtml() {   
    let converterTypeSelectEl = document.getElementById('converter-type');
    let tableContainerEl = document.getElementById('div-content');
    let selectedConverterType = converterTypeSelectEl.selectedIndex;
    let errorMessageEl = document.getElementById('error-message');
    let baseSelectorInputEl = document.getElementById('generic-base');

    if(selectedConverterType) {
        if (selectedConverterType == Factory.CONVERTER_TYPE_GENERIC) {
            let conversionBase = baseSelectorInputEl.options[baseSelectorInputEl.selectedIndex].textContent;
            populateConversionTable(selectedConverterType, conversionBase);
        } else {
            populateConversionTable(selectedConverterType, conversionBase = 0);
            tableContainerEl.classList.remove('d-none');
            errorMessageEl.classList.add('d-none');
        } 
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

function setSelectorValues() {
    let converterTypeSelectorEl = document.getElementById('converter-type');
    let html = 
    `<option value="0" selected>Choose converter type</option>
    <option value="${Factory.CONVERTER_TYPE_DEFAULT}">Default Converter</option>
    <option value="${Factory.CONVERTER_TYPE_MY}">Custom Converter</option>
    <option value="${Factory.CONVERTER_TYPE_GENERIC}" class="generic-conv">Generic Converter</option>
    `;
    converterTypeSelectorEl.innerHTML = html;
}

function displayBaseInput(e) {
    let baseSelectorInputEl = document.getElementById('generic-base');
    if (e.target.classList.contains('generic-conv')) {
        for (let i = 1; i <= ALPH; i++) {
        let child = document.createElement('option');
        child.innerHTML = i;
        baseSelectorInputEl.appendChild(child);
    }
    baseSelectorInputEl.classList.remove('d-none');
    } else {
        baseSelectorInputEl.classList.add('d-none');
    }
    
}

function run() {
    let converterTypeSelectEl = document.getElementById('converter-type');
    let tabBtnElems = document.getElementById('pills-tab');
    let generateTableBtnEl = document.getElementById('generate-table');
    generateTableBtnEl.addEventListener('click', populateHtml);
    tabBtnElems.addEventListener('click', setIndex);
    setSelectorValues(); 
    [...converterTypeSelectEl.options].forEach(opt => {
        opt.addEventListener('click', displayBaseInput);
    });
}

run();
