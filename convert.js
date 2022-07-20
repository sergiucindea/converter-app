class Converter {
    resultValue;

    HEXA_DICTIONARY = new Map([
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
        [7, 7],
        [8, 8],
        [9, 9],
        [10, 'a'],
        [11, 'b'],
        [12, 'c'],
        [13, 'd'],
        [14,  'e'],
        [15, 'f']
    ]);
    
    DEC_DICTIONARY = new Map([
        ['0', 0],
        ['1', 1],
        ['2', 2],
        ['3', 3],
        ['4', 4],
        ['5', 5],
        ['6', 6],
        ['7', 7],
        ['8', 8],
        ['9', 9],
        ['a', 10],
        ['b', 11],
        ['c', 12],
        ['d', 13],
        ['e', 14],
        ['f', 15]
    ]);

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
        while (baseNr <= value) {
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
        let convertedChar = this.HEXA_DICTIONARY.get(value);
        array.push(convertedChar);
    }
    
    convertToDecimal(value) {
        let trimNeeded = this.checkforTrim(value.toLowerCase());
        let trimmed;
        if (trimNeeded) {
            trimmed = this.trim(value);
        } else {
            trimmed = value;
        }

        // value = this.trim(value);
        let nrOfDigits = trimmed.length;
        return this.calculateSumOfDigits(nrOfDigits, trimmed);
    }
    
    calculateSumOfDigits(counter, value) {
        let sum = 0;
        let index;
        let eachNr = 0;
        let limit = counter - 1;
        for (let i = 0; i < counter; i++) {
            index = value[i];
            eachNr = this.DEC_DICTIONARY.get(index.toLowerCase());
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
    
    checkForLetters(str) {
        return /^[0-9]*$/.test(str);
    }

    checkforTrim(value) {
        if (value.includes('x') || value.includes('h')) {
            return 1;
        } else if (value.includes('#')) {
            return 1;
        } else {
            return 0;
        }
    };
    
    trim(value) {
        let trimmed = value.replace(/[^a-fA-F0-9 ]/g, "");
        while (trimmed[0] == 0) {
            trimmed = trimmed.slice(1);
        }
        return trimmed;
    };

    convertToBinary(value, array) {
        let digit;
        let index;
        value = this.trim(value);
        if (value != 0) {
            for (let i = 0; i < value.length; i++) {
                index = value[i];
                digit = this.DEC_DICTIONARY.get(index.toLowerCase());
                this.convertDigitToBinary(digit, array);
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
        return array;
    }

    doConversion(inputValue) {
        let array = [];
        if(this.base == 10) {
            this.resultValue = this.convertToDecimal(inputValue);
        } else if (this.base == 16) {
            this.resultValue = this.convertToHexadecimal(inputValue, array);
        } else {
            this.resultValue = this.convertToBinary(inputValue, array);
        }
        return this.resultValue;
    }
}

class NewConverter {
    resultValue;

    constructor(base) {
        this.base = base;
    }

    checkforTrim(value) {
        if (value.includes('x') || value.includes('h')) {
            return 1;
        } else if (value.includes('#')) {
            return 1;
        } else {
            return 0;
        }
    };
    
    trim(value) {
        let trimmed = value.replace(/[^a-fA-F0-9 ]/g, "");
        while (trimmed[0] == 0) {
            trimmed = trimmed.slice(1);
        }
        return trimmed;
    };

    convertToDecimal(value) {
        let trimNeeded = this.checkforTrim(value.toLowerCase());
        let trimmed;
        if (trimNeeded) {
            trimmed = this.trim(value);
        } else {
            trimmed = value;
        }
        return parseInt(trimmed, 16);
    }

    doConversion(value) {
        if (this.base == 16) {
            this.resultValue = Number(value).toString(16);
        } else if (this.base == 10) {
            this.resultValue = this.convertToDecimal(value);        
        } else {
            this.resultValue = this.convertToDecimal(value).toString(2);
        }
        return this.resultValue;
    }
}
