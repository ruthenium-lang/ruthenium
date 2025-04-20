import { ASTFunctionParser } from '../ast/parsers/function.parser.js'
import { ASTVariableParser } from '../ast/parsers/variable.parser.js'

import { ASTFunctionTemplate } from '../ast/templates/function.template.js'
import { ASTVariableTemplate } from '../ast/templates/variable.template.js'

export class ASTParser {

    constructor(stream) {
        this.stream = stream;
        this.tree   = [];

        this.funcParser = new ASTFunctionParser(this.tree, stream);
        this.varParser  = new ASTVariableParser(this.tree, stream);
    }

    parse() {
        while (this.stream.remaining() >= 1) {
            const keyword = this.stream.peek();

            switch (keyword) {

                case 'fn':
                    this.funcParser.parse();
                    break;

                case 'let':
                    this.varParser.parse();
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
