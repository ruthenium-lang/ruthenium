export class LitPattern {

    static test(str) {
        return StrPattern.test(str) || NumPattern.test(str);
    }

    static inferType(str) {
        if (StrPattern.test(str))
            return 'string';

        if (NumPattern.test(str))
            return NumPattern.inferType(str);

        if (IdentPattern.test(str))
            return 'ID';

        // TODO: error handling
    }

}

window.LitPattern = LitPattern;
