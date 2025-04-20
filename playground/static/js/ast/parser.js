export class ASTParser {
    constructor(tokenStream) {
        this.stream = tokenStream;
        this.ast = [];
    }

    parse() {
        while (this.stream.peek()) {
            const token = this.stream.peek();

            // Match a function
            if (token === 'fn') {
                const fn = new window.ASTFunctionTemplate().fill(this.stream);
                this.ast.push({ type: "FunctionDeclaration", ...fn });
            }

            // Match a variable
            else if (token === 'let') {
                const variable = new window.ASTVariableTemplate().fill(this.stream);
                this.ast.push({ type: "VariableDeclaration", ...variable });
            }

            // Unknown token, skip
            else {
                console.warn("Unknown construct:", token);
                this.stream.skip();
            }
        }

        return this.ast;
    }
}

window.ASTParser = ASTParser;