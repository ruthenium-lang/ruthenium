import { ASTFunctionParser } from '../ast/parsers/function.parser.js'
import { ASTVariableParser } from '../ast/parsers/variable.parser.js'
import { ASTFunctionCallPattern } from '../ast/patterns/functionCall.pattern.js';

export class ASTParser {

    constructor(ast, stream) {
        this.stream = stream;
        this.ast    = ast;

        this.funcParser = new ASTFunctionParser(this.ast, stream);
        this.varParser  = new ASTVariableParser(this.ast, stream);
    }

    parse() {
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

    tokenEval() {
        // Check if its a function
        const func = new ASTFunctionCallPattern(this.stream).checkAndParse();
        if (func)
            return this.ast.push(func), true;

        const operator = new ASTOperatorPattern(this.stream).checkAndParse();
        if (operator)
            return this.ast.push(operator), true;

        return false;
    }
}

window.ASTParser = ASTParser;
