class Converter {
    resultValue;

    HEXA_DICTIONARY = new Map([
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
        ['10', 'a'],
        ['11', 'b'],
        ['12', 'c'],
        ['13', 'd'],
        ['14', 'e'],
        ['15', 'f']
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

    OCT_DICTIONARY = new Map([
        ['0', '0'],
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '10'],
        ['9', '11'],
        ['10', '12'],
        ['11', '13'],
        ['12', '14'],
        ['13', '15'],
        ['14', '16'],
        ['15', '17']
    ]);

    QUI_DICTIONARY = new Map([
        ['0', '0'],
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '10'],
        ['6', '11'],
        ['7', '12'],
        ['8', '13'],
        ['9', '14'],
        ['10', '20'],
        ['11', '21'],
        ['12', '22'],
        ['13', '23'],
        ['14', '24'],
        ['15', '30']
    ]);

    constructor(base) {
        this.base = base;
    }

    convertFromDecimal(value, array, base, dictionary) {
        let maximumExp = this.calculateBaseMaxExp(value, base);
        let divider = this.calculateDivider(maximumExp, base);
        this.calculateDivision(value, divider, base, array, dictionary);

        if (base == 16) {
            if (value > 15) {
                return array.join('');
            } else {
                return array.join('').slice(1);
            }
        } else {
            return array.join('');
        }
        
    }
    
    calculateBaseMaxExp(value, base) {
        let expCounter = 0;
        let baseNr = base;
        while (baseNr < value) {
            baseNr *= base;
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
    
    calculateDivision(number, divider, base, array, dictionary) {
        let digit = Math.floor(number / divider);
        let rest = number % divider;
        this.retainDigit(digit, array, dictionary);
        divider = divider / base;
    
        while (divider > 0) {
            digit = Math.floor(rest / divider);
            this.retainDigit(digit, array, dictionary);
            rest = rest % divider;
            divider = Math.floor(divider / base);
        }
    }
    
    retainDigit(value, array, dictionary) {
        let convertedChar = dictionary.get(value.toString());
        array.push(convertedChar);
    }
    
    convertToDecimal(value, base, dictionary) {
        let trimNeeded = this.checkforTrim(value);
        let trimmed;
        if (trimNeeded) {
            trimmed = this.trim(value);
        } else {
            trimmed = value;
        }
        let nrOfDigits = trimmed.length;
        return this.calculateSumOfDigits(nrOfDigits, trimmed, base, dictionary);
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
    
    calculateSumOfDigits(counter, value, base, dictionary) {
        let sum = 0;
        let index;
        let eachNr = 0;
        let limit = counter - 1;
        for (let i = 0; i < counter; i++) {
            index = value[i];
            eachNr = dictionary.get(index.toLowerCase());
            sum += this.calculateEachDigitTimesBase(eachNr, limit, base);
            limit--;
        }
        return sum;
    }
    
    calculateEachDigitTimesBase(value, exp, base) {
        let basenr = base;
        if (exp == 0) {
            return value;
        } else {
            for (let i = 1; i < exp; i++) {
                basenr *= base;
            }
            return value * basenr;
        }
    }
    
    checkForLetters(str) {
        return /^[0-9]*$/.test(str);
    }

    convertToBinary(value, array) {
        let digit;
        let index;
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

    setDictionary(base) {
        let dictionary;
        if (base == 10) {
            dictionary = this.DEC_DICTIONARY;
        } else if (base == 16) {
            dictionary = this.HEXA_DICTIONARY;
        } else if (base == 8) {
            dictionary = this.OCT_DICTIONARY;
        } else {
            dictionary = this.QUI_DICTIONARY;
        }
        return dictionary;
    }

    doConversion(inputValue) {
        let array = [];
        let dictionary = this.setDictionary(this.base);
        if(this.base == 10) {
            this.resultValue = this.convertToDecimal(inputValue, 16, dictionary);
        } else if (this.base == 16) {
            this.resultValue = this.convertFromDecimal(inputValue, array, 16, dictionary);
        } else if (this.base == 8) {
            this.resultValue = this.convertFromDecimal(inputValue, array, 8, dictionary);
        } else if (this.base == 5){
            this.resultValue = this.convertFromDecimal(inputValue, array, 5, dictionary);
        } else {
            this.resultValue = this.convertToBinary(inputValue, array);
        }
    return this.resultValue;
    }
}
