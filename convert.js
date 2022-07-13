export default class Converter {
    resultValue;

    constructor(base) {
        this.base = base;
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
        let convertedChar = this.convertDigitToString(value);
        array.push(convertedChar);
    }

    convertDigitToString(value) {
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
        for (let i = 0; i < arr.length; i++) {
            if (value == i) {
                return arr[i];
            }                                                                                                
        }
    }
    
    convertToDecimal(value) {
        let trimNeeded = this.checkforTrim(value);
        let trimmed;
        if (trimNeeded) {
            trimmed = this.trim(value);
        } else {
            trimmed = value;
        }
        let nrOfDigits = trimmed.length;
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
        while (trimmed[0] == 0) {
            trimmed = trimmed.slice(1);
        }
        return trimmed;
    }
    
    calculateSumOfDigits(counter, value) {
        let sum = 0;
        let eachNr = 0;
        let limit = counter - 1;
        for (let i = 0; i < counter; i++) {
            eachNr = this.convertStringToDigit(value[i]);
            sum += this.calculateEachDigitTimesBase(eachNr, limit);
            limit--;
        }
        return sum;
    }

    convertStringToDigit(value) {
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
        for (let i = 0; i<arr.length; i++) {
            if (value.toLowerCase() == arr[i]) {
                return i;
            }
        }
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
    
    convertToBinary(value, array) {
        if (value) {
            for (let i = 0; i < value.length; i++) {
                this.convertDigitToBinary(this.convertStringToDigit(value[i]), array);
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

    doConversion(inputValue) {
        let array = [];

        if(this.base == 10) {
            this.resultValue = this.convertToDecimal(inputValue);
        } else if (this.base == 16) {
            this.resultValue = this.convertToHexadecimal(inputValue, array);
        } else {
            this.resultValue = this.convertDigitToBinary(inputValue, array);
        }

    return this.resultValue;
    }
}
