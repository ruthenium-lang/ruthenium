import { detectTokenType } from "../../tokens/types.js";

export class TokenStream {

    constructor(tokens) {
        this.tokens = tokens;
        this.index = 0;
    }

    peekTypeEquals(type) {
        if (!Array.isArray(type))
            return detectTokenType(this.peek()) === type;

        return type.some(t => this.peekTypeEquals(t));
    }

    pop() {
        return this.tokens[this.index++];
    }

    peek() {
        return this.tokens[this.index];
    }

    skip(i = 1) {
        this.index = Math.min(this.index + i, this.tokens.length);
    }

    back(i = 1) {
        this.index = Math.max(this.index - i, 0)
        return this.peek();
    }

    expect(t) {
        if (this.remaining() < 1)
            return false;

        return this.tokens[this.index++] === t;
    }

    next(t) {
        if (this.remaining() < 1) return false;
        const token = this.peek();

        if (t === token)
            return this.skip(), true;

        return false;
    }

    remaining(i = 0) {
        return this.tokens.length - (this.index + i);
    }

}

window.TokenStream = TokenStream;
