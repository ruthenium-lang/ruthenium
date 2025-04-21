import { ASTFunctionParser } from '../ast/parsers/function.parser.js'
import { ASTVariableParser } from '../ast/parsers/variable.parser.js'
import { ASTFunctionCallPattern } from '../ast/patterns/functionCall.pattern.js';

export class ASTParser {

    constructor(stream) {
        this.stream = stream;
        this.tree   = [];

        this.funcParser = new ASTFunctionParser(this.tree, stream);
        this.varParser  = new ASTVariableParser(this.tree, stream);
    }

    parse() {
        while (this.stream.remaining() >= 1) {// TODO: >= 1 == > 0 +readability
            const keyword = this.stream.peek();

            switch (keyword) {
                case 'fn':
                    this.funcParser.parse();
                    break;

                case 'let':
                    this.varParser.parse();
                    break;

                default:
                    if (!this.tokenEval()) {
                        console.warn("I don't know what to do with: ", keyword);
                        this.stream.skip();
                    }
            }

        }

        return this.tree;
    }

    tokenEval() {
        // Check if its a function
        const func = new ASTFunctionCallPattern(this.stream).checkAndParse();
        if (func)
            return this.tree.push(func), true;

        const operator = new ASTOperatorPattern(this.stream).checkAndParse();
        if (operator)
            return this.tree.push(operator), true;

        return false;
    }
}

window.ASTParser = ASTParser;
