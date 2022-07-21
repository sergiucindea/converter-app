class Factory {
    static CONVERTER_TYPE_DEFAULT = 1;
    static CONVERTER_TYPE_MY = 2;

    static create(base, converterType) {
        this.base = base;
        this.converterType = converterType;
        let converter;

        if (converterType == this.CONVERTER_TYPE_MY) {
            converter = new Converter(base);
        } else {
            converter = new NewConverter(base);
        }
        
        return converter;
    }
};