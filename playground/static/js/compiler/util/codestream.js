window.CodeStream = class {

    constructor(code) {
        this.code = code;
        this.index = 0;
    }

    peek(i) {
        if (i == undefined)
            i = 0;

        if (this.index + i > this.code.length)
            return '\0';

        return this.code[this.index + i];
    }

    back(i) {
        if (i == undefined)
            i = 1;

        this.index = Math.max(this.index - i, 0);
        return this.peek();
    }

    pop() {
        const c = this.peek();
        this.skip();
        return c;
    }

    expect(s0) {
        if (this.isEOF(this.index + s0.length + 1))
            return false;

        const s1 = this.code.substring(this.index, this.index += s0.length);
        return s1 === s0;
    }

    next(s0) {
        if (this.isEOF(this.index + s0.length + 1))
            return false;

        const s1 = this.code.substring(this.index, this.index + s0.length);
        if (s1 === s0)
            return this.skip(s0.length), true;

        return false;
    }

    readWhile(condition) {
        let str = "";

        let c;
        while (!this.isEOF() && condition(c = this.pop()))
            str += c;

        if (!this.isEOF())
            this.back(); // The last character doesn't belong to the string

        return str;
    }

    unwrap(wrapch) {
        if (!this.expect(wrapch))
            console.warn("The first character is not " + wrapch + "!");

        let i = this.index;
        for (; i < this.code.length; i++)
            if (this.code[i] === wrapch) break;

        if (i === this.code.length) {
            console.error("Unterminated string!");
            console.trace();
            return undefined;
        }

        let unwrapped = this.code.substring(this.index, this.index = i);
        this.skip(); // Skip the last quotation mark
        return unwrapped;
    }

    cursor() {
        let line = 1;
        let col = 1;

        for (let i = 0; i < this.index; i++) {
            if (this.code[i] === '\n') {
                line++;
                col = 1;
            } else {
                col++;
            }
        }

        return `${line}:${col}`;
    }

    isEOF(index) {
        if (index == undefined)
            index = this.index;

        return index >= this.code.length;
    }

    skip(i) {
        if (i == undefined)
            i = 1;

        if (this.isEOF())
            return;

        this.index += i;
    }

}
