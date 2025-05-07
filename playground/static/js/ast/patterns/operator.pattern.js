import { equalsCanGoNext } from "../../compiler/lexer.js";

export class ASTOperatorPattern {

    constructor(stream) {
        this.stream = stream;
    }

    checkAndParse() {
        let obj = { // TODO: ast constructors
            type: "Operator"
        }

        // Check if its an operator (+, -, *, /)
        if (!equalsCanGoNext(this.stream.peek()))
            return null;

        obj.operator = this.stream.pop();
        obj.left = obj.operator;
        obj.right = this.stream.pop();

        return obj;
    }

}

window.ASTOperatorPattern = ASTOperatorPattern;
