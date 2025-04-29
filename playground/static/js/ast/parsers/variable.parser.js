export class ASTVariableParser {

    constructor(tree, stream) {
        this.stream = stream;
        this.tree   = tree;
    }

    parse() {
        const variable = this.parseStructure();
        this.tree.push({ type: "VariableDeclaration", ...variable });
    }

    parseStructure() {
        let variable = {};

        if (!this.stream.expect('let'))
            return this.stream.error(Errors.AST.Let_MalformedDeclaration);

        if (!this.stream.peekTypeEquals('ID'))
            return this.stream.error(Errors.AST.Let_MissingIdentifier);

        variable.name = this.stream.pop();
        if (this.stream.next(';'))
            return variable;

        // Type declaration
        if (this.stream.next(':')) {
            if (!this.stream.peekTypeEquals("TYPE"))
                return this.stream.error(Errors.TYPECHECK.Let_InvalidType);

            variable.varType = this.stream.pop();
        }

        // Initialization
        if (this.stream.next("="))
            variable.value = this.stream.pop();

        if (!this.stream.expect(';'))
            return this.stream.error(Errors.AST.Statement_MissingEnd);

        return variable;
    }

}

window.ASTVariableParser = ASTVariableParser;
