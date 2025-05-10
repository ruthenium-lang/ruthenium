export class ASTVariableAssignmentPattern {

    constructor(stream) {
        this.stream = stream;
    }

    checkAndParse() {
        let obj = {
            type: "VariableAssignment"
        }

        
        // Check if the next thing is an '='
        if (this.stream.peek(1) !== '=')
            return null;

        obj.variableName = this.stream.pop();
        this.stream.expect('=');
        obj.value = this.stream.pop();

        return obj;
    }

}

window.ASTVariableAssignmentPattern = ASTVariableAssignmentPattern;
