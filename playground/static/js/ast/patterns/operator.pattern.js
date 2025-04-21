export class ASTOperatorPattern {
    constructor(stream) {
        this.stream = stream;
    }

    checkAndParse() {
        let obj = {
            type: "Operator"
        }
        
        // Check if its an operator (+, -, *, /)
        const operators = ["+", "-", "*", "/"];
        if (!operators.includes(this.stream.peek()))
            return null;
        
        obj.operator = this.stream.pop();
        obj.left = this.stream.peek(-1);
        obj.right = this.stream.pop();
        
        return obj;
    }
}