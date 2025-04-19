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

        if (this.index - i < 0)
			return '\0';

		this.index -= i;
		return this.peek();
    }

    pop() {
		const c = this.peek();
		this.skip();
		return c;
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
        // TODO: Create a expect function to force the first character to be wrapch
        this.skip(); // Skip the first character (assuming it matches with wrapch)

        let i = this.index;
        for (; i < this.code.length; i++)
            if (this.code[i] === wrapch) break;

        if (i === this.code.length)
        {
            console.error("Unterminated string!");
            console.trace();
            return undefined;
        }

        let unwrapped = this.code.substring(this.index, this.index = i);
        this.skip(); // Skip the last quotation mark
        return unwrapped;
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
