class GenericConverter {

    resultValue;

    DICTIONARY = new Map();

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
        let trimmed;
        trimmed = ConverterHelper.trim(value);

        if (!this.checkForLetters(value)) {
            let nrOfDigits = trimmed.length;
            return this.calculateSumOfDigits(nrOfDigits, trimmed, base, dictionary);
        } else {
            return value;
        }
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
        let dictionary = this.DEC_DICTIONARY;
        let decimalValue = this.convertToDecimal(inputValue, 16, dictionary);
        dictionary = this.setDictionary(this.base);
        this.resultValue = this.convertFromDecimal(Number(decimalValue), array, this.base, dictionary);
        return this.resultValue;
    }
}

//todo: generate hex -> dec dictionary dynamically
//todo: get correct binary if the input is dec