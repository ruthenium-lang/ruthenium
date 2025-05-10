export class IdentPattern {

    static test(str) {
        const regex = /^[A-Za-z_][A-Za-z0-9_]*$/;
        return regex.test(str);
    }

}

window.IdentPattern = IdentPattern;
