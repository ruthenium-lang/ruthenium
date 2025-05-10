import { NameChecker } from "./name.checker.js";
import { StrPattern } from "./string.checker.js";
import { NumberType } from "./number.checker.js";

export class LitPattern {

    static test(str) {
        return StrPattern.test(str) || isNumber(str);
    }

    static inferType(str) {
        if (StrPattern.test(str))
            return 'string';

        if (isNumber(str))
            return NumberType.detect(str);

        if (NameChecker.accepts(str))
            return 'ID';

        // TODO: error handling
        return console.trace(), undefined;
    }

}

window.LitPattern = LitPattern;
