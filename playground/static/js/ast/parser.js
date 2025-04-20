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
            const keyword = this.stream.peek();

            switch (keyword) {

                case 'fn':
                    this.funcParser.parse();
                    break;

                case 'let': // TODO: create ast variable parser
                    const variable = new ASTVariableTemplate().fill(this.stream);
                    this.tree.push({ type: "VariableDeclaration", ...variable });
                    break;

                default:
                    console.warn("I don't know what to do: ", keyword);
                    this.stream.skip();
                    break;

            }

        }

        return this.tree;
    }
}

window.ASTParser = ASTParser;
