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

    convertFromDecimal(value, base, dictionary) {
        let resultArray = [];
        let divider = this.calculateDivider(value, base);
        this.calculateDivision(value, divider, resultArray, base, dictionary);

        if (base == 16) {
            if (value > 15) {
                return resultArray.join('');
            } else {
                return resultArray.join('').slice(1);
            }
        } else {
            return resultArray.join('');
        }
    }
    
    calculateDivider(value, base) {
        let baseNr = base;
        while ((baseNr*base) <= value) {
            baseNr *= base;
        }
        return baseNr;
    }

    calculateDivision(number, divider, resultArray, base, dictionary) {
        let digit = 0;
        let rest = 0;
        while (divider > 0) {
            digit = Math.floor(number / divider);
            rest = number % divider;
            resultArray.push(dictionary.get(digit.toString()));
            rest = rest % divider;
            divider = Math.floor(divider / base);
            number = rest;
        }
        return number;
    }
    
    convertToDecimal(value, base, dictionary) {
        let trimmed;
        trimmed = ConverterHelper.trim(value);

        if (!this.containsNoLetters(value)) {
            let nrOfDigits = trimmed.length;
            return this.calculateSumOfDigits(nrOfDigits, trimmed, base, dictionary);
        } else {
            return +value;
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
    
    containsNoLetters(str) {
        return /^[0-9]*$/.test(str);
    }

    setDictionary(base) {
        let alphabetStr = 'abcdefghijklmnopqrstuvwxyz';
        let alphabet = alphabetStr.split('');
        let dictionary = this.DICTIONARY;
        if (base <= 10) {
            for (let i = 0; i < this.base; i++) {
                dictionary.set(`${i}`, i);
            }
        } else {
            let k = 0;
            for (let i = 0; i < base; i++) {
                if (i > 9) {
                    dictionary.set(`${i}`, alphabet[k]);
                    k++;
                } else {
                    dictionary.set(`${i}`, i);
                }
            }
        }
        return dictionary;
    }

    doConversion(inputValue) {
        let dictionary = this.DEC_DICTIONARY;
        let decimalValue = 0;

        decimalValue = this.convertToDecimal(inputValue, 16, dictionary);
        dictionary = this.setDictionary(this.base);
        this.resultValue = this.convertFromDecimal(decimalValue, this.base, dictionary);

        return this.resultValue;
    }
}
