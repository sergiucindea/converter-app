class Factory {
    CONVERTER_TYPE_MY = 1;
    CONVERTER_TYPE_DEFAULT = 2;

    create(base, converterType) {
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