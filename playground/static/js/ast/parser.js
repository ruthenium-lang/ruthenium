import { ASTFunctionParser } from './parsers/function.parser.js'

export class ASTParser {

    constructor(stream) {
        this.stream = stream;
        this.tree   = [];

        this.funcParser = new ASTFunctionParser(this.tree, stream);
        // TODO: this.varParser  = new ASTVariableParser(this.tree, stream);
    }

    parse() {
        // TODO: peek() -> remaining()
        while (this.stream.peek()) {
            const token = this.stream.peek();

            // TODO: Convert to a switch
            // Match a function
            if (token === 'fn') {
                this.funcParser.parse();
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

        }

        return this.tree;
    }
}

window.ASTParser = ASTParser;
