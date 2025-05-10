export class LitPattern {

    static test(str) {
        return StrPattern.test(str) || isNumber(str);
    }

    static inferType(str) {
        if (StrPattern.test(str))
            return 'string';

        if (isNumber(str))
            return NumPattern.detect(str);

        if (IdentPattern.test(str))
            return 'ID';

        // TODO: error handling
        return console.trace(), undefined;
    }

}

window.LitPattern = LitPattern;
