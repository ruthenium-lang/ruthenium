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
