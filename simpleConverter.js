export default class NewConverter {

    resultValue;

    constructor(base) {
        this.base = base;
    }

    doConversion(value) {
        if (this.base == 16) {
            this.resultValue = Number(value).toString(16);
        } else if (this.base == 10) {
            this.resultValue = parseInt(value, 16);        
        } else {
            this.resultValue = value.toString(2);
        }
        return this.resultValue;
    }

}