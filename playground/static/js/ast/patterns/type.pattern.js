export class TypePattern {

    static check(str) {
        const types = ['int', 'uint', 'float'];
        return types.indexOf(str) !== -1;
    }

}

window.TypePattern = TypePattern;
