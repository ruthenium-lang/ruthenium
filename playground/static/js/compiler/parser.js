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
                    console.warn("I don't know what to do with: ", keyword);
                    if (!this.tokenEval()) {
                        console.warn("I still don't know what to do.");
                        this.stream.skip();
                        break;
                    }
            }

        }

        return this.tree;
    }

    tokenEval() {
        // Check if its a function
        console.log("Checking if its a function");
        const func = new ASTFunctionCallPattern(this.stream).checkAndParse();
        if (func) {
            this.tree.push(func);
            console.log("Function: ", func.name);
            return true;
        }
        return false;
    }
}

window.ASTParser = ASTParser;
