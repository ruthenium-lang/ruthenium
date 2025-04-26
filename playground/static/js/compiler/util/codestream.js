export class CodeStream {

    constructor(code) {
        this.errors = [];
        this.index  = 0;
        this.code   = code;
    }

    peek(i = 0) {
        if (this.remaining(i) < 1)
            return undefined;

        return this.code[this.index + i];
    }

    back(i = 1) {
        this.index = Math.max(this.index - i, 0);
        return this.peek();
    }

    pop() {
        const c = this.peek();
        this.skip();
        return c;
    }

    expect(s0) {
        if (this.remaining() < s0.length)
            return false;

        const s1 = this.code.substring(this.index, this.index += s0.length);
        return s1 === s0;
    }

    next(s0) {
        if (this.remaining() < s0.length)
            return false;

        const s1 = this.code.substring(this.index, this.index + s0.length);
        if (s1 === s0)
            return this.skip(s0.length), true;

        return false;
    }

    readWhile(condition) {
        let str = "";

        while (this.remaining() > 0 && condition(str + this.peek()))
            str += this.pop();

        return str;
    }

    discardIf(condition) {
        let str = "";
        while (this.remaining() > 0
            && condition(str += this.peek()))
        {
            this.skip();
        }
    }

    unwrap(delimiter1) {
        // TODO: Use stream.error
        if (!this.expect(delimiter1))
            console.warn("The first character is not " + delimiter1 + "!");

        let i = this.index;
        for (; i < this.code.length; i++)
            if (this.code[i] === delimiter1) break;

        if (i === this.code.length)
            return this.error(Errors.AST.Unclosed_String);

        let unwrapped = this.code.substring(this.index, this.index = i);
        this.skip(); // Skip the last quotation mark
        return unwrapped;
    }

    error(data, custom = null) {
        const cursor_pos = this.cursor();
        const line_str = CodeStream.getLine(this.code, this.index);

        const e = {
            data: data,
            cursor: cursor_pos,
            line: line_str,
            custom: custom
        };

        console.error(data.message);
        console.trace();
        this.errors.push(e);
        return null;
    }

    cursor() {
        let line = 1;
        let col  = 0;

        for (let i = 0; i < this.index; i++) {
            if (this.code[i] === '\n') {
                line++;
                col = 0;
                continue;
            }

            col++;
        }

        return `${line}:${col}`;
    }

    remaining(i = 0) {
        return this.code.length - (this.index + i);
    }

    skip(i = 1) {
        this.index = Math.min(this.index + i, this.code.length);
    }

    static getLine(code, index) {
        let line_start = index;
        while (line_start > 0 && code[line_start - 1] !== '\n') {
            line_start--;
        }

        let line_end = index;
        while (line_end < code.length && code[line_end] !== '\n') {
            line_end++;
        }

        return code.substring(line_start, line_end);
    }

}

window.CodeStream = CodeStream;
