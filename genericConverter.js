class GenericConverter {

    resultValue;

    DICTIONARY = new Map();

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
        while (baseNr <= value) {
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
            return value;
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
            eachNr = +(dictionary.get(index.toLowerCase()));
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

    convertToBinary(value, array, dictionary) {
        let digit;
        let index;
        value = this.trim(value);
        if (value != 0) {
            for (let i = 0; i < value.length; i++) {
                index = value[i];
                digit = dictionary.get(index.toLowerCase());
                this.convertDigitToBinary(digit, array, dictionary);
            }
            return array.join('');
        } else {
            return '0000';
        }
    }

    convertDigitToBinary(number, array, dictionary) {
        let baseBin = 2;
        let divider = this.calculateDivider(3, baseBin);
        this.calculateDivision(number, divider, baseBin, array, dictionary);
        return array;
    }

    setDictionary(base) {
        const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
        let dictionary = this.DICTIONARY;
        if (base <= 10) {
            for (let i = 0; i < this.base; i++) {
                dictionary.set(`${i}`, i);
            }
        } else {
            for (let i = 0; i < this.base; i++) {
                if (i > 9) {
                    dictionary.set(`${i}`, alphabet.shift());
                } else {
                    dictionary.set(`${i}`, i);
                }
            }
        }
        return dictionary;
    }

    doConversion(inputValue) {
        let array = [];
        let dictionary = this.setDictionary(this.base);
        let decimalValue = this.convertToDecimal(inputValue, 16, dictionary);
        this.resultValue = this.convertFromDecimal(decimalValue, array, this.base, dictionary);
        return this.resultValue;
    }

}
