import { detectTokenType } from '../../tokens/types.js'
import { CodeStream } from './codestream.js'

export class TokenStream {

    constructor(tokens) {
        this.cursors = tokens.map(t => t.cursor);
        this.tokens  = tokens.map(t => t.symbol);
        this.errors  = [];
        this.index   = 0;
    }

    peekTypeEquals(type) {
        if (!Array.isArray(type))
            return detectTokenType(this.peek()) === type;

        return type.some(t => this.peekTypeEquals(t));
    }

    pop() {
        return this.tokens[this.index++];
    }

    peek(i = 0) {
        return this.tokens[this.index + i];
    }

    error(data, col_offset = 0) {
        let [ line, col ] = this.cursor().split(':').map(s => parseInt(s));
        let strLine = CodeStream.getLine(window.editor.getContent(), this.index);

        col += col_offset;
        strLine = strLine.padEnd(col);

        const cursor = `${line}:${col}`;
        const e = {
            data: data,
            cursor: cursor,
            line: strLine
        };

        this.errors.push(e);
        return null;
    }

    cursor() {
        return this.cursors[this.index];
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
