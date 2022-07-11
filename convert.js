export default class Converter {
    FORMAT_HEX = 1;
    FORMAT_DEC = 2;
    FORMAT_INVALID = 0;
    hexFormat = 'hexadecimal';
    decFormat = 'decimal';
    resultValue;
    binResult;
    valueFormat;

    constructor(inputValue, base) {
        this.inputValue = inputValue;
        this.base = base;
    }

    checkForLetters(str) {
        return /^[0-9]*$/.test(str);
    }

    validateInput(value) {
        let noSpecialChars = this.containsSpecialCharacters(value);
        if (value) {
            if (noSpecialChars) {
                return true;
            } else {
                return false;
            }
        } else {
           return false;
        }
    }
    
    containsSpecialCharacters(value) {
        return /^[a-fA-F0-9hx#]*$/.test(value);
    }
    
    convertToHexadecimal(value, array) {
        let maximumExp = this.calculateBaseMaxExp(value);
        let divider = this.calculateDivider(maximumExp, 16);
        this.calculateDivision(value, divider, 16, array);
        if (value > 15) {
            return array.join('');
        } else {
            return array.join('').slice(1);
        }
    }
    
    calculateBaseMaxExp(value) {
        let expCounter = 0;
        let baseNr = 16;
        while (baseNr < value) {
            baseNr *= 16;
            expCounter++;
        }
        return expCounter;
    }
    
    calculateDivider(counter, base) {
        let baseNr = base;
        for (let i = 0; i < counter - 1; i++) {
            baseNr *= base;
        }
        return baseNr;
    }
    
    calculateDivision(number, divider, base, array) {
        let digit = Math.floor(number / divider);
        let rest = number % divider;
        this.retainDigit(digit, array);
        divider = divider / base;
    
        while (divider > 0) {
            digit = Math.floor(rest / divider);
            this.retainDigit(digit, array);
            rest = rest % divider;
            divider = Math.floor(divider / base);
        }
    }
    
    retainDigit(value, array) {
        let convertedChar = value.toString(16);
        array.push(convertedChar);
    }
    
    convertToDecimal(value) {
        let trimNeeded = this.checkforTrim(value);
        let trimmed;
        if (trimNeeded) {
            trimmed = this.trim(value);
        } else {
            trimmed = value;
        }
        let nrOfDigits = this.calculateNrOfDigits(trimmed);
        return this.calculateSumOfDigits(nrOfDigits, trimmed);
    }
    
    checkforTrim(value) {
        if (value.includes('x') || value.includes('h')) {
            return 1;
        } else if (value.includes('#')) {
            return 1;
        } else {
            return 0;
        }
    }
    
    trim(value) {
        let trimmed = value.replace(/[^a-fA-F0-9 ]/g, "");
        while (this.checkValStartFor0(trimmed)) {
            trimmed = this.clearStart(trimmed);
        }
        return trimmed;
    }
    
    checkValStartFor0(value) {
        return value[0] == 0;
    }
    
    clearStart(value) {
        return value.slice(1);
    }
    
    calculateNrOfDigits(value) {
        return value.length;
    }
    
    calculateSumOfDigits(counter, value) {
        let sum = 0;
        let eachNr = 0;
        let limit = counter - 1;
        for (let i = 0; i < counter; i++) {
            eachNr = parseInt(value[i], 16);
            sum += this.calculateEachDigitTimesBase(eachNr, limit);
            limit--;
        }
        return sum;
    }
    
    calculateEachDigitTimesBase(value, exp) {
        let basenr = 16;
        if (exp == 0) {
            return value;
        } else {
            for (let i = 1; i < exp; i++) {
                basenr *= 16;
            }
            return value * basenr;
        }
    }
    
    getValueType(value) {
        let valueTargetType;
        if (!this.checkForLetters(value)) {
            valueTargetType = this.FORMAT_DEC;
            this.valueFormat = this.hexFormat;
        } else {
            valueTargetType = this.FORMAT_HEX;
            this.valueFormat = this.decFormat;
        }
        return valueTargetType;
    }
    
    convertToBinary(value, array) {
        if (value) {
            for (let i = 0; i < value.length; i++) {
                this.convertDigitToBinary(parseInt(value[i], 16), array);
            }
            return array.join('');
        } else {
            return '0000';
        }
    }
    
    convertDigitToBinary(number, array) {
        let baseBin = 2;
        let divider = this.calculateDivider(3, baseBin);
        this.calculateDivision(number, divider, baseBin, array);
    }

    get conversionType() {
        if (this.getValueType(this.inputValue) == this.FORMAT_DEC) {
            return this.decFormat;
        } else {
            return this.hexFormat;
        }
    }

    get convertedResult() {
        return this.resultValue;
    }

    get binaryResult() {
        return this.binResult;
    }

    doConversion() {
        let hexadecimalValue;
        let valueType;
        let hexaArray = [];
        let binArray = [];
        
    if (!this.validateInput(this.inputValue)) {
        this.valueFormat = 'unknown';
        //alert('The input is invalid. Please enter a decimal or a hexadecimal value');
    } else {
        valueType = this.getValueType(this.inputValue);
        if (valueType == this.FORMAT_DEC) {
            this.resultValue = this.convertToDecimal(this.inputValue); 
            hexadecimalValue = this.trim(this.inputValue);
        } else {
            hexadecimalValue = this.convertToHexadecimal(this.inputValue, hexaArray); 
            this.resultValue = hexadecimalValue;
        }
        this.binResult = this.convertToBinary(hexadecimalValue, binArray);
        }
    }
}
