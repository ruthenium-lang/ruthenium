import { NameChecker } from "../checkers/name.checker.js";
import { StrPattern } from "../checkers/string.checker.js";
import { NumberType } from "../checkers/number.checker.js";

export function RTValue(content, type) {
    this.type = 'Value';
    this.content = content;
    if (content === undefined)
        this.type = 'EmptyValue';

    this.valType = type ?? inferType(content);
}

function inferType(str) {
    if (StrPattern.test(str))
        return 'string';

    if (isNumber(str))
        return NumberType.detect(str);

    if (NameChecker.accepts(str))
        return 'ID';

    // TODO: error handling
    return console.trace(), undefined;
}

window.RTValue = RTValue;
