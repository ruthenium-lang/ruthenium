export class LitPattern {

    static test(str) {
        return StrPattern.test(str) || NumPattern.test(str);
    }

}

window.LitPattern = LitPattern;
