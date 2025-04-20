import { detectTokenType } from "./types.js";

window.TokenStream = class {

    constructor(tokens) {
        this.tokens = tokens;
        this.index = 0;
    }

    peekTypeEquals(type) {
        if (!Array.isArray(type))
            return detectTokenType(this.peek()) === type;

        let equals = false;
        for (let i = 0; i < type.length; i++) {
            equals = equals || this.peekTypeEquals(type[i]);
        }

        return equals;
    }

    pop() {
        return this.tokens[this.index++];
    }

    peek() {
        return this.tokens[this.index];
    }

    skip(i) {
        if (i === undefined)
            i = 1;

        this.index += i;
    }

    remaining() {
        return this.tokens.length - this.index;
    }

}
