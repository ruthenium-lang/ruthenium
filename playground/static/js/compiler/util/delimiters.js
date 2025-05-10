export class DelimiterCounter {

    constructor(cs, enabled) {
        this.enabled = enabled;
        this.cs = cs;
        this.braces = []; // Cursors where are braces opened
        this.parens = []; // Cursors where are parentheses opened
    }

    check(c) {
        if (!this.enabled)
            return;

        if (c == '{')
            this.braces.push(this.cs.index);

        else if (c == '}')
            this.braces.pop();

        else if (c == '(')
            this.parens.push(this.cs.index);

        else if (c == ')')
            this.parens.pop();
    }

    stop() {
        if (!this.enabled)
            return;

        this.cs.index = this.braces[0] || this.parens[0] || 0;
        if (this.parens.length > 0)
            this.cs.error(Errors.LEXER.Unclosed_Paren);

        if (this.braces.length > 0)
            this.cs.error(Errors.LEXER.Unclosed_Brace);
    }

}

window.DelimiterCounter = DelimiterCounter;
