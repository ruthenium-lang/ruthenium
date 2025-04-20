import { detectTokenType } from "../../tokens/types.js";

export class TokenStream {

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

        this.index = Math.min(this.index + i, this.tokens.length);
    }

    back(i) {
        if (i === undefined)
            i = 1;

        this.index = Math.max(this.index - i, 0)
        return this.peek();
    }

    expect(t) {
        if (this.remaining() < 1)
            return false;

        return this.tokens.pop() === t;
    }

    next(t) {
        const token = this.peek();
        if (t === token)
            return this.skip(), true;

        return false;
    }

    remaining(i) {
        if (i === undefined)
            i = 0;

        return this.tokens.length - (this.index + i);
    }

}

window.TokenStream = TokenStream;
