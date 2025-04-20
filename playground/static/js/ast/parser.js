export class ASTParser {
    constructor(tokenStream) {
        this.stream = tokenStream;
        this.tree   = [];
    }

    parse() {
        while (this.stream.peek()) {
            const token = this.stream.peek();

            // Match a function
            if (token === 'fn') {
                const fn = new window.ASTFunctionTemplate().fill(this.stream);
            }

            // Match a variable
            else if (token === 'let') {
                const variable = new ASTVariableTemplate().fill(this.stream);
                this.tree.push({ type: "VariableDeclaration", ...variable });
            }

            // Unknown token, skip
            else {
                console.warn("Unknown construct:", token);
                this.stream.skip();
            }
        return this.tree;
        }

    }
}

window.ASTParser = ASTParser;
